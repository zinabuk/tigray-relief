<script setup>
// import { ref } from 'vue'/
import DataTable from '@/components/base/DataTable.vue'
import ApiService from '@/services/apiService'
// import BaseInput from '@/components/base/BaseInput.vue'
// import BaseTextarea from '@/components/base/BaseTextarea.vue'
// import BaseButton from '@/components/base/BaseButton.vue'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import swal from 'sweetalert'
// import { useRouter } from 'vue-router'
const tableHeaders = [
  { label: 'Full Name', field: 'fullName' },
  { label: 'Email', field: 'email' },
  { label: 'Phone Number', field: 'phoneNumber' },
  { label: 'Subject', field: 'subject' },
  { label: 'Message', field: 'message' }
]
const donations = ref([])
const actions = [
  // d
  {
    label: 'delete',
    action: deleteContact,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  }
]
async function fetchComments() {
  // alert('K')

  const response = await ApiService.get('/users/comments')
  if (response.success) {
    donations.value = response.data
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

function deleteContact(message) {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this FAQ',
    icon: 'warning',
    buttons: true,
    dangerMode: true
  }).then((confirmDelete) => {
    if (confirmDelete) {
      ApiService.delete('/users/comments/' + message.id).then((res) => {
        if (res.success) {
          fetchComments()
          swal('Message has been deleted!', {
            icon: 'success'
          })
        }
      })
    }
  })
}

// async function submitEdit() {
//   const response = await ApiService.patch('/admin/donations/' + editForm.value._id, editForm.value)
//   if (response.success) {
//     isEditing.value = false
//     getAllDonations()
//     editForm.value = {}
//   }
// }

onMounted(fetchComments)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <router-link :to="{ name: 'home' }" class="bg-[#539000] text-white self-end px-2 py-1"
      >Add Contact Message</router-link
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
