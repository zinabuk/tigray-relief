<script setup>
// import { ref } from 'vue'/
import DataTable from '@/components/base/DataTable.vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
// import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

// import { useRouter } from 'vue-router'
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
    action: openEditModal,
    icon: 'edit',
    style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
  },
  {
    label: 'delete',
    action: deleteDonation,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  }
]
async function fetchDonations() {
  const response = await ApiService.get('/users/donations')

  if (response.success) {
    donations.value = response.data
  }
}

const isEditing = ref(false)
const editForm = ref(null)
let formatDate = ref('')

function openEditModal(donation) {
  isEditing.value = true
  editForm.value = { ...donation }
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

const updateDonation = async () => {
  // alert(editForm.value.service)
  try {
    const response = await ApiService.patch(
      '/users/donations/' + editForm.value._id,
      editForm.value
    )
    alert(response.success)
    if (response.success) {
      fetchDonations()

      setTimeout(() => {
        closeEditModal()
      }, 3000)
    }
  } catch (error) {
    console.error('Error updating donation:', error)
  }
}

async function deleteDonation(donation) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(`/users/donations/${donation._id}`)
    if (response.success) {
      fetchDonations()
    }
  }
}

function closeEditModal() {
  isEditing.value = false
  editForm.value = {
    service: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    amount: ''
  }
}
// const router = useRouter()

// async function viewApplicants(career) {
//   router.push({ name: 'jobApplicants', params: { id: career._id } })
// }

onMounted(fetchDonations)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <!-- <router-link :to="{ name: 'home' }" class="bg-[#539000] text-white self-end px-2 py-1"
      >Add Donation</router-link
    > -->
    <DataTable :tableHeaders="tableHeaders" :tableValues="donations" :actions="actions">
    </DataTable>
  </section>
  <div
    class="w-full modal fixed inset-0 flex z-50 justify-center items-center bg-[#53900F]/40 overflow-auto md:py-12"
    v-if="isEditing"
  >
    <div
      class="bg-white/100 flex flex-col gap-3 justify-center items-center shadow px-[1%] md:px-[6%] py-6 md:py-12 overflow-auto"
    >
      <button @click="closeEditModal" class="self-end text- bg-gray-500 text-white">Cancel</button>

      <form @submit.prevent="updateDonation" class="w-full flex flex-col gap-4">
        <BaseInput
          v-model="editForm.service"
          type="text"
          label="Service"
          inputClass="px-4 py-3"
        ></BaseInput>
        <div class="flex justify-between gap-2">
          <BaseInput
            v-model="editForm.firstName"
            type="text"
            label="First Name"
            inputClass="px-4 py-3"
            required
          ></BaseInput>
          <BaseInput
            v-model="editForm.lastName"
            type="text"
            label="Last Name"
            inputClass="px-4 py-3"
          ></BaseInput>
        </div>
        <div class="flex justify-between gap-2">
          <BaseInput
            v-model="editForm.email"
            type="email"
            label="Email"
            required
            inputClass="px-4 py-3"
            placeholder="Job Title"
          ></BaseInput>

          <BaseInput
            v-model="editForm.phoneNumber"
            type="text"
            label="Phone Number"
            required
            inputClass="px-4 py-3"
          ></BaseInput>
        </div>
        <BaseInput
          v-model="editForm.address"
          type="text"
          label="Address"
          inputClass="px-4 py-3"
        ></BaseInput>
        <BaseInput
          v-model="editForm.amount"
          type="text"
          label="Amount"
          required
          inputClass="px-4 py-3"
        ></BaseInput>
        <BaseButton type="submit">Save Changes</BaseButton>
      </form>
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

