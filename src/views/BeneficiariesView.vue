<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const beneficiaries = ref([])
const fetchBeneficiaries = async () => {
  try {
    const response = await ApiService.get('/users/beneficiaries')
    if (response) {
      beneficiaries.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        description: JSON.parse(item.description)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}

onMounted(() => {
  fetchBeneficiaries()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative hidden md:block">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Programs</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl font-bold">{{ $t('Home') }}</router-link>
          <router-link to="/beneficiaries" class="text-[#539000] px-4 py-2">{{
            $t('Programs')
          }}</router-link>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#53900F]/10">
    <!-- <h1 class="text-3xl font-bold">Tenders we currently have..</h1> -->
    <div class="w-full flex flex-col gap- bg-white">
      <div
        v-for="(benefer, i) in beneficiaries"
        :key="i"
        class="w-full grid md:grid-cols-2 gap-8 p-4 shadow"
      >
        <div :class="[i % 2 === 0 ? 'md:order-1' : 'md:order-2', 'overflow-hidden basis-1/2']">
          <img
            v-if="benefer.image"
            :src="BASE_AVATAR + benefer.image"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover hover:scale-[1.2] transition-transform duration-700 delay-75"
          />
          <h1 v-else class="w-full h-96 flex items-start justify-center font-bold text-6xl">
            {{ benefer.title[currentLanguage][0] }}
          </h1>
        </div>
        <div
          :class="[i % 2 === 0 ? 'md:order-2' : 'md:order-1']"
          class="flex flex-col flex-wrap gap-4 items-start justify-censter basis-1/2"
        >
          <h1 class="text-2xl">
            {{ benefer.title[currentLanguage] }}
          </h1>
          <p class="zline-clamp-5">{{ benefer.description[currentLanguage] }}</p>
          <!-- <router-link to="/" class="text-[#53900F] font-bold">{{
            $t('Read More')
          }}</router-link> -->
        </div>
      </div>
    </div>
  </section>
</template>
