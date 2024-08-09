<script setup>
import { ref, onMounted } from 'vue'

import apiService from '@/services/apiService'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())
const faqs = ref([])

const fetchFaqs = async () => {
  try {
    const response = await apiService.get('/admin/faqs')
    if (response) {
      faqs.value = response.data.map((item) => ({
        ...item,
        question: JSON.parse(item.question),
        answer: JSON.parse(item.answer)
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

const faqIndex = ref(null)

const toggleAccordion = (index) => {
  faqIndex.value = faqIndex.value === index ? '' : index
}
onMounted(fetchFaqs)
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{$t('Frequently asked questions')}}</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</router-link>
          <router-link to="/faqs" class="text-[#539000] px-4 py-2">{{
            $t('Frequently asked questions')
          }}</router-link>
        </div>
      </div>
    </div>
  </section>
  <div class="px-[2%] md:px-[10%] grid grid-cols-1 gap-6 py- md:py-8 bg-[#53900F]/10">
    <ul class="grid grid-cols-1 gap-6 w-full">
      <li v-for="(faq, index) in faqs" :key="index" class="w-full">
        <button
          class="w-full border border-t-0 border-r-0 border-l-0 rounded p-2 flex flex-col"
          @click="toggleAccordion(index)"
          :class="[{ 'bg-[#288FB2]/30x bg-white': faqIndex === index }]"
        >
          <div :class="['w-full flex justify-between font-semibold']">
            <!-- <span
              :class="[
                'w-6 text-center flex items-center justify-center h-6 text-sm rounded-full border',
                { 'text-[#288FB2] bg-white': faqIndex === index }
              ]"
              >{{ index < 10 ? '0' + index : index }}</span
            > -->
            <p class="text-[20px]">{{faq.question[currentLanguage] }}</p>
            <span v-if="faqIndex != index">+</span>
            <span v-else class="text-[#288FB2] w-6 h-6 rounded-full border bg-white">-</span>
          </div>
          <!-- <transition name="accordion"> -->
          <p v-show="faqIndex === index" class="py-6 text-smz panel text-black/95">
            {{ faq.answer[currentLanguage] }}
          </p>
          <!-- </transition> -->
        </button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.img-1 {
  animation: img-spin 2s linear infinite;
}

@keyframes img-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.img-2 {
  animation: svg-spin 5s linear infinite;
}
@keyframes svg-spin {
  0% {
    transform: rotate(0deg);
    top: 20%;
  }
  25% {
    transform: rotate(90deg);
    top: 40%;
    right: 30%;
  }
  50% {
    transform: rotate(270deg);
    top: 60%;
    right: 10%;
  }
  100% {
    transform: rotate(360deg);
    top: 0%;
    right: 0;
  }
}

.panelll {
  animation: faq 0.5s;
}

@keyframes faq {
  0% {
    height: 0%;
  }

  100% {
    height: 100%;
  }
}
</style>
