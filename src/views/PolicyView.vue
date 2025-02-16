<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())



onMounted(() => {
  fetchPolicies()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Policy and strategies</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</router-link>
          <router-link to="/beneficiaries" class="text-[#539000] px-4 py-2">{{
            $t('Policies and strategies')
          }}</router-link>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  
</template>
