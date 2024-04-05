<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

// import ApiService from '@/services/ApiService'

// import { useAuthStore } from '@/stores/auth'
// const { logIn } = useAuthStore()
const form = ref({
  email: ''
})

let message = ref('')
// let isFocus = ref(false)
// const router = useRouter()

async function handleLogin() {
  //   try {
  //     const res = await ApiService.forgotPassword(form.value)
  //     if (res.success) {
  //       alert('We have sent a link to your email')
  //     }
  //   } catch (err) {
  //     // alert(err)
  //   }
}
</script>

<template>
  <section class="w-full px-[6%] py-12 flex items-center justify-center">
    <div
      class="shadow-lg w-full border-2 flex flex-col justify-center rounded-md p-12 space-y-4 md:w-4/12"
    >
      <router-link to="/" class="underline text-iq-color1">Go home</router-link>

      <!-- <img
        src="@/assets/i.png"
        class="w-20 rounded-full h-20 mx-auto object-fit bg-cover object-center"
        width="200px"
        height="200px"
      /> -->
      <h1 class="text-lg">
        Enter your user account's verified email address and we will send you a password reset link.
      </h1>

      <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4 items-center">
        <BaseInput
          type="text"
          v-model="form.email"
          inputClass="focus:border focus:outline-none border-yellow-300 focus:bg-white focus:text-black  bg-[#539000]/30  px-4  py-3  w-full"
          placeholder="Enter you email address"
          required
          label="Email"
        ></BaseInput>

        <BaseButton
          class="w-full button transition-colors delay-200 duration-1000 hovcer:bg-[#325ac2]"
          type="submit"
          >Send me password</BaseButton
        >
      </form>
      <h1 class="text-xl font-semibold text-red-400">{{ message }}</h1>
    </div>
  </section>
</template>

<style scoped></style>
