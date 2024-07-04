<script setup>
// import SpinningCard from '@/components/open/SpinningCard.vue'
// import slugify from '@/utils/slugify'
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
const event = ref({})

async function getBlog() {
  try {
    const response = await ApiService.get('/admin/event/' + route.params.title)
    if (response.success) {
      event.value = response.data
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

const news = ref([])
async function getNews() {
  try {
    const response = await ApiService.get('/admin/events')
    if (response.success) {
      news.value = response.data
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
    getBlog()
  }
})
onMounted(() => {
  getNews()
})
</script>
<template>
  <section class="w-full px-[6%] py-12">
    <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-4 py-12 bg-[#1d4354]/5 px-[7%]">
      <div class="relative w-full flex flex-col gap-4 group md:col-span-12">
        <h2 class="text-4xl font-semibold text-center whitespace-normal break-al">
          {{ event.eventTitle }}
        </h2>

        <div class="w-full max-h-[600px] overflow-hiddden">
          <img
            v-if="event.eventImage"
            :src="BASE_AVATAR + `${event.eventImage}`"
            alt="My company"
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-2 py-6 bg-white translation-all duration-1000 px-4 relative">
          <div class="flex gap-2" v-if="event">
            <h1 class="">
              {{ event.eventDate }}
            </h1>
            <!-- <h3>By <span>IQ admin</span></h3> -->
          </div>

          <div class="flex flex-col gap-4 py-2">
            <p class="text-gray-700"><span> </span> {{ event.eventDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="w-full px-[6%] bg-white py-12 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(event, i) in news" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <img
          :src="BASE_AVATAR + event.eventImage"
          alt=""
          class="max-h-[500px] rounded-xl w-full object-cover"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
        <h6 class="text-gray-500">{{ event.category }} | {{ event.eventDate }}</h6>
        <h3 class="text-lg font-bold">
          {{ event.eventTitle }}
        </h3>
        <router-link
          :to="{ name: 'blog-detail', params: { title: event.eventTitle } }"
          class="text-green-600 font-bold"
          >Read More</router-link
        >
      </div>
    </div>
  </div>
</template>
