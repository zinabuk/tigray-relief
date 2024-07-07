<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
import BaseButton from '@/components/base/BaseButton.vue'
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
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

let showEditModal = ref(false)
const editedNew = ref({
  eventTitle: '',
  eventDescription: '',
  category: '',
  eventDate: '',
  eventOrganizer: '',
  eventImage: null
})
const openEditModal = async (event) => {
  showEditModal.value = true
  editedNew.value = event
}

const closeEditModal = () => {
  showEditModal.value = false
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  editedNew.value.eventImage = file
}

const updateNew = async () => {
  try {
    const formData = new FormData()
    formData.append('eventTitle', editedNew.value.eventTitle)
    formData.append('eventDescription', editedNew.value.eventDescription)
    formData.append('category', editedNew.value.category)
    formData.append('eventDate', editedNew.value.eventDate)
    formData.append('eventOrganizer', editedNew.value.eventOrganizer)
    formData.append('eventImage', editedNew.value.eventImage)

    const response = await ApiService.patch('/admin/events/' + editedNew.value.id, formData)
    if (response.success) {
      setTimeout(() => {
        closeEditModal()
      }, 3000)
      fetchNews()
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

// const handleOutsideClick = (event) => {
//   if (event && event.target && !event.target.closest('.modal')) {
//     closeEditModal()
//   }

//   document.addEventListener('click', handleOutsideClick)
//   return () => {
//     document.removeEventListener('click', handleOutsideClick)
//   }
// }

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

    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(event, i) in blogs" :key="i" class="grid grid-cols-1 bg-white gap- ">
        <div class="h-48">
          <img :src="BASE_AVATAR + event.eventImage" alt="" class="h-full w-full object-cover" />
        </div>
        <div class="flex flex-col flex-wrap gap-2 items-start justify-censter">
          <h6 class="text-gray-500">{{ event.category }} | {{ event.eventDate }}</h6>
          <h3 class="text-lg font-bold">
            {{ event.eventTitle }}
          </h3>
          <p>{{ event.eventDescription }}</p>
        </div>
        <div class="w-full flex justify-end gap-6">
          <!-- <router-link to="/about" class="text-green-600 font-bold">Read More</router-link> -->
          <button @click="openEditModal(event)">
            <font-awesome-icon icon="edit" class="text-blue-700"></font-awesome-icon>
          </button>
          <button @click="deleteBlog(event._id)">
            <font-awesome-icon icon="trash" class="text-red-700"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center z-50 justify-center modal bg-black/70"
    >
      <div class="bg-white p-6">
        <!-- <h2 class="text-lg font-bold">Edit News</h2> -->
        <button @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-auto">
          Cancel
        </button>
        <form @submit.prevent="updateNew" class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="block" for="eventTitle">Title</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.eventTitle"
              required
            />
          </div>
          <div class="col-span-2">
            <label class="block" for="eventDescription">Description</label>
            <textarea
              class="border rounded px-2 py-1 w-full h-40"
              type="text"
              v-model="editedNew.eventDescription"
              required
            ></textarea>
          </div>
          <div class="col-span-1">
            <label class="block" for="category">Category</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.category"
              required
            />
          </div>
          <div class="col-sp">
            <label class="b" for="eventDate">Date</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="date"
              v-model="editedNew.eventDate"
              required
            />
          </div>
          <div class="col-span-2">
            <label class="block" for="eventOrganizer">Organizer</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.eventOrganizer"
            />
          </div>
          <div class="col-span-2">
            <label class="block" for="eventImage">Image</label>
            <input class="border rounded px-2 py-1 w-full" type="file" @change="handleFileChange" />
          </div>
          <div class="col-span-2 flex justify-end">
            <BaseButton type="submit" class="w-full px-4 py-2 rounded">Save</BaseButton>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style>
.modal {
  animation: modal 0.3s;
}

@keyframes modal {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
