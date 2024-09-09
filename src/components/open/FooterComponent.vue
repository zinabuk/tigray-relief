<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert'

import apiService from '@/services/apiService'
import BaseInput from '../base/BaseInput.vue'
// import BaseButton from '../base/BaseButton.vue'

const currentLanguage = ref(localStorage.getItem('lang'))

const services = ref([])
const fetchServices = async () => {
  try {
    const response = await apiService.get('/admin/services')
    if (response.success) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription)
      }))
    }
  } catch (error) {
    // alert(error)
  }
}

let medias = ref([])
const fetchMedia = async () => {
  try {
    const response = await apiService.get('/admin/social-medias')

    if (response.success) {
      // alert('OK')
      medias.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}
const Subscriber = ref({ email: '' })
// const message = ref('')
const subscribe = async () => {
  const response = await apiService.post('/users/subscribers', Subscriber.value)
  if (response.success) {
    swal({ icon: 'success', title: 'Successfuly subscribed!', text: response.message })
    // message.value = response.message
    Subscriber.value = {}
    setTimeout(() => {
      // message.value = ''
    }, 3000)
  }
}

let infoG = ref([])
const fetchInfography = async () => {
  try {
    const response = await apiService.get('/admin/contact-address')

    if (response.success) {
      // alert('OK')
      infoG.value = response.data
      console.log(infoG.value)
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(fetchServices(), fetchInfography(), fetchMedia())
</script>

<template>
  <section class="w-full px-[2%] bg-[#53900F] font-bodld text-white py-12 text-[12px]">
    <div class="w-full grid grid-cols-1 md:grid-cols-4 py-8 gap-4">
      <!-- <div>
        <img
          src="@/assets/rest-logo.png"
          alt=""
          width="200px"
          height="100px"
          class="px-4 py-2 w-52 h-28"
        />
        <p class="text-lg">
          We offer crisis response and development programs, including food aid, healthcare,
          education, water and sanitation, and livelihood initiatives.
        </p>
      </div> -->
      <div class="flex flex-col gap-2">
        <h1 class="text-xl">{{ $t('Contacts') }}</h1>
        <!-- <hr /> -->
        <div class="text-[14px]" v-for="(contact, index) in infoG" :key="index">
          <h2>{{ contact.openHours }}</h2>
          <div class="flex gap-1">
            <h1>Call:</h1>
            <p>{{ contact.contactNumber }}</p>
          </div>
          <div class="flex gap-1">
            <h1>Email:</h1>
            <p>{{ contact.mail }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl">{{ $t('Services') }}</h1>
        <!-- <hr /> -->

        <ul class="flex flex-col">
          <li class="flex flex-col text-[14px]">
            <router-link
              :to="{
                name: 'service-detail',
                params: { title: service.serviceTitle[currentLanguage] }
              }"
              class="hover:text-[#288FB2]z"
              v-for="(service, i) in services"
              :key="i"
              ><span class="hover:text-white/80 text-white">
                {{ $t(`${service.serviceTitle[currentLanguage]}`) }}
              </span>
              <!-- <hr class="text-[#001F3F]" /> -->
            </router-link>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl">{{ $t('Quick Links') }}</h1>
        <!-- <hr /> -->
        <ul class="flex flex-col">
          <li class="flex flex-col text-[14px]">
            <router-link to="/">{{ $t('Home') }}</router-link
            ><router-link to="/about">{{ $t('About Us') }}</router-link>
            <router-link to="/our-governance">{{ $t('News and Media') }}</router-link>
            <router-link to="/volunteer">{{ $t('Volunteers') }}</router-link
            ><router-link to="/donate">{{ $t('Donate') }}</router-link
            ><router-link to="/contact">{{ $t('Contact Us') }}</router-link>
            <router-link to="/privacy">Privacy Policy</router-link>
            <!-- <router-link to="/terms" target="_blank">Terms and Conditions</router-link> -->
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-lg">{{ $t('Subscribe for Newsletter') }}</h1>
        <!-- <hr /> -->
        <form @submit.prevent="subscribe" class="flex flex-col gap-2">
          <BaseInput
            placeholder="Enter your email address"
            type="email"
            required
            v-model="Subscriber.email"
            inputClass="text-black"
          ></BaseInput>
          <button
            class="border rounded border-white self-start px-2 py-1 text-yellow-400 hover:text-yellow-500"
            type="submit"
          >
            {{ $t('SUBSCRIBE') }}
          </button>
        </form>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-xl font bold text-white">{{ $t('Follow Us:') }}</h1>
      <hr />
      <!-- <h2>@zedkbro</h2> -->
      <div class="flex items-center zjustify-center">
        <a
          :href="social.link"
          target="_blank"
          v-for="(social, index) in medias"
          :key="index"
          class="flex items-center justify-center"
        >
          <font-awesome-icon
            :icon="['fab', 'facebook']"
            class="text-white hover:text-white/80 p-2"
            v-if="social.platform.toLowerCase() === 'facebook'"
          >
          </font-awesome-icon>

          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'twitter'"
            :icon="['fab', 'twitter']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'youtube'"
            :icon="['fab', 'youtube']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'telegram'"
            :icon="['fab', 'telegram']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'linkedin'"
            :icon="['fab', 'linkedin']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else
            :icon="['fab', 'whatsapp']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
        </a>
      </div>
    </div>
  </section>
  <!-- bg-[#53900F]/10  -->
  <div class="w-full bg-[#53900F]/10 text-black flex flex-col md:flex-row justify-between px-[2%]">
    <p class="text-center p-2">© 2024 REST. All rights reserved.</p>
    <div class="flex gap-2 items-center justify-center">
      <h1>Powered by</h1>
      <a href="https://iq-businesses.com/" target="_blank" class="text-gray-600"
        >IQ Business Group PLC</a
      >
    </div>
  </div>
</template>
