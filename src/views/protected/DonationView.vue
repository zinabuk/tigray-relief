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
const tableHeaders = [
  { label: 'Service', field: 'service' },
  { label: 'First Name', field: 'firstName' },
  { label: 'Last Name', field: 'lastName' },
  { label: 'Email', field: 'email' },
  { label: 'Phone Number', field: 'phoneNumber' },
  { label: 'Address', field: 'address' },
  { label: 'Amount', field: 'amount' }
]
const donations = ref([])
const actions = [
  {
    label: 'edit',
    action: editDonation,
    icon: 'edit',
    style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
  },
  {
    label: 'delete',
    action: deleteDonation,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  },
  {
    label: 'view',
    action: viewApplicants,
    icon: 'eye',
    style: 'hover:cursor-pointer text-green-500 py-1 px-2'
  }
]
async function getAllDonations() {
  const response = await ApiService.get('/users/donations')

  if (response.success) {
    donations.value = response.data
  }
}

const isEditing = ref(false)
const editForm = ref(null)
let formatDate = ref('')
function editDonation(career) {
  isEditing.value = true
  editForm.value = career
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

async function deleteDonation(career) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(career._id)
    if (response.success) {
      getAllDonations()
    }
  }
}

const router = useRouter()

async function viewApplicants(career) {
  router.push({ name: 'jobApplicants', params: { id: career._id } })
}

// async function submitEdit() {
//   const response = await ApiService.patch('/admin/donations/' + editForm.value._id, editForm.value)
//   if (response.success) {
//     isEditing.value = false
//     getAllDonations()
//     editForm.value = {}
//   }
// }

onMounted(getAllDonations)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <router-link :to="{ name: 'home' }" class="bg-[#539000] text-white self-end px-2 py-1"
      >Add Donation</router-link
    >
    <DataTable :tableHeaders="tableHeaders" :tableValues="donations" :actions="actions">
    </DataTable>
  </section>
  <div
    class="modal fixed inset-0 flex z-30 justify-center items-center bg-white/80 overflow-auto py-12"
    v-if="isEditing"
  >
    <div
      class="bg-white/100 flex flex-col gap-3 justify-center items-center shadow p-2 overflow-auto"
    >
      <button @click="isEditing = !isEditing" class="self-end text-2xl text-red-500">X</button>

      <!-- <form @submit.prevent="submitEdit" class="flex flex-col gap-4 px-2">
        <BaseInput
          v-model="editForm.jobTitle"
          @handleEnter="submitForm"
          type="text"
          label="Job Title"
          required
          inputClass="px-4 py-3"
        ></BaseInput>
        <BaseInput
          v-model="editForm.salary"
          @handleEnter="submitForm"
          type="text"
          label="Salary"
          inputClass="px-4 py-3"
          required
        ></BaseInput>
        <BaseInput
          v-model="editForm.experience"
          @handleEnter="submitForm"
          type="text"
          label="Experience"
          inputClass="px-4 py-3"
          required
        ></BaseInput>
        <BaseInput
          v-model="formatDate"
          @handleEnter="submitForm"
          type="date"
          label="deadline"
          required
          inputClass="px-4 py-3"
          placeholder="Job Title"
        ></BaseInput>
        <BaseTextarea
          v-model="editForm.qualification"
          rows="4"
          label=""
          inputClass="justify-self-end"
          >Qualification / Requirement</BaseTextarea
        >

        <BaseButton type="submit">Save Changes</BaseButton>
      </form> -->
    </div>
  </div>
</template>
