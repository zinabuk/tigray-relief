<template>
  <header class="w-full hidden md:flex sticky top-0 z-50">
    <nav class="w-full px-[1%] flex justify-between items-center py-4 font-bold bg-white/100">
      <router-link to="/" class="flex items-center hover:border-b-0" title="REST">
        <img src="@/assets/rest-logo.png" alt="Logo of REST" class="rounded-full w-32 h-20" />
      </router-link>
      <ul :class="['flex space-x-4 font-bold ']">
        <li v-for="(item, i) in items" :key="i" :class="[' ']">
          <template v-if="hasChildItems(item)">
            <router-link
              :to="{ name: item.name }"
              class="relative parent-item"
              :class="[{ '': isParentActive(item) }]"
            >
              <span class="hover:text-[#37a000]"> {{ $t(item.label) }}</span>
              <font-awesome-icon icon="chevron-down" class="text-sm"></font-awesome-icon>
              <div
                class="absolute child z-50 top-[100%] min-w-48 hidden transition-all delay-75 opacity-0 left-0 bg-white py-4"
                v-if="item.sub_items && showModal"
                ref="dropdown"
              >
                <router-link
                  v-for="(el, j) in item.sub_items"
                  :key="j"
                  :to="{ name: el.name }"
                  class="px-4 py-2 hover:text-[#37a000]"
                  @click="toggleDropdown"
                  :class="[
                    { 'iq-active-menu': $route.name === el.name },
                    { 'text-black': changeBackground }
                  ]"
                  >{{ $t(el.label) }}
                </router-link>
              </div></router-link
            >
          </template>
          <template v-else>
            <router-link
              :to="{ name: item.name }"
              class="relative hover:text-[#37a000]"
              :class="{ 'iq-active-menu': $route.name === item.name }"
            >
              {{ $t(item.label) }}
            </router-link>
          </template>
        </li>
      </ul>

      <div>
        <router-link
          :to="{ name: 'donate' }"
          class="bg-yellow-300 rounded-xl text-black px-4 py-2"
          >Donate</router-link
        >
      </div>
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
      <div
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
      </div>
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

const route = useRoute()
function hasChildItems(item) {
  return item.sub_items && item.sub_items.length > 0
}
function isParentActive(item) {
  return route.name === item.name
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

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
onMounted(() => {
  // getSettings()
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.iq-active-menu {
  color: #2aa000;
}
a {
  transition: border 0.6s;
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
