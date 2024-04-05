<script setup>
import { ref } from 'vue'
// import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { useAuthStore } from '@/stores/auth'

const { logIn } = useAuthStore()
// const { errorMessage, } = storeToRefs(useAuthStore())
const formData = ref({
  email: '',
  password: ''
})

const router = useRouter()

const loginLoader = ref(false)

async function handleLogin() {
  loginLoader.value = true
  //   errorMessage.value = ''
  const res = await logIn(formData.value)
  if (res) {
    router.push({ name: 'dashboard' })
    formData.value = {}
  }
}
</script>

<template>
  <section class="w-[82%] py-12 bg-white px-[6%] flex items-center justify-center">
    <div
      class="shadow-inner border-2 flex flex-col justify-center rounded-md p-12 space-y-4 bg-white w-full"
    >
      <h1 class="font-bold text-center">Sign In</h1>

      <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4 items-center">
        <BaseInput
          type="email"
          v-model="formData.email"
          inputClass="focus:border focus:outline-none border-yellow-300 bg-[#539000]/30 border-iq-color1 focus:bg-white focus:text-black px-4 py-3 w-full"
          placeholder="your email address"
          required
          label="Email"
        ></BaseInput>
        <BaseInput
          type="password"
          v-model="formData.password"
          inputClass="focus:border focus:outline-none border-yellow-300 focus:bg-white focus:text-black  bg-[#539000]/30  px-4  py-3  w-full"
          placeholder="your password"
          label="Password"
          required
        ></BaseInput>
        <router-link
          :to="{ name: 'forgot-password' }"
          class="self-end text-blue-500 hover:text-[#53900]"
          >Forgot Password</router-link
        >
        <BaseButton
          class="w-full button flex group items-center justify-center gap-4 transition-colors delay-200 duration-1000 border rounded-xl hover:border-[#53900]"
          type="submit"
        >
          <p
            class="w-4 h-4 rounded-full border-2 border-white border-l-blue-700 animate-spin duration-[2000s]"
            v-if="loginLoader === true"
          ></p>
          <span>Login</span>
        </BaseButton>
      </form>
      <!-- <h1 class="text-xl font-semibold text-red-400">{{ message }}</h1> -->
    </div>
  </section>
</template>

<style scoped></style>
