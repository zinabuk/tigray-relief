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
        ...item,
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

const policies = ref([])
const fetchPolicies = async () => {
  try {
    const response = await ApiService.get('/users/policy-and-strategy')
    if (response.success) {
      policies.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        description: JSON.parse(item.description)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}

onMounted(() => {
  fetchTeams(), getAboutus(), fetchPolicies()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative hidden md:block">
      <img src="@/assets/wwa.jpg" alt="" class="w-full max-h-[222px] object-cover object-center" />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ $t('About REST') }}</h1>
        <div class="flex gap-4 justify-between items-center">
          <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold"
            >{{ $t('Home') }}
          </router-link>
          <span>/</span>
          <router-link to="/who-we-are" class="text-[#539000] px-4 py-2">{{
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
    <div class="flex flex-col zshadow-xl p-4" v-for="(aboutus, i) in about" :key="i">
      <h1 class="text-4xl font-bold mb-4">Background</h1>
      <p class="text-lg" data-aos="fade-right">
        {{ aboutus.establishment[currentLanguage] }}
      </p>
      <!-- <router-link
        :to="{ name: 'contact' }"
        class="bg-[#539000] self-start px-4 py-2 text-white font-bold"
        data-aos="fade-right"
        >{{ $t('Contact Us') }}</router-link
      > -->
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
        class="p-6 flex flex-col gap-4 bg-white items-center justify-center zshadow-xl"
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
        class="p-6 flex flex-col gap-4 zshadow-xl bg-white items-center justify-center"
        data-aos="fade-up"
      >
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
        class="p-6 flex flex-col gap-4 zshadow-xl bg-white items-center justify-center"
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
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-white">
    <h1 class="text-3xl font-bold">Strategies</h1>
    <div class="w-full flex flex-col gap-4 bg-white">
      <div
        v-for="(benefer, i) in policies"
        :key="i"
        class="w-full grid md:grid-cols-2 gap-8 p-4 shadow"
      >
        <div :class="[i % 2 === 0 ? 'md:order-1' : 'md:order-2', 'overflow-hidden basis-1/2']">
          <img
            v-if="benefer.image"
            :src="BASE_AVATAR + benefer.image"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover hover:scale-[1.2] transition-transform duration-700 delay-75"
          />
          <h1 v-else class="w-full h-96 flex items-start justify-center font-bold text-6xl">
            {{ benefer.title[currentLanguage][0] }}
          </h1>
        </div>
        <div
          :class="[i % 2 === 0 ? 'md:order-2' : 'md:order-1']"
          class="flex flex-col flex-wrap gap-4 items-start justify-censter basis-1/2"
        >
          <h1 class="text-2xl">
            {{ benefer.title[currentLanguage] }}
          </h1>
          <p class="zline-clamp-5">{{ benefer.description[currentLanguage] }}</p>
          <!-- <router-link to="/" class="text-[#53900F] font-bold">{{
            $t('Read More')
          }}</router-link> -->
        </div>
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

@keyframes move-down {
  0% {
    top: 0; /* Start at the top */
  }
  50% {
    top: 100%; /* Move to the bottom of the container */
    transform: translateY(-100%);
  }
  100% {
    top: 0; /* Return to the top */
  }
}
</style>
