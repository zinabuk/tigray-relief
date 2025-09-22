<script setup>
import { ref, onMounted } from 'vue'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import ApiService from '@/services/apiService'

import swal from 'sweetalert'
let form = ref({
  email: '',
  fullName: '',
  phoneNumber: '',
  subject: '',
  message: ''
})

// import { useRouter } from 'vue-router'
// const router = useRouter()
let success = ref('')
const submitContact = async () => {
  try {
    const response = await ApiService.post('/users/comments', form.value)

    if (response.success) {
      swal({
        icon: 'success',
        title: response.message
      })
      form.value = {}
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

let infoG = ref([])
const fetchInfography = async () => {
  try {
    const response = await ApiService.get('/admin/contact-address')

    if (response.success) {
      // alert('OK')
      infoG.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(fetchInfography)
</script>

<template>
  <section class="w-full">
    <div class="w-full relative hidden md:block">
      <img src="@/assets/img/4.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ $t('Contact Us') }}</h1>
        <a href="#contact-us" class="bg-[#539000] px-4 py-2 rounded-xl text-white font-bold">{{
          $t('Scroll to the form')
        }}</a>
      </div>
    </div>
    <!-- <div class="w-full relative">
      <img
        src="@/assets/hero-o.jpg"
        alt=""
        class="absolute inset-0 max-h-[300px] w-full object-cover"
      />
     
    </div> -->

    <!-- map -->

    <div
      class="px-[2%] grid grid-cols-1 md:grid-cols-3 gap-4 itemss-center justify-center py-12 bg-[#53900F]/10 overflow-hidden"
      v-for="(contact, index) in infoG"
      :key="index"
    >
      <div
        class="bg-white flex flex-col zshadow-2xl items-center py-6 gap-4 group transition-allz duration-700z hover:-translate-y-2"
        data-aos="fade-right"
      >
        <font-awesome-icon
          icon="envelope"
          class="ztext-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#53900F] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Write us an email</h1>
        <div class="font-extralight">
          <!-- <p class="group-hover:text-green-600">{{}}</p> -->
          <p>{{ contact.mail }}</p>
        </div>
      </div>
      <div
        class="bg-white flex flex-col zshadow-2xl items-center py-12 gap-4 group transition-all duration-700 hover:-translate-y-2"
        data-aos="fade-up"
      >
        <font-awesome-icon
          icon="map-marker-alt"
          class="ztext-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#53900F] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Visit Us Here</h1>
        <div class="font-extralight">
          <p>{{ contact.address }}</p>
        </div>
      </div>
      <div
        class="bg-white flex flex-col zshadow-2xl items-center py-6 gap-4 group transition-all duration-700 hover:-translate-y-2 justify-b"
        data-aos="fade-left"
      >
        <font-awesome-icon
          icon="phone"
          class="Ztext-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#53900F] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Call Here</h1>
        <div class="font-extralight">
          <p class="group-hover:text-green-500">{{}}</p>
          <p>{{ contact.contactNumber }}</p>
        </div>
      </div>
    </div>

    <section class="w-full flex flex-col justify-center items-center py-12 px-[2%]" id="contact-us">
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-2xl font-semibold">Get In Touch With Us</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 py-12 gap-4">
        <div class="w-full shadow-xl p-4">
          <img src="@/assets/img/images.jpeg" alt="" class="w-full h-[90%]" />
        </div>
        <div class="w-full flex flex-col gap-4 shadow-xl zborder zrounded-xl p-4">
          <h1 v-if="success" class="text-green-500 bg-white">{{ success }}</h1>
          <form @submit.prevent="submitContact" class="w-full flex flex-col gap-4">
            <BaseInput v-model="form.fullName" type="text" required label="Full Name"></BaseInput>
            <BaseInput
              v-model="form.email"
              type="email"
              required
              label="Email address"
              autocomplete="true" 
            ></BaseInput>

            <div class="flex flex-col md:flex-row gap-2 w-full">
              <BaseInput
                v-model="form.phoneNumber"
                type="text"
                required
                autocomplete="on"
                label="Phone Number"
              ></BaseInput>
              <BaseInput
                v-model="form.subject"
                type="text"
                required
                label="Your message subject"
              ></BaseInput>
            </div>
            <BaseTextarea
              v-model="form.message"
              rows="4"
              label="Enter your message"
              placeholder=""
            ></BaseTextarea>

            <BaseButton type="submit">Send Message</BaseButton>
          </form>
        </div>
      </div>
    </section>
  </section>
  <section class="w-full">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.1095627141435!2d39.50642587579328!3d13.528867202414492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166b1de8ad586c59%3A0x99a44a2984be29b1!2sTigrai%20Biotechnology%20Center!5e0!3m2!1sen!2set!4v1757929104353!5m2!1sen!2set"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="w-full"
    ></iframe>
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
