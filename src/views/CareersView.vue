<!-- <script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

import ApiService from '@/services/apiService'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import SpinningCard from '@/components/open/SpinningCard.vue'
// import CareerService from '@/services/CareerService'

import swal from 'sweetalert'
import dayjs from 'dayjs'

const careers = ref([])

const allCareers = async () => {
  try {
    const response = await ApiService.get('/users/careers')
    if (response.success) {
      careers.value = response.data
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      return
    } else {
      // router.push({ name: 'NetworkError' })
    }
  }
}

const isApply = ref(false)
const career = ref({})

const successMessage = ref('')
const errorMessage = ref('')

const toggleApply = (career) => {
  isApply.value = true
  career.value = career
  successMessage.value = ''
  errorMessage.value = 0
}
const formattedDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

const letter = ref('')
const resume = ref('')
const form = ref({ fullName: '', email: '', phoneNumber: '', applicationLetter: '', cv: '' })

const captureLetter = (file) => {
  letter.value = file
  form.value.applicationLetter = file
}

const captureResume = (file) => {
  resume.value = file.name
  form.value.cv = file
}

// import { useToast } from 'vue-toastify'

const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('phoneNumber', form.value.phoneNumber)
    formData.append('applicationLetter', form.value.applicationLetter)
    formData.append('cv', form.value.cv)
    const response = await ApiService.apply(career.value.id, formData)
    if (response.success) {
      // alert(response.message)
      form.value = {}
      resume.value = ''
      letter.value = ''
      // successMessage.value = response.message
      swal({
        icon: 'success',
        title: 'You have successfully applied.',
        text: 'Job Application'
      })
      errorMessage.value = ''
      setTimeout(() => {
        // isApply.value = false
      }, 5000)
      // const toast = useToast()
      // toast.success('This is a success message!', {
      //   position: 'top-right',
      //   duration: 3000 // 3 seconds
      // })
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      // console.log(error.response.data.message);
      swal({
        icon: 'error',
        title: error.response.data.message,
        text: 'Job Application'
      })
      // errorMessage.value = error.response.data.message
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

onMounted(() => {
  allCareers()
})
</script>

<template>
  <div class="grid w-full grid-cols-1 md:grid-cols-3 justify-between py-4 bg-[#1d4354]/5">
    <div class="relative bgs-green-500 overflow-hiddden">
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape1.754ca456.png"
        alt=""
        class="w-1/4 h-auto object-cover absolute top-0 left-1/4 img-1"
      />
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape4.0580e2ef.svg"
        alt=""
        class="absolute right-0 img-2"
      />
    </div>
    <div class="py-12 flex flex-col items-center justify-center gap-4">
      <h1 class="text-center text-3xl font-semibold">{{ $t('Vacancies at IQ') }}</h1>
      <SpinningCard />

      <p class="text-center" id="it" v-if="careers.length === 0">
        We don't have vacancies this time.
      </p>
    </div>
    <div class="py-4 md:py-12 relative">
      <img
        src="https://startp-next.envytheme.com/_next/static/media/shape4.0580e2ef.svg"
        alt=""
        class="absolute top-0 right-1/2 h-auto img-2"
      />
    </div>
  </div>

  <div class="w-full md:p-[4%] bg-gray-50 a">
    <div
      class="w-full lg:w-[80%] lg:mx-auto py-2 flex flex-col gap-5 bg-red-40r0 justify-center items-start"
    >
      <div
        class="w-full flex flex-col mx-auto lg:w-3/4 shadow"
        v-for="(career, index) in careers"
        :key="index"
      >
        <div class="bg-white w-full p-4">
          <div class="w-full flex justify-between p-4">
            <ul>
              <li class="md:text-[18px] font-bold">
                <h1>{{ career.jobTitle }}</h1>
              </li>
              <li class="md:text-[16px] font-semibolfd">IQ Business Group</li>
              <!-- <li class="text-gray-700 text-[14px]">Posted 17 Days ago ???</li> -->
              <li class="mt-4 bg-gray-500 text-white inline-block text-sm px-2 py-1">
                {{ career.employmentType }}
              </li>
            </ul>
            <img
              src="@/assets/iq-logo.png"
              class="w-20 rounded-full h-20 object-fit bg-cover object-center"
              width="200px"
              height="200px"
            />
          </div>
          <hr class="w-full flex justify-between p-2" />
          <div class="w-full flex justify-between p-4">
            <ul class="flex space-x-4 justify-center items-center">
              <li>
                <button
                  class="bg-blue-900 rounded text-white px-2 py-1"
                  @click="toggleApply(career)"
                >
                  {{ $t('Apply Now') }}
                </button>
              </li>
            </ul>
          </div>
        </div>

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
              Posted on:
              <!-- <span class="font-semibold">
                {{ new Date(Job.createdAt).getDate() }} -
                {{ new Date(Job.createdAt).getMonth() + 1 }} -
                {{ new Date(Job.createdAt).getFullYear() }}</span
              > -->
              {{ formattedDate(career.createdAt) }}
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
        </div>
        <div class="w-full flex justify-between bg-white p-4">
          <ul class="flex space-x-4 p-4 justify-center items-center">
            <li>
              <button class="bg-blue-900 rounded text-white px-2 py-1" @click="toggleApply(career)">
                {{ $t('Apply Now') }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed items-center justify-center modal inset-0 z-50 bg-gray-50/60 flex flex-col gap-4 overflow-auto"
    v-if="isApply"
  >
    <div class="bg-white flex flex-col md:p-12 gap-2 overflow-auto">
      <button class="text-gray-900 text-xl self-end zbg-white" @click="isApply = !isApply">
        Cancel
      </button>
      <h1 class="iq-subtitle text-center font-light">Application Page</h1>

      <form @submit.prevent="submitApplication" class="bg-green-900">
        <div>
          <BaseInput
            v-model="form.fullName"
            inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
            label="Full Name"
          ></BaseInput>
          <BaseInput
            v-model="form.email"
            inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
            label="Email"
          ></BaseInput>
          <BaseInput
            v-model="form.phoneNumber"
            inputClass="px-4 py-2 border-2 outline-none border-iq-color1"
            label="Phone Number"
          ></BaseInput>
        </div>

        <div>
          <span class="text-sm text-blue-700">*Only pdf files</span>

          <BaseFileInput
            @image-update="captureLetter($event)"
            label="Application Letter"
            type="file"
            accept="application/pdf"
            required
          ></BaseFileInput>
          <span>{{ letter.name }}</span>
          <BaseFileInput
            @image-update="captureResume($event)"
            label="Resume"
            type="file"
            accept="application/pdf"
            required
          ></BaseFileInput>
          <span>{{ resume.name }}</span>
          <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <BaseButton type="submit">Apply</BaseButton>
      </form>
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
</style> -->
