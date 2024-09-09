<script setup>
import ApiService from '@/services/apiService'
import { BASE_UPLOAD } from '@/config'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import swal from 'sweetalert'
const router = useRouter()

const isApply = ref(false)
const tender = ref({})
const document = ref('')
const form = ref({ fullName: '', email: '', phoneNumber: '', document: '' })

const captureDocument = (file) => {
  document.value = file
  form.value.document = file
}

const errorMessage = ref('')
const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('phoneNumber', form.value.phoneNumber)
    // formData.append('applicationLetter', form.value.applicationLetter)
    formData.append('document', form.value.document)
    const response = await ApiService.applyTender(
      '/users/application-tenders/' + tender.value.id,
      formData
    )
    if (response.success) {
      form.value = {}
      document.value = ''
      swal({
        icon: 'success',
        title: 'You have successfully applied.',
        text: 'Tender Application'
      })
      errorMessage.value = ''
      setTimeout(() => {}, 5000)
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      swal({
        icon: 'error',
        title: error.response.data.message,
        text: 'Tender Application'
      })
    } else if (error.response && error.response.status === 400 && error.response.data) {
      swal({
        icon: 'error',
        title: error.response.data.error,
        text: 'Tender Application'
      })
    } else {
      // router.push({ name: 'NetworkError' })
    }
  }
}

const successMessage = ref('')
const toggleApply = (tenderToApply) => {
  isApply.value = true
  tender.value = tenderToApply
  successMessage.value = ''
  errorMessage.value = 0
}

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const tenders = ref([])

const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/tenders')
    if (response) {
      tenders.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        organization: JSON.parse(item.organization),
        description: JSON.parse(item.description)
      }))
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

onMounted(() => {
  fetchTenders()
})
function isImage(fileName) {
  return /\.(jpg|jpeg|png|gif)$/i.test(fileName.toLowerCase())
}
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Tenders</h1>
        <div class="flex gap-4">
          <a href="#contact-us" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/tenders" class="text-[#539000] px-4 py-2">Tenders</a>
        </div>
      </div>
    </div>
  </section>
<<<<<<< HEAD
=======
  <!-- Services -->
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4">
    <!-- <h1 class="text-3xl font-bold">Tenders we currently have..</h1> -->
    <div class="w-full px-12 ">
      <div v-for="(tender, i) in tenders" :key="i" class=" gap-4">
        <div class="bg-white w-full shadow-sm">
          <div class="w-full flex justify-between p-4">
            <ul>
              <li class="md:text-[16px] font-semibolfd">Tigray Relief Society</li>
              <!-- <li class="text-gray-700 text-[14px]">Posted 17 Days ago ???</li> -->
              <li class="mt-4 bg-gray-500 text-white inline-block text-sm px-2 py-1">
                {{ tender.title[currentLanguage] }}
              </li>
            </ul>
            <img
              src="@/assets/00.png"
              class="w-20 zrounded-full h-20 object-conatin"
              width="200px"
              height="200px"
            />
          </div>

         <div v-if="tender.image" class="p-4">


            <div v-if="isImage(tender.image)">
                <img
                  :src="BASE_UPLOAD+tender.image"
                  alt="Image"
                  class="h-56 w-56 object-contain"
                />
            </div>
            <div v-else>
              <a :href="BASE_UPLOAD+tender.image" target="_blank" class="text-blue-500">
                {{ tender.image }}
              </a>
            </div>

          </div>

          <h1 v-else class="w-24 h-24  p-4 text-center font-bold text-6xl">
            {{ tender.title[currentLanguage] }}
          </h1>
        </div>
        <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
          <h1>{{ tender.title[currentLanguage] }}</h1>
          <h6 class="text-gray-500">{{ tender.organization[currentLanguage] }}</h6>
          <h3 class="text-lg font-bold">
            {{ tender.deadline }}
          </h3>
          <p class="line-clamp-5">{{ tender.description[currentLanguage] }}</p>
          <router-link to="/about" class="text-[#53900F] font-bold">{{
            $t('Read More')
          }}</router-link>
        </div>
>>>>>>> 2541c6a5fe05f969f7dae262d939f4666fdeaafa

  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#53900F]/10">
    <!-- <h1 class="text-3xl font-bold">{{ $t('News and stories from us') }}</h1> -->
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xl">
      <div v-for="(tender, i) in tenders" :key="i" class="gap-4 bg-white shadow w-full h-auto p-4">
        <div class="flex flex-col w-full h-full gap-2 justify-between">
          <div class="flex flex-col w-full h-auto gap-1">
            <h1 class="text-lg font-bold">{{ tender.title[currentLanguage] }}</h1>
            <p class="text-black/70">{{ tender.organization[currentLanguage] }}</p>
            <p class="text-break">{{ tender.description[currentLanguage] }}</p>
          </div>
          <div class="flex justify-between">
            <button
              @click="isApply = true"
              class="self-start bg-[#53900F] text-white px-4 py-1 border rounded-md"
            >
              Apply
            </button>

            <button
              v-if="tender.image"
              @click="viewDocument"
              class="bg-white border-[#53900F] p-1 border rounded-md text-[#53900F]"
            >
              <font-awesome-icon icon="eye"></font-awesome-icon> <span>View Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    class="fixed items-center justify-center rounded-lg inset-0 z-50 bg-[#53900F]/40 flex flex-col gap-4 overflow-auto modal"
    v-if="isApply"
  >
    <div
      class="bg-white flex items-center justify-center border rounded-md md:w-[40%] flex-col md:px-12 md:py-2 gap-2 overflow-auto"
    >
      <div class="flex justify-between">
        <h1 class="text-center font-semibold text-2xl">Application Page</h1>
      </div>
      <hr />
      <!-- <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p> -->
      <form @submit.prevent="submitApplication" class="flex flex-col gap-4">
        <div class="flex gap-6">
          <div>
            <BaseInput
              v-model="form.fullName"
              inputClass="px-4 py-2  outline-none border-iq-color1"
              label="Full Name"
              type="text"
              required
            ></BaseInput>
            <BaseInput
              v-model="form.email"
              inputClass="px-4 py-2  outline-none "
              label="Email"
              type="email"
              required
            ></BaseInput>
            <BaseInput
              v-model="form.phoneNumber"
              inputClass="px-4 "
              label="Phone Number"
              required
            ></BaseInput>
          </div>
        </div>
        <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>
        <div class="flex flex-col gap-2 justify-between">
          <div class="flex">
            <BaseFileInput
              @image-update="captureDocument($event)"
              label="document"
              type="file"
              accept="application/pdf"
            ></BaseFileInput>
          </div>
          <span v-if="form.document.name">{{ form.document.name }}</span>
          <span v-else class="text-sm text-blue-600">*Only pdf files</span>

          <div class="flex gap-8 items-center zjustify-center">
            <BaseButton type="submit">Apply</BaseButton>
            <button class=" px-4 py-2 border rounded-md" @click="isApply = !isApply">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
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
