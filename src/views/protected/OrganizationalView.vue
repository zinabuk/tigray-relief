<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import ApiService from '@/services/apiService';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseFileInput from '@/components/base/BaseFileInput.vue';
import NodeItem from '@/components/NodeItem.vue';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseFileInput,
    NodeItem,
  },
  setup() {
    const nodes = ref([]);
    const form = ref({
      name: '',
      department: '',
      image: null,
    });
    const currentNode = ref(null);
    const showModal = ref(false);
    const isEditMode = ref(false);

    const fetchNodes = async () => {
      try {
        const response = await ApiService.get('users/organizational-structure');
        nodes.value = organizeNodes(response.data);
      } catch (error) {
        console.error('Failed to fetch nodes:', error);
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      form.value.image = file;
    };

    const organizeNodes = (nodeList) => {
      const nodeMap = new Map();
      const rootNodes = [];

      nodeList.forEach(node => {
        node.children = [];
        nodeMap.set(node.id, node);
      });

      nodeList.forEach(node => {
        if (node.parentId) {
          const parentNode = nodeMap.get(node.parentId);
          if (parentNode) {
            parentNode.children.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      });

      return rootNodes;
    };

    onMounted(fetchNodes);

    const openModal = (node, isEdit = false) => {
      currentNode.value = node;
      showModal.value = true;
      isEditMode.value = isEdit;
      if (isEdit && node) {
        form.value.name = node.name;
        form.value.department = node.department;
      } else {
        resetForm();
      }
    };

    const closeModal = () => {
      showModal.value = false;
      resetForm();
    };

    const resetForm = () => {
      form.value.name = '';
      form.value.department = '';
      form.value.image = null;
    };

    const addRootNode = async () => {
      const formData = new FormData();
      formData.append('id', uuidv4());
      formData.append('name', form.value.name);
      formData.append('department', form.value.department);
      formData.append('image', form.value.image);

      try {
        const response = await ApiService.post('users/organizational-structure', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        nodes.value.push(response.data);
        closeModal();
      } catch (error) {
        console.error('Failed to add root node:', error);
      }
    };

    const addChildNode = async () => {
      const formData = new FormData();
      formData.append('id', uuidv4());
      formData.append('parentId', currentNode.value.id);
      formData.append('name', form.value.name);
      formData.append('department', form.value.department);
      formData.append('image', form.value.image);

      try {
        const response = await ApiService.post('users/organizational-structure', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        currentNode.value.children.push(response.data);
        closeModal();
      } catch (error) {
        console.error('Failed to add child node:', error);
      }
    };

    const updateNode = async () => {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('department', form.value.department);
      if (form.value.image) {
        formData.append('image', form.value.image);
      }

      try {
        const response = await ApiService.patch(`users/organizational-structure/${currentNode.value.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Find and update the node in nodes.value
        const updateNodeInTree = (nodeList, updatedNode) => {
          for (let node of nodeList) {
            if (node.id === updatedNode.id) {
              Object.assign(node, updatedNode);
              return;
            }
            if (node.children && node.children.length) {
              updateNodeInTree(node.children, updatedNode);
            }
          }
        };
        updateNodeInTree(nodes.value, response.data);
        closeModal();
      } catch (error) {
        console.error('Failed to update node:', error);
      }
    };

    const deleteNode = async (node) => {
      try {
        await ApiService.delete(`users/organizational-structure/${node.id}`);
        removeNode(nodes.value, node);
      } catch (error) {
        console.error('Failed to delete node:', error);
      }
    };

    const removeNode = (nodeList, nodeToRemove) => {
      const index = nodeList.findIndex(node => node.id === nodeToRemove.id);
      if (index !== -1) {
        nodeList.splice(index, 1);
      } else {
        nodeList.forEach(node => {
          if (node.children) {
            removeNode(node.children, nodeToRemove);
          }
        });
      }
    };

    return {
      nodes,
      form,
      currentNode,
      showModal,
      isEditMode,
      openModal,
      closeModal,
      handleFileChange,
      addRootNode,
      addChildNode,
      updateNode,
      deleteNode,
    };
  },
};
</script>

<template>
  <div class="px-12">
    <div class="px-12 pt-4">
      <h2 class="text-2xl text-bold text-green-900">Organizational Structure</h2>
      <br>
      <div class="flex justify-center">
        <BaseButton @click="openModal(null)">Add Root Node</BaseButton>
      </div>
    </div>

    <div class="mt-6">
      <template v-if="nodes.length > 0">
        <NodeItem
          v-for="(node, index) in nodes"
          :key="index"
          :node="node"
          @open-modal="openModal"
          @edit-node="openModal"
          @delete-node="deleteNode"
        />
      </template>
      <p v-else>No nodes added yet.</p>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-medium mb-4">{{ currentNode ? (isEditMode ? 'Edit Node' : 'Add Child Node') : 'Add Root Node' }}</h3>
        <form @submit.prevent="isEditMode ? updateNode() : (currentNode ? addChildNode() : addRootNode())">
          <div>
            <label for="nodeName">Name:</label>
            <BaseInput v-model="form.name" type="text" id="nodeName" required />
          </div>
          <div>
            <label for="nodeDepartment">Department:</label>
            <BaseInput v-model="form.department" type="text" id="nodeDepartment" required />
          </div>
          <div>
            <label for="nodeImage">Image:</label>
            <BaseFileInput @change="handleFileChange" id="nodeImage" label="Add Picture"  type="file" accept="images/*" :required="!isEditMode" />
          </div>
          <div class="flex justify-between mt-4">
            <BaseButton type="submit">{{ isEditMode ? 'Update Node' : (currentNode ? 'Add Child Node' : 'Add Root Node') }}</BaseButton>
            <BaseButton @click="closeModal">Cancel</BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
