<template>
  <header class="w-full hidden md:flex sticky top-0 z-50 shadow-4xl rounded-xl">
    <nav
      class="w-full px-[1%] flex justify-between items-center py- font-bold bg-white/100 shadow-2xl"
    >
      <router-link to="/" class="flex items-center hover:border-b-0" title="REST">
        <img
          src="@/assets/rest-logo.png"
          alt="Logo of REST"
          class="rounded-fullz h-24 object-contain"
        />
      </router-link>
      <ul class="flex gap-8 font-bold zuppercase">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('home') }]"
          >
            Home</router-link
          >
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'about' }"
            class="relative parent-item h-full w-full"
            :class="[{ 'text-[#53900F]': isActive('about') }]"
          >
            About Us</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-[#F5F5F5] p-6 flex-col gap-4 min-w-96 child top-[100%] border rounded-xl"
            data-aos="fade-left"
          >
            <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
            <router-link
              :to="{ name: 'governance' }"
              :class="[{ 'text-[#53900F]': isActive('governance') }]"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t('Our Governance') }} </span>
              <hr class="text-[#001F3F]" />
            </router-link>
            <router-link to="/" href="#bod_section" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Our Mission, Vision and Strategy') }}
              </span>
              <hr class="text-[#001F3F]" />
            </router-link>
            <router-link to="/" href="#structure_section" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Our Beneficiaries') }}
              </span>
              <hr class="text-[#001F3F]" />
            </router-link>
            <router-link to="/" href="#structure_section" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Policy strategy and Framework') }}
              </span>
              <!-- <hr class="text-[#001F3F]" /> -->
            </router-link>
          </div>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'services' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('services') }]"
          >
            Services</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-[#F5F5F5] p-6 flex-col gap-4 min-w-96 child shadow-xl border rounded-xl"
            data-aos="fade-left"
          >
            <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
            <router-link
              :to="{ name: 'service-detail', params: { title: service.serviceTitle[currentLanguage] } }"
              class="hover:text-[#288FB2]z"
              v-for="(service, i) in services"
              :key="i"
            >
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t(`${service.serviceTitle[currentLanguage]}`) }} </span>
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
            Resources and Media</router-link
          >
          <div
            class="absolute hidden group-hover:flex bg-[#F5F5F5] p-6 flex-col gap-4 min-w-96 child shadow-xl border rounded-xl"
            data-aos="fade-left"
          >
            <!-- group-hover:flex rounded-xlz p-4 child z-50 min-w-80 space-y-2  -->
            <router-link to="/" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]"> {{ $t('News and Events') }} </span>
              <hr class="text-[#001F3F]" />
            </router-link>
            <router-link to="/" href="#bod_section" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('Gallery') }}
              </span>
              <hr class="text-[#001F3F]" />
            </router-link>
          </div>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'tenders' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('tenders') }]"
          >
            Get Involved</router-link
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
              <span class="hover:text-[#53900F]"> {{ $t('Careers') }} </span>
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
            <router-link to="/" href="#structure_section" class="hover:text-[#288FB2]z">
              <!-- @click="scrollToSection(el.id)" -->
              <span class="hover:text-[#53900F]">
                {{ $t('FAQs') }}
              </span>
              <!-- <hr class="text-[#001F3F]" /> -->
            </router-link>
          </div>
        </li>
        <li>
          <router-link
            :to="{ name: 'contact' }"
            class="relative parent-item"
            :class="[{ 'text-[#53900F]': isActive('contact') }]"
          >
            Contact Us</router-link
          >
        </li>

        <li>
          <router-link
            :to="{ name: 'donate' }"
            class="bg-[#53900F] rounded-xl text-yellow-400 px-4 py-2 pulse"
            >Donate
            <font-awesome-icon icon="heart" class="animate-pulse text-sm"></font-awesome-icon
          ></router-link>
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
  </header>

  <header class="w-full flex md:hidden px-[1%] md:px-[7%] sticky top-0 bottom-0 bg-white/100 z-50">
    <nav class="w-full h-full flex justify-between py-4">
      <router-link to="/" class="flex items-center hover:border-b-0" title="REST">
        <img
          src="@/assets/rest-logo.png"
          alt="Logo of iq"
          width="40"
          height="40"
          class="w-[40px] h-auto"
        />
      </router-link>
      <button @click="isSmall = !isSmall">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </button>
    </nav>

    <div
      v-if="isSmall"
      class="w-full h-screen flex justify-between fixed inset-0 py-6 z-20 bg-white/70"
    >
      <button
        @click="isSmall = !isSmall"
        class="self-start mx-4 text-blue-40z0 font-semibold text-red-700 text-2xl"
      >
        x
      </button>
      <!-- <div
        :class="[
          'w-full justify-self-end px-[1%] md:px-[7%] flex flex-col gap-2 text-black bg-white/100 items-end h-full'
        ]"
      >
        <ul>
          <li v-for="(item, i) in items" :key="i" :class="['font-semibold flex flex-col  gap-2']">
            <template v-if="hasChildItems(item)">
              <router-link
                :to="{ name: item.name }"
                class="relative parent-item"
                :class="{ 'iq-active-menu': isParentActive(item) }"
                @click="isSmall = !isSmall"
              >
                <span class="hover:text-[#37a000]"> {{ $t(item.label) }}</span>

                <div
                  class="transition-all dzelay-75 ozpacity-0 left-0 bg-white pys-4 flex flex-col"
                  v-if="item.sub_items"
                >
                  <router-link
                    v-for="(el, j) in item.sub_items"
                    :key="j"
                    :to="{ name: el.name }"
                    class="px-4 py-1 hover:text-[#37a000]"
                    :class="{ 'iq-active-menu': $route.name === el.name }"
                    @click="toggleDropdown"
                    >{{ $t(el.label) }}</router-link
                  >
                </div></router-link
              >
            </template>
            <template v-else>
              <router-link
                :to="{ name: item.name }"
                class="relative hover:text-[#37a000]"
                :class="{ 'iq-active-menu': $route.name === item.name }"
                @click="isSmall = !isSmall"
              >
                {{ $t(item.label) }}
              </router-link>
            </template>
          </li>
        </ul>
      </div>
      <div
        class="shadow space-y-2 right-0 p-6 bg-white"
        id="languageDropdown"
        :class="{ 'text-black': changeBackground }"
      >
        <button
          @click="changeLang('en')"
          :class="[{ 'text-green-500': locale === 'en' }, 'hover:text-green-500']"
        >
          English
        </button>
        <button
          @click="changeLang('tig')"
          :class="[{ 'text-green-500': locale === 'tig' }, 'hover:text-green-500']"
        >
          ትግርኛ
        </button>
      </div> -->
    </div>
  </header>
