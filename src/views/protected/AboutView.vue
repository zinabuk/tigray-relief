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
        class="p-4 flex flex-col gap-2 justify-between shadow-xl overflow-hidden"
      >
        <img
          :src="BASE_AVATAR + service.images"
          alt=""
          class="max-h-[300px] rounded-xl w-full object-cover zhover:scale-[1.2] transition-transform zdelay-500 duration-500 overflow-hidden"
        />
        <div class="hover:bg-[#53900F] hover:text-white p-2 rounded">
          <p class="text-2xl text-bold">Establishment</p>
          <p class="line-clamp-5">
            {{ service.establishment[currentLanguage] }}
          </p>
        </div>
        <div class="hover:bg-[#53900F] hover:text-white p-2 rounded">
          <p class="text-2xl text-bold"><Menu:context></Menu:context>Mission</p>
          <p class="line-clamp-5">
            {{ service.mission[currentLanguage] }}
          </p>
        </div>
        <div class="hover:bg-[#53900F] hover:text-white p-2 rounded">
          <p class="text-2xl text-bold">Vision</p>
          <p class="text-xl">{{ service.vision[currentLanguage] }}</p>
        </div>
        <div class="hover:bg-[#53900F] hover:text-white p-2 rounded">
          <p class="text-2xl text-bold">Core Values</p>
          <p class="line-clamp-5">
            {{ service.coreValues[currentLanguage] }}
          </p>
        </div>

        <div class="hover:bg-[#53900F] hover:text-white p-2 rounded">
          <p class="text-2xl text-bold">Strategies</p>
          <p class="text-xl">{{ service.expertise[currentLanguage] }}</p>
        </div>

        <div class="flex gap-2 justify-end">
          <button @click="editService(service)">
            <font-awesome-icon icon="edit" class="text-blue-400"></font-awesome-icon>
          </button>
          <button @click="deleteService(service.id)">
            <font-awesome-icon icon="trash" class="text-red-400"></font-awesome-icon>
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
