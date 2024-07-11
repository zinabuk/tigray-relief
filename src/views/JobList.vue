<script setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()
import swal from 'sweetalert'
import ApiService from '@/services/apiService'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

const jobs = [
  {
    title: 'Financial Offiecer',
    experience: '2-4 years',
    deadline: '2024-05-31',
    requirement:
      'Proficient in HTML, CSS, and JavaScript. Experience with front-end frameworks like React or Vue is preferred.',
    description:
      'Responsible for developing user interfaces for web applications. Collaborate with designers and backend developers to implement and maintain responsive and interactive front-end components.',
    salary: '$60,000 - $80,000 per year',
    employmentType: 'Full-time'
  },
  {
    title: 'Secretary',
    experience: '3-5 years',
    deadline: '2024-06-15',
    requirement:
      'Strong knowledge of server-side programming languages such as Node.js or Python. Experience with databases and RESTful APIs is required.',
    description:
      'Responsible for designing, developing, and maintaining the server-side logic of web applications. Implement efficient and scalable backend systems and integrate with external services.',
    salary: '$70,000 - $90,000 per year',
    employmentType: 'Full-time'
  },
  {
    title: 'HR',
    experience: '4-6 years',
    deadline: '2024-07-10',
    requirement:
      'Proficient in both front-end and back-end technologies. Familiarity with frameworks like React, Node.js, and Express is essential.',
    description:
      'Responsible for handling both client-side and server-side development tasks. Collaborate with cross-functional teams to deliver end-to-end solutions and ensure seamless integration between front-end and back-end systems.',
    salary: '$80,000 - $100,000 per year',
    employmentType: 'Full-time'
  },
  {
    title: 'IT support',
    experience: '2-4 years',
    deadline: '2024-06-30',
    requirement:
      'Strong understanding of user-centered design principles. Proficiency in design tools like Sketch or Figma. Experience with prototyping tools and front-end development skills are a plus.',
    description:
      'Responsible for creating intuitive and visually appealing user interfaces. Conduct user research, create wireframes and prototypes, and collaborate with developers to ensure a seamless user experience.',
    salary: '$50,000 - $70,000 per year',
    employmentType: 'Full-time'
  },
  {
    title: 'Driver',
    experience: '5-8 years',
    deadline: '2024-08-15',
    requirement:
      'Strong background in statistics, mathematics, and machine learning. Proficiency in programming languages like Python or R. Experience with data manipulation, visualization, and modeling techniques is required.',
    description:
      'Responsible for analyzing complex datasets, developing predictive models, and extracting insights from data. Collaborate with cross-functional teams to drive data-driven decision-making and solve business problems.',
    salary: '$90,000 - $120,000 per year',
    employmentType: 'Full-time'
  }
]

const isApply = ref(false)
const career = ref({})

const successMessage = ref('')
const errorMessage = ref('')

const toggleApply = (job) => {
  isApply.value = true
  career.value = job
  successMessage.value = ''
  errorMessage.value = 0
}

const letter = ref('')
const resume = ref('')
const form = ref({ fullName: '', email: '', phoneNumber: '', applicationLetter: '', cv: '' })

const captureLetter = (file) => {
  letter.value = file
  form.value.applicationLetter = file
}

const captureResume = (file) => {
  resume.value = file
  form.value.cv = file
}

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
const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('fullName', form.value.fullName)
    formData.append('email', form.value.email)
    formData.append('phoneNumber', form.value.phoneNumber)
    formData.append('applicationLetter', form.value.applicationLetter)
    formData.append('cv', form.value.cv)
    const response = await ApiService.applyJob('users/careeres/' + career.value.id, formData)
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

onMounted(() => {
  allCareers()
})
</script>

<template>
  <div class="w-full md:p-[4%] bg-[#53900F]/10">
    <div
      class="w-full lg:w-[%] lg:mx-auto py-2 flex flex-col gap-5 bg-red-40r0 justify-center items-start"
    >
      <div
        class="w-full flex flex-col mx-auto lg:w-3/4 shadow-inner"
        v-for="(career, index) in jobs"
        :key="index"
      >
        <div class="bg-white w-full p-4 shadow-xl">
          <div class="w-full flex justify-between p-4">
            <ul>
              <li class="md:text-[18px] font-bold">
                <h1>{{ career.title }}</h1>
              </li>
              <li class="md:text-[16px] font-semibolfd">Tigray Relief Society</li>
              <!-- <li class="text-gray-700 text-[14px]">Posted 17 Days ago ???</li> -->
              <li class="mt-4 bg-gray-500 text-white inline-block text-sm px-2 py-1">
                {{ career.experience }}
              </li>
            </ul>
            <img
              src="@/assets/00.png"
              class="w-20 zrounded-full h-20 object-conatin"
              width="200px"
              height="200px"
            />
          </div>
          <hr class="w-full flex justify-between p-2" />
          <div class="w-full flex justify-between p-4">
            <ul class="flex space-x-4 justify-center items-center">
              <li>
                <button
                  class="bg-[#53900F] rounded text-white px-2 py-1"
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
              <button
                class="bg-[#53900F] rounded text-white px-2 py-1"
                @click="toggleApply(career)"
              >
                {{ $t('Apply Now') }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed items-center justify-center inset-0 z-50 bg-[#53900F]/40 flex flex-col gap-4 overflow-auto modal"
    v-if="isApply"
  >
    <div class="bg-white flex flex-col md:p-12 gap-2 overflow-auto">
      <button
        class="text-gray-900 self-end bg-white border border-black px-2"
        @click="isApply = !isApply"
      >
        Cancel
      </button>
      <h1 class="text-center font-semibold">Application Page</h1>
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
            <span class="text-sm text-red-600">*Only pdf files</span>

            <BaseFileInput
              @image-update="captureLetter($event)"
              label="Application Letter"
              type="file"
              accept="application/pdf"
              required
              fileClass="my-2"
              class="my-4"
            ></BaseFileInput>
            <span>{{ form.applicationLetter.name }}</span>
            <BaseFileInput
              @image-update="captureResume($event)"
              label="Resume"
              type="file"
              accept="application/pdf"
              required
            ></BaseFileInput>
            <span>{{ form.cv.name }}</span>
          </div>
        </div>
        <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>
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
