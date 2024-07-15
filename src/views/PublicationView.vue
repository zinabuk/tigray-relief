<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const isApply = ref(false)
const tender = ref({})
const document = ref('')
const form = ref({ fullName: '', email: '', phoneNumber: '', document: '' })


const captureDocument = (file) => {
  document.value = file
  form.value.document = file
}
const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('phoneNumber', form.value.phoneNumber)
    // formData.append('applicationLetter', form.value.applicationLetter)
    formData.append('document', form.value.document)
    const response = await ApiService.applyTender('/users/application-tenders/' + tender.value.id, formData)
    console.log(formData)
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
  <!-- Services -->
  <section class="w-full px-[6%] py-12 flex flex-col items-center gap-4">
    <!-- <h1 class="text-3xl font-bold">Tenders we currently have..</h1> -->
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(tender, i) in tenders" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            v-if="tender.image"
            :src="BASE_AVATAR + tender.image"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover"
          />
          <h1 v-else class="w-24 h-24 text-center font-bold text-6xl">
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

        <div class="w-full flex justify-between bg-white p-4">
          <ul class="flex space-x-4 p-4 justify-center items-center">
            <li>
              <button
                class="bg-[#53900F] rounded text-white px-2 py-1"
                @click="toggleApply(tender)"
              >
                {{ $t('Apply Now') }}
              </button>
            </li>
          </ul>
        </div>

      <div
        class="fixed items-center justify-center inset-0 z-50 bg-[#53900F]/40 flex flex-col gap-4 overflow-auto modal"
        v-if="isApply"
      >
        <div class="bg-white flex flex-col md:p-12 gap-2 overflow-auto">
          <div class="flex justify-between">
            <h1 class="text-center font-semibold">Application Page</h1>
          <button
            class="text-gray-900 self-end bg-white border border-black px-2"
            @click="isApply = !isApply"
          >
            Cancel
          </button>
          </div>
          <!-- <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p> -->
          <form @submit.prevent="submitApplication" class="flex flex-col gap-4">
            <div class="flex gap-6">
              <div>
                <BaseInput
                  v-model="form.fullName"
                  inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
                  label="Full Name"
                  required
                ></BaseInput>
                <BaseInput
                  v-model="form.email"
                  inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
                  label="Email"
                  required
                ></BaseInput>
                <BaseInput
                  v-model="form.phoneNumber"
                  inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
                  label="Phone Number"
                  required
                ></BaseInput>
              </div>
              <div>
              

                <!-- <BaseFileInput
                  @image-update="captureLetter($event)"
                  label="Application Letter"
                  type="file"
                  accept="application/pdf"
                  fileClass="my-2"
                  class="my-4"
                ></BaseFileInput>
                <span>{{ form.applicationLetter.name }}</span> -->
              
              </div>
            </div>
            <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>
          <div class="flex justify-between">
            <div class="flex">
              <BaseFileInput
                @image-update="captureDocument($event)"
                label="document"
                type="file"
                accept="application/pdf"
              ></BaseFileInput>
            </div>
            <span v-if="form.document.name">{{ form.document.name }}</span>
            <span v-else class="text-sm text-red-600">*Only pdf files</span>
   
                <BaseButton type="submit">Apply</BaseButton>
          </div>
          </form>
        </div>
      </div>


      </div>
    </div>
  </section>
</template>
