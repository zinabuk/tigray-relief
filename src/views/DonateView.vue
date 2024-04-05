<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
let form = ref({
  service: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  amount: ''
})

const submitDonation = async () => {
  // try {
  //   const response = 0
  // } catch (error) {
  //   alert(error)
  // }
}
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Donation</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">Home</router-link>

          <router-link to="/donate" class="text-[#539000] px-4 py-2">Donate</router-link>
        </div>
      </div>
    </div>

    <!-- donation form -->

    <section class="w-full px-[6%] py-12 bg-gray-50">
      <div class="shadow bg-white rounded-lg p-6">
        <div>
          <h4 class="text-lg font-bold mb-2">
            Partner With Us As We Bring Relief To Our Communities
          </h4>

          <h2 class="text-2xl font-bold mb-2">Donation Form</h2>
          <p class="text-gray-500 mb-4">"*" indicates required fields</p>
          <h5 class="text-lg font-bold mb-2">Donation Amount</h5>
        </div>

        <form class="flex flex-col" @submit.prevent="submitDonation">
          <div class="mb-4">
            <label class="text-gray-600"
              >To which branch or in honor of whom would you like to allocate your donation?</label
            >
            <BaseInput
              type="text"
              inputClass="border border-yellow-300"
              label="Enter a service / branch "
              v-model="form.service"
            ></BaseInput>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="First Name*"
                v-model="form.firstName"
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Last Name"
                v-medel="form.lastName"
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Email"
                v-model="form.email"
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Phone Number*"
                v-model="form.phoneNumber"
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Address"
                v-model="form.address"
              ></BaseInput>
            </div>
            <div>
              <BaseInput
                inputClass="border border-yellow-300"
                label="Total Amount*"
                v-model="form.amount"
              ></BaseInput>
            </div>
          </div>
          <base-button type="submit" class="bg-[#539000] text-white rounded px-8 py-2 self-start"
            >Donate</base-button
          >
        </form>
      </div>
    </section>
  </section>
</template>

<style>
/* @media (min-width: 1024px) {
      .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
      }
    } */
</style>
