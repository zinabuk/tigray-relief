<template>
  <header class="w-full sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
    <!-- Top Bar (Social Media & Contact Info) -->
    <div class="w-full bg-gradient-to-r text-[#0088CC] from-white to-white flex justify-between items-center px-4 py-2 md:px-8">
      <div class="flex items-center gap-3">
        <a
          :href="social.link"
          target="_blank"
          v-for="(social, index) in medias"
          :key="index"
          class="hover:scale-110 transition-transform duration-200"
        >
          <font-awesome-icon
            v-if="social.platform.toLowerCase() === 'facebook'"
            :icon="['fab', 'facebook']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'twitter'"
            :icon="['fab', 'twitter']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'youtube'"
            :icon="['fab', 'youtube']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'telegram'"
            :icon="['fab', 'telegram']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'linkedin'"
            :icon="['fab', 'linkedin']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else-if="social.platform.toLowerCase() === 'instagram'"
            :icon="['fab', 'instagram']"
            class="text-white hover:text-indigo-200"
          />
          <font-awesome-icon
            v-else
            :icon="['fab', 'whatsapp']"
            class="text-white hover:text-indigo-200"
          />
        </a>
      </div>
      <div class="hidden md:flex items-center gap-4 text-sm">
        <div v-for="(contact, index) in infoG" :key="index" class="flex gap-3">
          <h1 class="flex items-center gap-1">
            <font-awesome-icon icon="phone" class="text-indigo-200" />
            {{ contact.contactNumber }}
          </h1>
          <h1 class="flex items-center gap-1">
            <font-awesome-icon icon="envelope" class="text-indigo-200" />
            {{ contact.mail }}
          </h1>
          <h1 class="flex items-center gap-1">
            <font-awesome-icon icon="map-marker-alt" class="text-indigo-200" />
            {{ contact.address }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex w-full px-8 py-4 items-center justify-between bg-[#0088CC]">
      <router-link to="/" class="flex items-center" title="REST">
        <img src="@/assets/tbc.jpg" alt="Logo of REST" class="h-16 object-contain rounded-full" />
        <h2 class="text-2xl font-bold ml-2">Tigray Biotechnology Center</h2>
      </router-link>
      <ul class="flex gap-6 text-lg font-sans">
        <li class="relative group">
          <router-link
            :to="{ name: 'home' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('home') }]"
          >
            {{ $t('Home') }}
          </router-link>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'about' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('about') }]"
          >
            {{ $t('Who We Are') }}
          </router-link>
          <div
            class="absolute hidden group-hover:flex flex-col bg-[#148C4E] p-4 rounded-lg shadow-xl min-w-[200px] top-full left-0"
          >
            <router-link
              v-for="item in aboutSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              class="py-2 px-4 hover:bg-[#A30001] hover:text-white rounded transition-colors"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'services' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('services') }]"
          >
            {{ $t('What We Do') }}
          </router-link>
          <div
            class="absolute hidden group-hover:flex flex-col bg-gray-800 p-4 rounded-lg shadow-xl min-w-[200px] top-full left-0"
          >
            <router-link
              v-for="(service, i) in services"
              :key="i"
              :to="{ name: 'service-detail', params: { title: service.serviceTitle[currentLanguage] } }"
              class="py-2 px-4 hover:bg-indigo-600 hover:text-white rounded transition-colors"
            >
              {{ $t(service.serviceTitle[currentLanguage]) }}
            </router-link>
          </div>
        </li>
        <li>
          <router-link
            :to="{ name: 'blogs' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('blogs') }]"
          >
            {{ $t('News & Stories') }}
          </router-link>
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'gallery' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('documents') }]"
          >
            {{ $t('Gallery') }}
          </router-link>
          <!-- <div
            class="absolute hidden group-hover:flex flex-col bg-gray-800 p-4 rounded-lg shadow-xl min-w-[200px] top-full left-0"
          >
            <router-link
              v-for="item in resourceSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              class="py-2 px-4 hover:bg-[#A30001] hover:text-white rounded transition-colors"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div> -->
        </li>
        <li class="relative group">
          <router-link
            :to="{ name: 'contact' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('contact') }]"
          >
            {{ $t('Contact Us') }}
          </router-link>  
        </li>
        <!-- <li class="relative group">
          <router-link
            :to="{ name: 'jobs' }"
            class="hover:text-[#A30001] transition-colors"
            :class="[{ 'text-[#A30001]': isActive('jobs') }]"
          >
            {{ $t('Get Involved') }}
          </router-link>
          <div
            class="absolute hidden group-hover:flex flex-col bg-gray-800 p-4 rounded-lg shadow-xl min-w-[200px] top-full left-0"
          >
            <router-link
              v-for="item in getInvolvedSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              class="py-2 px-4 hover:bg-indigo-600 hover:text-white rounded transition-colors"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div>
        </li> -->

      </ul>
    </nav>

    <!-- Mobile Navigation -->
    <header class="md:hidden w-full bg-gray-900 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <router-link to="/" class="flex items-center" title="REST">
        <img src="@/assets/rest.jpg" alt="Logo of REST" class="h-12 w-12 object-contain" />
      </router-link>
      <button @click.prevent="showSmallDeviceNavigation" class="text-white">
        <font-awesome-icon icon="bars" class="text-2xl" />
      </button>
    </header>
    <div
      v-if="isSmall"
      class="md:hidden fixed inset-0 bg-gray-900 text-white z-50 flex flex-col px-6 py-4"
      data-aos="fade-right"
    >
      <button @click="isSmall = !isSmall" class="self-end text-3xl">
        <font-awesome-icon icon="times" />
      </button>
      <nav class="flex flex-col gap-4 text-lg font-sans">
        <router-link
          :to="{ name: 'home' }"
          @click="toggleShowDropDown"
          class="hover:text-[#A30001]"
          :class="[{ 'text-[#A30001]': isActive('home') }]"
        >
          {{ $t('Home') }}
        </router-link>
        <div class="flex flex-col">
          <router-link
            :to="{ name: 'about' }"
            @click="toggleShowDropDown"
            class="hover:text-[#A30001]"
            :class="[{ 'text-[#A30001]': isActive('about') }]"
          >
            {{ $t('Who We Are') }}
          </router-link>
          <div class="pl-4 flex flex-col gap-2 mt-2">
            <router-link
              v-for="item in aboutSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              @click="toggleShowDropDown"
              class="hover:text-[#A30001]"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div>
        </div>
        <div class="flex flex-col">
          <router-link
            :to="{ name: 'services' }"
            @click="toggleShowDropDown"
            class="hover:text-[#A30001]"
            :class="[{ 'text-[#A30001]': isActive('services') }]"
          >
            {{ $t('What We Do') }}
          </router-link>
          <!-- <div class="pl-4 flex flex-col gap-2 mt-2">
            <router-link
              v-for="(service, i) in services"
              :key="i"
              :to="{ name: 'service-detail', params: { title: service.serviceTitle[currentLanguage] } }"
              @click="toggleShowDropDown"
              class="hover:text-[#A30001]"
            >
              {{ $t(service.serviceTitle[currentLanguage]) }}
            </router-link>
          </div> -->
        </div>
        <router-link
          :to="{ name: 'blogs' }"
          @click="toggleShowDropDown"
          class="hover:text-[#A30001]"
          :class="[{ 'text-[#A30001]': isActive('blogs') }]"
        >
          {{ $t('News & Stories') }}
        </router-link>
        <div class="flex flex-col">
          <router-link
            :to="{ name: 'documents' }"
            @click="toggleShowDropDown"
            class="hover:text-[#A30001]"
            :class="[{ 'text-[#A30001]': isActive('documents') }]"
          >
            {{ $t('Resources & Reports') }}
          </router-link>
          <div class="pl-4 flex flex-col gap-2 mt-2">
            <router-link
              v-for="item in resourceSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              @click="toggleShowDropDown"
              class="hover:text-[#A30001]"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div>
        </div>
        <div class="flex flex-col">
          <router-link
            :to="{ name: 'jobs' }"
            @click="toggleShowDropDown"
            class="hover:text-[#A30001]"
            :class="[{ 'text-[#A30001]': isActive('jobs') }]"
          >
            {{ $t('Get Involved') }}
          </router-link>
          <div class="pl-4 flex flex-col gap-2 mt-2">
            <router-link
              v-for="item in getInvolvedSubItems"
              :key="item.name"
              :to="{ name: item.name }"
              @click="toggleShowDropDown"
              class="hover:text-[#A30001]"
              :class="[{ 'text-[#A30001]': isActive(item.name) }]"
            >
              {{ $t(item.label) }}
            </router-link>
          </div>
        </div>
        <router-link
          :to="{ name: 'donate' }"
          @click="toggleShowDropDown"
          class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-500 text-center"
        >
          <font-awesome-icon icon="heart" class="animate-pulse mr-2" />
          {{ $t('Donate') }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';

const currentLanguage = ref(localStorage.getItem('lang') || 'en');
const isSmall = ref(false);
const showDropdown = ref(true);
const route = useRoute();
const infoG = ref([]);
const medias = ref([]);
const services = ref([]);

const aboutSubItems = [
  { name: 'about', label: 'Mission / Vision / Values' },
  { name: 'history', label: 'History' },
  { name: 'board-members', label: 'Managing Directors' },
  { name: 'partners-open', label: 'Partners' },
  { name: 'contact', label: 'Contact Us' },
  { name: 'faqs', label: 'FAQs' },
];

// const resourceSubItems = [
//   { name: 'documents', label: 'Documents' },
//   { name: 'gallery', label: 'Gallery' },
// ];

// const getInvolvedSubItems = [
//   { name: 'jobs', label: 'Careers' },
//   { name: 'volunteer', label: 'Volunteers' },
//   { name: 'tenders', label: 'Tenders' },
// ];

function showSmallDeviceNavigation() {
  isSmall.value = !isSmall.value;
}

function toggleShowDropDown() {
  isSmall.value = false;
  showDropdown.value = false;
}

function isActive(item) {
  return route.name === item;
}

const fetchInfography = async () => {
  try {
    const response = await apiService.get('/admin/contact-address');
    if (response.success) {
      infoG.value = response.data.splice(0, 1);
    }
  } catch (error) {
    alert(error);
  }
};

const fetchMedia = async () => {
  try {
    const response = await apiService.get('/admin/social-medias');
    if (response.success) {
      medias.value = response.data;
    }
  } catch (error) {
    alert(error);
  }
};

const fetchServices = async () => {
  try {
    const response = await apiService.get('/admin/services');
    if (response.success) {
      services.value = response.data.map((item) => ({
        ...item,
        serviceTitle: JSON.parse(item.serviceTitle),
        serviceDescription: JSON.parse(item.serviceDescription),
      }));
    }
  } catch (error) {
    alert('error');
  }
};

onMounted(() => {
  fetchServices();
  fetchInfography();
  fetchMedia();
});
</script>

<style scoped>
/* Smooth hover transitions for dropdowns */
.group:hover .group-hover\:flex {
  animation: slideDown 0.3s ease-in-out;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>