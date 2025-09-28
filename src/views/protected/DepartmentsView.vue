<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import RichTextInput from '@/components/base/RichTextInput.vue'

import { ref, onMounted,computed } from 'vue'


// let language = ref(localStorage.getItem('lang') || '')
const departments = ref([])

const searchInput = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(3)
const fetchdepartments = async () => {
  try {
    const response = await ApiService.get('/admin/departments')
    if (response) {
      departments.value = response.data.map((item) => ({
        ...item,
        departmentTitle: JSON.parse(item.departmentTitle),
        departmentDescription: JSON.parse(item.departmentDescription)
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
// const toggleLanguage = (lang) => {
//   currentLanguage.value = lang
// }
const form = ref({
  id: null,
  departmentTitle: { en: '', ti: '', am: '' },
  departmentDescription: { en: '', ti: '', am: '' },
  departmentImage: ''
})




let logo = ref('')
const handleFileChange = (file) => {
  form.value.departmentImage = file
  logo.value = file.name
}

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editdepartment = (department) => {
  form.value = {
    id: department.id,
    departmentTitle: { ...department.departmentTitle },
    departmentDescription: { ...department.departmentDescription },
    departmentImage: department.departmentImage
  }
  edit.value = true
  showAddModal.value = true
}

const savedepartment = async () => {
  const formData = new FormData()
  formData.append('departmentTitle', JSON.stringify(form.value.departmentTitle))
  formData.append('departmentDescription', JSON.stringify(form.value.departmentDescription))
  if (form.value.departmentImage) {
    formData.append('departmentImage', form.value.departmentImage)
  }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/admin/departments/' + form.value.id, formData)
      if (response.success) {
        successMessage.value = response.message
        fetchdepartments()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save department'
      }
    } else {
      const res = await ApiService.post('/admin/departments', formData)
      if (res.success) {
        successMessage.value = res.message
        fetchdepartments()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save department'
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to save department'
  }
}

const deletedepartment = async (id) => {
  const sure = window.confirm('Are you sure to delete this team?')
  if (sure) {
    try {
      const response = await ApiService.delete('/admin/departments/' + id)

      if (response.success) {
        fetchdepartments()
      } else {
        errorMessage.value = 'Failed to save Partner'
      }
    } catch (error) {
      errorMessage.value = 'Failed to save Partner'
    }
  }
}

// const closeModal = () => {
//   showAddModal.value = false
//   form.value = {
//     id: null,
//     departmentTitle: { en: '', ti: '', am: '' },
//     departmentDescription: { en: '', ti: '', am: '' },
//     departmentImage: ''
//   }
//   edit.value = false
//   logo.value = ''
// }

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    departmentTitle: { en: "", ti: "", am: "" },
    departmentDescription: { en: "", ti: "", am: "" },
    departmentImage: ""
  }
  edit.value = false
  logo.value = ""
}



const filtereddepartment = computed(() => {
  return departments.value.filter(department =>
    department.departmentTitle[currentLanguage.value].toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

const paginateddepartments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filtereddepartment.value.slice(start, start + itemsPerPage.value);
});
const totalPages = computed(() => {
  return Math.ceil(filtereddepartment.value.length / itemsPerPage.value)
})
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  fetchdepartments()
})
</script>

<template>
    <section class="col-span-10 p-4 flex flex-col bg-slate-50">
    <!-- departments -->
    <div class="flex justify-between">
    <div class="flex-justify-start">
      <base-input
          inputClass="border outline-none border-[#288fb2]"
          type="search"
          class="px-2 py-1"
         v-model="searchInput"
          placeholder="Search  by department title..."
      ></base-input>
    </div>
    <div class="flex-justify-end">
      <button
      @click="showAddModal = true"
      class="bg-[#53900F] self-end border flex items-center px-2 py-1 gap-2 text-white rounded-2xl"
    >
      <font-awesome-icon icon="add"></font-awesome-icon>
      Add Products
    </button>
    </div>
   </div>

   

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(department, i) in paginateddepartments"
        :key="i"
        class="p-4 flex flex-col gap-2 bg-white justify-between shadow"
      >
        <div class="w-full h-auto">
          <img
            v-if="department.departmentImage"
            :src="BASE_AVATAR + department.departmentImage"
            alt=""
            class="w-full h-36 object-cover object-top rounded-sm mx-auto"
          />
          <p v-else class="rounded-full text-6xl">
            {{ department.departmentTitle[currentLanguage] }}
          </p>
          <h1 class="text-2xl font-bold">{{ department.departmentTitle[currentLanguage] }}</h1>
          <p class="line-clamp-5">
            {{ department.departmentDescription[currentLanguage] }}
          </p>
        </div>
        <div class="flex gap-4">
          <button @click="editdepartment(department)" class="text-blue-500 bg-slate-200 px-2 rounded">
            <font-awesome-icon icon="edit"></font-awesome-icon>Edit
          </button>
          <button @click="deletedepartment(department.id)" class="text-red-500 bg-slate-200 px-2">
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
              {{ edit ? 'Edit department' : 'Add department' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <div class="bg-white flex flex-col gap-2 w-full pt-2">
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
            <form @submit.prevent="savedepartment" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.departmentTitle[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('department Title')"
                ></BaseInput>

                <RichTextInput
                  v-model="form.departmentDescription[currentLanguage]"
                  placeholder="department Description"
                ></RichTextInput>
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
                  Save department
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
