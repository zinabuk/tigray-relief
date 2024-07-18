<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'

import { ref, onMounted } from 'vue'

// let language = ref(localStorage.getItem('lang') || '')
const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('users/aboutus')
    if (response) {
      services.value = response.data.map((item) => ({
        ...item,
        establishment: JSON.parse(item.establishment),
        mission: JSON.parse(item.mission),
        vision: JSON.parse(item.vision),
        coreValues: JSON.parse(item.coreValues),
        expertise: JSON.parse(item.expertise)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}

let showAddModal = ref(false)
const currentLanguage = ref('en')
const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}
const form = ref({
  establishment: { en: '', ti: '', am: '' },
  mission: { en: '', ti: '', am: '' },
  vision: { en: '', ti: '', am: '' },
  coreValues: { en: '', ti: '', am: '' },
  expertise: { en: '', ti: '', am: '' },
  images: null
})

let logo = ref('')
const handleFileChange = (file) => {
  form.value.images = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editService = (aboutus) => {
  form.value = {
    id: aboutus.id,
    establishment: { ...aboutus.establishment },
    mission: { ...aboutus.mission },
    vision: { ...aboutus.vision },
    coreValues: { ...aboutus.coreValues },
    expertise: { ...aboutus.expertise },
    images: aboutus.images
  }
  edit.value = true
  showAddModal.value = true
}

const saveService = async () => {
  const formData = new FormData()
  formData.append('establishment', JSON.stringify(form.value.establishment))
  formData.append('mission', JSON.stringify(form.value.mission))
  formData.append('vision', JSON.stringify(form.value.vision))
  formData.append('coreValues', JSON.stringify(form.value.coreValues))
  formData.append('expertise', JSON.stringify(form.value.expertise))
  if (form.value.images) {
    formData.append('images', form.value.images)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('users/aboutus/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchServices()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Service'
      }
    } else {
      console.log(formData)
      const res = await ApiService.post('users/aboutus', formData)
      if (res.success) {
        successMessage.value = res.message
        fetchServices()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Service'
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to save Service'
  }
}

const deleteService = async (id) => {
  const sure = window.confirm('Are you sure to delete this team?')
  if (sure) {
    try {
      const response = await ApiService.delete('/users/aboutus/' + id)

      if (response.success) {
        fetchServices()
      } else {
        errorMessage.value = 'Failed to save Partner'
      }
    } catch (error) {
      errorMessage.value = 'Failed to save Partner'
    }
  }
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    establishment: { en: '', ti: '', am: '' },
    mission: { en: '', ti: '', am: '' },
    vision: { en: '', ti: '', am: '' },
    coreValues: { en: '', ti: '', am: '' },
    expertise: { en: '', ti: '', am: '' },
    images: null
  }
  edit.value = false
  logo.value = ''
}

onMounted(() => {
  fetchServices()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- Services -->
    <button
      @click="showAddModal = true"
      class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add
    </button>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 place-content-center">
      <div
        v-for="(service, i) in services"
        :key="i"
        class="p-4 flex flex-col gap-2 zbg-white justify-between shadow-xl bg-[#53900F]/10"
      >
        <img
          v-if="service.images"
          src="http://localhost:7000/api/v1/images/receipt%20.jpeg-1720696742691-738076013.jpeg"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full mx-auto"
        />
<<<<<<< HEAD
        <div class=" hover:bg-[#53900F] hover:text-white rounded-md px-2">
        <h1 class="text-2xl font-bold">Our Establishment</h1>
        <h1 class="text-xl ">{{ service.establishment[currentLanguage] }}</h1>
      </div>

       <div class=" hover:bg-[#53900F] hover:text-white rounded-md px-2">
        <h1 class="text-2xl font-bold">Our Mission</h1>
        <p class="line-clamp-5">
          {{ service.mission[currentLanguage] }}
        </p>
        </div>
         <div class=" hover:bg-[#53900F] hover:text-white rounded-md px-2">
        <h1 class="text-2xl font-bold">Our Vision</h1>
        <p class="text-xl ">{{ service.vision[currentLanguage] }}</p>
        </div>

         <div class=" hover:bg-[#53900F] hover:text-white rounded-md px-2">
        <h1 class="text-2xl font-bold">Our Core Values</h1>
        <p class="line-clamp-5">
          {{ service.coreValues[currentLanguage] }}
        </p>
        </div>

         <div class=" hover:bg-[#53900F] hover:text-white rounded-md px-2">
        <h1 class="text-2xl font-bold">Our Strategy</h1>
        <p class="text-xl ">{{ service.expertise[currentLanguage] }}</p>
          </div>
=======

        <!-- <h1 class="text-xl ">{{ service.establishment[currentLanguage] }}</h1> -->
        <p class="line-clamp-5">
          {{ service.mission[currentLanguage] }}
        </p>
        <p class="text-xl">{{ service.vision[currentLanguage] }}</p>
        <p class="line-clamp-5">
          {{ service.coreValues[currentLanguage] }}
        </p>
        <p class="text-xl">{{ service.expertise[currentLanguage] }}</p>
>>>>>>> 0b10c95c2c84e16668f2eb853e735b406cf54791
        <div class="flex gap-2 justify-end">
          <button @click="editService(service)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deleteService(service.id)">
            <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showAddModal"
      class="fixed inset-0 overflow-auto flex items-center z-50 justify-center modal bg-black/50 bg-opacity-50 modal"
    >
      <div class="bg-white shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ edit ? 'Edit Service' : 'Add Service' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <div class="bg-white flex flex-col gap-2 w-full pt-2">
            <div class="flex w-full justify-between">
              <button
                @click="toggleLanguage('en')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'en',
                  'bg-gray-200': currentLanguage !== 'en'
                }"
                class="px-4 py-1"
              >
                English
              </button>
              <button
                @click="toggleLanguage('ti')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'ti',
                  'bg-gray-200': currentLanguage !== 'ti'
                }"
                class="px-4 py-1"
              >
                ትግርኛ
              </button>
              <button
                @click="toggleLanguage('am')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'am',
                  'bg-gray-200': currentLanguage !== 'am'
                }"
                class="px-4 py-1"
              >
                አማርኛ
              </button>
            </div>
            <form @submit.prevent="saveService" class="flex flex-col gap-4 overflow-auto">
              <div class="flex flex-col gap-2">
                <BaseInput
                  v-model="form.establishment[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t(' establishment:')"
                ></BaseInput>
                <BaseInput
                  v-model="form.mission[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('mission')"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.vision[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="vision"
                ></BaseTextarea>
                <BaseTextarea
                  v-model="form.coreValues[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="coreValues"
                ></BaseTextarea>
                <BaseTextarea
                  v-model="form.expertise[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="expertise"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseFileInput
                  @image-update="handleFileChange($event)"
                  label="Add Picture"
                  type="file"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Image"
                  accept="image/*"
                ></BaseFileInput>
                <span>{{ logo }}</span>
                <BaseButton type="submit" class="w-full px-2 py-2 rounded">
                  Save Service
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
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

<!-- <template>
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
  images: null,
});
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
    const response = await ApiService.get('admin/aboutus');
    aboutUsData.value = response.data.map(item => ({
      ...item,
      establishment: JSON.parse(item.establishment),
      mission: JSON.parse(item.mission),
      vision: JSON.parse(item.vision),
      coreValues: JSON.parse(item.coreValues),
      expertise: JSON.parse(item.expertise),
    }));
  } catch (error) {
    errorMessage.value = 'Failed to fetch about us content';
  }
};


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

<style scoped>
/* Your scoped styles here */
</style> -->
