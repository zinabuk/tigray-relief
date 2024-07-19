<template>
  <div id="governance" class="bg-[#53900F]/10 overflow-auto">
    <OrgTree v-if="treeData" :data="treeData" />
    <div v-else>Loading...</div> 
  </div>
</template>

<script>
import ApiService from '@/services/apiService';
import { BASE_AVATAR } from '@/config';
import OrgTree from '@/components/open/OpenTree.vue';

export default {
  name: 'App',
  components: {
    OrgTree,
  },
  data() {
    return {
      treeData: null, 
    };
  },
  created() {
    ApiService.get('/users/organizational-structure')
      .then(response => {
        console.log('API response:', response);
        const fetchedData = response.data;
        const transformedData = this.transformData(fetchedData);
        console.log('Transformed data:', transformedData);
        this.treeData = transformedData;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  methods: {
    transformData(flatData) {
      console.log('Original flatData:', flatData); // Debugging line
      const idMap = {};
      flatData.forEach(node => {
        idMap[node.id] = { ...node, children: [], image: `${BASE_AVATAR}${node.image}` };
      });
      let root = null;
      flatData.forEach(node => {
        if (node.parentId) {
          const parent = idMap[node.parentId];
          if (parent) {
            parent.children.push(idMap[node.id]);
          }
        } else {
          root = idMap[node.id];
        }
      });
      console.log('Constructed idMap:', idMap); // Debugging line
      return root;
    },
  },
};
</script>

<style></style>
