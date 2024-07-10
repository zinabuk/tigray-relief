<script setup>
import { ref, onMounted } from 'vue';
import DataTable from '@/components/base/DataTable.vue';
import ApiService from '@/services/apiService';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import dayjs from 'dayjs';
import swal from 'sweetalert'
import { useRouter } from 'vue-router'
const router = useRouter()


const currentLanguage = ref('en'); 

const toggleLanguage = (lang) => {
  currentLanguage.value = lang;
};

const tableHeaders = [
  { label: 'Job Title', field: 'jobTitle' },
  { label: 'Location', field: 'location' },
  { label: 'Employment Type', field: 'employmentType' },
  { label: 'Experience', field: 'experience' },
  { label: 'Salary', field: 'salary' },
  { label: 'Deadline', field: 'deadline' },
  { label: 'Job Requirement', field: 'qualification' },
  { label: 'Job description', field: 'description' }
];
const actions = [
  {
    label: 'edit',
    action: openEditModal,
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
    action: deleteJob,
    icon: 'eye',
    style: 'hover:cursor-pointer text-green-500 py-1 px-2'
  }
];
let job = ref({})
const errorMessage = ref('')
const successMessage = ref('')
const saveJob = async () => {
  try {
    const response = await ApiService.post('/admin/vacancies',job.value)
    if (response.success) {
      successMessage.value = response.message
      swal({
        title: response.message,
        icon: 'success',
      })
      router.push({ name: 'in-vacancy' })
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = error.response.data.message
     
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
}
async function deleteJob(partner) {
  const accept = window.confirm('Undo is not possible');
  if (accept) {
    const response = await ApiService.delete(`/admin/vacancies/${job.id}`);
    if (response.success) {
      fetchPartners();
    }
  }
}
</script>

<template>
  <section class="w-full bg-white p-6">
<div class="flex justify-end">
  <router-link  class="bg-gray-500  text-white px-4 py-2 rounded" to="/app/vacancy">Cancel</router-link>
</div>
    <p v-if="successMessage" class="text-green-700">{{ successMessage }}</p>
    <form @submit.prevent="saveJob" class="flex flex-col flex-wrap gap-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <BaseInput
            v-model="job.jobTitle"
            type="text"
            required
            inputClass="px-4 py-3"
            label="Job Title"
          ></BaseInput>
          <BaseInput
            v-model="job.location"
            type="text"
            required
            inputClass="px-4 py-3"
            label="Location"
          ></BaseInput>
          <BaseInput
            v-model="job.employmentType"
            type="text"
            required
            inputClass="px-4 py-3"
            label="Employment Type"
          ></BaseInput>
        </div>
        <div class="flex flex-col gap-2">
          <BaseInput
            v-model="job.experience"
            type="text"
            required
            inputClass="px-4 py-3"
            label="Experience"
          ></BaseInput>
          <BaseInput
            v-model="job.salary"
            type="text"
            required
            inputClass="px-4 py-3"
            label="Salary"
          ></BaseInput>
          <BaseInput
            v-model="job.deadline"
            type="date"
            required
            inputClass="px-4 py-3"
            label="Deadline"
          ></BaseInput>
        </div>
      </div>
      <div>
        <BaseTextarea
          v-model="job.qualification"
          required
          label="Job Requirement"
        ></BaseTextarea>
        <BaseTextarea v-model="job.description" label="Job Description"></BaseTextarea>
      </div>

      <p v-if="errorMessage" class="text-red-700">{{ errorMessage }}</p>

      <BaseButton>Save Job </BaseButton>

    </form>
  </section>
</template>
