<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert';

import { useRouter } from 'vue-router';
const router = useRouter()
import ApiService from '@/services/apiService';
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue' 
const errorMessage = ref('')
// const successMessage = ref('')
let job = ref({})

const saveJob = async () => {
  try {
    const response = await ApiService.post('/admin/vacancies', job.value)
    if (response.success) {
      // successMessage.value = response.message
      // alert("OKK")
      swal({
        title: response.message,
        icon: 'success'
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
}</script>
<template>
  <div
    
    class=" w-[82%] flex flex-col items-center justify-center pt-6 gap-2 shadow rounded-lg modal overflow-auto"
  >
    <div class="w-1/2 bg-white">
      <h1 class="text-center text-xl font-semibold">Vacancy form</h1>
      
      <form @submit.prevent="saveJob" class="w-full flex flex-col gap-4 py-4 px-4">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-6 ">
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
          autocomplete="true"
        ></BaseInput>
        <BaseInput v-model="job.experience" inputClass="px-8" placeholder="experience"></BaseInput>
        <BaseInput
          v-model="job.salary"
          required
          inputClass="px-8"
          placeholder="sallary"
        ></BaseInput>
        <BaseInput
          type="date"
          v-model="job.deadline"
          required
          inputClass="px-8 py-3"
          placeholder="dadeline"
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
        <BaseFileInput @image-update="handleFileChange($event)" label="Add Logo"></BaseFileInput>
        <p v-if="message" class="text-red-700">{{ message }}</p>
        <div class="flex gap-4">
          <BaseButton type="submit" class="self-start">Submit</BaseButton>
          <button type="button" class="bg-gray-600 text-white px-4 py-2" @click="isAdd = false">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
