<script setup>
// import SpinningCard from '@/components/open/SpinningCard.vue'
import slugify from '@/utils/slugify'
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import dayjs from 'dayjs'
import ApiService from '@/services/apiService'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

import { BASE_AVATAR } from '@/config'
defineProps({
  title: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const blogDetail = ref([])

async function getBlog() {
  try {
    const response = await ApiService.get('/admin/event/' + route.params.title)
    if (response.success) {
      // alert("OK")
      blogDetail.value = response.data.map((item) => ({
        ...item,
        category: JSON.parse(item.category),
        eventTitle: JSON.parse(item.eventTitle)
      }))
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
      news.value = response.data.splice(0, 4).map((item) => ({
        ...item,
        category: JSON.parse(item.category),
        eventTitle: JSON.parse(item.eventTitle),
        eventDescription: JSON.parse(item.eventDescription)
      }))
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

function shareOnFacebook() {
  const url = 'https://example.com'
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  window.open(facebookUrl, '_blank')
}

function shareOnLinkedIn() {
  const url = 'https://example.com'
  const title = 'Check out this awesome article!'
  const description = 'This is a description of the article.'
  const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
  window.open(linkedInUrl, '_blank')
}

function shareOnTwitter() {
  const url = 'https://example.com'
  const title = 'Check out this awesome article!'
  const hashtags = 'REST'
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags)}`
  window.open(twitterUrl, '_blank')
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
  <section class="w-full bg-[#288fb2]/10">
    <div class="flex justify-center py-12 px-[2%]" v-if="blogDetail && blogDetail.length > 0">
      <div
        class="relative w-full md:w-[80%] flex flex-col items-center justify-center group"
        v-for="(blog, i) in blogDetail"
        :key="i"
      >
        <div class="w-full h-[600px] overflow-hiddden">
          <img
            v-if="blog.eventImage"
            :src="BASE_AVATAR + `${blog.eventImage}`"
            alt="My company"
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-1 py-2 bg-white translation-all duration-1000 px-4 relative">
          <div class="flex flex-col gap-1 py-2">
            <h2 class="meyla-subtitle whitespace-normal break-all text-[#288FB2]"></h2>
            <div class="flex gap-2 text-gray-400">
              <h1 class="">
                {{ blog.eventDate }}
              </h1>
              <p>{{ $t('By') }} {{ blog.eventOrganizer }}</p>
            </div>
            <p class="text-gray-700 selection:bg-[#288FB2] selection:text-white">
              <span> </span> {{ blog.eventDescription }}
            </p>

            <div>
              <h1 class="text-white font-bold">{{ $t('SHARE ON SOCIAL MEDIA') }}</h1>
              <div class="flex">
                <a class="text-white" href="#" @click="shareOnFacebook()">
                  <font-awesome-icon :icon="['fab', 'facebook']" class="text-whitex p-2 rounded">
                  </font-awesome-icon> </a
                ><a class="text-white" href="#" @click="shareOnTwitter()">
                  <font-awesome-icon :icon="['fab', 'twitter']" class="text-whitex p-2 rounded">
                  </font-awesome-icon> </a
                ><a class="text-white" href="#" @click="shareOnLinkedIn()">
                  <font-awesome-icon :icon="['fab', 'linkedin']" class="text-whitex p-2 rounded">
                  </font-awesome-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section
      class="w-full px-[1%] md:px-[10%] py-4 md:py-12 news bg-white flex flex-col items-center justify-center gap-6"
    >
      <div class="flex flex-col justify-center items-center gap-4 bg-[#288fb2]/10 p-6">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text text-xl md:text-4xl font-semibold">Latest News</h1>
          <hr class="w-3/4 bg-[#288FB2] h-[2px]" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            v-for="(event, index) in news"
            :key="index"
            data-aos="fade-upx"
            class="relative group bg-white/100x border rounded bg-white shadow-xl"
          >
            <div>
              <img :src="BASE_AVATAR + event.eventImage" alt="" />
            </div>
            <div class="flex flex-col gap-2 p-2">
              <h1 class="font-semibold text-lg">{{ event.eventTitle[currentLanguage] }}</h1>
              <p class="line-clamp-5">{{ event.eventDescription[currentLanguage] }}</p>
            </div>
          </div>
        </div>
        <router-link
          :to="{ name: 'blogs' }"
          class="text text-lgx hover:text-[#53900F] font-semibold"
          >VIEW ALL NEWS</router-link
        >
      </div>
    </section>
  </section>
</template>
