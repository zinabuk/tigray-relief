<template>
  <div id="governance" class="bg-[#53900F]/10 overflow-auto">
    <OrgTree :data="treeData" />
  </div>
</template>

<script>
import ApiService from '@/services/apiService';
import { BASE_AVATAR } from '@/config';
import OrgTree from '@/components/open/OpenTree.vue';

export default {
  name: 'OurGovernance',
  components: {
    OrgTree,
  },
  data() {
    return {
      treeData: null,
    };
  },
  created() {
    this.fetchTreeData();
  },
  methods: {
    async fetchTreeData() {
      try {
        const response = await ApiService.get('users/organizational-structure');
        const nodes = response.data;
        console.log('Fetched Nodes:', nodes);
        this.treeData = this.buildTree(nodes);
        console.log('Transformed Tree Data:', this.treeData);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    },
    buildTree(nodes) {
      const nodeMap = new Map();
      nodes.forEach(node => {
        node.children = [];
        nodeMap.set(node.id, node);
      });

      let root = null;
      nodes.forEach(node => {
        if (node.parentId === null) {
          root = node;
        } else {
          const parent = nodeMap.get(node.parentId);
          if (parent) {
            parent.children.push(node);
            // Update depth based on parent's depth
            node.depth = parent.depth + 1;
          }
        }
      });

      if (!root) {
        console.error('No root node found');
        return null;
      }

      // Initialize depth for the root node
      root.depth = 0;

      return this.transformNode(root);
    },
    transformNode(node) {
      if (!node) return null;

      return {
        name: node.name,
        role: node.department,
        profilePicture: node.image ? `${BASE_AVATAR}/${node.image}` : null,
        children: node.children.map(child => this.transformNode(child))
      };
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
