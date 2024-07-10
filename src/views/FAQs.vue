<script setup>
import { ref, onMounted } from 'vue'
import apiService from '@/services/apiService'

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

const toggleAccordion = (index) => {
  faqIndex.value = faqIndex.value === index ? '' : index
}
const faqIndex = ref(0)
onMounted(fetchFaqs)
</script>

<template>
  <div class="grid w-full grid-cols-1 md:grid-cols-3 justify-between py- bg-[#1d4354]/5">
    <div class="relative overflow-hiddden">
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape1.754ca456.png"
        alt=""
        class="w-1/4 h-auto object-cover absolute top-0 left-1/4 img-1"
      />
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape4.0580e2ef.svg"
        alt=""
        class="absolute right-0 img-2"
      />
    </div>
    <div class="py-12 flex flex-col items-center justify-center gap-4">
      <h1 class="text-center text-2xl md:text-3xl font-semibold">
        {{ $t('Frequently Asked Questions') }}
      </h1>
      <SpinningCard />
    </div>
    <div class="py-4 md:py-12 relative">
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape4.0580e2ef.svg"
        alt=""
        class="absolute top-0 right-1/2 h-auto img-2"
      />
    </div>
  </div>

  <div class="w-full px-1 md:px-7 py-4 md:py-12 bg-gray-50">
    <div
      class="w-full lg:w-80% lg:mx-auto py-6 flex flex-col md:flex-row gap-5 bg-s-400 justify-center items-start"
    >
      <div class="w-full flex flex-col gap-4 lg:w-3/4 shadow">
        <div class="bg-white w-full py-4">
          <div class="w-full flex justify-between p-4">
            <ul class="flex flex-col gap-1 w-full">
              <li v-for="(faq, index) in faqs" :key="index">
                <button class="text-lg font-semibold border p-2" @click="toggleAccordion(index)">
                  {{ faq.question }} <span v-if="faqIndex != index">+</span> <span v-else>-</span>
                </button>

                <transition name="accordion">
                  <p v-if="faqIndex === index" class="mt-2">{{ faq.answer }}</p>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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

.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease;
}

.accordion-enter,
.accordion-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
