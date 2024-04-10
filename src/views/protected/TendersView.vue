<script setup>
// import { ref } from 'vue'/
import DataTable from '@/components/base/DataTable.vue'
import ApiService from '@/services/apiService'
// import BaseInput from '@/components/base/BaseInput.vue'
// import BaseTextarea from '@/components/base/BaseTextarea.vue'
// import BaseButton from '@/components/base/BaseButton.vue'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

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
  }
]
const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/tenders')
    if (response) {
      tenders.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const isEditing = ref(false)
const editForm = ref(null)
let formatDate = ref('')
function editContact(career) {
  isEditing.value = true
  editForm.value = career
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

async function deleteContact(career) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(career._id)
    if (response.success) {
      fetchTenders()
    }
  }
}

// async function submitEdit() {
//   const response = await ApiService.patch('/admin/donations/' + editForm.value._id, editForm.value)
//   if (response.success) {
//     isEditing.value = false
//     getAllDonations()
//     editForm.value = {}
//   }
// }

onMounted(fetchTenders)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <router-link :to="{ name: 'home' }" class="bg-[#539000] text-white self-end px-2 py-1"
      >Add Tender</router-link
    >
    <DataTable :tableHeaders="tableHeaders" :tableValues="tenders" :actions="actions"> </DataTable>
  </section>
  <div
    class="modal fixed inset-0 flex z-30 justify-center items-center bg-white/80 overflow-auto py-12"
    v-if="isEditing"
  >
    <div
      class="bg-white/100 flex flex-col gap-3 justify-center items-center shadow p-2 overflow-auto"
    >
      <button @click="isEditing = !isEditing" class="self-end text-2xl text-red-500">X</button>
    </div>
  </div>
</template>
