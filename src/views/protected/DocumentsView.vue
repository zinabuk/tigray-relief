<script setup>
import ApiService from '@/services/apiService'

import { BASE_UPLOAD } from '@/config'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'

import { ref, onMounted } from 'vue'

// let language = ref(localStorage.getItem('lang') || '')
const documents = ref([])
const fetchDocuments = async () => {
  try {
    const response = await ApiService.get('/admin/documents')
    if (response) {
      documents.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        description : JSON.parse(item.description )
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
  description : { en: '', ti: '', am: '' },
  document: ''
})

let logo = ref('')
const handleFileChange = (file) => {
  form.value.document = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editDocument = (document) => {
  form.value = {
    id: document.id,
    title: { ...document.title },
    description : { ...document.description  },
    document: document.document
  }
  edit.value = true
  showAddModal.value = true
}

const saveDocument = async () => {
  console.log(form.value)
  const formData = new FormData()
  formData.append('title', JSON.stringify(form.value.title))
  formData.append('description', JSON.stringify(form.value.description ))
  if (form.value.document) {
    formData.append('document', form.value.document)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/admin/documents/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchDocuments()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Document'
      }
    } else {
      const res = await ApiService.post('/admin/documents', formData)
      if (res.success) {
        successMessage.value = res.message
        fetchDocuments()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Document'
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to save Document'
  }
}

const deleteDocument = async (id) => {
   const sure = window.confirm('Are you sure to delete this team?')
  if (sure) {
  try {
    const response = await ApiService.delete('/admin/services/' + id)

    if (response.success) {
      fetchDocuments()
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
    title: { en: '', ti: '', am: '' },
    description : { en: '', ti: '', am: '' },
    document: ''
  }
  edit.value = false
  logo.value = ''
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- Documents -->
    <button
      @click="showAddModal = true"
      class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add Document
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div
        v-for="(document, i) in documents"
        :key="i"
        class="p-4 flex flex-col gap-2 zbg-white hover:bg-[#53900F] hover:text-white justify-between shadow-xl bg-[#53900F]/10"
      >
      <h1 class="text-2xl font-bold">{{ document.title[currentLanguage] }}</h1>
        <p class="line-clamp-5">
          {{ document.description [currentLanguage] }}
        </p>
      <a  :href="BASE_UPLOAD + document.document">{{ document.document }}</a>
        <div class="flex gap-2 justify-end">
          <button @click="editDocument(document)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deleteDocument(document.id)">
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
              {{ edit ? 'Edit document' : 'Add document' }}
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
            <form @submit.prevent="saveDocument" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.title[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('Document title')"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.description [currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Document description"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseFileInput
                  @image-update="handleFileChange($event)"
                  label="Attach Document"
                    type="file"
                    inputClass="p-2 border border-gray-300 rounded"
                    placeholder="Image"
                    accept="application/pdf"
                ></BaseFileInput>
                <span>{{ logo }}</span>
                <BaseButton type="submit" class="w-full px-2 py-2 rounded">
                  Save Document
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
