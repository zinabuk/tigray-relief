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

const job = ref({})
const formatDate = ref('')
async function getJob() {
  try {
    const response = await ApiService.getCareerById(route.params.id)

    if (response.success) {
      job.value = response.data
      formatDate.value = dayjs(job.value.deadline).format('YYYY-MM-DD')
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
    const response = await ApiService.updateCareer(job.value, job.value.id)
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

const formattedDate = (date) => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
</script>

<template>
  <div class="w-full flex justify-center items-center bg-black/80 p-12">
    <div class="bg-white/100 flex w-full md:w-3/4 flex-col overflow-auto">
      <form @submit.prevent="UpdateJob" class="w-full flex flex-col gap-2 px-4">
        <BaseInput
          v-model="job.jobTitle"
          type="text"
          required
          label="Job Title"
          inputClass="px-8 py-3"
        ></BaseInput>
        <BaseInput
          v-model="job.workplace"
          type="text"
          inputClass="px-8 py-3"
          required
          label="Work place"
          autocomplete="true"
        ></BaseInput>
        <BaseInput
          v-model="job.employmentType"
          type="text"
          label="Employmet Type"
          inputClass="px-8 py-3"
          required
        ></BaseInput>
        <BaseInput v-model="job.experience" inputClass="px-8 py-3" label="Experience"></BaseInput>
        <BaseInput v-model="job.salary" required inputClass="px-8 py-3" label="Salary"></BaseInput>
        <BaseInput
          v-model="job.deadline"
          required
          type="date"
          inputClass="px-8 py-3"
          label="Deadline"
        ></BaseInput>
        <BaseInput v-model="job.qualification" label="Qualification"></BaseInput>
        <RichTextInput v-model="job.description"></RichTextInput>
      </form>
    </div>
  </div>
</template>
