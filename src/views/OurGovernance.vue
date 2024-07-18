<template>
  <div id="governance" class="bg-[#53900F]/10 overflow-auto">
    <OrgTree v-if="treeData" :data="treeData" />
    <div v-else>Loading...</div> 
  </div>
</template>


<script>
import axios from 'axios'; 
// import ApiService from '@/services/apiService'
// import { BASE_AVATAR } from '@/config'
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
    axios.get('http://localhost:7000/api/v1/users/organizational-structure').then(response => {
      const fetchedData = response.data.data;
      const transformedData = this.transformData(fetchedData);
      this.treeData = transformedData;
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  },
  methods: {
    transformData(flatData) {
    const idMap = {};
    flatData.forEach(node => {
      idMap[node.id] = { ...node, children: [], image: `http://localhost:7000/api/v1/images/${node.image}` };
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

    return root;
  },
  },
};
</script>


<style></style>