<script setup>
import { ref } from 'vue'
import swal from 'sweetalert'
// import { useRouter } from 'vue-router'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue' // Import your BaseFileInput component
import RichTextInput from '@/components/base/RichTextInput.vue'

// const router = useRouter()
const errorMessage = ref('')
// const successMessage = ref('')
const job = ref({
  jobTitle: '',
  employmentType: '',
  location: '',
  experience: '',
  salary: '',
  deadline: '',
  qualification: '',
  description: '' // Ensure this exists
})
const file = ref(null) // Define a ref for the file

const handleFileChange = (event) => {
  file.value = event.target.files[0] // Update the file ref with the selected file
}

const saveJob = async () => {
  alert(job.value.description)
  try {
    const formData = new FormData()
    // Append job data
    Object.keys(job.value).forEach((key) => {
      formData.append(key, job.value[key])
    })

    // Append file if it exists
    if (file.value) {
      formData.append('file', file.value)
    }

    const response = await ApiService.post('/admin/vacancies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.success) {
      swal({
        title: response.message,
        icon: 'success'
      })
      job.value = {}
      file.value = ''
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = error.response.data.message
    }
    // else {
    //   router.push({ name: 'NetworkError' });
    // }
  }
}
</script>

<template>
  <div
    class="w-[82%] flex flex-col items-center justify-center pt-6 gap-2 shadow rounded-lg modal overflow-auto p-2"
  >
    <div class="self-start">
      <button @click.prevent="$router.push({ name: 'admin-jobs' })">Go back</button>
    </div>
    <div class="w-full md:w-3/4 bg-">
      <h1 class="text-center text-lg font-semibold">New Job</h1>
      <form @submit.prevent="saveJob" class="w-full flex flex-col gap-4 py-4 px-4">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-6">
            <BaseInput
              v-model="job.jobTitle"
              type="text"
              required
              inputClass="px-8"
              label="Job Title"
            ></BaseInput>
          </div>
          <div class="col-span-6">
            <BaseInput
              v-model="job.employmentType"
              type="text"
              inputClass="px-8"
              required
              label="Employment Type"
            ></BaseInput>
          </div>
        </div>
        <BaseInput
          v-model="job.location"
          type="text"
          inputClass="px-8"
          required
          label="Work Place"
        ></BaseInput>
        <BaseInput v-model="job.experience" inputClass="px-8" label="Experience"></BaseInput>
        <BaseInput v-model="job.salary" required inputClass="px-8" label="Salary"></BaseInput>
        <BaseInput
          type="date"
          v-model="job.deadline"
          required
          inputClass="px-8 py-3"
          label="Deadline"
        ></BaseInput>
        <BaseInput
          v-model="job.qualification"
          rows="4"
          textareaClasses="px-8"
          label="Qualification"
        ></BaseInput>
        <div class="flex flex-col">
          <h1>Description</h1>
          <RichTextInput v-model="job.description" class="bg-white"></RichTextInput>
        </div>
        <div class="flex relative bg-white">
          <BaseFileInput
            @change="handleFileChange"
            label="Attach File"
            type="file"
            icon="file"
            fileClass="py-[2px] cursor-pointer"
            inputClass="pl-4 px-2 py-[2px] border border-gray-300 rounded"
            accept="*"
          />
        </div>
        <p v-if="errorMessage" class="text-red-700">{{ errorMessage }}</p>
        <div class="flex gap-4">
          <BaseButton type="submit" class="self-start px-4 py-[2px]">Save</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
