<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

// const news = async () => {
//   const response = await ApiService.get()
// }

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
    heroes.value = response.data
  } catch (error) {
    errorMessage.value = 'Failed to fetch achievements'
  }
}
const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data
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
    if (response.data) {
      // isLoading = false
      blogs.value = response.data
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
      partners.value = response.data
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

const originalText = 'Relief Society of Tigray'
</script>

<template>
  <main class="w-full h-full flex flex-col">
    <Swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false }"
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
          class="absolute bottom-16 w-full md:w-2/5 h-d py-6 flex flex-col text-green-900 justify-center px-4 bg-yellow-500/80 zmd:bg-white/0 rounded-tr-[100px]z left-4"
        >
          <div class="wave-container w-full" zdata-aos="fade-left">
            <p class="zwave-text font-bold text-4xl">{{ hero.heroTitle }}</p>
          </div>
          <h6 class="font-extralight">
            {{ hero.heroDescription }}
          </h6>
          <div class="flex gap-4 p-4">
            <router-link
              class="bg-green-900 rounded-xl text-yellow-500 px-4 py-2 self-start font-bold"
              to="/donate"
              >Donate Now</router-link
            >
            <router-link to="/about" class="border rounded-xl px-4 py-2 border-black font-bold"
              >Learn More</router-link
            >
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </main>

  <!-- Services -->
  <section class="w-full bg-green-900/10 px-[6%] py-12">
    <h1 class="text-center text-3xl">Services we provide</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div v-for="(service, i) in services" :key="i" class="p-4 flex flex-col gap-2 bg-white">
        <img
          v-if="service.serviceImage"
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="w-full h-24 rounded-md object-cover self-start"
        />
        <font-awesome-icon v-else icon="user" class="text-green-600 mr-auto"></font-awesome-icon>
        <h1 class="text-2xl font-bold">{{ service.serviceTitle }}</h1>
        <div class="relative">
          <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-green-600"></span>
          <hr class="h-[2px] absolute inset-0 bg-gray-200" />
        </div>
        <p class="line-clamp-5">
          {{ service.serviceDescription }}
        </p>
      </div>
    </div>
  </section>

  <!-- history -->
  <section class="w-full px-[6%] relative grid grid-cols-1 md:grid-cols-2 gap-4 py-12">
    <div class="flex flex-col gap-2 py-8 top-0 z-30 shadow">
      <h6 class="text-[#579000]">Serving with clarity</h6>
      <h1 class="text-4xl font-semibold">Providing impartial services..</h1>
      <p>
        Rest is a highly acclaimed non-profit organization dedicated to supporting the international
        Tigrai community in overcoming the broad range of conditions ...
      </p>

      <div class="grid grid-cols-3 gap-4 w-full">
        <div class="bg-green-900 font-bold text-white px-4 py-2">
          <h1>20 +</h1>
          <p>Years of service</p>
        </div>
        <div class="bg-green-900 font-bold text-white px-4 py-2">
          <h1>300 +</h1>
          <p>Projects</p>
        </div>
        <div class="bg-green-900 font-bold text-white px-4 py-2">
          <h1>5 +</h1>
          <p>Services</p>
        </div>
      </div>
      <router-link to="/about" class="border rounded-xl px-4 py-2 border-black font-bold self-start"
        >Learn More About us</router-link
      >
    </div>
    <div class="w-full overflow-hidden">
      <img
        src="@/assets/hero.jpg"
        alt=""
        class="w-full inset-0 h-full object-cover hover:scale-[1.2] transition-transform duration-500 ease-in-out"
      />
    </div>
  </section>

  <!-- Donation section -->
  <section class="w-full px-[6%] py-12 bg-green-900/10 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-right">
        <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon>
        <h1 class="text-2xl font-bold">Become a volunteer</h1>
        <p>
          If the application's data and workload grow beyond the capabilities of the local servers
        </p>

        <router-link to="/donate" class="text-green-600 underline font-bold"> Join Now</router-link>
      </div>
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-up">
        <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon>
        <h1 class="text-2xl font-bold">Send donation</h1>

        <p>
          If the application's data and workload grow beyond the capabilities of the local servers
        </p>

        <router-link to="/donate" class="text-green-600 underline font-bold"> Send Now</router-link>
      </div>
      <div class="p-4 flex flex-col gap-2 bg-gray-50" data-aos="fade-left">
        <font-awesome-icon icon="user" class="text-green-600 mr-auto text-4xl"></font-awesome-icon>
        <h1 class="text-2xl font-bold">Contact us</h1>

        <p>
          If the application's data and workload grow beyond the capabilities of the local servers
        </p>

        <router-link to="/contact" class="text-green-600 underline font-bold">
          Learn More</router-link
        >
      </div>
    </div>
  </section>
  <!-- End of donation section -->

  <!-- Start of  ...-->
  <!-- <section class="px-[10%] bg-blue-900 text-white py-8 flex justify-center items-center">
    <div class="p-8"><h1 class="text-4xl">20+ Years of work</h1></div>
    <div class="text-4xl">8+ Services</div>
    <div class="p-8"><h1 class="text-4xl">20,000+ people served</h1></div>
    <div class="p-8"><h1 class="text-4xl">200+ Projects completed and on pipeline</h1></div>
  </section> -->

  <!-- Start of news section -->
  <section class="w-full px-[6%] py-12 flex flex-col items-center gap-4 bg-[#539000]/5">
    <h1 class="text-3xl font-bold">News and stories from us</h1>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(event, i) in blogs.slice(0, 4)"
        :key="i"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 shadow"
      >
        <div>
          <img
            :src="BASE_AVATAR + event.eventImage"
            alt=""
            class="max-h-[500px] rounded-xl w-full object-cover"
          />
        </div>
        <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
          <h6 class="text-gray-500">{{ event.category }} | {{ event.eventDate }}</h6>
          <h3 class="text-lg font-bold">
            {{ event.eventTitle }}
          </h3>
          <router-link to="/about" class="text-green-600 font-bold">Read More</router-link>
        </div>
      </div>
    </div>
  </section>

  <!-- partners -->
  <section class="w-full px-[6%] py-12 flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Our Partners</h1>
    <swiper
      :slides-per-view="1"
      :modules="modules"
      :autoplay="{ delay: 5000 }"
      class="w-full flex flex-wrap items-center justify-center"
      :breakpoints="{
        '768': { slidesPerView: 2, spaceBetween: 20 },
        '1024': { slidesPerView: 4, spaceBetween: 30 }
      }"
    >
      <swiper-slide
        v-for="(partner, i) in partners"
        :key="i"
        class="relative w-full works mx-auto shadow-xl gap-6 bg-green-900/10 p-4"
      >
        <div class="w-32 h-32 mx-auto overflow-hidden">
          <img
            v-if="partner.logo"
            :src="BASE_AVATAR + partner.logo"
            :alt="partner.busineName"
            class="w-full h-full rounded-full object-cover"
          />
          <h2 v-else class="w-24 h-24 font-semibold text-6xl text-center text-black">
            {{ partner.businessName[0] }}
          </h2>
        </div>
        <p class="text-center font-bold">{{ partner.businessName }}</p>
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
