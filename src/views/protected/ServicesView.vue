<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted } from 'vue'

const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data
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

let showEditModal = ref(false)
const editedNew = ref({
  eventTitle: '',
  eventDescription: '',
  category: '',
  eventDate: '',
  eventOrganizer: '',
  eventImage: null
})
// const openEditModal = async (event) => {
//   showEditModal.value = true
//   editedNew.value = event
// }

const closeEditModal = () => {
  showEditModal.value = false
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  editedNew.value.eventImage = file
}

const updateNew = async (id) => {
  try {
    const formData = new FormData()
    alert(editedNew.value.eventTitle)
    formData.append('eventTitle', editedNew.value.eventTitle)
    formData.append('eventDescription', editedNew.value.eventDescription)
    formData.append('category', editedNew.value.category)
    formData.append('eventDate', editedNew.value.eventDate)
    formData.append('eventOrganizer', editedNew.value.eventOrganizer)
    formData.append('eventImage', editedNew.value.eventImage)

    const response = await ApiService.patch('/admin/events/' + id, formData)
    if (response.success) {
      alert('EDITED')
      setTimeout(() => {
        closeEditModal()
      }, 3000)
      fetchServices()
    }
  } catch (error) {
    alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        router.push({ name: 'NetworkError' })
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
  fetchServices()
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
      Add Service</router-link
    >

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

        <router-link class="text-[#539000]" to="/">Read More</router-link>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed inset-0 overflow-auto flex items-center z-40 justify-center modal bg-black bg-opacity-50"
    >
      <div class="bg-white p-4">
        <h2 class="text-lg font-bold mb-4">Edit News</h2>
        <form @submit.prevent="updateNew" class="grid grid-cols-2 gap-4">
          <div class="col-span-2 mb-4">
            <label class="block mb-2" for="eventTitle">Title</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.eventTitle"
              required
            />
          </div>
          <div class="col-span-2 mb-4">
            <label class="block mb-2" for="eventDescription">Description</label>
            <textarea
              class="border rounded px-2 py-1 w-full h-40"
              type="text"
              v-model="editedNew.eventDescription"
              required
            ></textarea>
          </div>
          <div class="col-span-1 mb-4">
            <label class="block mb-2" for="category">Category</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.category"
              required
            />
          </div>
          <div class="col-span-1 mb-4">
            <label class="block mb-2" for="eventDate">Date</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="date"
              v-model="editedNew.eventDate"
              required
            />
          </div>
          <div class="col-span-2 mb-4">
            <label class="block mb-2" for="eventOrganizer">Organizer</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.eventOrganizer"
            />
          </div>
          <div class="col-span-2 mb-4">
            <label class="block mb-2" for="eventImage">Image</label>
            <input class="border rounded px-2 py-1 w-full" type="file" @change="handleFileChange" />
          </div>
          <div class="col-span-2 flex justify-end">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
