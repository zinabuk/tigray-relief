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
const contactUsMessages = ref([])
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
    contactUsMessages.value = response.data
  }
}

const isEditing = ref(false)
function deleteContact(message) {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this content',
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

onMounted(() => { 
  fetchComments()
})
</script>

<template>
  <section class="col-span-10 bg-slate-50 flex flex-col flex-wrap gap-2 px-4 py-12">
    <DataTable :tableHeaders="tableHeaders" :tableValues="contactUsMessages" :actions="actions">
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
    </div>
  </div>
</template>
