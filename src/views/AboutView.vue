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
      return
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
    const response = await ApiService.get('/users/aboutus')
    if (response.success) {
      // alert("OK")

      about.value = response.data.map((item) => ({
        ...item,
        // establishment: JSON.parse(item.establishment),
        mission: JSON.parse(item.mission),
        vision: JSON.parse(item.vision),
        coreValues: JSON.parse(item.coreValues),
        establishment: JSON.parse(item.establishment)
      }))
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  fetchTeams(), getAboutus()
})
</script>

<template>
  <section class="w-full overflow-hidden">
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
    class="w-full py-12 px-[6%] grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
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
        >Get in touch</router-link
      >
    </div>
    <img
      src="@/assets/d.jpg"
      alt=""
      class="w-full object-cover h-auto shadow-xl"
      data-aos="fade-left"
    />
  </section>

  <section class="flex flex-col px-[6%] gap-4 py-12 bg-green-900/10 items-center">
    <div class="w-full mx-auto">
      <h1 class="text-center text-4xl font-semibold lowercase">
        CAUSES AND POSITIVE CHANGE ALL OVER THE REGION
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
        class="p-6 flex flex-col gap-4 shadow-xl bg-white items-center justify-center"
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
  <div class="relative ">
    <div class="timeline-container z-50">
      <div v-for="i in 5" :key="i" class="timeline-item flex gap-4">
        <div class="timeline-year" :class="[i % 2 === 2 ? 'order-1' : 'order-2']">
          <span>1924</span>
        </div>
        <div class="timeline-content">
          <img src="@/assets/hero-o.jpg" alt="Timeline image" class="timeline-image" />
          <h3 class="timeline-title">Rest title</h3>
          <p class="timeline-description">description</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Our teams section -->
  <section class="flex flex-col px-[1%] md:px-[6%] gap-4 py-6 md:py-12 bg-white">
    <h1 class="text-4xl font-bold text-center">Our Team</h1>
    <div class="flex flex-wrap gap-4 py-8 justify-center items-center">
      <div
        v-for="(team, index) in teams"
        :key="index"
        data-aos="fade-up"
        class="py-6 px-4 text-center w-full md:w-1/4 bg-green-900/10 rounded shadow-xl hover:bg-green-900 hover:text-white"
      >
        <div class="w-32 h-32 rounded-full overflow-hidden mx-auto ring-2 ring-yellow-300">
          <img :src="BASE_AVATAR + team.image" alt="" class="w-full h-full object-cover" />
        </div>
        <h1 class="text-xl font-semibold">{{ team.fullName[currentLanguage] }}</h1>
        <p class="text-blue-700">{{ team.profession[currentLanguage] }}</p>
        <p>{{ team.biography[currentLanguage] }}</p>
      </div>
    </div>
  </section>
</template>

<style>
.about {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  position: relative;
  width: 100%;
}

.timeline-year {
  background-color: #4a5568;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.25rem;
}

.timeline-content {
  background-color: #edf2f7;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.timeline-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 1rem;
  color: #4a5568;
}
</style>
