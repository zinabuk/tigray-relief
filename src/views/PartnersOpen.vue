<script setup>
import ApiService from '@/services/apiService'
import { onMounted, ref } from 'vue'
import { BASE_AVATAR } from '@/config'
const partners = ref([])
const currentLanguage = 'en'
const fetchPartners = async () => {
  try {
    const response = await ApiService.get('/users/partnerships')
    if (response) {
      partners.value = response.data.map((item) => ({
        ...item,
        businessName: JSON.parse(item.businessName)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 100000)
    }
  }
}
onMounted(() => {
  fetchPartners()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Partners</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</router-link>
          <router-link to="/partners" class="text-[#539000] px-4 py-2">{{
            $t('Partners')
          }}</router-link>
        </div>
      </div>
    </div>
    <div class="w-full px-[4%] py-12 flex flex-col items-center justify-center">
      <div
        class="w-full md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center place-content-center"
      >
        <div
          v-for="(partner, i) in partners"
          :key="i"
          class="flex flex-col gap-4 justify-start zshadow zbg-white"
        >
          <a :href="partner.website" v-if="partner.website" target="_blank">
            <div class="w-32 h-32 mx-auto">
              <img
                v-if="partner.logo"
                :src="BASE_AVATAR + partner.logo"
                :alt="partner.businessName"
                class="w-full h-full rounded-full object-cover"
              />
              <h2 v-else class="w-24 h-24 font-semibold text-6xl text-center text-black"></h2>
            </div>
            <p class="text-center font-bold">{{ partner.businessName[currentLanguage] }}</p></a
          >
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
</template>
