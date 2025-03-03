<script setup>
import { ref, onMounted } from 'vue'
import swal from 'sweetalert'
import ApiService from '@/services/apiService'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { BASE_UPLOAD } from '@/config'
const jobs = ref([])

// const isApply = ref(false)
const career = ref({})

// const successMessage = ref('')
const errorMessage = ref('')

const letter = ref('')
const resume = ref('')
const form = ref({ fullName: '', email: '', phoneNumber: '', resume: '', message: '' })

const captureResume = (file) => {
  resume.value = file
  form.value.resume = file
}

async function fetchJobs() {
  const response = await ApiService.get('/admin/vacancies')
  if (response.success) {
    jobs.value = response.data
  }
}

const showApplicationModal = ref(false)

const submitApplication = async () => {
  alert(form.value.phoneNumber)
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('message', form.value.message)
    formData.append('phoneNumber', form.value.phoneNumber)

    if (resume.value) {
      formData.append('resume', resume.value)
    }
    const response = await ApiService.applyJob('/users/applications/' + career.value.id, formData)
    if (response.success) {
      form.value = {}
      resume.value = ''
      letter.value = ''
      swal({
        icon: 'success',
        title: 'You have successfully applied.',
        text: 'Job Application'
      })
      errorMessage.value = ''
      setTimeout(() => {
        showApplicationModal.value = false
      }, 2000)
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      swal({
        icon: 'error',
        title: error.response.data.message,
        text: 'Job Application'
      })
    } else if (error.response && error.response.status === 400 && error.response.data) {
      swal({
        icon: 'error',
        title: error.response.data.error,
        text: 'Job Application'
      })
    } else {
      // router.push({ name: 'NetworkError' })
    }
  }
}

function shareOnFacebook() {
  const url = 'https://resttigray.org'
  // const title = 'Check out this job vacancy!'
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  window.open(facebookUrl, '_blank')
}

function shareOnLinkedIn() {
  const url = 'https://resttigray.org'
  const title = 'Check out this job vacancy!'
  const description = 'This is a description of the article.'
  const linkedInUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
  window.open(linkedInUrl, '_blank')
}

