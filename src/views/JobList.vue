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

// const toggleApply = (job) => {
//   isApply.value = true
//   career.value = job
//   successMessage.value = ''
//   errorMessage.value = 0
// }

const letter = ref('')
const resume = ref('')
const form = ref({ fullName: '', email: '', resume: '', message: '' })

// const captureLetter = (file) => {
//   letter.value = file
//   form.value.applicationLetter = file
// }

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
const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('phoneNumber', form.value.phoneNumber)
    // formData.append('applicationLetter', form.value.applicationLetter)
    formData.append('resume', form.value.resume)
    const response = await ApiService.applyJob('/users/applications/' + career.value.id, formData)
    console.log(formData)
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
      setTimeout(() => {}, 5000)
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
  return /\.(jpg|jpeg|png|gif)$/i.test(fileName.toLowerCase())
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div class="w-full md:p-[2%] flex items-center justify-center bg-[#53900F]/10">
    <div
      class="w-full md:w-[80%] py-2 flex flex-col gap-5 bg-red-40r0 justify-center items-start"
      v-if="jobs.length > 0"
    >
      <div class="w-full grid grid-cols-12 shadow" v-for="(career, index) in jobs" :key="index">
        <div class="col-span-12 md:col-span-8">
          <div
            class="pt-3 w-full text-[14px] flex flex-col bg-white justify-center mx-auto px-8 shadow-inner"
          >
            <h2 class="w-full text-[16px] pt-4 font-semibold">Job Detail</h2>
            <ul class="w-full flex flex-wrap py-4">
              <li class="w-full md:basis-1/2">
                Experience:
                <span class="pl-2 text-sm font-semibold"> {{ career.experience }}</span>
              </li>
              <li class="w-full md:basis-1/2">
                Salary: <span class="pl-2 font-semibold"> {{ career.salary }}</span>
              </li>
              <li class="w-full md:basis-1/2">
                Country: <span class="pl-2 text-sm font-semibold"> Ethiopia</span>
              </li>
              <li class="w-full md:basis-1/2">
                Location:
                <span class="pl-2 font-semibold"> Tigray</span>
              </li>
              <li class="w-full md:basis-1/2">
                Employment Type:
                <span class="pl-2 text-sm font-semibold">{{ career.employmentType }}</span>
              </li>

              <li class="divide-x-2 w-full md:basis-1/2">
                Deadline:
                <span class="text-red-500 text-sm font-semibold">{{ career.deadline }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-white w-full p-4">
            <div class="w-full p-4">
              <h1 class="text-[16px] font-semibold">Job Description</h1>
              <ul class="py-2">
                <li class="">{{ career.description }}</li>
              </ul>
            </div>
          </div>
          <div class="bg-white w-full p-4">
            <div class="w-full p-4">
              <h1 class="text-[16px] font-semibold">Job Requirement:</h1>
              <ul class="py-2">
                <li class="">{{ career.qualification }}</li>
              </ul>
            </div>
            <div>
              <div v-if="isImage(career.file)">
                <img
                  :src="BASE_UPLOAD + career.file"
                  alt="Image"
                  class="h-24 w-24 object-contain"
                />
              </div>
              <div v-else>
                <a :href="BASE_UPLOAD + career.file" target="_blank" class="text-blue-500">
                  {{ career.file }}
                </a>
              </div>
            </div>
          </div>
          <div class="bg-white p-3">
            <h1 class="txt-white font-bold">{{ $t('SHARE ON SOCIAL MEDIA') }}</h1>
            <div class="flex">
              <a class="txt-white" href="#" @click="shareOnFacebook()">
                <font-awesome-icon :icon="['fab', 'facebook']" class="text-whitex p-2 rounded">
                </font-awesome-icon> </a
              ><a class="txt-white" href="#" @click="shareOnTwitter()">
                <font-awesome-icon :icon="['fab', 'twitter']" class="text-whitex p-2 rounded">
                </font-awesome-icon> </a
              ><a class="txt-white" href="#" @click="shareOnLinkedIn()">
                <font-awesome-icon :icon="['fab', 'linkedin']" class="text-whitex p-2 rounded">
                </font-awesome-icon>
              </a>
            </div>
          </div>
        </div>
        <div
          class="bg-white flex flex-col md:p-12 gap-2 overflow-auto col-span-12 md:col-span-4 p-4 borde"
        >
          <div class="flex justify-between">
            <h1 class="text-center font-semibold">Application Form</h1>
            <!-- <button
              class="text-gray-900 self-end bg-white border border-black px-2"
              @click="isApply = !isApply"
            >
              Cancel
            </button> -->
          </div>

          <form @submit.prevent="submitApplication" class="flex w-full flex-col gap-4">
            <div class="flex w-full gap-6">
              <div class="w-full space-y-2">
                <BaseInput
                  v-model="form.fullName"
                  inputClass=""
                  label="Name"
                  class="w-full"
                  required
                ></BaseInput>
                <BaseInput
                  v-model="form.email"
                  inputClass=""
                  label="Email"
                  class="w-full"
                  required
                ></BaseInput>
                <BaseTextarea
                  v-model="form.message"
                  label="Message"
                  placeholder="Your cover message/letter sent to employer"
                ></BaseTextarea>
                <!-- <BaseInput
                  v-model="form.phoneNumber"
                  inputClass=""
                  label="Phone Number"
                  class="w-full"
                  required
                ></BaseInput> -->
              </div>
            </div>
            <div class="flex justify-between w-full flex-col gap-2">
              <div class="flex w-full px-4">
                <BaseFileInput
                  @image-update="captureResume($event)"
                  label="Browse your CV"
                  type="file"
                  accept="application/pdf"
                  icon="camera"
                  fileClass=""
                >
                </BaseFileInput>
              </div>
              <span class="text-sm font">Maximum file upload size: 128MB</span>
              <span>{{ form.resume.name }}</span>
              <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>

              <BaseButton type="submit" class="w-full">Apply Now</BaseButton>
            </div>
          </form>
        </div>
        <!-- <div class="w-full flex justify-between bg-white p-4"> -->
        <!-- <ul class="flex space-x-4 p-4 justify-center items-center">
            <li> -->
        <!-- <button
                class="bg-[#53900F] rounded text-white px-2 py-1"
                @click="toggleApply(career)"
              >
                {{ $t('Apply Now') }}
              </button> -->
        <!-- </li>
          </ul>
        </div> -->
      </div>
    </div>

    <div v-else>No jobs available this time</div>
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
