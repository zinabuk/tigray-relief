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
  <section class="w-full bg-green-900/10 px-[6%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->
    <div class="grid grid-cols-1 w-full zmd:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(service, i) in services"
        :key="i"
        class="p-4 flex flex-col md:flex-row gap-8 bg-white shadow-xl overflow-hidden w-full"
        data-aos="fade-up"
      >
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
        <div
          :class="[
            i % 2 === 0 ? 'md:order-1' : 'md:order-2',
            'basis-1/2 zshadow-orange-800 shadow-xl overflow-hidden max-h-[500px]'
          ]"
        >
          <img
            v-if="service.serviceImage"
            :src="BASE_AVATAR + service.serviceImage"
            alt=""
            class="w-full h-full zring-2 zring-yellow-300 zrounded-full object-cover hover:scale-[1.2] transition-transform duration-500 ease-in-out hover:bg-[#53900F]"
          />

          <p v-else class="w-20 h-20 rounded-full text-6xl">{{ service.serviceTitle[0] }}</p>
        </div>
        <div
          :class="[
            i % 2 === 0 ? 'order-2' : 'order-1',
            'basis-1/2',
            'flex flex-col gap-4 p-8 shadow-xl'
          ]"
        >
          <h1 class="text-2xl font-bold">{{ service.serviceTitle }}</h1>
          <div class="relative">
            <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-[#53900F]"></span>
            <hr class="h-[2px] absolute inset-0 bg-gray-200" />
          </div>
          <p class="line-clamp-5z">
            {{ service.serviceDescription }}
          </p>

          <router-link
            class="text-[#53900F]"
            :to="{ name: 'service-detail', params: { title: service.serviceTitle } }"
            >Read More</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