function shareOnTwitter() {
  const url = 'https://resttigray.org'
  const title = 'Check out this job vacancy!'
  const hashtags = 'REST'
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags)}`
  window.open(twitterUrl, '_blank')
}
function isImage(fileName) {
  if (fileName) {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName.toLowerCase())
  }
}

function applyNow(data) {
  career.value = data
  showApplicationModal.value = true
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div class="w-full md:p-[2%] flex items-center justify-center bg-[#53900F]/10">
    <div
      class="w-full md:w-[80%] py-4 flex flex-col gap-5 bg-white shadow-md rounded-lg p-6"
      v-if="jobs.length > 0"
    >
      <div
        class="w-full grid grid-cols-12 shadow-md rounded-md overflow-hidden"
        v-for="(career, index) in jobs"
        :key="index"
      >
        <div class="col-span-12 md:col-span-8">
          <!-- Job Details -->
          <div class="bg-white w-full p-6 shadow-sm">
            <!-- <h2 class="text-lg font-semibold text-gray-800">Job Detail</h2> -->
            <h1 class="text-lg font-semibold">{{ career.jobTitle }}</h1>
            <ul class="w-full flex flex-wrap py-4 text-gray-700">
              <li class="w-full md:basis-1/2">
                <span class="font-medium">Experience:</span>
                <span class="pl-2">{{ career.experience }}</span>
              </li>
              <li class="w-full md:basis-1/2">
                <span class="font-medium">Salary:</span>
                <span class="pl-2">{{ career.salary }}</span>
              </li>
              <li class="w-full md:basis-1/2">
                <span class="font-medium">Country:</span>
                <span class="pl-2">Ethiopia</span>
              </li>
              <li class="w-full md:basis-1/2">
                <span class="font-medium">Location:</span>
                <span class="pl-2">Tigray</span>
              </li>
              <li class="w-full md:basis-1/2">
                <span class="font-medium">Employment Type:</span>
                <span class="pl-2">{{ career.employmentType }}</span>
              </li>
              <li class="w-full md:basis-1/2 text-red-500">
                <span class="font-medium">Deadline:</span>
                <span class="pl-2">{{ career.deadline }}</span>
              </li>
            </ul>
          </div>

          <!-- Job Description -->
          <div class="bg-white w-full p-6 shadow-sm">
            <h1 class="text-lg font-semibold text-gray-800">Job Description</h1>
            <p class="py-2 text-gray-700" v-html="career.description"></p>
          </div>

          <!-- Job Requirements -->
          <div class="bg-white w-full p-6 shadow-sm">
            <h1 class="text-lg font-semibold text-gray-800">Job Requirements</h1>
            <p class="py-2 text-gray-700">{{ career.qualification }}</p>

            <!-- Job File (Image or Download) -->
            <div class="mt-4">
              <div v-if="isImage(career.file)">
                <img
                  :src="BASE_UPLOAD + career.file"
                  alt="Job File"
                  class="h-24 w-24 object-contain border border-gray-300 shadow-sm rounded-md"
                />
              </div>
              <div v-else>
                <a
                  :href="BASE_UPLOAD + career.file"
                  target="_blank"
                  class="text-blue-500 hover:underline"
                >
                  {{ career.file }}
                </a>
              </div>
            </div>
          </div>
          <button
            @click.prevent="applyNow(career)"
            class="px-4 py-1 rounded mx-8 bg-[#53900F] text-white"
          >
            Easy Apply
          </button>
          <!-- Social Media Sharing -->
          <div class="bg-white p-4 shadow-sm">
            <h1 class="text-gray-800 font-semibold">Share on Social Media</h1>
            <div class="flex space-x-3 mt-2">
              <a href="#" @click="shareOnFacebook()" class="text-blue-600 hover:text-blue-800">
                <font-awesome-icon :icon="['fab', 'facebook']" class="text-2xl"></font-awesome-icon>
              </a>
              <a href="#" @click="shareOnTwitter()" class="text-blue-400 hover:text-blue-600">
                <font-awesome-icon :icon="['fab', 'twitter']" class="text-2xl"></font-awesome-icon>
              </a>
              <a href="#" @click="shareOnLinkedIn()" class="text-blue-700 hover:text-blue-900">
                <font-awesome-icon :icon="['fab', 'linkedin']" class="text-2xl"></font-awesome-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Jobs Available -->
    <div v-else class="text-gray-600 text-lg font-medium py-6">No jobs available at this time</div>

    <div
      class="fixed z-50 inset-0 bg-slate-100/40 flex items-center justify-center"
      v-if="showApplicationModal"
    >
      <div class="bg-white w-full md:w-1/2 flex flex-col md:p-12 gap-1 p-6 rounded-lg shadow-lg">
        <button @click.prevent="showApplicationModal = false" class="self-end">
          <font-awesome-icon icon="times" class="hover:text-red-600"></font-awesome-icon>
        </button>
        <div class="flex justify-center">
          <h1 class="text-lg font-semibold text-gray-800">Application Form</h1>
        </div>
        <form @submit.prevent="submitApplication" class="flex w-full flex-col gap-2">
          <div class="w-full space-y-4">
            <BaseInput
              v-model="form.fullName"
              label="Full Name"
              class="w-full"
              required
            ></BaseInput>

            <BaseInput v-model="form.email" label="Email Address" class="w-full"></BaseInput>

            <BaseInput
              v-model="form.phoneNumber"
              label="Phone Number"
              class="w-full"
              required
            ></BaseInput>

            <BaseTextarea
              v-model="form.message"
              label="Application Letter"
              class="w-full"
              required
            ></BaseTextarea>
          </div>

          <!-- File Upload -->
          <div class="w-full space-y-2">
            <BaseFileInput
              @image-update="captureResume($event)"
              label="Upload Your CV (PDF)"
              type="file"
              accept="application/pdf"
              icon="file"
              class="w-fullz"
            ></BaseFileInput>

            <span class="text-sm text-gray-600">Maximum file size: **128MB**</span>
            <span class="text-sm text-green-700" v-if="form.resume.name">{{
              form.resume.name
            }}</span>
          </div>

          <!-- Error Message -->
          <p class="text-red-600 text-sm" v-if="errorMessage">{{ errorMessage }}</p>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            class="w-full bg-green-600z text-white py-2 rounded-lg hzover:bg-green-700"
          >
            Apply Now
          </BaseButton>
        </form>
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
