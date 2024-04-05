<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

import { useRouter } from 'vue-router'

const router = useRouter()

import { ref, onMounted } from 'vue'

const blogs = ref([])

const fetchNews = async () => {
  try {
    const response = await ApiService.get('/admin/events')
    if (response) {
      blogs.value = response.data
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
const deleteBlog = async (id) => {
  try {
    const response = await ApiService.delete('/admin/events/' + id)
    if (response.success) {
      alert('OK')
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
  fetchNews()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4">
    <!-- Services -->

    <router-link
      :to="{ name: 'admin-add-blogs' }"
      class="text-[#539000] self-end border flex items-center px-2 py-1 bg-white border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add New | Event</router-link
    >

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(event, i) in blogs"
        :key="i"
        class="grid grid-cols-1 bg-white md:grid-cols-2 gap-4"
      >
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
          <div class="w-full flex justify-between">
            <router-link to="/about" class="text-green-600 font-bold">Read More</router-link>
            <button @click="editBlog(event)">
              <font-awesome-icon icon="edit" class="text-blue-700"></font-awesome-icon>
            </button>
            <button @click="deleteBlog(event._id)">
              <font-awesome-icon icon="trash" class="text-red-700"></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
