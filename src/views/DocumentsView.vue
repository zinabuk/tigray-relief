<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
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

// /admin/documents
// /admin/publications
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
    const response = await ApiService.applyTender(
      '/users/application-tenders/' + tender.value.id,
      formData
    )
    console.log(formData)
    if (response.success) {
      form.value = {}
      document.value = ''
      swal({
        icon: 'success',
        title: 'You have successfully applied.',
        text: 'Application'
      })
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
}

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const documents = ref([])

const fetchTenders = async () => {
  try {
    const response = await ApiService.get('/admin/documents')
    if (response.success) {
      documents.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
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
        <h1 class="text-4xl font-bold">Documents</h1>
        <div class="flex gap-4">
          <a href="/" class="px-4 py-2 rounded-xl text-white font-bold">Home</a>
          <a href="/documents" class="text-[#539000] px-4 py-2">Documents</a>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4">
    <!-- <h1 class="text-3xl font-bold">Tenders we currently have..</h1> -->
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(document, i) in documents"
        :key="i"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div class="relative group">
          <img
            v-if="document.image"
            :src="BASE_AVATAR + tender.image"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover"
          />
          <div
            class="gap-4 items-center justify-center hidden group-hover:flex absolute inset-0 bg-[#53900F]/40"
          >
            <button class="bg-white text-[#53900F] px-4 py-2 rounded-xl">Download</button>
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
