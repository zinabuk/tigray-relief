<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert'
import { useRouter } from 'vue-router'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue' // Import your BaseFileInput component

const router = useRouter()
const errorMessage = ref('')
const successMessage = ref('')
const job = ref({})
const file = ref(null) // Define a ref for the file

const handleFileChange = (event) => {
  file.value = event.target.files[0] // Update the file ref with the selected file
}

const saveJob = async () => {
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
    class="w-[82%] flex flex-col items-center justify-center pt-6 gap-2 shadow rounded-lg modal overflow-auto"
  >
    <div><button @click.prevent="$router.push({ name: 'admin-jobs' })">Go back</button></div>
    <div class="w-full md:w-3/4 bg-white">
      <h1 class="text-center text-xl font-semibold">Vacancy form</h1>
      <form @submit.prevent="saveJob" class="w-full flex flex-col gap-4 py-4 px-4">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-6">
            <BaseInput
              v-model="job.jobTitle"
              type="text"
              required
              inputClass="px-8"
              placeholder="job title"
            ></BaseInput>
          </div>
          <div class="col-span-6">
            <BaseInput
              v-model="job.employmentType"
              type="text"
              inputClass="px-8"
              required
              placeholder="employment type"
            ></BaseInput>
          </div>
        </div>
        <BaseInput
          v-model="job.location"
          type="text"
          inputClass="px-8"
          required
          placeholder="location"
        ></BaseInput>
        <BaseInput v-model="job.experience" inputClass="px-8" placeholder="experience"></BaseInput>
        <BaseInput v-model="job.salary" required inputClass="px-8" placeholder="salary"></BaseInput>
        <BaseInput
          type="date"
          v-model="job.deadline"
          required
          inputClass="px-8 py-3"
          placeholder="deadline"
        ></BaseInput>
        <BaseTextarea
          v-model="job.qualification"
          rows="4"
          textareaClasses="px-8"
          placeholder="qualification"
        ></BaseTextarea>
        <BaseTextarea
          v-model="job.description"
          rows="4"
          textareaClasses="px-8"
          placeholder="Description"
        ></BaseTextarea>
        <BaseFileInput
          @change="handleFileChange"
          label="Add File"
          type="file"
          inputClass="p-2 border border-gray-300 rounded"
          accept="*"
        />

        <p v-if="errorMessage" class="text-red-700">{{ errorMessage }}</p>
        <div class="flex gap-4">
          <BaseButton type="submit" class="self-start">Submit</BaseButton>
          <button
            type="button"
            class="bg-gray-600 text-white px-4 py-2"
            @click="closeModal = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
