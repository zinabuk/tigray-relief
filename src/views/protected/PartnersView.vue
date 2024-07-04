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

// import { useRouter } from 'vue-router'
const tableHeaders = [
  { label: 'Title', field: 'businessName' },
  { label: 'Email Address', field: 'email' },
  { label: 'Phone', field: 'phoneNumber' },
  //   { label: 'Logo', field: 'logo' },
  { label: 'Link', field: 'website' },
  { label: 'Service', field: 'specializeArea' },
  { label: 'Description', field: 'description' }
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
    action: deletePartner,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  },
  {
    label: 'verify',
    action: deletePartner,
    icon: 'eye',
    style: 'hover:cursor-pointer text-green-500 py-1 px-2'
  }
]
async function fetchPartners() {
  const response = await ApiService.get('/users/partnerships')

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
    // alert(response.success)
    if (response.success) {
      fetchPartners()

      setTimeout(() => {
        closeEditModal()
      }, 3000)
    }
  } catch (error) {
    console.error('Error updating donation:', error)
  }
}

async function deletePartner(partner) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(`/users/partnerships/${partner._id}`)
    if (response.success) {
      fetchPartners()
    }
  }
}

const image = ref('')
const handleFileChange = (file) => {
  image.value = file
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
    amount: '',
    logo: ''

  }
}
// const router = useRouter()

// async function viewApplicants(career) {
//   router.push({ name: 'jobApplicants', params: { id: career._id } })
// }

const isAdd = ref(false)
const toggleAdd = () => {
  isAdd.value = true
}

const form = ref({})
const submitPartner = async () => {
  const formData = new FormData()
  formData.append('businessName', form.value.businessName)
  formData.append('email', form.value.email)
  formData.append('phoneNumber', form.value.phoneNumber)
  formData.append('website', form.value.website)
  formData.append('specializeArea', form.value.specializeArea)
  formData.append('description', form.value.description)
  formData.append('logo', image.value)

  const res = await ApiService.post('/users/partnerships', formData)
  if (res.success) {
    fetchPartners()
  }
}
onMounted(fetchPartners)
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <button class="bg-[#539000] text-white self-end px-2 py-1" @click="toggleAdd">
      Add Partner
    </button>
    <DataTable :tableHeaders="tableHeaders" :tableValues="donations" :actions="actions">
    </DataTable>
  </section>
  <div
    class="w-full modal fixed inset-0 flex z-30 justify-center items-center bg-white/80 overflow-auto md:py-12"
    v-if="isEditing"
  >
    <div
      class="bg-white/100 flex flex-col gap-3 justify-center items-center shadow px-[1%] md:px-[6%] py-6 md:py-12 overflow-auto"
    >
      <button @click="closeEditModal" class="self-endd text-2xl bg-gray-500 text-white">
        Cancel
      </button>

      <form @submit.prevent="updateDonation" class="w-full flex flex-col gap-4 px-2">
        <BaseInput
          v-model="editForm.service"
          type="text"
          label="Service"
          inputClass="px-4 py-3"
        ></BaseInput>
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

  <div
    v-if="isAdd"
    class="w-full z-30 bg-white/80 fixed inset-0 flex flex-col items-center justify-center p-6 gap-2 shadow rounded-lg"
  >
    <div class="w-1/2 bg-white">
      <h1 class="text-center text-xl font-semibold">Partnership Form</h1>
      <p class="justify-self-end text-green-500 bg-white" v-if="success">{{ success }}</p>
      <form @submit.prevent="submitPartner" class="w-full flex flex-col gap-4">
        <BaseInput
          v-model="form.businessName"
          type="text"
          required
          inputClass="px-8 py-3 "
          placeholder="Your business name"
        ></BaseInput>
        <BaseInput
          v-model="form.email"
          type="email"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Email"
          autocomplete="true"
        ></BaseInput>

        <BaseInput
          v-model="form.phoneNumber"
          type="text"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Phone number"
        ></BaseInput>
        <BaseInput
          v-model="form.website"
          inputClass="px-8 py-3"
          placeholder="Enter your website's link"
        ></BaseInput>
        <BaseInput
          v-model="form.specializeArea"
          required
          inputClass="px-8 py-3"
          placeholder="Specialize area"
        ></BaseInput>

        <BaseTextarea
          v-model="form.description"
          rows="4"
          class=""
          textareaClasses="px-8 "
          placeholder="Description"
        ></BaseTextarea>

        <BaseFileInput @image-update="handleFileChange($event)" label="add logo"></BaseFileInput>
        <p v-if="message" class="text-red-700">{{ message }}</p>
        <div class="flex gap-4">
          <BaseButton type="submit" class="self-start">Submit</BaseButton>
          <button type="button" class="bg-gray-600 text-white px-4 py-2" @click="isAdd = false">
            cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
