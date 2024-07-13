<script setup>
// import { ref } from 'vue'/
import DataTable from '@/components/base/DataTable.vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
const currentLanguage = ref('en'); 

const toggleLanguage = (lang) => {
  currentLanguage.value = lang;
};      

import { useRouter } from 'vue-router'
const router = useRouter()
const tableHeaders = [
  { label: 'Title', field: 'title' },
  { label: 'Organization', field: 'organization' },
  { label: 'Description', field: 'description' },
  { label: 'Deadline', field: 'deadline' }
]
const tenders = ref([])
const actions = [
  {
    label: 'edit',
    action: editContact,
    icon: 'edit',
    style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
  },
  {
    label: 'delete',
    action: deleteContact,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  },
  {
    label: 'verify',
    action: viewApplicants,
    icon: 'eye',
    style: 'hover:cursor-pointer text-green-500 py-1 px-2'
  }
]
const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/tenders')
    if (response) {
      tenders.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        organization: JSON.parse(item.organization),
        description: JSON.parse(item.description),
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const isEditing = ref(false)
const editForm = ref({
  title: { en: '', ti: '', am: '' },
  organization: { en: '', ti: '', am: '' },
  deadline: '',
  description: { en: '', ti: '', am: '' },
  image: ''
})
let formatDate = ref('')
function editContact(career) {
  isEditing.value = true
  editForm.value = {...career}
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

import swal from 'sweetalert'

let showAddModal = ref(false)
let tender = ref({
  title: { en: '', ti: '', am: '' },
  organization: { en: '', ti: '', am: '' },
  deadline: '',
  description: { en: '', ti: '', am: '' },
  image: ''
})

let imageName = ref('')
function handleFileChange(image) {
  tender.value.image = image
  imageName.value = image.name
}
async function deleteContact(tender) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete('/admin/tenders/'+tender.id)
    if (response.success) {
      fetchTenders()
    }
  }

}
async function viewApplicants(career) {
  router.push({ name: 'tenderApplicants', params: { id: career.id } })
}
const updateTender=async()=>{
  const formData = new FormData()
  formData.append('title', JSON.stringify(editForm.value.title))
  formData.append('organization', JSON.stringify(editForm.value.organization))
  formData.append('deadline', editForm.value.deadline)
  formData.append('description',JSON.stringify( editForm.value.description))

  if (editForm.value.image) {
    formData.append('image', editForm.value.image)
  }

  const res = await ApiService.patch('/admin/tenders/' + editForm.value.id, formData)
  if (res.success) {
    swal({
      icon: 'success',
      title: 'New Tender successfully added.'
    })
  }

}

const saveTender = async () => {
  const formData = new FormData()
  formData.append('title', JSON.stringify(tender.value.title))
  formData.append('organization', JSON.stringify(tender.value.organization))
  formData.append('deadline', tender.value.deadline)
  formData.append('description',JSON.stringify( tender.value.description))

  if (tender.value.image) {
    formData.append('image', tender.value.image)
  }

  const res = await ApiService.post('/admin/tenders', formData)
  if (res.success) {
    swal({
      icon: 'success',
      title: 'New Tender successfully added.'
    })
  }
}
onMounted(fetchTenders)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <button @click="showAddModal = true" class="bg-[#539000] text-white self-end px-2 py-1">
      Add Tender
    </button>
    <DataTable :tableHeaders="tableHeaders" :tableValues="tenders" :actions="actions"  :currentLanguage="currentLanguage"> </DataTable>
  </section>
  <div
    class="modal fixed inset-0 flex z-30 justify-center items-center bg-white/80 overflow-auto py-12"
    v-if="isEditing"
  >
    <div
      class="bg-white/100 flex flex-col gap-3 justify-center items-center shadow p-2 overflow-auto"
    >
     
    <button @click="isEditing = !isEditing" class="self-end text-2xl text-red-500">X</button>
    
    <div class="flex justify-center gap-16 py-2">
          <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }"> English </BaseButton>
         <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }"> Amharic </BaseButton>
         <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }"> Tigrigna </BaseButton>
        </div>
    <form @submit.prevent="updateTender" class="flex flex-col gap-4">
            <div class="flex flex-col gap-6">
              <BaseInput
                v-model="editForm.title[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Title"
              ></BaseInput>
              <BaseInput
                v-model="editForm.organization[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Orgainzation"
              ></BaseInput>
              <BaseInput
                v-model="editForm.deadline"
                type="date"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Deadline"
              ></BaseInput>

              <BaseTextarea
                v-model="editForm.description[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Description "
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
              <span>{{ imageName }}</span>
              <BaseButton type="submit" class="w-full px-2 py-2 rounded"> Save Changes </BaseButton>
            </div>
          </form>
    </div>
  </div>

  <div
    v-if="showAddModal"
    class="fixed inset-0 overflow-auto flex items-center z-50 justify-center modal bg-[#53900F]/40 bg-opacity-50 modal"
  >
    <div class="bg-white shadow-lg w-full max-w-md p-6">
      <div class="text-center flex flex-col gap-4">
        <div class="flex justify-between">
          <h3 class="text-lg font-medium text-gray-900">Add Tender</h3>
          <button
            @click="showAddModal = false"
            type="button"
            class="p-1 text-white bg-gray-500 rounded"
          >
            Cancel
          </button>
        </div>
        <div class="bg-white">

          <div class="flex justify-center gap-16 py-2">
          <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }"> English </BaseButton>
         <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }"> Amharic </BaseButton>
         <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }"> Tigrigna </BaseButton>
        </div>
          <form @submit.prevent="saveTender" class="flex flex-col gap-4">
            <div class="flex flex-col gap-6">
              <BaseInput
                v-model="tender.title[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Title"
              ></BaseInput>
              <BaseInput
                v-model="tender.organization[currentLanguage]"
                type="text"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Orgainzation"
              ></BaseInput>
              <BaseInput
                v-model="tender.deadline"
                type="date"
                required
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Deadline"
              ></BaseInput>

              <BaseTextarea
                v-model="tender.description[currentLanguage]"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Tender Description "
              ></BaseTextarea>
            </div>
            <div class="flex justify-end gap-2 flex-col">
              <BaseFileInput
                @image-update="handleFileChange($event)"
                label="Add Picture"
              ></BaseFileInput>
              <span>{{ imageName }}</span>
              <BaseButton type="submit" class="w-full px-2 py-2 rounded"> Save Tender </BaseButton>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </div>
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
