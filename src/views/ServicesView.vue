<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }
import { ref, onMounted } from 'vue'

const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Services we provide</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">Home</router-link>
          <router-link to="/services" class="text-[#539000] px-4 py-2">Services</router-link>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full bg-gray-50 px-[6%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div v-for="(service, i) in services" :key="i" class="p-4 flex flex-col gap-2 bg-white">
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
        <img
          v-if="service.serviceImage"
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full"
        />
        <p v-else class="w-20 h-20 rounded-full text-6xl">{{ service.serviceTitle[0] }}</p>
        <h1 class="text-2xl font-bold">{{ service.serviceTitle }}</h1>
        <div class="relative">
          <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-green-600"></span>
          <hr class="h-[2px] absolute inset-0 bg-gray-200" />
        </div>
        <p class="line-clamp-5">
          {{ service.serviceDescription }}
        </p>

        <router-link
          class="text-[#539000]"
          :to="{ name: 'service-detail', params: { title: service.serviceTitle } }"
          >Read More</router-link
        >
      </div>
    </div>
  </section>
</template>
