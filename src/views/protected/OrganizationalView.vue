<template>
  <div class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4" >
  <div class="px-24 pt-4">
    <h2 class="text-2xl text-bold text-green-900">Organizational Structure</h2>
    <br>
      <div class="flex justify-center ">
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
        />
      </template>
      <p v-else>No nodes added yet.</p>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-medium mb-4">{{ currentNode ? 'Add Child Node' : 'Add Root Node' }}</h3>
        <form @submit.prevent="currentNode ? addChildNode() : addRootNode()">
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
            <BaseFileInput v-model="form.image" type="file" id="nodeImage" label="Add Picture" required />
          </div>
          <div class="flex justify-between mt-4">
            <BaseButton type="submit">{{ currentNode ? 'Add Child Node' : 'Add Root Node' }}</BaseButton>
            <BaseButton @click="closeModal">Cancel</BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
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

    const fetchNodes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/nodes');
        nodes.value = response.data;
      } catch (error) {
        console.error('Failed to fetch nodes:', error);
      }
    };

    onMounted(fetchNodes);

    const openModal = (node) => {
      currentNode.value = node;
      showModal.value = true;
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
      const newNode = {
        id: uuidv4(),
        name: form.value.name,
        department: form.value.department,
        image: form.value.image,
        children: [],
      };

      try {
        const response = await axios.post('http://localhost:3000/nodes', newNode);
        nodes.value.push(response.data);
        closeModal();
      } catch (error) {
        console.error('Failed to add root node:', error);
      }
    };

    const addChildNode = async () => {
      const newNode = {
        id: uuidv4(),
        parentId: currentNode.value.id,
        name: form.value.name,
        department: form.value.department,
        image: form.value.image,
        children: [],
      };

      try {
        const response = await axios.post('http://localhost:3000/nodes', newNode);
        currentNode.value.children.push(response.data);
        closeModal();
      } catch (error) {
        console.error('Failed to add child node:', error);
      }
    };

    return {
      nodes,
      form,
      currentNode,
      showModal,
      openModal,
      closeModal,
      addRootNode,
      addChildNode,
    };
  },
};
</script>
