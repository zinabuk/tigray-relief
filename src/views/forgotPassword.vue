<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import apiService from '@/services/apiService'

import swal from 'sweetalert'
const form = ref({
  email: ''
})

let message = ref('')
function inputFocus() {}
async function handleForgot() {
  try {
    const res = await apiService.post('/admin/forgot-password', form.value)
    if (res.success) {
      swal({
        icon: 'success',
        title: 'A password reset link is sent to your email address',
        text: 'It will be expired after 10 minutes.'
      })
      form.value = {}
    }
  } catch (err) {
    // alert(err)
  }
}
</script>

<template>
  <section class="w-full h-screen px-[5%] flex items-center justify-center bg-[#288fb2]/10">
    <div
      class="shadow-lgx bg-white shadow flex flex-col justify-center p-6 space-y-4 w-[80%] md:w-[40%]"
    >
      <router-link to="/" class="underline text-meyla-color1">{{ $t('Home') }}</router-link>

      <h1 class="text-[16px] md:meyla-subtitle text-center">
        {{ $t('Enter your verified email address and we will send you a password reset link.') }}
      </h1>

      <form @submit.prevent="handleForgot" class="w-full flex flex-col gap-4 items-center">
        <BaseInput
          type="text"
          v-model="form.email"
          @handleFocus="inputFocus"
          inputClass="border focus:border focus:outline-none border-meyla-color1 focus:bg-white focus:text-black px-4x py-3x w-full placeholder:text-[#87CEFA]"
          placeholder="Enter your email"
          required
          :label="$t('Email')"
        ></BaseInput>

        <BaseButton
          class="w-full button transition-colors delay-200 duration-1000 hovcer:bg-[#325ac2]"
          type="submit"
          >{{ $t('Submit') }}</BaseButton
        >
      </form>
      <h1 class="text-xl font-semibold text-red-400">{{ message }}</h1>
    </div>
  </section>
</template>

<style scoped></style>
