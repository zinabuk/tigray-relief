<!-- A component visited when a user is loggedIn -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import LeftSide from '@/components/protected/LeftSide.vue'
import { BASE_AVATAR } from '@/config'

import { useAuthStore } from '@/stores/auth'
const avatar = ref(localStorage.getItem('avatar'))
const { logOut } = useAuthStore()
const router = useRouter()

const { minimize } = storeToRefs(useAuthStore())
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
    // alert('Logout')
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
  <section class="w-full bg-[#53900F]/15">
    <header
      class="flex items-center justify-between sticky shadow zbg-white/100 z-50 top-0 px-2 bg-[#53900F]"
    >
      <div :class="[!minimize ? 'w-[18%]' : 'w-[2%] gap-2', 'flex items-center justify-between ']">
        <img src="@/assets/rest-logo.png" alt="" srcset="" class="h-16" v-if="!minimize" />
        <img
          src="@/assets/rest-logo.png"
          alt=""
          srcset=""
          class="h-16 w-16 object-contain"
          v-else
        />

        <button @click="minimize = !minimize">
          <font-awesome-icon icon="bars" class="text-yellow-300"></font-awesome-icon>
        </button>
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
        <button @click="userLogOut" class="relative text-white">Logout</button>
        <div class="w-20 h-20 overflow-hidden">
          <img
            v-if="0"
            :src="BASE_AVATAR + `${avatar}`"
            alt="Profile"
            class="w-full h-full rounded-full"
          />

          <img
            v-else
            src="@/assets/account.png"
            alt="my profile"
            class="w-full h-full rounded-full"
          />
        </div>
      </div>
    </header>
    <div class="w-full flex flex-wrap relative">
      <LeftSide
        bar-class="shadow-lgx px-2 h-screen sticky left-0 top-[84px] xz-10 bottom-0 overflow-auto bg-white
        "
        :class="[!minimize? 'w-[18%]' : 'w-2%', 'py-4']"
      ></LeftSide>
      <router-view></router-view>
    </div>
  </section>
</template>
