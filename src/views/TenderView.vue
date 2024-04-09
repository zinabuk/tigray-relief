<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const tenders = ref([])

const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/tenders')
    if (response) {
      tenders.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

onMounted(() => {
  fetchTenders()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Tenders</h1>
        <div class="flex gap-4">
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/tenders" class="text-[#539000] px-4 py-2">Tenders</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full px-[6%] py-12 flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Tenders we currently have..</h1>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(tender, i) in tenders" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            v-if="tender.image"
            :src="BASE_AVATAR + tender.image"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover"
          />
          <h1 v-else class="w-24 h-24 text-center font-bold text-6xl">{{ tender.title[0] }}</h1>
        </div>
        <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
          <h1>{{ tender.title }}</h1>
          <h6 class="text-gray-500">{{ tender.organization }}</h6>
          <h3 class="text-lg font-bold">
            {{ tender.deadline }}
          </h3>
          <p class="line-clamp-5">{{ tender.description }}</p>
          <router-link to="/about" class="text-green-600 font-bold">Read More</router-link>
        </div>
      </div>
    </div>
  </section>
</template>
