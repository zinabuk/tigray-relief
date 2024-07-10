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
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription)
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
  id: null,
  serviceTitle: { en: '', ti: '', am: '' },
  serviceDescription: { en: '', ti: '', am: '' },
  serviceImage: ''
})

let logo = ref('')
const handleFileChange = (file) => {
  form.value.serviceImage = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editService = (service) => {
  form.value = {
    id: service.id,
    serviceTitle: { ...service.serviceTitle },
    serviceDescription: { ...service.serviceDescription },
    serviceImage: service.serviceImage
  }
  edit.value = true
  showAddModal.value = true
}

const saveService = async () => {
  const formData = new FormData()
  formData.append('serviceTitle', JSON.stringify(form.value.serviceTitle))
  formData.append('serviceDescription', JSON.stringify(form.value.serviceDescription))
  if (form.value.serviceImage) {
    formData.append('serviceImage', form.value.serviceImage)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/admin/services/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchServices()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Service'
      }
    } else {
      const res = await ApiService.post('/admin/services', formData)
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
  if (sure) {e
  try {
    const response = await ApiService.delete('/admin/services/' + id)

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
    id: null,
    serviceTitle: { en: '', ti: '', am: '' },
    serviceDescription: { en: '', ti: '', am: '' },
    serviceImage: ''
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
      Add Service
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(service, i) in services"
        :key="i"
        class="p-4 flex flex-col gap-2 zbg-white hover:bg-[#53900F] hover:text-white justify-between shadow-xl bg-[#53900F]/10"
      >
        <img
          v-if="service.serviceImage"
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full mx-auto"
        />
        <p v-else class="w-20 h-20 rounded-full text-6xl">
          {{ service.serviceTitle[currentLanguage] }}
        </p>
        <h1 class="text-2xl font-bold">{{ service.serviceTitle[currentLanguage] }}</h1>
        <p class="line-clamp-5">
          {{ service.serviceDescription[currentLanguage] }}
        </p>
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
          <div class="bg-white flex flex-col gap-2 w-full">
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
            <form @submit.prevent="saveService" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.serviceTitle[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('Service Title')"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.serviceDescription[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Service Description"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseFileInput
                  @image-update="handleFileChange($event)"
                  label="Add Picture"
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
