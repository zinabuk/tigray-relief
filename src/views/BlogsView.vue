<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const blogs = ref([])

const fetchNews = async () => {
  try {
    const response = await ApiService.get('/admin/events')
    if (response.success) {
      // isLoading = false
      blogs.value = response.data.map((item) => ({
        ...item,
        category: JSON.parse(item.category),
        eventTitle: JSON.parse(item.eventTitle)
      }))
    }
  } catch (error) {
    // alert(error)
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">News | Events</h1>
        <div class="flex gap-4">
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/services" class="text-[#539000] px-4 py-2">news / events</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full px-[6%] py-12 flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">{{ $t('News and stories from us') }}</h1>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(event, i) in blogs" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            :src="BASE_AVATAR + event.eventImage"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
          <h6 class="text-gray-500">
            {{ event.category[currentLanguage] }} | {{ event.eventDate }}
          </h6>
          <h3 class="text-lg font-bold">
            {{ event.eventTitle[currentLanguage] }}
          </h3>
          <router-link
            :to="{ name: 'blog-detail', params: { title: event.eventTitle[currentLanguage] } }"
            class="text-green-600 font-bold"
            >{{ $t('Read More') }}</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
