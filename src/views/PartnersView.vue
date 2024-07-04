<script setup>
import { ref, onMounted } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

import { useRouter } from 'vue-router'

import BaseTextarea from '@/components/base/BaseTextarea.vue'
import ApiService from '@/services/apiService'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

import { BASE_AVATAR } from '@/config'

import { Autoplay } from 'swiper/modules'

const partners = ref([])
const getAllPartners = async () => {
  try {
    const response = await ApiService.get('/users/partnerships')
    // alert(response.success)
    if (response.success) {
      partners.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      partners.value = []
    } else {
      // router.push({ name: 'NetworkError' })
    }
  }
}
const form = ref({
  businessName: '',
  email: '',
  phoneNumber: '',
  logo: '',
  website: '',
  specializeArea: '',
  description: '',
})

const message = ref('')
const success = ref('')

// const router = useRouter()
async function savePartner() {
  try {
    const response = await ApiService.post('/users/partnerships', form.value)
    if (response.success) {
      form.value = {
        businessName: '',
        email: '',
        phoneNumber: '',
        logo: '',
        website: '',
        specializeArea: '',
        description: ''
      }
      getAllPartners()
      success.value = response.message

      setTimeout(() => {
        success.value = ''
      }, 3000)

      message.value = ''
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.status === 404) {
      message.value = error.response.data.message
    } else {
      // router.push({ name: 'NetworkError' })
    }
  }
}

onMounted(() => {
  getAllPartners()
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
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/tenders" class="text-[#539000] px-4 py-2">Partners</a>
        </div>
      </div>
    </div>
  </section>
  <section
    class="w-full flex flex-col justify-center items-center px-[1%] md:px-[6%] py-4 md:py-12 gap-8"
  >
    <div class="text-4xl font-bold"><h1>Our Partners</h1></div>
    <div class="w-full flex justify-center items-center">
      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :autoplay="{ delay: 3000 }"
        :space-between="30"
        class="w-full flex mx-auto items-center justify-center"
        :breakpoints="{
          '768': { slidesPerView: 2, spaceBetween: 20 },
          '1024': { slidesPerView: 4, spaceBetween: 30 }
        }"
      >
        <swiper-slide
          v-for="(partner, i) in partners"
          :key="i"
          class="flex justify-center itmes-center"
        >
          <a v-if="partner.website" :href="partner.website" target="_blank">
            <img
              :src="BASE_AVATAR + `${partner.logo}`"
              :alt="partner.businessName"
              class="w-56 md:w-56 h-50 mx-auto"
          /></a>
          <img
            v-else
            :src="BASE_AVATAR + `${partner.logo}`"
            :alt="partner.businessName"
            class="w-56 md:w-56 h-auto mx-auto"
          />
          <h4 class="text-center">{{ partner.businessName }}</h4>
        </swiper-slide>
      </Swiper>
    </div>
  </section>
  <section
    class="w-full bg-gray-50 px-[1%] md:px-[6%] py-6 md:py-12 grid grid-cold-1 md:grid-cols-2 gap-4"
  >
    <div
      class="shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] px-2"
    >
      <img src="@/assets/rest-logo.png" class="w-full object-cover object-center" />
      <div class="px-4 py-6">
        <h3 class="text-[#333] text-xl font-bold">{{ $t('Partnership_Form') }}</h3>
        <p class="mt-4 text-gray-500">
          This application form is specifically designed for companies and individuals seeking to
          collaborate with REST. If you have a project and require a partner, please get in touch
          with us by completing the form.
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col items-center justify-center p-6 gap-2 shadow rounded-lg">
      <h1 class="text-center text-xl font-semibold">Partnership Form</h1>
      <p class="justify-self-end text-green-500 bg-white" v-if="success">{{ success }}</p>
      <form @submit.prevent="savePartner" class="w-full flex flex-col gap-4">
        <BaseInput
          v-model="form.businessName"
          type="text"
          required
          inputClass="px-8 py-3 "
          placeholder="Your business name"
        ></BaseInput>
        <BaseInput
          v-model="form.email"
          type="email"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Email"
          autocomplete="true"
        ></BaseInput>

        <BaseInput
          v-model="form.phoneNumber"
          type="text"
          inputClass="px-8 py-3"
          required
          placeholder="Enter Your Phone number"
        ></BaseInput>
        <BaseInput
          v-model="form.website"
          inputClass="px-8 py-3"
          placeholder="Enter your website's link"
        ></BaseInput>
        <BaseInput
          v-model="form.specializeArea"
          required
          inputClass="px-8 py-3"
          placeholder="Specialize area"
        ></BaseInput>

        <BaseTextarea
          v-model="form.description"
          rows="4"
          class=""
          textareaClasses="px-8 "
          placeholder="Description"
        ></BaseTextarea>
        <p v-if="message" class="text-red-700">{{ message }}</p>
        <div class="flex gap-4">
          <BaseButton type="submit" class="self-start">Submit</BaseButton>
          <button type="reset" class="bg-gray-600 text-white px-4 py-2">Reset</button>
        </div>
      </form>
    </div>
  </section>
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
</style>
