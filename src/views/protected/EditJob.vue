<script setup>
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import ApiService from '@/services/apiService'
import RichTextInput from '@/components/base/RichTextInput.vue'

import swal from 'sweetalert'
import { useRoute } from 'vue-router'

const route = useRoute()
defineProps({
  id: {
    type: String,
    required: true
  }
})

const formattedDate = (date) => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
const job = ref({})
const formatDate = ref('')
async function getJob() {
  try {
    const response = await ApiService.getCareerById('/admin/vacancies/' + route.params.id)

    if (response.success) {
      job.value = { ...response.data, deadline: formattedDate(response.data.deadline) }
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      return
    } else {
      return
    }
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getJob()
    }
  },
  { immediate: true }
)
const errorMessage = ref('')
const successMessage = ref('')
const saveJob = async () => {
  try {
    const response = await ApiService.updateCareer('/admin/vacancies/' + job.value.id, job.value)
    if (response.success) {
      //   successMessage.value = response.message
      swal({
        title: response.message,
        icon: 'success'
      })
      // router.push({ name: 'in-vacancy' })
    }
  } catch (error) {
    alert(error)
    // if (error.response && error.response.status === 404) {
    //   errorMessage.value = error.response.data.message
    // } else {
    //   router.push({ name: 'NetworkError' })
    // }
  }
}
</script>

<template>
  <div class="w-full flex justify-center items-center bg-black/80 p-12">
    <div class="bg-white/100 flex w-full md:w-3/4 flex-col overflow-auto">
      <form @submit.prevent="saveJob" class="w-full flex flex-col gap-4 px-4">
        <BaseInput
          v-model="job.jobTitle"
          type="text"
          required
          label="Job Title"
          inputClass="px- py-"
        ></BaseInput>
        <BaseInput
          v-model="job.location"
          type="text"
          inputClass="job"
          required
          label="Work place"
          autocomplete="true"
        ></BaseInput>
        <BaseInput
          v-model="job.employmentType"
          type="text"
          label="Employmet Type"
          inputClass="job"
          required
        ></BaseInput>
        <BaseInput v-model="job.experience" inputClass="job" label="Experience"></BaseInput>
        <BaseInput v-model="job.salary" required inputClass="job" label="Salary"></BaseInput>
        <BaseInput
          v-model="job.deadline"
          required
          type="date"
          inputClass="job"
          label="Deadline"
        ></BaseInput>
        <BaseInput v-model="job.qualification" label="Qualification"></BaseInput>
        <RichTextInput v-model="job.description"></RichTextInput>

        <BaseButton type="submit" class="px-4 py-1">Save Changes</BaseButton>
      </form>
    </div>
  </div>
</template>
