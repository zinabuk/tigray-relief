<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// import dayjs from 'dayjs'

import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
defineProps({
  title: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const service = ref({})

async function getService() {
  try {
    const response = await ApiService.get('/admin/service/' + route.params.title)
    if (response.success) { 
      service.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 5000)
    }
  }
}

// function formattedDate(date) {
//   return dayjs(date).locale('en').format('MMMM D, YYYY')
// }

const services = ref([])
async function getServices() {
  try {
    const response = await ApiService.get('/admin/services')
    if (response.success) {
      services.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 5000)
    }
  }
}
watchEffect(() => {
  if (route.params.title) {
    getService()
  }
})
onMounted(() => {
  getServices()
})
</script>
<template>
  <section class="w-full px-[6%] py-12">
    <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-4 py-12 bg-[#1d4354]/5 px-[7%]">
      <div class="relative w-full flex flex-col gap-4 group md:col-span-12">
        <h2 class="text-4xl font-semibold text-center whitespace-normal break-al">
          {{ service.serviceTitle }}
        </h2>

        <div class="w-full max-h-[600px] overflow-hiddden">
          <img
            v-if="service.serviceImage"
            :src="BASE_AVATAR + `${service.serviceImage}`"
            alt="My company"
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-2 py-6 bg-white translation-all duration-1000 px-4 relative">
          <div class="flex flex-col gap-4 py-2">
            <p class="text-gray-700"><span> </span> {{ service.serviceDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="w-full px-[6%] bg-white py-12 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(service, i) in services" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <img
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="max-h-[500px] rounded-xl w-full object-cover"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
        <h6 class="text-gray-500"></h6>
        <h3 class="text-lg font-bold">
          {{ service.serviceTitle }}
        </h3>
        <p class="line-clamp-4">{{ service.serviceDescription }}</p>
        <router-link
          :to="{ name: 'service-detail', params: { title: service.serviceTitle } }"
          class="text-green-600 font-bold"
          >Read More</router-link
        >
      </div>
    </div>
  </div>
</template>
