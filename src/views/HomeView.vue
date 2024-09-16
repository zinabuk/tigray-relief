<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

// }
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

import { ref, onMounted } from 'vue'

// import { useRouter } from 'vue-router'

const modules = [Autoplay, Pagination, Navigation]

// const router = useRouter()

// let isLoading = '';
const heroes = ref([])
const errorMessage = ref('')
const fetchHeroes = async () => {
  try {
    const response = await ApiService.get('users/home')
    // alert(response.data.length)
    heroes.value = response.data.map((item) => ({
      ...item,
      heroTitle: JSON.parse(item.heroTitle),
      heroDescription: JSON.parse(item.heroDescription)
    }))
  } catch (error) {
    errorMessage.value = 'Failed to fetch achievements'
  }
}
const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription)
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

const blogs = ref([])

const fetchNews = async () => {
  try {
    const response = await ApiService.get('/admin/events')
    if (response.success) {
      // isLoading = false
      blogs.value = response.data.map((item) => ({
        ...item,
        category: JSON.parse(item.category),
        eventTitle: JSON.parse(item.eventTitle)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 1000)
    }
  }
}

const partners = ref([])
const fetchPartners = async () => {
  try {
    const response = await ApiService.get('/users/partnerships')
    if (response) {
      partners.value = response.data.map((item) => ({
        ...item,
        businessName: JSON.parse(item.businessName)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 100000)
    }
  }
}

onMounted(() => {
  fetchServices(), fetchNews(), fetchPartners(), fetchHeroes()
})

//const originalText = 'Relief Society of Tigray'
</script>

<template>
  <main class="w-full h-full flex flex-col">
    <Swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }"
      loop
      class="w-full h-screen md:h-[calc(100vh_-_80px)]"
    >
      <swiper-slide v-for="(hero, i) in heroes" :key="i" class="w-full relative h-full"
        ><img
          v-if="hero.heroImage"
          alt="Vue logo"
          class="logo absolute h-full object-cover w-full inset-0"
          :src="BASE_AVATAR + hero.heroImage"
        />
        <div
          class="absolute h-full z-translate-y-1/4 w-full md:w-1/2 lg:w-2/5 h-d py-6 flex flex-col gap-2 text-white justify-center px-4 bg-[#53900f]/30 sm:bg-[#53900f]/90 md:left-4 hover:scale-[1.025] transition-transform duration-700 delay-150"
          zstyle="box-shadow: 5px 5px 5px 5px rgb(83 144 15/0.9)"
        >
          <div class="wave-container w-full" zdata-aos="fade-left">
            <p class="zwave-text font-bold text-6xl flex-wrap break-words">{{ hero.heroTitle[currentLanguage] }}</p>
          </div>
          <h6 class="font- line-clamp-3 text-3xl">
            {{ hero.heroDescription[currentLanguage] }}
          </h6>
          <div class="flex gap-4">
            <router-link
              class="bg-[#53900F] border rounded-md border-yellow-400 hover:bg-[#53900F] text-yellow-400 shadow ztext-yellow-400 px-4 py-2 self-start font-bold"
              to="/donate"
              >Donate Now</router-link
            >
            <router-link
              to="/about"
              class="bg-white border border-yellow-400 hover:bg-[#53900F] hover:text-yellow-400 rounded-md text-yellow-400 px-4 py-2 self-start font-bold"
              >{{ $t('Learn More') }}</router-link
            >
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </main>

  <!-- Services -->
  <section class="w-full bg-green-900/10 px-[2%] flex flex-col gap-4 py-12">
    <h1 class="text-center text-4xl font-semibold">{{ $t('Services') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(service, i) in services"
        :key="i"
        class="flex flex-col gap-2 relative shadow-xl bg-white h-64 border rounded-xl"
      >
        <img
          v-if="service.serviceImage"
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="w-full h-full absolute inset-0 border rounded-xl object-cover"
        />

        <div
          class="absolute inset-0 flex flex-col justify-end bg-black/30 p-4 hover:bg-green-900/90"
        >
          <h1 class="text-2xl font-bold text-white line-clamp-2">
            {{ service.serviceTitle[currentLanguage] }}
          </h1>
        </div>
        <!-- <div class="relative">
          <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-green-600"></span>
          <hr class="h-[2px] absolute inset-0 bg-gray-200" />
        </div> -->
        <!-- <p class="line-clamp-5">
          {{ service.serviceDescription[currentLanguage] }}
        </p> -->
      </div>
    </div>
  </section>

  <!-- history -->
  <section class="w-full px-[2%] relative grid grid-cols-1 gap-4 py-12 bg-[#53900F]">
    <div class="flex flex-col gap-2 py-8 top-0 z-30">
      <h1 class="text-4xl font-light text-center">{{ $t('Our Impact') }}</h1>
      <!-- <p>
        Rest is a highly acclaimed non-profit organization dedicated to supporting the international
        Tigrai community in overcoming the broad range of conditions ...
      </p> -->

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full overflow-hidden">
        <div
          class="font-bold px-4 py-2 flex flex-col gap-2 items-center shadow-2xlz"
          data-aos="fade-right"
        >
          <p class="text-xl font-light">{{ $t('A decades of expertise') }}</p>
          <h1 class="text-yellow-400 text-6xl">1978</h1>
        </div>
        <div class="font-bold px-4 py-2 flex flex-col gap-4 items-center" data-aos="fade-up">
          <p class="text-xl text-ce font-light">{{ $t('Completed Projects') }}</p>
          <h1 class="text-yellow-400 text-6xl">1,000 +</h1>
        </div>
        <div class="font-bold px-4 py-2 flex flex-col gap-4 items-center" data-aos="fade-left">
          <p class="text-xl font-light">{{ $t('Impacted Beneficiaries') }}</p>
          <h1 class="text-yellow-400 text-6xl">3,000,000 +</h1>
        </div>
      </div>
      <!-- <router-link to="/about" class="border rounded-xl px-4 py-2 border-black font-bold self-start"
        >Learn More About us</router-link
      > -->
    </div>
  </section>

  <!-- Donation section -->
  <section class="w-full px-[2%] py-12 bg-green-900/10 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-right">
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon> -->
        <img src="@/assets/download.jpg" alt="" class="h-24 object-cover" />
        <h1 class="text-2xl font-bold">{{ $t('Become a volunteer') }}</h1>
        <p class="line-clamp-4">
          {{
            $t(
              'Volunteering is a wonderful way to give back to your community and make a real difference. At our organization, we rely on the generosity and dedication of our volunteers to help us achieve our mission. Whether you have a few hours a week or just a few times a year, there are plenty of ways you can get involved.'
            )
          }}
        </p>

        <router-link to="/volunteer" class="text-[#53900F] underline font-bold">
          {{ $t('Join Now') }}</router-link
        >
      </div>
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-up">
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon> -->
        <img src="@/assets/donation.png" alt="" class="h-24 object-cover" />
        <h1 class="text-2xl font-bold">{{ $t('Send donation') }}</h1>

        <p>
          {{
            $t(
              'Your generous donations are critical to supporting our programs and services for the community. There are several convenient ways you can contribute:'
            )
          }}
        </p>

        <router-link to="/donate" class="text-[#53900F] underline font-bold">{{
          $t('Send Now')
        }}</router-link>
      </div>
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-left">
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon> -->
        <img src="@/assets/contact.png" alt="" class="h-24 object-cover" />
        <h1 class="text-2xl font-bold">{{ $t('Contact Us') }}</h1>

        <p>
          {{
            $t(
              'We would love to hear from you! Please don not hesitate to reach out if you have any questions, comments, or feedback.'
            )
          }}
        </p>

        <router-link to="/contact" class="text-[#53900F] underline font-bold">
          {{ $t('Learn More') }}
        </router-link>
      </div>
    </div>
  </section>
  <!-- End of donation section -->

  <!-- Start of news section -->
  <section class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#539000]/5">
    <h1 class="text-3xl font-bold">{{ $t('News and stories from us') }}</h1>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(event, i) in blogs.slice(0, 4)"
        :key="i"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 shadow"
      >
        <div class="overflow-hidden">
          <img
            :src="BASE_AVATAR + event.eventImage"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover hover:scale-[1.2] transition-transform duration-500 delay-100"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
          <h6 class="text-gray-500">
            {{ event.category[currentLanguage] }} | {{ event.eventDate }}
          </h6>
          <h3 class="text-lg font-bold">
            {{ event.eventTitle[currentLanguage] }}
          </h3>
          <router-link
            :to="{ name: 'blog-detail', params: { title: event.eventTitle[currentLanguage] } }"
            class="text-[#53900F] font-bold"
            >{{ $t('Read More') }}</router-link
          >
        </div>
      </div>
    </div>

    <router-link to="/blogs" class="text-[#53900F] underline text-xl">{{
      $t('View All News and Events')
    }}</router-link>
  </section>

  <!-- partners -->
  <section class="w-full px-[2%] py-12 flex flex-col items-center justify-center gap-4">
    <h1 class="text-3xl font-bold">{{ $t('Our Partners') }}</h1>
    <swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      loop
      class="w-full flex flex-wrap items-center justify-center"
      :breakpoints="{
        '768': { slidesPerView: 2, spaceBetween: 20 },
        '1024': { slidesPerView: 4, spaceBetween: 30 }
      }"
    >
      <swiper-slide
        v-for="(partner, i) in partners"
        :key="i"
        class="relative w-full works flex items-center justify-center zshadow-xl hover:bg-yellow-400 gap-6 p-4"
      >
        <div class="w-32 h-32 mx-auto overflow-hidden">
          <img
            v-if="partner.logo"
            :src="BASE_AVATAR + partner.logo"
            :alt="partner.businessName"
            class="w-full h-full rounded-full object-cover"
          />
          <h2 v-else class="w-24 h-24 font-semibold text-6xl text-center text-black">
            <!-- {{ partner.businessName[currentLanguage][0] }} -->
          </h2>
        </div>
        <p class="text-center font-bold">{{ partner.businessName[currentLanguage] }}</p>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
@keyframes wave-animation {
  0% {
    transform: translateY(0);
    color: #000;
  }
  50% {
    transform: translateY(-8px);
    color: #539000;
  }
  100% {
    transform: translateY(0);
    color: rgb(228, 243, 13);
  }
}

.wave-text {
  animation: wave-animation 1.5s ease-in-out infinite;
}
</style>
