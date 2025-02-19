<script setup>
import { ref, onMounted } from 'vue'
// import DataTable from '@/components/base/DataTable.vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import { BASE_AVATAR } from '@/config'

import dayjs from 'dayjs'

const currentLanguage = ref('en')

const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}

// const tableHeaders = [
//   { label: 'Title', field: 'businessName' },
//   { label: 'Email Address', field: 'email' },
//   { label: 'website', field: 'website' }
// ]

const partnerships = ref([])
// const actions = [
//   {
//     label: 'edit',
//     action: openEditModal,
//     icon: 'edit',
//     style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
//   },
//   {
//     label: 'delete',
//     action: deletePartner,
//     icon: 'trash',
//     style: 'hover:cursor-pointer text-red-500 py-1 px-2'
//   }
//   // {
//   //   label: 'verify',
//   //   action: deletePartner,
//   //   icon: 'eye',
//   //   style: 'hover:cursor-pointer text-green-500 py-1 px-2'
//   // }
// ]

async function fetchPartners() {
  const response = await ApiService.get('/users/partnerships')

  if (response.success) {
    // alert(response.data.length)
    partnerships.value = response.data.map((item) => ({
      ...item,
      businessName: JSON.parse(item.businessName)
    }))
  }
}

const isEditing = ref(false)
const editForm = ref({
  businessName: { en: '', ti: '', am: '' },
  email: '',
  website: '',
  logo: ''
})
let formatDate = ref('')

function openEditModal(partner) {
  isEditing.value = true
  editForm.value = { ...partner }
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

const updatePartner = async () => {
  const formData = new FormData()
  formData.append('businessName', JSON.stringify(editForm.value.businessName))
  formData.append('email', editForm.value.email)
  formData.append('website', editForm.value.website)
  if (image.value) {
    formData.append('logo', image.value)
  }

  try {
    const response = await ApiService.patch('/users/partnerships/' + editForm.value.id, formData)
    if (response.success) {
      fetchPartners()
      setTimeout(() => {
        closeEditModal()
      }, 1000)
    }
  } catch (error) {
    console.error('Error updating donation:', error)
  }
}

async function deletePartner(partner) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(`/users/partnerships/${partner.id}`)
    if (response.success) {
      fetchPartners()
    }
  }
}

const image = ref('')
const handleFileChange = (file) => {
  image.value = file
}

function closeEditModal() {
  isEditing.value = false
}

const isAdd = ref(false)
const toggleAdd = (ev) => {
  // alert('Zed')
  ev.preventDefault()
  isAdd.value = true
}

const form = ref({
  businessName: { en: '', ti: '', am: '' },
  email: '',
  website: '',
  logo: ''
})

const submitPartner = async () => {
  const formData = new FormData()
  formData.append('businessName', JSON.stringify(form.value.businessName))
  formData.append('email', form.value.email)
  formData.append('website', form.value.website)
  if (image.value) {
    formData.append('logo', image.value)
  }

  const res = await ApiService.post('/users/partnerships', formData)

  // console.log(res)

  if (res.success) {
    fetchPartners()
    form.value = {}
    setTimeout(() => {
      isAdd.value = false
    }, 1000)
  }
}

let message = ref('')

onMounted(fetchPartners)
</script>