</template>

<script setup>
// props are automatically provided in `<script setup>` block
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
// import { useRouter } from 'vue-router'
// import SettingsService from '@/services/SettingsService'

import { useI18n } from 'vue-i18n'

let showDropdown = ref(true)
const { locale } = useI18n()
function changeLang(lang) {
  locale.value = lang
  localStorage.setItem('lang', lang)
  showDropdown.value = !showDropdown.value
  setTimeout(() => {
    showDropdown.value = true
  }, 300)
}
defineProps({
  items: {
    type: Array,
    required: true
  }
})
let isSmall = ref(false)
let showModal = ref(true)
const currentLanguage=ref('en')
const route = useRoute()
function hasChildItems(item) {
  return item.sub_items && item.sub_items.length > 0
}
function isActive(item) {
  return route.name === item
}

function toggleDropdown() {
  showModal.value = !showModal.value
  setTimeout(() => {
    showModal.value = true
  }, 300)
}

// const settings = ref([])
// const router = useRouter()
// async function getSettings() {
//   try {
//     const response = await SettingsService.getSettings()
//     settings.value = response.data
//   } catch (error) {
//     if (error.response && error.response.status === 404 && error.response.data) {
//       return
//     } else {
//       setTimeout(() => {
//         router.push({ name: 'NetworkError' })
//       }, 3000)
//     }
//   }
// }

const changeBackground = ref(false)

// const scroll = true
const handleScroll = () => {
  changeBackground.value = window.scrollY > 80 && window.scrollY < 3600
}

import ApiService from '@/services/apiService'
const services = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/services')
    if (response) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription),
      }))
    }
  } catch (error) {
    // alert(error)
  }
}
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
onMounted(() => {
  // getSettings()
  window.addEventListener('scroll', handleScroll)
}, fetchServices())
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
