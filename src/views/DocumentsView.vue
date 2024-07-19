<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
import { BASE_UPLOAD } from '@/config'

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

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const documents = ref([])

const fetchDocuments = async () => {
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
  fetchDocuments()
})
</script>

<template>
  <section class="w-full ">
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
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#53900F]/15">
    <!-- <h1 class="text-3xl font-bold">Tenders we currently have..</h1> -->
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(document, i) in documents" :key="i" class="grid gap-4 shadow-2xl zp-4 rounded-xl bg-white p-2">
        <div class="relative group">
          <img
            v-if="document.image"
            :src="BASE_UPLOAD + document.image"
            alt=""
            class="h-[300px] w-full rounded-xl zw-full object-contain"
          />
          <div
            class="gap-4 items-end p-4 justify-start flex absolute inset-0 bg-[#53900F]/20"
          >
            <button class="bg-white text-[#53900F] px-4 py-2 rounded-xl">
              <a :href="BASE_UPLOAD + document.document" target="_blank" class="flex gap-4 items-center justify-center"><font-awesome-icon icon="download"></font-awesome-icon>Download</a>
            </button>
          </div>
        </div>

        <div class="p-4">
          <h1 class="line-clamp-2 font-semibold">{{ document.title[currentLanguage] }}</h1>
          <p class="line-clamp-4">{{ document.description[currentLanguage] }}</p>
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
