<template>
  <header class="w-full hidden md:flex md:flex-col sticky top-0 z-50 shadow-4xl rounded-xl">
    <div class="w-full bg-[#53900F] flex justify-between text-white px-[2%] py-1">
      <div class="flex items-center justify-center">
        <a
          :href="social.link"
          target="_blank"
          v-for="(social, index) in medias"
          :key="index"
          class="flex items-center justify-center"
        >
          <font-awesome-icon
            :icon="['fab', 'facebook']"
            class="text-white hover:text-white/80 p-2"
            v-if="social.platform.toLowerCase() === 'facebook'"
          >
          </font-awesome-icon>

          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'twitter'"
            :icon="['fab', 'twitter']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'youtube'"
            :icon="['fab', 'youtube']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'telegram'"
            :icon="['fab', 'telegram']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'linkedin'"
            :icon="['fab', 'linkedin']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'instagram'"
            :icon="['fab', 'instagram']"
            class="text-white hover:text-white/80 p-2 rounded"
          />
          <font-awesome-icon
            v-else
            :icon="['fab', 'whatsapp']"
            class="text-white p-2 rounded hover:text-white/80"
          />
        </a>
      </div>
      <div
        v-for="(contact, index) in infoG"
        :key="index"
        class="flex gap-2 items-center justify-center"
      >
        <div>
          <h1 class="flex gap-1 items-center justify-center">
            <font-awesome-icon icon="phone"></font-awesome-icon>{{ contact.contactNumber }}
          </h1>
        </div>

        <div>
          <h1 class="flex gap-1 items-center justify-center">
            <font-awesome-icon icon="envelope"></font-awesome-icon>{{ contact.mail }}
          </h1>
        </div>
        <div>
          <h1 class="flex gap-1 items-center justify-center">
            <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>{{ contact.address }}
          </h1>
        </div>
      </div>
    </div>
    <nav
      class="w-full px-[1%] flex justify-between items-center py- zfont-bold bg-white/100 shadow-2xl"
    >
      <router-link to="/" class="flex items-center hover:border-b-0 py-1" title="REST">
        <img src="@/assets/rest.jpg" alt="Logo of REST" class="rounded-fullz h-24 object-contain" />
      </router-link>
      <ul class="flex gap-4 font-bold zuppercase">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('home') }]"
          >
            {{ $t('Home') }}</router-link
          >
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'about' }"
            class="relative parent-item h-full w-full"
            :class="[{ 'text-[#53900F]': isActive('about') }]"
          >
            {{ $t('Who We Are') }}</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-white p-6 flex-col gap-4 min-w-96 child top-[100%] border rounded-xl"
            data-aos="fade-left"
          >
            <router-link :to="{ name: 'about' }" :class="[{ 'text-[#53900F]': isActive('about') }]">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t('Mission / Vision /Strategy') }} </span>
              <hr class="text-[#000]" />
            </router-link>

            <router-link
              :to="{ name: 'history' }"
              :class="[{ 'text-[#53900F]': isActive('history') }]"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t('History') }} </span>
              <hr class="text-[#000]" />
            </router-link>
            <router-link
              :to="{ name: 'board-members' }"
              :class="[{ 'text-[#53900F]': isActive('board-members') }]"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t('Managing Directors') }} </span>
              <hr class="text-[#000]" />
            </router-link>
            <router-link
              :to="{ name: 'partners-open' }"
              class="relative parent-item"
              :class="[{ 'text-[#53900F]': isActive('partners-open') }]"
            >
              <span class="hover:text-[#53900F]">{{ $t('Partners') }}</span>
              <hr class="text-[#000]" />
            </router-link>

            <router-link
              :to="{ name: 'contact' }"
              class="relative parent-item"
              @click="toggleShowDropDown"
              :class="[{ 'text-[#53900F]': isActive('contact') }]"
            >
              <span> {{ $t('Contact Us') }}</span>
              <hr class="text-[#000]"
            /></router-link>
            <router-link
              :to="{ name: 'faqs' }"
              :class="[{ 'text-[#53900F]': isActive('faqs') }]"
              class="hover:text-[#288FB2]z"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('FAQs') }}
              </span>
              <hr class="text-[#000]" />
            </router-link>
          </div>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'services' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('services') }]"
          >
            {{ $t('What We Do') }}</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-white p-6 flex-col gap-4 min-w-96 child shadow-xl border rounded-xl"
            data-aos="fade-left"
          >
            <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
            <router-link
              class="hover:text-[#288FB2]z"
              v-for="(service, i) in services"
              :key="i"
              :to="{
                name: 'service-detail',
                params: {
                  title: service.serviceTitle[currentLanguage]
                }
              }"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t(`${service.serviceTitle[currentLanguage]}`) }}
              </span>
              <hr class="text-[#001F3F]" />
            </router-link>
          </div>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'blogs' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('blogs') }]"
          >
            {{ $t('News & Stories') }}</router-link
          >
        </li>

        <!-- resources -->
        <li class="relative group">
          <router-link
            :to="{ name: 'documents' }"
            class="relative parent-item h-full w-full"
            :class="[{ 'text-[#53900F]': isActive('documents') }]"
          >
            {{ $t('Resources & Reports') }}</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-white p-6 flex-col left-0 gap-4 min-w-56 overflow-auto child top-[100%] border rounded-xl"
            data-aos="fade-left"
          >
            <router-link
              :to="{ name: 'documents' }"
              :class="[{ 'text-[#53900F]': isActive('documents') }]"
            >
              <span class="hover:text-[#53900F]"> {{ $t('Documents') }} </span>
              <hr class="text-[#001F3F]" />
            </router-link>

            <router-link
              :to="{ name: 'gallery' }"
              class="relative parent-item"
              :class="[{ 'text-[#53900F]': isActive('gallery') }]"
            >
              <span class="hover:text-[#53900F]">
                {{ $t('Gallery') }}
              </span>
              <hr />
            </router-link>
          </div>
        </li>

        <li class="relative group">
          <router-link
            :to="{ name: 'jobs' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('tenders') }]"
          >
            {{ $t('Get Involved') }}</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-[#53900F]Z bg-white p-6 flex-col gap-4 min-w-56 child top-[100%] border rounded-xl"
            data-aos="fade-left"
          >
            <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
            <router-link
              :to="{ name: 'jobs' }"
              :class="[{ 'text-[#53900F]': isActive('jobs') }]"
              class="hover:text-[#288FB2]z"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> Careers </span>
              <hr class="text-[#53900F]" />
            </router-link>
            <router-link
              :to="{ name: 'volunteer' }"
              :class="[{ 'text-[#53900F]': isActive('volunteer') }]"
              class="hover:text-[#288FB2]z"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Volunteers') }}
              </span>
              <hr class="text-[#53900F]" />
            </router-link>
            <router-link
              :to="{ name: 'tenders' }"
              href="#structure_section"
              class="hover:text-[#288FB2]z"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Tenders') }}
              </span>
              <hr class="text-[#53900F]" />
            </router-link>
          </div>
        </li>

        <li>
          <router-link
            :to="{ name: 'donate' }"
            class="bg-[#53900F] zrounded-xl text-yellow-400 px-4 py-2 pulse rounded-md"
            ><font-awesome-icon icon="heart" class="animate-pulse text-sm"></font-awesome-icon
            >{{ $t('Donate') }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>

  <header
    class="w-full bg-white flex md:hidden px-[1%] md:px-[2%] sticky top-0 bottom-0 zbg-white/100 z-50"
  >
    <nav class="w-full h-full flex justify-between py-4 bg-white">
      <router-link to="/" class="flex items-center hover:border-b-0" title="REST">
        <img
          src="@/assets/rest.jpg"
          alt="Logo of REST"
          width="20"
          height="20"
          class="h-12 w-12 px-0 object-contain"
        />
      </router-link>
      <button @click.prevent="showSmallDeviceNavigation">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>
    </nav>

    <div
      v-if="isSmall"
      class="w-full h-screen flex justify-between fixed inset-0 py-6 z-50 bg-white zbg-[#53900F]"
      data-aos="fade-left"
    >
      <button
        @click="isSmall = !isSmall"
        class="self-start mx-4 text-blue-40z0 font-semibold text-gray-700 text-2xl"
      >
        <font-awesome-icon icon="times" class="text-3xl"></font-awesome-icon>
      </button>

      <nav
        class="w-full px-[1%] flex flex-col justify-between items-center pb-12 zfont-bold Zbg-yellow-400 ztext-white h-screen overflow-auto"
      >
        <ul class="flex flex-col gap-2 font-bold zuppercase">
          <li>
            <router-link
              :to="{ name: 'home' }"
              @click="toggleShowDropDown"
              class="relative parent-item"
              :class="[{ 'text-[#53900F]': isActive('home') }]"
            >
              {{ $t('Home') }}</router-link
            >
          </li>
          <hr />
          <li class="relative group">
            <router-link
              :to="{ name: 'about' }"
              @click="toggleShowDropDown"
              class="relative parent-item h-full w-full"
              :class="[{ 'text-[#53900F]': isActive('about') }]"
            >
              {{ $t('Who We Are') }}</router-link
            >

            <hr />

            <div class="px-4 flex flex-col" zdata-aos="fade-left">
              <router-link
                :to="{ name: 'beneficiaries' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('beneficiaries') }]"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('Mission / Vision / Strategy') }}
                </span>
              </router-link>
              <router-link
                :to="{ name: 'board-members' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('board-members') }]"
              >
                <!-- @click="scrollToSection(el.id)" -->
                <span class="hover:text-[#53900F]"> {{ $t('Managing Directors') }} </span>
              </router-link>
              <router-link
                :to="{ name: 'history' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('history') }]"
              >
                <!-- @click="scrollToSection(el.id)" -->
                <span class="hover:text-[#53900F]"> {{ $t('History') }} </span>
              </router-link>
              <router-link
                :to="{ name: 'faqs' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('faqs') }]"
                class="hover:text-[#288FB2]z"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('FAQs') }}
                </span>
              </router-link>
              <router-link
                :to="{ name: 'contact' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('contact') }]"
                class="hover:text-[#288FB2]z"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('Contact Us') }}
                </span>
              </router-link>
              <router-link
                :to="{ name: 'partners' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('partners') }]"
                class="hover:text-[#288FB2]z"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('Partners') }}
                </span>
              </router-link>
            </div>
          </li>
          <hr />

          <li class="relative group">
            <router-link
              :to="{ name: 'services' }"
              class="relative parent-item"
              @click="toggleShowDropDown"
              :class="[{ 'text-[#53900F]': isActive('services') }]"
            >
              {{ $t('What We Do') }}</router-link
            >
            <hr />

            <div class="px-4 flex flex-col" zdata-aos="fade-left">
              <router-link
                :to="{
                  name: 'service-detail',
                  params: { title: service.serviceTitle[currentLanguage] }
                }"
                class="hover:text-[#288FB2]z"
                v-for="(service, i) in services"
                :key="i"
                @click="toggleShowDropDown"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t(`${service.serviceTitle[currentLanguage]}`) }}
                </span>
              </router-link>
            </div>
          </li>
          <hr />
          <li class="relative group">
            <router-link
              :to="{ name: 'blogs' }"
              class="relative parent-item"
              @click="toggleShowDropDown"
              :class="[{ 'text-[#53900F]': isActive('blogs') }]"
            >
              {{ $t('News & Stories') }}</router-link
            >
          </li>
          <hr />
          <!-- resources -->
          <li class="relative group">
            <router-link
              :to="{ name: 'documents' }"
              @click="toggleShowDropDown"
              class="relative parent-item h-full w-full"
              :class="[{ 'text-[#53900F]': isActive('documents') }]"
            >
              {{ $t('Resources') }}</router-link
            >
            <hr />

            <div class="px-4 flex flex-col" zdata-aos="fade-left">
              <router-link
                :to="{ name: 'documents' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('documents') }]"
                class="w-full"
              >
                <span class="hover:text-[#53900F]"> {{ $t('Documents') }} </span>
              </router-link>

              <!-- <router-link
                :to="{ name: 'publications' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('publications') }]"
              >
                <span class="hover:text-[#53900F]"> {{ $t('Publications') }} </span>
              </router-link> -->

              <!-- <router-link
                :to="{ name: 'strategy' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('Strategy') }]"
                class="hover:text-[#288FB2]z"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('Strategy') }}
                </span>
              </router-link> -->

              <router-link
                :to="{ name: 'gallery' }"
                class="relative parent-item"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('gallery') }]"
              >
                <span class="hover:text-[#53900F]">
                  {{ $t('Gallery') }}
                </span>
              </router-link>
            </div>
          </li>
          <hr />
          <li class="relative group">
            <router-link
              :to="{ name: 'jobs' }"
              class="relative parent-item"
              @click="toggleShowDropDown"
              :class="[{ 'text-[#53900F]': isActive('tenders') }]"
            >
              {{ $t('Get Involved') }}</router-link
            >

            <hr />

            <div class="px-4 flex flex-col" zdata-aos="fade-left">
              <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
              <router-link
                :to="{ name: 'jobs' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('jobs') }]"
                class="hover:text-[#288FB2]z"
              >
                <!-- @click="scrollToSection(el.id)" -->
                <span class="hover:text-[#53900F]"> Careers </span>
                <!-- <hr class="text-[#53900F]" /> -->
              </router-link>
              <router-link
                :to="{ name: 'volunteer' }"
                @click="toggleShowDropDown"
                :class="[{ 'text-[#53900F]': isActive('volunteer') }]"
                class="hover:text-[#288FB2]z"
              >
                <!-- @click="scrollToSection(el.id)" -->
                <span class="hover:text-[#53900F]">
                  {{ $t('Volunteers') }}
                </span>
              </router-link>
              <router-link
                :to="{ name: 'tenders' }"
                href="#structure_section"
                @click="toggleShowDropDown"
                class="hover:text-[#288FB2]z"
              >
                <!-- @click="scrollToSection(el.id)" -->
                <span class="hover:text-[#53900F]">
                  {{ $t('Tenders') }}
                </span>
              </router-link>
            </div>
          </li>
          <hr />

          <li>
            <router-link
              :to="{ name: 'donate' }"
              @click="toggleShowDropDown"
              class="bg-[#53900F] zrounded-xl text-yellow-400 px-4 py-2 pulse rounded-md"
            >
              <font-awesome-icon icon="heart" class="animate-pulse text-sm"></font-awesome-icon>
              {{ $t('Donate') }}
            </router-link>
          </li>
        </ul>

        <!-- <div class="relative group">
        
        <font-awesome-icon icon="globe" class="text-xl relative group"
          ><font-awesome-icon icon="chervon-down absolute right-0"></font-awesome-icon
        ></font-awesome-icon>
        <div
          class="absolute hidden shadow space-y-2 group-hover:block right-0 p-6 bg-white"
          id="languageDropdown"
          v-if="showDropdown"
          :class="{ 'text-black': changeBackground }"
        >
          <button
            @click="changeLang('en')"
            class="hover:text-green-500"
            :class="{ 'text-green-500': locale === 'en' }"
          >
            English
          </button>
          <button
            @click="changeLang('tig')"
            class="hover:text-green-500"
            :class="{ 'text-green-500': locale === 'tig' }"
          >
            ትግርኛ
          </button>
        </div>
      </div> -->
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import apiService from '@/services/apiService'
const currentLanguage = ref(localStorage.getItem('lang') || 'en')
// import { useI18n } from 'vue-i18n'
let showDropdown = ref(true)
// const { locale } = useI18n()

