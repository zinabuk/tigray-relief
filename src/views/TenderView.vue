<script setup>
import ApiService from '@/services/apiService'
import { BASE_UPLOAD } from '@/config'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import swal from 'sweetalert'
// const router = useRouter()

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

// const successMessage = ref('')
// const toggleApply = (tenderToApply) => {
//   isApply.value = true
//   tender.value = tenderToApply
//   successMessage.value = ''
//   errorMessage.value = 0
// }

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const tenders = ref([])
const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/tenders')
    if (response) {
      tenders.value = response.data
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
    <div class="w-full relative hidden md:block">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">Tenders</h1>
        <div class="flex gap-4">
          <a href="/" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/tenders" class="text-[#539000] px-4 py-2">Tenders</a>
        </div>
      </div>
    </div>
  </section>
  <section
    class="w-full px-[2%] py-12 flex flex-col items-center gap-6 bg-gradient-to-b from-[#53900F]/10 to-[#ffffff]"
    v-if="tenders.length"
  >
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(tender, i) in tenders"
        :key="i"
        class="bg-white shadow-lg rounded-xl overflow-hidden p-6 hover:shadow-2xl transition-all duration-300"
      >
        <div class="flex flex-col h-full gap-4">
          <div class="flex flex-col gap-2">
            <h1 class="text-xl font-bold text-gray-800">{{ tender.title }}</h1>
            <p class="text-gray-600 text-sm">
              By <span class="font-semibold">{{ tender.organization }}</span>
            </p>
            <p class="text-gray-500 text-sm">
              Deadline: <span class="font-semibold text-red-600">{{ tender.deadline }}</span>
            </p>
            <p class="text-gray-700 text-sm leading-relaxed">
              {{ tender.description }}
            </p>
          </div>
          <div class="flex justify-between items-center mt-auto">
            <button
              @click="isApply = true"
              class="bg-[#53900F] text-white px-5 py-2 rounded-lg hover:bg-[#53900F]/90 transition-all duration-300"
            >
              Apply Now
            </button>

            <a
              v-if="tender.file"
              :href="BASE_UPLOAD + tender.file"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#53900F] border border-[#53900F] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#53900F] hover:text-white transition-all duration-300"
            >
              <font-awesome-icon icon="eye"></font-awesome-icon> <span>View Document</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="w-full px-[2%] py-4 text-center">No content for the moment</section>

  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#53900F]/40 backdrop-blur-sm px-4"
    v-if="isApply"
  >
    <div
      class="bg-white shadow-lg border rounded-lg w-full md:w-[40%] p-6 flex flex-col gap-4 relative transition-all duration-300"
    >
      <div class="flex justify-between items-center border-b pb-3">
        <h1 class="text-xl font-semibold text-gray-800">Application Page</h1>
        <button @click="isApply = false" class="text-gray-500 hover:text-gray-800 transition">
          ✖
        </button>
      </div>

      <form @submit.prevent="submitApplication" class="flex flex-col gap-4">
        <div class="flex flex-col gap-3">
          <BaseInput
            v-model="form.fullName"
            inputClass="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            label="Full Name"
            type="text"
            required
          ></BaseInput>

          <BaseInput
            v-model="form.email"
            inputClass="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            label="Email"
            type="email"
            required
          ></BaseInput>

          <BaseInput
            v-model="form.phoneNumber"
            inputClass="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
            label="Phone Number"
            required
          ></BaseInput>
        </div>

        <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>

        <div class="flex flex-col gap-2">
          <BaseFileInput
            @image-update="captureDocument($event)"
            label="Attach document"
            type="file"
            accept="application/pdf"
          ></BaseFileInput>

          <span v-if="form.document.name" class="text-gray-600 text-sm">{{
            form.document.name
          }}</span>
          <span v-else class="text-sm text-blue-600">*Only PDF files allowed</span>
        </div>

        <div class="flex gap-4 justify-cente">
          <button
            type="submit"
            class="bg-[#53900F] px-4 py-1 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Apply
          </button>

          <button
            @click.prevent="isApply = false"
            class="border border-gray-400 px-4 py-1 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            Cancel
          </button>
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
