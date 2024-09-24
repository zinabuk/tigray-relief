<script setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { useAuthStore } from '@/stores/auth'
const role = ref(localStorage.getItem('role') || '')
const { errorMessage } = storeToRefs(useAuthStore())

const router = useRouter()

watchEffect(() => {
  if (role.value === 'admin') {
    router.push({ name: 'admin-home' })
  } else {
    router.push({ name: 'staff-home' })
  }
})
const { logIn } = useAuthStore()
// const { errorMessage, } = storeToRefs(useAuthStore())
const formData = ref({
  username: '',
  password: ''
})

const loginLoader = ref(false)

async function handleLogin() {
  try {
    const res = await logIn(formData.value)
    if (res) {
      router.push({ name: 'dashboard' })
      formData.value = {}
    }
  } catch (error) {
    // alert(error)
  }

  setTimeout(() => {
    formData.value = {}
  }, 1000)
}
</script>

<template>
  <section class="w-full py-12 bg-[#53900f]/5 h-screen px-[6%] flex items-center justify-center">
    <div
      class=" flex flex-col justify-center rounded-md p-12 space-y-4 md:w-4/12 bg-white shadow"
    >
      <img
        src="@/assets/rest-logo.png"
        class="w- h- mx-auto object-fit bg-cover object-center"
        width="200px"
        height="200px"
      />
      <h1 class="font-bold text-center">Sign In</h1>
      <!-- <p v-if="errorMessage" class="text-sm text-red-400 text-center">{{ errorMessage }}</p> -->
      <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4 items-center">
        <BaseInput
          v-model="formData.username"
          inputClass="focus:border focus:outline-none     focus:text-black px-4 py-3 w-full"
          placeholder="Email / phone number"
          required
          label="Username"
        ></BaseInput>
        <BaseInput
          type="password"
          v-model="formData.password"
          inputClass="focus:border focus:outline-none focus:text-black    px-4  py-3  w-full"
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
      <h1 class="text-lg font-semibold text-red-400" v-if="errorMessage">{{ errorMessage }}</h1>
    </div>
  </section>
</template>

<style scoped></style>
