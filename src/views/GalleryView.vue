<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

import { ref, onMounted } from 'vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

const galleries = ref([])
const fetchGallers = async () => {
  try {
    const response = await ApiService.get('/admin/gallery')
    if (response) {
      galleries.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  fetchGallers()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Our Gallery</h1>
        <div class="flex gap-4">
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/services" class="text-[#539000] px-4 py-2">Gallery</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full bg-gray-50 px-[6%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->
    <div class="gap-4 place-content-center">
      <Swiper
        :slides-per-view="1"
        :modules="[Autoplay, Pagination, Navigation]"
        :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false }"
        :breakpoints="{
          '768': { slidesPerView: 2, spaceBetween: 20 },
          '1024': { slidesPerView: 3, spaceBetween: 30 }
        }"
        loop
        class="w-full flex gap-4"
      >
        <swiper-slide v-for="(gallery, i) in galleries" :key="i" class="h-[400px] flex gap-6">
          <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
          <img
            :src="BASE_AVATAR + gallery.gallery"
            alt=""
            class="roudnded-full object-cover object-center transition-all duration-1000 hover:scale-[110%]"
          />
        </swiper-slide>
      </Swiper>
    </div>
  </section>
</template>
