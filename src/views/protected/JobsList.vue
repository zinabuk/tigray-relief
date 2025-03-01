<script setup>
import { ref, onMounted } from 'vue'
import DataTable from '@/components/base/DataTableT.vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import RichTextInput from '@/components/base/RichTextInput.vue'

import dayjs from 'dayjs'
import swal from 'sweetalert'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAdd = ref(false)
// const toggleAdd = () => {
//   isAdd.value = true
// }

// const currentLanguage = ref('en')
const tableHeaders = [
  { label: 'Job Title', field: 'jobTitle' },
  { label: 'Location', field: 'location' },
  { label: 'Employment Type', field: 'employmentType' },
  { label: 'Experience', field: 'experience' },
  { label: 'Salary', field: 'salary' },
  { label: 'Deadline', field: 'deadline' },
  { label: 'Qualification', field: 'qualification' }
]

const actions = [
  {
    label: 'edit',
    action: openEditRoute,
    icon: 'edit',
    style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
  },
  {
    label: 'delete',
    action: deleteJob,
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

const editForm = ref({
  jobTitle: '',
  location: '',
  employmentType: '',
  experience: '',
  salary: '',
  deadline: '',
  qualification: '',
  description: ''
})
const isEditing = ref(false)
let formatDate = ref('')
function openEditRoute(job) {
  // isEditing.value = true
  // editForm.value = { ...jobs }

  router.push({ name: 'edit-job', params: { id: job.id } })
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD')
}

function closeEditModal() {
  isEditing.value = false
}

const jobs = ref([])

async function fetchJobs() {
  const response = await ApiService.get('/admin/vacancies')
  if (response.success) {
    jobs.value = response.data
  }
}

async function viewApplicants(career) {
  router.push({ name: 'jobApplicants', params: { id: career.id } })
}

const UpdateJob = async (id) => {
  try {
    const response = await ApiService.patch(`/admin/vacancies/${id}`, editForm.value)
    if (response.success) {
      swal({
        title: response.message,
        icon: 'success'
      })
      router.push({ name: 'admin-jobs' })
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('')
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
}

async function deleteJob(job) {
  const accept = window.confirm('Undo is not possible')
  if (accept) {
    const response = await ApiService.delete(`/admin/vacancies/${job.id}`)
    if (response.success) {
      fetchJobs()
    }
  }
}

onMounted(() => {
  fetchJobs()
  viewApplicants()
})
</script>

<template>
  <section class="col-span-10 flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <router-link
      class="bg-[#53900F] text-white rounded-2xl shadow self-end px-4 py-1"
      :to="{ name: 'create-job' }"
      >New job</router-link
    >
    <DataTable :tableHeaders="tableHeaders" :tableValues="jobs" :actions="actions"></DataTable>
  </section>
  <!-- <div
    class="w-full modal fixed inset-0 h-screen flex z-50 justify-center items-center bg-black/80"
    v-if="isEditing"
  >
    <div class="bg-white/100 flex flex-col overflow-auto">
      <button @click="closeEditModal" class="self-end text-2xl bg-gray-500 text-white">
        Cancel
      </button>
      <form @submit.prevent="UpdateJob" class="w-full flex flex-col px-4">
        <BaseInput
          v-model="editForm.jobTitle"
          type="text"
          required
          inputClass="px-8 py-3"
          placeholder="Your business name"
        ></BaseInput>
        <BaseInput
          v-model="editForm.location"
          type="text"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Email"
          autocomplete="true"
        ></BaseInput>
        <BaseInput
          v-model="editForm.employmentType"
          type="text"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Phone number"
        ></BaseInput>
        <BaseInput
          v-model="editForm.experience"
          inputClass="px-8 py-3"
          placeholder="Enter your website's link"
        ></BaseInput>
        <BaseInput
          v-model="editForm.salary"
          required
          inputClass="px-8 py-3"
          placeholder="Specialize area"
        ></BaseInput>
        <BaseInput
          v-model="editForm.deadline"
          required
          inputClass="px-8 py-3"
          placeholder="Specialize area"
        ></BaseInput>
        <BaseInput
          v-model="editForm.qualification"
          placeholder="Qualification"
        ></BaseInput>
        <RichTextInput v-model="editForm.description"></RichTextInput>
        <div class="flex gap-4">
          <BaseButton type="submit">Save Changes</BaseButton>
          <button type="button" class="bg-gray-600 text-white px-4 py-2" @click="closeEditModal">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div> -->
</template>

<style scoped>
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
