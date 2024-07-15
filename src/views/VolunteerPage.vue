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
  description: '', 
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
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Volunteer</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">Home</router-link>

          <router-link to="/volunteer" class="text-[#539000] px-4 py-2">Volunteer</router-link>
        </div>
      </div>
    </div>

    <!-- donation form -->

    <section class="w-full px-[2%] py-12 bg-gray-50">
      <div class="shadow bg-white rounded-lg p-6">
        <!-- <div>
          <h4 class="text-lg font-bold mb-2">
            Partner With Us As We Bring Relief To Our Communities
          </h4>
          <div class="text-white bg-blue-700 p-2 inline-block self-start" @click="showModal = true">
            <button>Use telebirr</button>
          </div>
          <h2 class="text-2xl font-bold mb-2">Donation Form</h2>
          <p class="text-gray-500 mb-4">"*" indicates required fields</p>
          <h5 class="text-lg font-bold mb-2">Donation Amount</h5>
        </div> -->

        <form class="flex flex-col" @submit.prevent="submitDonation">
          <div class="mb-4">
            <label class="text-gray-600"
              >To which branch  would you like to provide a volunteer service?</label
            >
            <BaseInput
              type="text"
              inputClass="border border-yellow-300"
              label="Enter your area of interest "
              v-model="form.service"
              placeholder="Interested in"
              required
            ></BaseInput>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="First Name*"
                v-model="form.firstName"
                placeholder="First Name"
                required
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Last Name"
                v-model="form.lastName"
                placeholder="Last Name"
                required
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Email"
                v-model="form.email"
                placeholder="Email"
                required
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Phone Number*"
                v-model="form.phoneNumber"
                placeholder="Phone Number"
                required
              ></BaseInput>
            </div>
            <div>
              <BaseTextarea
                inputClass="border border-yellow-300"
                label="Description"
                v-model="form.description"
                placeholder="Description"
                required
              ></BaseTextarea>
            </div>
            <!-- <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Total Amount*"
                v-model="form.amount"
                placeholder="Total Amount"
                required
              ></BaseInput>
            </div> -->
          </div>
          <base-button type="submit" class="bg-[#539000]z rounded px-8 py-2 self-start"
            >Submit</base-button
          >
        </form>
      </div>
    </section>

    <div
      id="telebirr_modal"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      v-if="showModal"
    >
      <form
        @submit.prevent=""
        class="flex flex-col gap-4 bg-white w-1/2 p-8 shadow-xl border rounded-xl"
      >
        <div class="flex flex-col">
          <BaseInput v-model="fName" placeholder="Full Name" required></BaseInput>
        </div>
        <div class="flex flex-col">
          <BaseInput v-model="telebirrAccount" placeholder="Telebirr Account"></BaseInput>
        </div>
        <div class="flex flex-col">
          <BaseInput v-model="cAmount" placeholder="Contribution Amount"></BaseInput>
        </div>

        <div class="flex justify-between">
          <BaseButton type="submit">Submit</BaseButton>
          <button class="bg-gray-700 text-white p-2" @click="showModal = false">Cancel</button>
        </div>
      </form>
    </div>
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