defineProps({
  items: {
    type: Array,
    required: true
  }
})
const isSmall = ref(false)
function showSmallDeviceNavigation() {
  isSmall.value = !isSmall.value
}
// let showModal = ref(true)

// const showOnSmallDevice = computed(() => {
//   return isSmall.value && showDropdown.value
// })

function toggleShowDropDown() {
  isSmall.value = false
  showDropdown.value = false
}
const route = useRoute()

function isActive(item) {
  return route.name === item
}

let infoG = ref([])
const fetchInfography = async () => {
  try {
    const response = await apiService.get('/admin/contact-address')
    if (response.success) {
      infoG.value = response.data.splice(0, 1)
    }
  } catch (error) {
    alert(error)
  }
}

let medias = ref([])
const fetchMedia = async () => {
  try {
    const response = await apiService.get('/admin/social-medias')

    if (response.success) {
      medias.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

// const changeBackground = ref(false)

// const scroll = true
// const handleScroll = () => {
//   changeBackground.value = window.scrollY > 80 && window.scrollY < 3600
// }

const services = ref([])
const fetchServices = async () => {
  try {
    const response = await apiService.get('/admin/services')
    if (response.success) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription)
      }))
    }
  } catch (error) {
    alert('error')
  }
}

// {
//     // getSettings()
//     window.addEventListener('scroll', handleScroll)
//   },
onMounted(() => {
  fetchServices(), fetchInfography(), fetchMedia()
})
</script>

<style scoped>
.iq-active-menu {
  color: #53900f;
}
a {
  transition: border 0.6s;
}

.child {
  animation-name: slideUp;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Show the dropdown content when its parent is hovered */
.parent-item:hover > .child {
  display: flex;
  flex-direction: column;
  gap: 1;
  opacity: 1;
}

.parent-item:hover > .child {
  display: flex;
  flex-direction: column;
  gap: 1;
  opacity: 1;
}

/* Hide the sub_items by default */
.child {
  display: none;
}

/* Hide the sub_items when their parent is not hovered */
.parent-item:not(:hover) > .child {
  display: none;
}
</style>
