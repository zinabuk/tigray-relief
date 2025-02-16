<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
import { ref, onMounted } from 'vue'
const currentLanguage = ref(localStorage.getItem('lang') || 'en')

const histories = ref([])
const fetchHistories = async () => {
  try {
    const response = await ApiService.get('/users/histories')
    if (response) {
      histories.value = response.data.map((item) => ({
        ...item,
        description: JSON.parse(item.description)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      alert(error)
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}
onMounted(() => {
  fetchHistories()
})
</script>

<template>
  <section class="w-full px-[1%] md:px-[6%] py-12 flex flex-col bg-[#53900F]/5 items-center gap-4">
      <!-- timeline -->
  <div class="relative w-full flex flex-col px-[2%] gap-4 py-12 bg-[#53900F]/5 overflow-hidden">
    <div class="grid md:grid-cols-2 gap-6 w-full" v-for="(history, i) in histories" :key="i">
      <div
        class="flex gap-4 bg-white shadow-2xl p-4 w-full rounded-md"
        :class="[i % 2 === 0 ? 'md:order-1' : 'md:order-2']"
        :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
      >
        <div class="p-2 space-y-6 w-full">
          <div class="timeline-content">
            <div class="timeline-year">
              <span class="text-[#53900F] font-bold text-center text-sm">{{ history.year }}</span>
            </div>
            <img
              :src="BASE_AVATAR + history.image"
              alt="Timeline image"
              class="timeline-image zrounded-lg h-[180px] w-full object-contain transform transition hover:scale-110 duration-300"
            />
          </div>
        </div>
      </div>
      <!-- <div :class="[i % 2 === 0 ? 'order-2 flex justify-end ' : 'order-1']">
       
      </div> -->

      <div
        :class="[i % 2 === 0 ? 'md:order-2 w-full' : 'md:order-1 w-full', 'flex gap-6 w-full']"
        class="rounded-md w-full"
        :data-aos="i % 2 === 0 ? 'fade-left' : 'fade-right'"
      >
        <div
          class="h-full border-2 border-gray-500 border-r-0 border-t-0 border-b-0 relative flex flex-col justify-between zoverflow-hidden"
        >
          <!-- Animated Circle -->
          <div
            class="h-4 w-4 bg-[#53900F] rounded-full absolute -left-2"
            style="animation: move-down 5s infinite ease-in-out"
          ></div>
        </div>

        <div class="p-8 bg-white shadow-2xl">
          <p>{{ history.description[currentLanguage] }}</p>
        </div>
      </div>
    </div>
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
