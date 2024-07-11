<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'

import { ref, onMounted } from 'vue'

const policies = ref([])
const fetchPolicies = async () => {
  try {
    const response = await ApiService.get('/users/policy-and-strategy')
    if (response) {
      policies.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        description: JSON.parse(item.description)
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
  title: { en: '', ti: '', am: '' },
  description: { en: '', ti: '', am: '' },
  image: ''
})

let logo = ref('')
const handleFileChange = (file) => {
  form.value.image = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editPolicy = (policy) => {
  form.value = {
    id: policy.id,
    title: { ...policy.title },
    description: { ...policy.description },
    image: policy.image
  }
  edit.value = true
  showAddModal.value = true
}

const savePolicy = async () => {
  const formData = new FormData()
  formData.append('title', JSON.stringify(form.value.title))
  formData.append('description', JSON.stringify(form.value.description))
  if (form.value.image) {
    formData.append('image', form.value.image)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/users/policy-and-strategy/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchPolicies()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Policy'
      }
    } else {
      const res = await ApiService.post('/users/policy-and-strategy', formData)
      if (res.success) {
        successMessage.value = res.message
        fetchPolicies()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Policy'
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to save Policy'
  }
}

const deletePolicy = async (id) => {
  const sure = window.confirm('Are you sure to delete this policy?')
  if (sure) {
    try {
      const response = await ApiService.delete('/users/policy-and-strategy/' + id)

      if (response.success) {
        fetchPolicies()
      } else {
        errorMessage.value = 'Failed to delete Policy'
      }
    } catch (error) {
      errorMessage.value = 'Failed to delete Policy'
    }
  }
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    title: { en: '', ti: '', am: '' },
    description: { en: '', ti: '', am: '' },
    image: ''
  }
  edit.value = false
  logo.value = ''
}

onMounted(() => {
  fetchPolicies()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- Policies -->
    <button
      @click="showAddModal = true"
      class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add Policy
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(policy, i) in policies"
        :key="i"
        class="p-4 flex flex-col gap-2 zbg-white hover:bg-[#53900F] hover:text-white justify-between shadow-xl bg-[#53900F]/10"
      >
        <img
          v-if="policy.image"
          :src="BASE_AVATAR + policy.image"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full mx-auto"
        />
        <p v-else class="w-20 h-20 rounded-full text-6xl">
          {{ policy.title[currentLanguage] }}
        </p>
        <h1 class="text-2xl font-bold">{{ policy.title[currentLanguage] }}</h1>
        <p class="line-clamp-5">
          {{ policy.description[currentLanguage] }}
        </p>
        <div class="flex gap-2 justify-end">
          <button @click="editPolicy(policy)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deletePolicy(policy.id)">
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
              {{ edit ? 'Edit Policy' : 'Add Policy' }}
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
            <form @submit.prevent="savePolicy" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.title[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('Policy Title')"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.description[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Policy Description"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseFileInput
                  @image-update="handleFileChange($event)"
                  label="Add Picture"
                  type="file"
                  accept="image/*"
                ></BaseFileInput>
                <span>{{ logo }}</span>
                <BaseButton type="submit" class="w-full px-2 py-2 rounded">
                  Save Policy
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