<template>
  <section class="col-span-10 flex flex-col flex-wrap gap-2 p-4 bg-slate-50">
    <button class="bg-white text-[#539000] self-end px-2 py-1" @click="toggleAdd($event)">
      Add Partner <span v-if="isAdd">ok</span>
    </button>
    <!-- <DataTable
      :tableHeaders="tableHeaders"
      :tableValues="partnerships"
      :actions="actions"
      :currentLanguage="currentLanguage"
    ></DataTable> -->
    <section class="w-full grid grid-cols-4 gap-6">
      <div
        v-for="(partner, index) in partnerships"
        :key="index"
        class="bg-white p-2 flex flex-col items-center justify-between"
      >
        <img
          :src="BASE_AVATAR + partner.logo"
          alt=""
          class="h-36 w-full object-contain object-center"
        />
        <div class="flex flex-col zjustify-between gap-1">
          <div class="flex gap-4 flex-wrap">
            <h1 class="f text-sm font-semibold">Company:</h1>
            <h1 class="text-sm break-words">{{ partner.businessName[currentLanguage] }}</h1>
          </div>
          <div class="flex gap-4 flex-wrap">
            <h1 class="text-sm font-semibold">Website:</h1>
            <p class="text-sm break-words">{{ partner.website }}</p>
          </div>

          <div class="flex gap-4">
            <button @click="openEditModal(partner)" class="text-blue-500 text-sm">
              <font-awesome-icon icon="edit"></font-awesome-icon>
              Edit
            </button>
            <button @click="deletePartner(partner)" class="text-red-500 text-sm">
              <font-awesome-icon icon="trash"></font-awesome-icon>
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </section>

  <div
    class="w-full modal fixed inset-0 flex z-50 justify-center items-center bg-black/80 overflow-auto md:py-12"
    v-if="isEditing"
  >
    <div class="w-1/2 bg-white rounded px-8">
      <div class="flex justify-between px-8 py-4">
        <p>Edit Partner</p>
        <button @click="closeEditModal" class="self-end text-xl bg-gray-500 text-white rounded-sm">
          Cancel
        </button>
      </div>

      <form @submit.prevent="updatePartner" class="w-full flex flex-col gap-2 px-1">
        <BaseInput
          v-model="editForm.businessName[currentLanguage]"
          type="text"
          label="Business Name"
          inputClass="px-4 py-3"
        ></BaseInput>
        <BaseInput
          v-model="editForm.email"
          type="email"
          label="Email"
          required
          inputClass="px-4 py-3"
          placeholder="Job Title"
        ></BaseInput>
        <BaseInput
          v-model="editForm.website"
          inputClass="px-8 py-3"
          placeholder="Enter your website's link"
        ></BaseInput>

        <div class="flex justify-between">
          <BaseFileInput
            @image-update="handleFileChange($event)"
            type="file"
            label="Add Logo"
          ></BaseFileInput>
          <BaseButton type="submit">Save Changes</BaseButton>
        </div>
      </form>
    </div>
  </div>

  <div
    v-if="isAdd"
    class="w-full z-50 bg-black/80 fixed inset-0 flex flex-col items-center justify-center p-6 gap-2 shadow rounded-lg modal"
  >
    <div class="w-full md:w-1/2 bg-white rounded p-8">
      <div class="flex justify-between px-8 py-4">
        <h1 class="text-center text-2xl font-semibold">Partnership Form</h1>
        <button type="button" class="bg-gray-600 text-white px-4 py-2" @click="isAdd = false">
          Cancel
        </button>
      </div>
      <p class="justify-self-end text-green-500 bg-white" v-if="success">{{ success }}</p>
      <!-- <div class="flex justify-center gap-40 py-2">
        <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }">English</BaseButton>
        <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }">Amharic</BaseButton>
        <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }">Tigrigna</BaseButton>
      </div> -->
      <form @submit.prevent="submitPartner" class="w-full flex flex-col gap-4 px-4">
        <BaseInput
          v-model="form.businessName[currentLanguage]"
          type="text"
          required
          placeholder="Your business name"
        ></BaseInput>
        <BaseInput
          v-model="form.email"
          required
          placeholder="Enter Your Email"
          autocomplete="true"
        ></BaseInput>

        <BaseInput v-model="form.website" placeholder="Enter your website's link"></BaseInput>

        <div class="flex justify-between">
          <!-- <BaseFileInput
            @image-update="handleFileChange($event)"
            type="file"
            label="Add Logo"
          ></BaseFileInput> -->
          <BaseFileInput
            @image-update="handleFileChange($event)"
            type="file"
            label="Add Logo"
          ></BaseFileInput>
          <p v-if="message" class="text-red-700">{{ message }}</p>

          <BaseButton type="submit" class="self-start">Submit</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
