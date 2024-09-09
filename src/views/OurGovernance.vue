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
        idMap[node.id] = { 
          ...node, 
          children: [], 
          image:`${BASE_AVATAR}${node.image}`  
        };
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
<!-- 
<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

// import { useRouter } from 'vue-router'
// const router = useRouter()
import { ref, onMounted } from 'vue'
const currentLanguage = ref('en')

const teams = ref([])
const fetchTeams = async () => {
  try {
    const response = await ApiService.get('/admin/our-teams')

    if (response.success) {
      teams.value = response.data.map((item) => ({
        ...item,
        fullName: JSON.parse(item.fullName),
        profession: JSON.parse(item.profession),
        biography: JSON.parse(item.biography)
      }))
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

onMounted(() => {
  fetchTeams()
})
</script>

<template>
  <section class="w-full px-[1%] py-12 flex flex-col items-center gap-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 place-content-center">
      <div v-for="(team, i) in teams" :key="i" class="p-4 flex flex-col gap-4 shadow bg-white">
        <img
          v-if="team.image"
          :src="BASE_AVATAR + team.image"
          alt=""
          class="zring-2 zring-yellow-300 rounded-sm"
        />
        <p v-else class="w-20 h-20 rounded-full text-2xl">{{ team.fullName[currentLanguage] }}</p>
        <h1 class="text-[18px] font-bold">{{ team.fullName[currentLanguage] }}</h1>
        <div class="relative">
          <span class="w-1/4 absolute z-20 inset-0 h-[2px] bg-green-600"></span>
          <hr class="h-[2px] absolute inset-0 bg-gray-200" />
        </div>
        <p class="line-clamp-2 font-bold text-[16px]">
          {{ team.profession[currentLanguage] }}
        </p>
        <p class="line-clamp-5 text-[14px]">
          {{ team.biography[currentLanguage] }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modal {
  animation: modal 0.3s;
}

@keyframes modal {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style> -->
