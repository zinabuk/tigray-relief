<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
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
  <section class="w-full px-[1%] md:px-[6%] py-12 flex flex-col bg-[#53900F]/5 items-center gap-4">
    <div class="w-full zbg-white p-4 flex items-center justify-center md:text-3xl ztext-[#53900F]">
      <h1>Board Members</h1>
    </div>
    <div
      class="w-full md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center place-content-center"
    >
      <div v-for="(team, i) in teams" :key="i" class="flex flex-col gap-4 justify-start zshadow zbg-white">
        <img
          v-if="team.image"
          :src="BASE_AVATAR + team.image"
          alt=""
          class="zring-2 zring-yellow-300 w-full h-[220px] rounded-sm"
        />
        <p v-else class="w-20 h-20 rounded-full text-2xl">{{ team.fullName[currentLanguage] }}</p>
        <div class="flex flex-col gap-2">
          <h1 class="text-[18px] font-bold">{{ team.fullName[currentLanguage] }}</h1>
          <div class="relative">
            <span class="w-1/4 absolute z-20 inset-0 h-[2px] bg-green-600"></span>
            <hr class="h-[2px] absolute inset-0 bg-gray-200" />
          </div>
          <p class="line-clamp-2 zfont-bold text-[16px]">
            {{ team.profession[currentLanguage] }}
          </p>
          <!-- <p class="line-clamp-5 text-[14px]">
          {{ team.biography[currentLanguage] }}
        </p> -->
        </div>
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
</style>
