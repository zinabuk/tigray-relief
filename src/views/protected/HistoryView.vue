<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'

import { ref, onMounted,computed } from 'vue'

const histories = ref([])
const fetchHistories = async () => {
  try {
    const response = await ApiService.get('/users/histories')
    if (response) {
      histories.value = response.data.map((item) => ({
        ...item,
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

const showAddModal = ref(false)
const currentLanguage = ref('en')
// const toggleLanguage = (lang) => {
//   currentLanguage.value = lang
// }
const form = ref({
  id: null,
  year: '',
  description: { en: '', ti: '', am: '' },
  image: ''
})
const searchInput = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(3)





const logo = ref('')
const handleFileChange = (file) => {
  form.value.image = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

const edit = ref(false)
const editService = (history) => {
  form.value = {
    id: history.id,
    year: history.year,
    description: { ...history.description },
    image: history.image
  }
  edit.value = true
  showAddModal.value = true
}

const filteredHistorie = computed(() => {
  return histories.value.filter(history =>
    history.year.toString().includes(searchInput.value.toLowerCase())
  );
});

const paginatedHistories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredHistorie.value.slice(start, start + itemsPerPage.value);
});
const totalPages = computed(() => {
  return Math.ceil(filteredHistorie.value.length / itemsPerPage.value)
})
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const saveService = async () => {
  const formData = new FormData()
  formData.append('year', form.value.year)
  formData.append('description', JSON.stringify(form.value.description))
  if (form.value.image) {
    formData.append('image', form.value.image)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/users/histories/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchHistories()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Service'
      }
    } else {
      const res = await ApiService.post('/users/histories', formData)
      if (res.success) {
        successMessage.value = res.message
        fetchHistories()
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
      const response = await ApiService.delete('/users/histories/' + id)
      if (response.success) {
        fetchHistories()
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
    year: '',
    description: { en: '', ti: '', am: '' },
    image: ''
  }
  edit.value = false
  logo.value = ''
}

onMounted(() => {
  fetchHistories()
})
</script>

<template>
  <section class="col-span-10 p-4 flex flex-col bg-slate-50">
    <!-- Histories -->
    <div class="flex justify-between">
    <div class="flex-justify-start">
      <base-input
          inputClass="border outline-none border-[#288fb2]"
          type="search"
          class="px-2 py-1"
         v-model="searchInput"
          placeholder="Search  by year..."
      ></base-input>
    </div>
    <div class="flex-justify-end">
      <button
      @click="showAddModal = true"
      class="bg-[#53900F] text-white self-end border flex items-center px-2 rounded-2xl py-1"
    >
      <font-awesome-icon icon="add" class=""></font-awesome-icon>
      Add History
    </button>
    </div>
   </div>



    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 place-content-center">
      <div
        v-for="(service, i) in paginatedHistories"
        :key="i"
        class="flex flex-col gap-2 justify-between bg-white shadow"
      >
        <div class="flex flex-col gap-2">
          <img
            v-if="service.image"
            :src="BASE_AVATAR + service.image"
            alt=""
            class="w-full h-36 rounded-sm object-cover mr-auto"
          />
          <p v-else class="w-20 h-20 rounded-full text-6xl">
            {{ service.year }}
          </p>
          <h1 class="text-xl font-bold px-2">{{ service.year }}</h1>
          <p class="line-clamp-5z text-ajustify px-2">
            {{ service.description[currentLanguage] }}
          </p>
        </div>
        <div class="flex gap-6 p-2">
          <button @click="editService(service)" class="text-blue-500 bg-slate-200 px-2">
            <font-awesome-icon icon="edit"></font-awesome-icon>Edit
          </button>
          <button @click="deleteService(service.id)" class="text-red-500 bg-slate-200 px-2">
            <font-awesome-icon icon="trash"></font-awesome-icon>Delete
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
              {{ edit ? 'Edit history' : 'Add history' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <div class="bg-white flex flex-col gap-2 w-full">
            <!-- <div class="flex w-full justify-between">
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
            </div> -->
            <form @submit.prevent="saveService" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.year"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Year"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.description[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Service Description"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseFileInput
                  label="add Picture"
                  @image-update="handleFileChange($event)"
                  type="file"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Image"
                  accept="image/*"
                >
                  <BaseButton type="submit" class="w-full px-2 py-2 rounded"></BaseButton>
                </BaseFileInput>

                <span>{{ logo }}</span>
                <BaseButton type="submit" class="w-full px-2 py-2 rounded">
                  Save History
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
    <nav aria-label="Page navigation">
      <ul class="inline-flex items-center space-x-1">
        <li>
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        <li v-for="page in totalPages" :key="page">
          <button
            @click="changePage(page)"
            :class="{
              'px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-lg': currentPage === page,
              'px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100': currentPage !== page
            }"
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
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
