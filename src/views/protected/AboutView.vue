<script setup>
import { ref, onMounted } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
import swal from 'sweetalert'

const aboutUsData = ref({
  establishment: { en: '', ti: '', am: '' },
  mission: { en: '', ti: '', am: '' },
  vision: { en: '', ti: '', am: '' },
  coreValues: { en: '', ti: '', am: '' },
  expertise: { en: '', ti: '', am: '' },
  images: null
})
const currentLanguage = ref('en')
const errorMessage = ref('')
const successMessage = ref('')
const editMode = ref(false)
const editId = ref(null)
const showModal = ref(false)

const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}

const saveAboutUs = async () => {
  const formData = new FormData()
  formData.append('establishment', JSON.stringify(aboutUsData.value.establishment))
  formData.append('mission', JSON.stringify(aboutUsData.value.mission))
  formData.append('vision', JSON.stringify(aboutUsData.value.vision))
  formData.append('coreValues', JSON.stringify(aboutUsData.value.coreValues))
  formData.append('expertise', JSON.stringify(aboutUsData.value.expertise))
  if (aboutUsData.value.images) {
    formData.append('images', aboutUsData.value.images)
  }

  try {
    const response = await ApiService.post('admin/aboutus', formData)
    if (response.success) {
      successMessage.value = response.message
      swal({
        title: response.message,
        icon: 'success'
      })
      fetchAboutUs()
      resetForm()
      closeModal()
      aboutUsData.value = {}
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = error.response.data.message
    } else {
      // Handle other errors
    }
  }
}

const captureImage = (event) => {
  aboutUsData.value.images = event.target.files[0]
}

const fetchAboutUs = async () => {
  try {
    const response = await ApiService.get('admin/aboutus')
    aboutUsData.value = response.data.map((item) => ({
        ...item,
        establishment: JSON.parse(item.establishment),
        mission: JSON.parse(item.mission),
        vision: JSON.parse(item.mission),
        coreValues: JSON.parse(item.mission),
        expertise: JSON.parse(item.mission),



       

    }))
  } catch (error) {
    errorMessage.value = 'Failed to fetch about us content'
  }
}

const showEditModal = ref(false)
const editItem = (item) => {
  aboutUsData.value = item
  showEditModal.value = true
}

const updateAboutUs = async () => {
  const formData = new FormData()
  formData.append('establishment', JSON.stringify(aboutUsData.value.establishment))
  formData.append('mission', JSON.stringify(aboutUsData.value.mission))
  formData.append('vision', JSON.stringify(aboutUsData.value.vision))
  formData.append('coreValues', JSON.stringify(aboutUsData.value.coreValues))
  formData.append('expertise', JSON.stringify(aboutUsData.value.expertise))
  if (aboutUsData.value.images) {
    formData.append('images', aboutUsData.value.images)
  }

  const response = await ApiService.patch('admin/aboutus/' + aboutUsData.value.id, formData)
  if (response.success) {
    swal({
      icon: 'success',
      title: 'Updating about us content',
      text: 'Content successfully updated.'
    })
    fetchAboutUs()
    showEditModal.value = false
    aboutUsData.value = {}
  }
}

const deleteItem = async (id) => {
  const sure = window.confirm('Are you sure? This operation cannot be undone.')
  if (sure) {
    try {
      const response = await ApiService.delete('admin/aboutus/' + id)
      if (response.success) {
        successMessage.value = response.message
        fetchAboutUs()
      }
    } catch (error) {
      errorMessage.value = 'Failed to delete about us content'
    }
  }
}

const resetForm = () => {
  aboutUsData.value = {
    establishment: '',
    mission: '',
    vision: '',
    coreValues: '',
    expertise: '',
    images: null
  }
  editMode.value = false
  editId.value = null
}

const closeModal = () => {
  showModal.value = false
  showEditModal.value = false
  resetForm()
}

