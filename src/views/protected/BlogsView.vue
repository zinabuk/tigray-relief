<script setup>
import ApiService from '@/services/apiService'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { BASE_AVATAR } from '@/config'
const router = useRouter()
const currentLanguage = ref('en')

const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}

const form = ref({
  id: null,
  eventTitle: { en: '', ti: '', am: '' },
  eventDescription: { en: '', ti: '', am: '' },
  category: { en: '', ti: '', am: '' },
  eventDate: '',
  eventOrganizer: { en: '', ti: '', am: '' },
  eventImage: null
})

const blogs = ref([])

const fetchNews = async () => {
  try {
    const response = await ApiService.get('/admin/events')
    if (response.data) {
      blogs.value = response.data.map((item) => ({
        ...item,
        eventTitle: JSON.parse(item.eventTitle),
        eventDescription: JSON.parse(item.eventDescription),
        category: JSON.parse(item.category),
        eventOrganizer: JSON.parse(item.eventOrganizer)
      }))
    }
  } catch (error) {
    console.error(error)
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
  const sure = window.confirm('Are you sure to delete this team?')
  if (sure) {
    try {
      const response = await ApiService.delete('/admin/events/' + id)

      if (response.success) {
        fetchNews()
      }
    } catch (error) {
      console.log()
    }
  }
}

const showEditModal = ref(false)
const editedNew = ref({
  id: null,
  eventTitle: { en: '', ti: '', am: '' },
  eventDescription: { en: '', ti: '', am: '' },
  category: { en: '', ti: '', am: '' },
  eventDate: '',
  eventOrganizer: { en: '', ti: '', am: '' },
  eventImage: null
})

const openEditModal = (event) => {
  showEditModal.value = true
  editedNew.value = { ...event }
  console.log('Editing event with ID:', editedNew.value.id)
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
    formData.append('eventTitle', JSON.stringify(editedNew.value.eventTitle))
    formData.append('eventDescription', JSON.stringify(editedNew.value.eventDescription))
    formData.append('category', JSON.stringify(editedNew.value.category))
    formData.append('eventDate', editedNew.value.eventDate)
    formData.append('eventOrganizer', JSON.stringify(editedNew.value.eventOrganizer))
    if (editedNew.value.eventImage) {
      formData.append('eventImage', editedNew.value.eventImage)
    }

    // console.log(`FormData contents before sending:`)
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`)
    // })

    const response = await ApiService.patch(`/admin/events/${editedNew.value.id}`, formData)
    // console.log('Server response:', response.data)

    if (response.data.success) {
      closeEditModal()
      fetchNews()
    } else {
      // console.error('Update failed:', response.data.message)
    }
  } catch (error) {
    // console.error('Error updating event:', error)
    if (error.response && error.response.data && error.response.status === 404) {
      // console.error('Data not found error:', error.response.data)
    } else {
      setTimeout(() => {
        router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const expandedIndex = ref(null)

function toggleShow(idx) {
  expandedIndex.value = expandedIndex.value === idx ? null : idx
}
onMounted(() => {
  fetchNews()
})
</script>

<template>
  <section class="col-span-10 flex flex-col bg-slate-50 flex-wrap gap-2 p-4">
    <router-link
      :to="{ name: 'admin-add-blogs' }"
      class="bg-[#53900F] self-end text-white rounded-2xl flex items-center px-2"
    >
      <font-awesome-icon icon="add"></font-awesome-icon>
      Add New | Story
    </router-link>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-12">
      <div
        v-for="(event, i) in blogs"
        :key="i"
        class="w-full flex flex-col justify-between bg-white gap- p-2"
      >
        <div class="">
          <img :src="BASE_AVATAR + event.eventImage" alt="" class="h-48 w-full object-cover" />
          <div class="flex flex-col flex-wrap gap-2 items-start justify-center">
            <h6 class="text-gray-500">
              {{ event.category[currentLanguage] || '' }} | {{ event.eventDate }}
            </h6>
            <h3 class="text- font-bold">{{ event.eventTitle[currentLanguage] || '' }}</h3>
            <p :class="expandedIndex === i ? '' : 'line-clamp-5'">
              {{ event.eventDescription[currentLanguage] || '' }}
            </p>
            <button
              @click.prevent="toggleShow(i)"
              class="text-sm text-black font-bold underline underline-offset-2"
            >
              {{ expandedIndex === i ? 'Show Less' : 'Show More' }}
            </button>
          </div>
        </div>
        <div class="w-full flex gap-6 my-2">
          <button
            @click="openEditModal(event)"
            class="text-blue-500 bg-slate-200 px-2 rounded text-sm"
          >
            <font-awesome-icon icon="edit"></font-awesome-icon>Edit
          </button>
          <button
            @click="deleteBlog(event.id)"
            class="text-red-500 text-sm bg-slate-200 px-2 rounded"
          >
            <font-awesome-icon icon="trash" class="text-sm"></font-awesome-icon>Delete
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 flex items-center z-50 justify-center modal bg-black/70"
    >
      <div class="bg-white p-6">
        <button @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-auto">
          Cancel
        </button>
        <!-- <div class="flex justify-center gap-16 py-2">
          <BaseButton
            @click="toggleLanguage('en')"
            :class="{
              'bg-green-900 text-white': currentLanguage.value === 'en',
              'bg-gray-200': currentLanguage.value !== 'en'
            }"
            >English</BaseButton
          >
          <BaseButton
            @click="toggleLanguage('am')"
            :class="{
              'bg-green-900 text-white': currentLanguage.value === 'am',
              'bg-gray-200': currentLanguage.value !== 'am'
            }"
            >Amharic</BaseButton
          >
          <BaseButton
            @click="toggleLanguage('ti')"
            :class="{
              'bg-green-900 text-white': currentLanguage.value === 'ti',
              'bg-gray-200': currentLanguage.value !== 'ti'
            }"
            >Tigrigna</BaseButton
          >
        </div> -->
        <form @submit.prevent="updateNew" class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="block" for="eventTitle">Title</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.eventTitle[currentLanguage]"
              required
            />
          </div>
          <div class="col-span-2">
            <label class="block" for="eventDescription">Description</label>
            <textarea
              class="border rounded px-2 py-1 w-full h-40"
              type="text"
              v-model="editedNew.eventDescription[currentLanguage]"
              required
            ></textarea>
          </div>
          <div class="col-span-1">
            <label class="block" for="category">Category</label>
            <input
              class="border rounded px-2 py-1 w-full"
              type="text"
              v-model="editedNew.category[currentLanguage]"
              required
            />
          </div>
          <div class="col-span-1">
            <label class="block" for="eventDate">Date</label>
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
              v-model="editedNew.eventOrganizer[currentLanguage]"
            />
          </div>
          <div class="col-span-2">
            <label class="block" for="eventImage">Image</label>
            <!-- <input class="border rounded px-2 py-1 w-full" type="file" @change="handleFileChange" /> -->
            <BaseFileInput
              @change="handleFileChange"
              label="Add Picture"
              type="file"
              inputClass="p-2 border border-gray-300 rounded"
              placeholder="Image"
              accept="image/*"
            ></BaseFileInput>
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
