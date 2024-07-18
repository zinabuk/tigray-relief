<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())
// import { useRouter } from 'vue-router'
// const router = useRouter()
import { ref, onMounted } from 'vue'

const teams = ref([])
const fetchTeams = async () => {
  try {
    const response = await ApiService.get('/admin/our-teams')

    if (response.success) {
      teams.value = response.data.map((item) => ({
        fullName: JSON.parse(item.fullName),
        biography: JSON.parse(item.biography),
        profession: JSON.parse(item.profession)
      }))
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      alert(error)
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const about = ref([])
const getAboutus = async () => {
  try {
    const response = await ApiService.get('users/aboutus')
    if (response.success) {
      about.value = response.data.map((item) => ({
        ...item,
        establishment: JSON.parse(item.establishment),
        mission: JSON.parse(item.mission),
        vision: JSON.parse(item.vision),
        coreValues: JSON.parse(item.coreValues),
        expertise: JSON.parse(item.expertise)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      alert('error')
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}

const histories = ref([])
const fetchHistories = async () => {
  try {
    const response = await ApiService.get('/users/histories')
    if (response) {
      histories.value = response.data.map((item) => ({
        ...item,
        description: JSON.parse(item.description)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      alert(error)
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}
onMounted(fetchTeams(), getAboutus(), fetchHistories())
</script>

<template>
  <section class="w-full">
    <div class="w-full relative">
      <img src="@/assets/hero-o.jpg" alt="" class="w-full max-h-[222px] object-cover" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ $t('About REST') }}</h1>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</router-link>
          <router-link to="/services" class="text-[#539000] px-4 py-2">{{
            $t('About Us')
          }}</router-link>
        </div>
      </div>
    </div>
  </section>
  <section
    class="w-full py-12 px-[2%] grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
    id="establishment"
  >
    <div class="flex flex-col shadow-xl p-4" v-for="(aboutus, i) in about" :key="i">
      <h1 class="text-4xl font-bold mb-4">Who we are.</h1>
      <p class="text-lg" data-aos="fade-right">
        {{ aboutus.establishment[currentLanguage] }}
      </p>
      <router-link
        :to="{ name: 'contact' }"
        class="bg-[#539000] self-center px-4 py-2 text-white font-bold"
        data-aos="fade-right"
        >{{ $t('Get in touch') }}</router-link
      >
    </div>
    <img
      src="@/assets/d.jpg"
      alt=""
      class="w-full object-cover h-auto shadow-xl"
      data-aos="fade-left"
    />
  </section>

  <section class="flex flex-col px-[2%] gap-4 py-12 bg-green-900/10 items-center overflow-hidden">
    <div class="w-full mx-auto">
      <h1 class="text-center text-4xl font-semibold zcapitalize">
        Positive change all over the region
      </h1>
    </div>
    <div
      class="w-full grid grid-cols-1 md:grid-cols-3 gap-4"
      v-for="(aboutus, i) in about"
      :key="i"
    >
      <div
        class="p-6 flex flex-col gap-4 bg-white items-center justify-center shadow-xl"
        data-aos="fade-right"
      >
        <!-- <font-awesome-icon icon="bullseye" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/target.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Mission</h1>
        <p class="lowercase">
          {{ aboutus.mission[currentLanguage] }}
        </p>
      </div>

      <div
        class="p-6 flex flex-col gap-4 shadow-xl bg-white items-center justify-center"
        data-aos="fade-up"
      >
        <!-- <font-awesome-icon icon="eye" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/vision.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Vision</h1>
        <p class="lowercase">
          {{ aboutus.vision[currentLanguage] }}
        </p>
      </div>
      <div
        class="p-6 flex flex-col gap-4 shadow-xl bg-white items-center justify-between"
        data-aos="fade-left"
      >
        <!-- <font-awesome-icon icon="balance-scale" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/united.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Values</h1>
        <p class="lowercase">
          {{ aboutus.coreValues[currentLanguage] }}
        </p>
      </div>
    </div>
  </section>

  <!-- timeline -->
  <div class="relative w-full flex flex-col px-[2%] gap-4 py-12 bg-green-900/10">
    <div class="grid grid-cols-2 gap-6 w-full" v-for="(history, i) in histories" :key="i">
      <div
        class="flex gap-4 bg-white shadow-2xl p-4"
        :class="[i % 2 === 0 ? 'order-1' : 'order-2']"
      >
        <div class="p-2 space-y-6">
          <div class="timeline-content">
            <img src="@/assets/hero-o.jpg" alt="Timeline image" class="timeline-image rounded-lg" />
            <div class="timeline-year">
              <span class="text-[20px] font-bold">{{ history.year }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div :class="[i % 2 === 0 ? 'order-2 flex justify-end ' : 'order-1']">
       
      </div> -->

      <div :class="[i % 2 === 0 ? 'order-2' : 'order-1', 'flex gap-6']">
        <div
          class="h-full border-2 border-gray-500 border-r-0 border-t-0 border-b-0 relative flex flex-col zjustify-between"
        >
          <div class="h-4 w-4 bg-blue-600 rounded-full absolute -left-2"></div>
          <div class="h-4 w-4 bg-blue-600 rounded-full absolute -left-2 bottom-4"></div>
        </div>

        <div class="p-8 bg-white shadow-2xl">
          <p>{{ history.description[currentLanguage] }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Our teams section -->
  <section class="flex flex-col px-[1%] md:px-[2%] gap-4 py-6 md:py-12 bg-white">
    <h1 class="text-4xl font-bold text-center">Our Team</h1>
    <div
      class="flex flex-wrap gap-4 py-8 justify-center items-center"
      v-if="teams.length && teams.length > 0"
    >
      <div
        v-for="(team, index) in teams"
        :key="index"
        data-aos="fade-up"
        class="py-6 px-4 text-center w-full md:w-1/4 bg-green-900/10 rounded shadow-xl hover:bg-green-900 hover:text-white"
      >
        <div class="w-32 h-32 rounded-full overflow-hidden mx-auto ring-2 ring-yellow-300">
          <img
          v-if="team.image"
          :src="BASE_AVATAR + team.image"
          alt="yes"
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full"
        />
        {{team.image }}
        </div>
        <h1 class="text-xl font-semibold">{{ team.fullName[currentLanguage] }}</h1>
        <p class="text-blue-700">{{ team.profession[currentLanguage] }}</p>
        <p>{{ team.biography[currentLanguage] }}</p>
      </div>
    </div>
    <div v-else>
      <h1>No team to display</h1>
    </div>
  </section>
</template>

<style>
.about {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}
</style>
