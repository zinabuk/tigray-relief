<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config' 
import { ref, onMounted } from 'vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css' 
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const galleries = ref([])
const fetchGalleries = async () => {
  try {
    const response = await ApiService.get('/admin/gallery')
    if (response) {
      galleries.value = response.data
    }
  } catch (error) {
    // alert(error)
  }
}

let selectedImage = ref('')
let showModal = ref(false)
function showImageModal(image) {
  // alert(image)
  selectedImage.value = image
  showModal.value = true
}
onMounted(fetchGalleries)
</script>

<template>
  <section class="w-full">
    <div class="w-full relative hidden md:block">
      <img src="@/assets/img/2.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ $t('Our Gallery') }}</h1>
        <div class="flex gap-4">
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</a>
          <a href="/services" class="text-[#539000] px-4 py-2">{{ $t('Gallery') }}</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full bg-gray-50 px-[2%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->
    <div class="gap-4 place-content-center">
      <Swiper
        :slides-per-view="1"
        :modules="[Autoplay, Pagination, Navigation]"
        :autoplay="{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: false }"
        loop
        class=""
        :breakpoints="{
          '768': { slidesPerView: 2, spaceBetween: 20 },
          '1024': { slidesPerView: 3, spaceBetween: 30 }
        }"
      >
        <swiper-slide v-for="(gallery, i) in galleries" :key="i" class="max-h-[500px] flex gap-6">
          <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
          <img
            :src="BASE_AVATAR + gallery.gallery"
            alt=""
            class="roudnded-full object-cover object-center transition-all duration-1000 hover:scale-[110%] hover:cursor-pointer"
            @click="showImageModal(gallery)"
          />
        </swiper-slide>
      </Swiper>
    </div>
  </section>

  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center modal justify-center bg-black bg-opacity-75"
  >
    <div class="bg-white p-8 rounded-lg zw-full">
      <div class="flex justify-end">
        <button @click="showModal = false" class="bg-gray-200 px-4 py-2 rounded">
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
      <img
        :src="`${BASE_AVATAR}${selectedImage.gallery}`"
        alt=""
        class="max-h-[85vh] max-w-[95vw]"
      />
    </div>
  </div>
</template>