onMounted(() => {
  fetchAboutUs()
})
</script>
<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white">
    <div class="flex justify-between w-full">
      <h2 class="text-xl font-bold">About Us</h2>
      <BaseButton @click="showModal = true">
        <font-awesome-icon icon="plus" class="text-yellow-500"></font-awesome-icon> Add About Us
      </BaseButton>
    </div>
    <div v-if="aboutUsData" class="col-span-12 w-full">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div class="w-full mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="aboutUs in aboutUsData" :key="aboutUs.id" class="w-full md:w-auto">
            <div class="shadow-xl flex flex-col gap-2 p-4 max-w-xs bg-white">
              <img
                v-if="aboutUs.images"
                :src="`${BASE_AVATAR}${aboutUs.images}`"
                alt="About Us Image"
                class="w-full h-36 object-cover mb-4"
              />
              <div>
                <h3 class="font-bold">{{ aboutUs.establishment[currentLanguage] }}</h3>
                <p class="break-words">{{ aboutUs.mission[currentLanguage] }}</p>
                <p class="break-words">{{ aboutUs.vision[currentLanguage] }}</p>
                <p class="break-words">{{ aboutUs.coreValues[currentLanguage] }}</p>
                <p class="break-words">{{ aboutUs.expertise[currentLanguage] }}</p>
              </div>
              <div class="flex justify-end space-x-2">
                <button @click="editItem(aboutUs)" class="text-blue-500">edit</button>
                <button @click="deleteItem(aboutUs.id)" class="text-red-500">delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed modal inset-0 bg-black/60 bg-opacity-50 z-50 flex justify-center items-center">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">Add About Us</h3>
            <BaseButton @click="closeModal" type="button" class="px-4 py-2 rounded">Cancel</BaseButton>
          </div>
          <div class="flex justify-center gap-16 py-2">
            <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }"> English </BaseButton>
            <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }"> Amharic </BaseButton>
            <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }"> Tigrigna </BaseButton>
          </div>
          <form @submit.prevent="saveAboutUs" class="flex flex-col gap-4">
            <div class="w-full zmd:w-1/2 py-4 flex px-2">
              <BaseInput
                v-model="aboutUsData.establishment[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Establishment"
              ></BaseInput>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.mission[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Mission"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.vision[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Vision"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.coreValues[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Core Values"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.expertise[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Expertise"
              ></BaseTextarea>
            </div>
            <div class="w-full px-2">
              <BaseInput
                @change="captureImage"
                type="file"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Images"
              ></BaseInput>
            </div>
            <div class="flex justify-end gap-2">
              <BaseButton type="submit" class="px-2 py-2 rounded">
                {{ editMode ? 'Save changes' : 'Save About Us' }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed modal inset-0 bg-black/60 bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">Edit About Us</h3>
            <BaseButton @click="closeModal" type="button" class="px-4 py-2 rounded">Cancel</BaseButton>
          </div>
          <div class="flex justify-center gap-16 py-2">
            <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }"> English </BaseButton>
            <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }"> Amharic </BaseButton>
            <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }"> Tigrigna </BaseButton>
          </div>
          <form @submit.prevent="updateAboutUs" class="flex flex-col gap-4">
            <div class="w-full zmd:w-1/2 py-4 flex px-2">
              <BaseInput
                v-model="aboutUsData.establishment[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Establishment"
              ></BaseInput>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.mission[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Mission"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.vision[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Vision"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.coreValues[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Core Values"
              ></BaseTextarea>
            </div>
            <div class="w-full zmd:w-1/2 py-4 px-2">
              <BaseTextarea
                v-model="aboutUsData.expertise[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded h-30"
                placeholder="Expertise"
              ></BaseTextarea>
            </div>
            <div class="w-full px-2">
              <BaseInput
                @change="captureImage"
                type="file"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Images"
              ></BaseInput>
            </div>
            <div class="flex justify-end gap-2">
              <BaseButton type="submit" class="px-2 py-2 rounded">
                Save changes
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
/* Your scoped styles here */
</style>
