<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

import ApiService from '@/services/apiService'

let form = ref({
  interestedIn: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  description: ''
})

const submitVolunteer = async () => {
  try {
    const response = await ApiService.post('/users/volunteer', form.value)
    alert(response.success)
    if (response.success) {
      //   alert('Donation submitted successfully')
      form.value = {}
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

let showModal = ref(false)
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
     
  </section>
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
