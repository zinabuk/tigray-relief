<!-- A component visited when a user is loggedIn -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LeftSide from '@/components/protected/LeftSide.vue'
import { BASE_AVATAR } from '@/config'

import { useAuthStore } from '@/stores/auth'
// import BaseFileInput from '@/components/base/BaseFileInput.vue'
// import ApiService from '@/services/apiService'
const avatar = ref(localStorage.getItem('avatar'))
const { logOut } = useAuthStore()
const router = useRouter()

let showModal = ref(false)
// const hideDropdown = () => {
//   showModal.value = !showModal.value
// }

// let image = ref('')
// const captureImage = async ($event) => {
//   image.value = $event.target.files[0]

//   const formData = new FormData()
//   formData.append('avatar', image.value)
//   const response = await ApiService.post(formData)
//   if (response.success) {
//     alert('profile picture successfuly updated')
//     localStorage.setItem('avatar', response.data.avatar)
//     avatar.value = response.data.avatar
//     // alert(avatar.value)
//   }
// }

const userLogOut = () => {
 
  if (logOut()) {
    router.push('/')
  }
}
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.toggleDropdown')

  // Check if the clicked element is outside of the dropdown
  if (dropdown && !dropdown.contains(event.target)) {
    // Hide the dropdown
    showModal.value = false
  }
}

onMounted(() => {
  // Attach click event listener to the entire document
  document.addEventListener('click', handleClickOutside)
})

// Clean up the event listener on component unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section class="w-full bg-gray-200">
    <header class="flex items-center justify-between sticky shadow bg-white/100 z-10 top-0 px-2">
      <div class="w-[18%] flex items-center justify-between">
        <img src="@/assets/rest-logo.png" alt="" srcset="" class="h-16" />
        <div><font-awesome-icon icon="bars" class="text-yellow-300"></font-awesome-icon></div>
      </div>
      <div class="flex justify-center items-center gap-8">
        <div class="">
          <input
            type="search"
            placeholder="Search"
            class="px-4 border-2 border-t-0 outline-none border-r-0 border-l-0 py-2"
          />
        </div>

        <div class="relative text-center">
          <font-awesome-icon icon="bell" class="text-blue-500 text-xl"></font-awesome-icon>
        </div>
        <button @click="userLogOut" class=" relative">Logout</button>
        <img
          v-if="avatar"
          :src="BASE_AVATAR + `${avatar}`"
          alt="Profile"
          class="w-full h-full rounded-full"
        />

        <img v-else src="@/assets/5.jpg" alt="my profile" class="w-full h-full rounded-full" />

        <!-- <button @click="showModal = !showModal" class="w-12 h-12 overflow-hidden relative">

          <font-awesome-icon
            icon="chevron-down"
            class="absolute bottom-0 right-0 text-xl font-semibold"
          ></font-awesome-icon>
        </button> -->

        <!-- <div
          v-if="showModal"
          class="absolute bg-white/100 shadow-lg top-[100%] flex flex-col right-0 px-12 py-4 z-20 gap-4"
          ref="toggleDropdown"
        >
          <button class="self-start text-red-500 text-lg" @click="showModal = !showModal">X</button>
          <div class="w-20 h-20 relative p-1">
            <img
              v-if="avatar"
              :src="BASE_AVATAR + `${avatar}`"
              alt="Profile"
              class="w-full h-full rounded-full"
            />
            <img v-else src="@/assets/5.jpg" alt="my profile" class="w-full h-full" />

            <button class="absolute right-0 bottom-3 cursor-pointer">
              <input
                class="absolute right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                @change="captureImage($event)"
              />
              <font-awesome-icon
                icon="camera"
                class="text-xl inset-0 cursor-pointer"
              ></font-awesome-icon>
            </button>
          </div>
          <hr class="border w-full" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <router-link
                :to="{ name: 'setting' }"
                class="flex gap-2 items-center text-sm"
                exact
                active-class="iq-color4"
                @click="hideDropdown"
                ><font-awesome-icon icon="cog"></font-awesome-icon>
                <span>Settings</span></router-link
              >
              <router-link
                :to="{ name: 'analytics' }"
                class="flex gap-2 items-center text-sm"
                exact-active-class="iq-color4"
                @click="hideDropdown"
                ><font-awesome-icon icon="line-chart"></font-awesome-icon><span>Analytics</span>
              </router-link>
            </div>
            <hr class="border" />
            <router-link
              :to="{ name: 'account' }"
              class="flex gap-2 items-center text-sm"
              exact-active-class="iq-color4"
              @click="hideDropdown"
            >
              <font-awesome-icon icon="user-circle" class="text-sm"></font-awesome-icon>
              <span> My Account</span></router-link
            >

            <button class="flex gap-2 items-center text-red-600 text-sm" @click="userLogOut">
              <font-awesome-icon icon="sign-out-alt" class="text-red-600"></font-awesome-icon>
              <span> Log out</span>
            </button>
          </div>
        </div> -->
      </div>
    </header>
    <div class="w-full flex flex-wrap">
      <LeftSide bar-class="w-[18%]"></LeftSide>
      <router-view></router-view>
    </div>
  </section>
</template>
