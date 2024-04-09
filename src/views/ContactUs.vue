<script setup>
import { ref } from 'vue'

import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import ApiService from '@/services/apiService'
// const comments = ref([])

let form = ref({
  emailAddress: '',
  fullName: '',
  phoneNumber: '',
  messageSubject: '',
  messageBody: ''
})

import { useRouter } from 'vue-router'
const router = useRouter()

const submitContact = async () => {
  try {
    const response = await ApiService.post('/users/comments')
    if (response.success) {
      alert('OK')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Contact us</h1>
        <a href="#contact-us" class="bg-[#539000] px-4 py-2 rounded-xl text-white font-bold"
          >Scroll to the form</a
        >
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
    <section class="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3642.8835664230915!2d39.46931181830917!3d13.48513923952096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d13.4838516!2d39.472198399999996!4m5!1s0x166afd3bdb7f3623%3A0x1c7f010ff4c99e3e!2z4YuL4YqTIOGJpOGJtSDhjYXhiJXhjYjhibUg4Yib4YiV4Ymg4Yir4YuKIOGIqOGLteGKpOGJtSDhibXhjI3hiKvhi60gKOGIm-GIqOGJtSkgfCBSZWxpZWYgU29jaWV0eSBvZiBUaWdyYXkgKFJFU1QpIEhlYWQgT2ZmaWNlLCBGRlBGK1AyVywgTWVrZWxl!3m2!1d13.486872!2d39.4725871!5e0!3m2!1sen!2set!4v1709274199476!5m2!1sen!2set"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="w-full"
      ></iframe>
    </section>
    <div
      class="px-24 grid grid-cols-1 md:grid-cols-3 gap-4 itemss-center justify-center py-12 bg-gray-50"
    >
      <div
        class="bg-white flex flex-col shadow-2xl items-center py-6 gap-4 group transition-all duration-700 hover:-translate-y-2"
      >
        <font-awesome-icon
          icon="envelope"
          class="text-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#539000] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Write an email</h1>
        <div class="font-extralight">
          <p class="group-hover:text-green-600">rest@gmail.com</p>
          <p>restfund@gmail.com</p>
        </div>
      </div>
      <div
        class="bg-white flex flex-col shadow-2xl items-center py-12 gap-4 group transition-all duration-700 hover:-translate-y-2"
      >
        <font-awesome-icon
          icon="map-marker-alt"
          class="text-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#539000] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Visit Here</h1>
        <div class="font-extralight">
          <p>FFPF+P2W, Mekele, Ethiopia</p>
        </div>
      </div>
      <div
        class="bg-white flex flex-col shadow-2xl items-center py-6 gap-4 group transition-all duration-700 hover:-translate-y-2"
      >
        <font-awesome-icon
          icon="phone"
          class="text-yellow-300 p-4 text-xl rounded-full bg-gray-50 group-hover:bg-[#539000] group-hover:text-white"
        ></font-awesome-icon>
        <h1 class="text-2xl font-semibold">Call Here</h1>
        <div class="font-extralight">
          <p class="group-hover:text-green-500">+251 92945 7007</p>
          <p>+251 not specified</p>
        </div>
      </div>
    </div>

    <section class="w-full flex flex-col justify-center items-center py-12 px-[6%]" id="contact-us">
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-2xl font-semibold">Get In Touch With Us</h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 py-12 gap-4">
        <div class="w-full">
          <img src="@/assets/contact2.png" alt="" class="w-full h-[90%]" />
        </div>
        <div class="w-full">
          <form @submit.prevent="submitContact" class="w-full flex flex-col gap-4">
            <BaseInput
              v-model="form.fullName"
              type="text"
              inputClass="border border-yellow-300"
              required
              label="Full Name"
            ></BaseInput>
            <BaseInput
              v-model="form.emailAddress"
              type="email"
              required
              label="Email address"
              autocomplete="true"
              inputClass="border border-yellow-300"
            ></BaseInput>

            <div class="flex flex-col md:flex-row gap-2 w-full">
              <BaseInput
                v-model="form.phoneNumber"
                type="text"
                required
                autocomplete="on"
                inputClass="border border-yellow-300"
                label="Phone Number"
              ></BaseInput>
              <BaseInput
                v-model="form.messageSubject"
                type="text"
                required
                label="Your message subject"
                inputClass="border border-yellow-300"
              ></BaseInput>
            </div>
            <BaseTextarea
              v-model="form.messageBody"
              rows="4"
              placeholder="Enter your message"
              textareaClasses="border border-yellow-300"
            ></BaseTextarea>

            <BaseButton type="submit">Send Message</BaseButton>
            <h1>{{ form.messageBody }}</h1>
          </form>
        </div>
      </div>
    </section>
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
