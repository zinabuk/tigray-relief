<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

const currentLanguage = 'en'
import { ref, onMounted, computed } from 'vue'

const heroes = ref([])
const errorMessage = ref('')
const isLoading = ref(false)
const fetchHeroes = async () => {
  isLoading.value = true
  try {
    const response = await ApiService.get('users/home')
    // alert(response.data.length)
    if (response.success) {
      heroes.value = response.data.map((item) => ({
        ...item,
        heroTitle: JSON.parse(item.heroTitle),
        heroDescription: JSON.parse(item.heroDescription)
      }))

      heroes.value.length && heroes.value[0].heroImage
        ? (isLoading.value = false)
        : (isLoading.value = true)
    }
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
        eventTitle: JSON.parse(item.eventTitle),
        eventDescription: JSON.parse(item.eventDescription)
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

const faqs = ref([])
const fetchFaqs = async () => {
  try {
    const response = await ApiService.get('/admin/faqs')
    if (response) {
      faqs.value = response.data.slice(0, 5).map((item) => ({
        ...item,
        question: JSON.parse(item.question),
        answer: JSON.parse(item.answer)
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

// const faqIndex = ref(null)

// const toggleAccordion = (index) => {
//   // Set the current index or close it if it's already open
//   faqIndex.value = faqIndex.value === index ? null : index
// }
const hasHeros = computed(() => heroes.value.length)

const teams = ref([])
const fetchTeams = async () => {
  try {
    const response = await ApiService.get('/admin/our-teams')

    if (response.success) {
      teams.value = response.data.map((item) => ({
        ...item,
        fullName: JSON.parse(item.fullName),
        profession: JSON.parse(item.profession),
        biography: JSON.parse(item.biography)
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

const imageLoad = ref(false)
onMounted(() => {
  fetchServices(), fetchNews(), fetchPartners(), fetchHeroes(), fetchFaqs(), fetchTeams()
})

//const originalText = 'Relief Society of Tigray'
</script>

<template>
  <main class="w-full h-full flex flex-col" v-if="hasHeros && !isLoading">
    <Swiper
      :slides-per-view="1"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }"
      loop
      class="w-full h-[calc(100vh_-_120px)] md:h-[calc(100vh_-_80px)]"
    >
      <swiper-slide v-for="(hero, i) in heroes" :key="i" class="w-full relative h-full">
        <img
          v-if="hero.heroImage"
          alt="Vue logo"
          class="logo absolute h-full object-cover w-full inset-0"
          loading="lazy"
          :src="`${BASE_AVATAR}${hero.heroImage}`"
        />

        <div
          class="relative h-full z-translate-y-1/4 w-full md:w-1/2 lg:w-2/5 h-d py-6 flex flex-col gap-8 md:gap-6 text-white items-center md:items-start justify-center px-4 bg-black/60 sm:bg-black/70 zmd:left-4 hover:scale-[1.025] transition-transform duration-700 delay-150"
        >
          <!-- Custom Shape -->
          <div
            class="absolute top-0 left-0 z-10 w-16 h-full bg-gradient-to-b from-[#53900F]/70 to-transparent clip-shape"
          ></div>
          <div class="wave-container w-full" zdata-aos="fade-left">
            <p class="zwave-text font-bold text-3xl md:text-5xl flex-wrap break-words">
              {{ hero.heroTitle[currentLanguage] }}
            </p>
          </div>
          <h6 class="font- line-clamp-3 text-xl">
            {{ hero.heroDescription[currentLanguage] }}
          </h6>
          <div class="flex w-full gap-8 md:gap-6">
            <router-link
              class="bg-[#53900F] hover:bg-[#53900F]/80 w-1/2 md:w-[32%] border rounded-md border-yellow-400 hover:bg-[#53900F] text-yellow-400 shadow ztext-yellow-400 px-4 py-2 self-start font-bold"
              to="/donate"
              >Donate Now</router-link
            >
            <router-link
              to="/who-we-are"
              class="bg-white hover:bg-white/80 border w-1/2 md:w-[32%] border-yellow-400 hover:text-yellow-400 rounded-md text-yellow-400 px-4 py-2 self-start font-bold"
              >{{ $t('Learn More') }}</router-link
            >
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </main>
  <div
    class="w-full h-[calc(100vh_-_120px)] md:h-[calc(100vh_-_80px)] flex items-center justify-center"
    v-if="isLoading"
  >
    <h1 class="loader"></h1>
  </div>

  <!-- Services -->
  <section class="w-full bg-[#53900F]/5 px-[2%] flex flex-col gap-4 py-12">
    <h1 class="text-center text-4xl font-semibold">{{ $t('What We Do') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center" data-aos="fade-up">
      <div
        v-for="(service, i) in services"
        :key="i"
        class="flex flex-col gap-2 relative group shadow-xl bg-white h-64 border rounded-xl overflow-hidden"
      >
        <img
          v-if="service.serviceImage"
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="w-full h-full absolute inset-0 border rounded-xl object-cover group"
        />

        <div
          class="absolute inset-0 flex flex-col justify-center bg-black/40 p-4 transition-all duration-500 ease-in-out group-hover:bg-black/60"
        >
          <h1
            class="text-2xl font-bold text-white line-clamp-2 mt-auto transition-transform duration-500 ease-in-out transform group-hover:translate-y-[-20%]"
          >
            {{ service.serviceTitle[currentLanguage] }}
          </h1>
          <p
            class="hidden group-hover:block text-white transition-transform duration-500 ease-in-out transform zgroup-hover:translate-y-[-10%] line-clamp-4 text-justify"
          >
            {{ service.serviceDescription[currentLanguage] }}
          </p>
        </div>
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
          <h1 class="text-yellow-400 text-5xl md:text-6xl">1978</h1>
          <p class="text-xl font-light">{{ $t('A decades of expertise') }}</p>
        </div>
        <div class="font-bold px-4 py-2 flex flex-col gap-4 items-center" data-aos="fade-up">
          <h1 class="text-yellow-400 text-5xl md:text-6xl">1,000 +</h1>
          <p class="text-xl text-ce font-light">{{ $t('Completed Projects') }}</p>
        </div>
        <div class="font-bold px-4 py-2 flex flex-col gap-4 items-center" data-aos="fade-left">
          <h1 class="text-yellow-400 text-5xl md:text-6xl">3,000,000 +</h1>
          <p class="text-xl font-light">{{ $t('Impacted Beneficiaries') }}</p>
        </div>
      </div>
      <!-- <router-link to="/about" class="border rounded-xl px-4 py-2 border-black font-bold self-start"
        >Learn More About us</router-link
      > -->
    </div>
  </section>

  <!-- Donation section -->
  <section
    class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#539000]/5 overflow-hidden"
  >
    <h1 class="text-3xl font-bold">Engage with us</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div class="p-4 flex flex-col gap-2 bg-white" data-aos="fade-right">
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
      <div class="p-4 flex flex-col gap-2 bg-white" data-aos="fade-up">
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
      <div class="p-4 flex flex-col gap-2 bg-white" data-aos="fade-left">
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
  <section
    class="w-full px-[2%] py-12 flex flex-col items-center gap-4 bg-[#539000]/5 overflow-hidden"
  >
    <h1 class="text-3xl font-bold">{{ $t('News and Stories') }}</h1>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(event, i) in blogs.slice(0, 4)"
        :key="i"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-2 shadow"
        :data-aos="i % 2 == 0 ? 'fade-right' : 'fade-left'"
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
          <p class="line-clamp-2">{{ event.eventDescription[currentLanguage] }}</p>
          <router-link
            :to="{ name: 'blog-detail', params: { title: event.eventTitle[currentLanguage] } }"
            class="text-[#53900F] font-bold"
            >{{ $t('Read More') }}</router-link
          >
        </div>
      </div>
    </div>

    <router-link to="/news-stories" class="text-[#53900F]z underline underline-offset-4 text-xl">{{
      $t('View All News and Stories')
    }}</router-link>
  </section>

  <!-- partners -->
  <section
    class="w-full px-[2%] py-12 flex flex-col items-center justify-center gap-4 bg-[#53900F]/5"
  >
    <h1 class="text-3xl font-bold">{{ $t('Our Partners') }}</h1>
    <swiper
      :slides-per-view="2"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }"
      loop
      class="w-full flex flex-wrap items-center justify-center overflow-hidden flex-col gap-8"
      :navigation="{ clickable: true }"
      :pagination="{ clickable: true }"
      :breakpoints="{
        '768': { slidesPerView: 3, spaceBetween: 20 },
        '1024': { slidesPerView: 6, spaceBetween: 30 }
      }"
    >
      <swiper-slide
        v-for="(partner, i) in partners"
        :key="i"
        class="relative w-full works flex items-center justify-center zshadow-xl zhover:bg-[#53900F] gap-6 p-4 overflow-hidden"
      >
        <a :href="partner.website" v-if="partner.website" target="_blank">
          <div class="w-32 h-32 mx-auto">
            <img
              v-if="partner.logo"
              :src="BASE_AVATAR + partner.logo"
              :alt="partner.businessName"
              class="w-full h-full rounded-full object-cover"
            />
            <h2 v-else class="w-24 h-24 font-semibold text-6xl text-center text-black"></h2>
          </div>
          <p class="text-center font-bold">{{ partner.businessName[currentLanguage] }}</p></a
        >
      </swiper-slide>
    </swiper>
  </section>

  <!-- Embedding Facebook posts -->
  <section class="w-full px-[2%] py-12 flex flex-col gap-4 items-center justify-center">
    <h1 class="text-3xl font-bold">{{ $t('Latest Social Media Posts') }}</h1>

    <div class="w-full md:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Responsive Facebook Embed -->
      <div class="w-full flex justify-center">
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid0nCkkcn3n5iSbW1mVe7rQNVSUvGRy7SMGnKA6qL677H3n7jv3saLbXegay27Fo5MKl&show_text=true&width=500&appId&show_faces=true&share=true"
          class="w-full max-w-[500px] min-w-[300px] md:min-w-[400px] h-[450px] shadow-md border-none overflow-hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>

      <div class="w-full flex justify-center">
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid032L3kwyAsGyy72ZjSu4EFe87ALKWUFqczztAJRiZLs8py5eu61WaGwCEgq9QyizDPl&show_text=true&width=500&appId&show_faces=true&share=true"
          class="w-full max-w-[500px] min-w-[300px] md:min-w-[400px] h-[450px] shadow-md border-none overflow-hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style>
/* if scoped attribite is added, swiper styles wont work */
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

/* Custom styles for Swiper Pagination */
.swiper-pagination {
  display: flex !important;
  justify-content: center;
  align-items: center;

  /* margin-to: 50px; */
  margin-top: 60px;
  padding-top: 60px;
}

.swiper-pagination-bullet {
  background: #53900f; /* Active color */
  opacity: 0.6; /* Inactive color */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  transform: scale(1.2); /* Scale effect on active bullet */
}

/* Custom styles for Swiper Navigation */
.swiper-button-next,
.swiper-button-prev {
  color: #53900f; /* Button color */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8); /* Button background */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition:
    background 0.3s,
    transform 0.3s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: rgba(255, 255, 255, 1); /* Button hover effect */
  transform: scale(1.1); /* Scale effect on hover */
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 20px; /* Icon size */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .swiper-button-next,
  .swiper-button-prev {
    width: 30px;
    height: 30px;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, #53900f) content-box;
  -webkit-mask: repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
    radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: l4 1s infinite steps(10);
}
@keyframes l4 {
  to {
    transform: rotate(1turn);
  }
}
.clip-shape {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 80%);
}
</style>
