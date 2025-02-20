<script setup>
import ApiService from '@/services/apiService'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
// import BaseTextarea from '@/components/base/BaseTextarea.vue'

import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted } from 'vue'

const teams = ref([])
const user = ref({})
const isAdding = ref(false)

const fetchUsers = async () => {
  try {
    const response = await ApiService.get('/admin/staff/all')
    if (response.success) {
      teams.value = response.data
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const deleteTeam = async (id) => {
  const sure = window.confirm('Are you sure to delete this team?')
  if (sure) {
    const res = await ApiService.delete('/admin/our-teams/' + id)
    if (res.success) {
    
      fetchUsers()
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
    formData.append('eventTitle', editedNew.value.eventTitle)
    formData.append('eventDescription', editedNew.value.eventDescription)
    formData.append('category', editedNew.value.category)
    formData.append('eventDate', editedNew.value.eventDate)
    formData.append('eventOrganizer', editedNew.value.eventOrganizer)
    formData.append('eventImage', editedNew.value.eventImage)

    const response = await ApiService.patch('/admin/events/' + id, formData)
    if (response.success) {
      // alert('EDITED')
      setTimeout(() => {
        closeEditModal()
      }, 3000)
      fetchUsers()
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const submitUser = async () => {
  user.value.role = 'staff'
  const response = await ApiService.post('/admin/register', user.value)
  if (response.success) {
    alert('OK')
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <section class="col-span-10 px-[1%] py-12 flex flex-col items-center gap-4">
    <button
      @click="isAdding = true"
      class="text-[#539000] self-end border flex items-center px-2     border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add User
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div v-for="(team, i) in teams" :key="i" class="p-4 flex flex-col gap-2 bg-white">
        <img
          v-if="team.avatar"
          :src="BASE_AVATAR + team.image"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full"
        />
        <p v-else class="w-20 h-20 rounded-full text-6xl">{{ team.name[0] }}</p>
        <h1 class="text-2xl font-bold">{{ team.name }}</h1>
        <div class="relative">
          <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-green-600"></span>
          <hr class="h-[2px] absolute inset-0 bg-gray-200" />
        </div>
        <p class="line-clamp-5">
          {{ team.email }}
        </p>
        <p>{{ team.phoneNumber }}</p>
        <!-- <router-link class="text-[#539000]" to="/">Read More</router-link> -->
        <div class="flex gap-4">
          <button @click="deleteTeam(team._id)">
            <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
          </button>
          <button><font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon></button>
        </div>
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

    <div
      class="bg-white/80 inset-0 fixed z-40 w-full flex items-center justify-center"
      v-if="isAdding"
    >
      <div class="w-1/2">
        <form
          @submit.prevent="submitUser"
          class="w-full bg-white rounded-lg p-6 shadow flex flex-col gap-2"
          enctype="multipart/form-data"
        >
          <h1 class="flex justify-center font-bold font-serif">Add User</h1>

          <div class="flex justify-center">
            <BaseInput type="text" id="fullName" label="Full Name" v-model="user.name" />
          </div>

          <div class="flex justify-center">
            <BaseInput type="text" id="email" label="Email" v-model="user.email" />
          </div>
          <div class="flex justify-center">
            <BaseInput
              type="text"
              id="phoneNumber"
              label="Phone Number"
              v-model="user.phoneNumber"
            />
          </div>
          <!-- <div class="flex justify-center">
            <BaseInput type="text" id="role" label="Role" v-model="user.role" />
          </div> -->
          <div class="flex justify-center">
            <BaseInput type="password" id="password" label="Password" v-model="user.password" />
          </div>
          <!-- <div>
            <BaseTextarea 
              v-model="user.description"
              placeholder="Biography"
              label="Biography"
            ></BaseTextarea>
          </div> -->
          <!-- Event Image -->
          <div class="flex justify-between">
            <div class="flex">
              <input
                type="file"
                id="eventImage"
                @change="handleFileChange"
                class="hidden"
                ref="eventImageInput"
              />
              <label
                for="eventImage"
                class="cursor-pointer bg-[#539000]/70 hover:bg-white text-white hover:text-[#539000] font-medium py-2 px-4 rounded"
              >
                image
              </label>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <BaseButton label="">Submit</BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
