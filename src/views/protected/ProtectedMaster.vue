

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import LeftSide from '@/components/protected/LeftSide.vue'
import { BASE_AVATAR } from '@/config'
import ApiService from '@/services/apiService'
import { useAuthStore } from '@/stores/auth'
const avatar = ref(localStorage.getItem('avatar'))
const { logOut } = useAuthStore()
const router = useRouter()
const name = ref(localStorage.getItem('name'))


const { minimize } = storeToRefs(useAuthStore())
let showModal = ref(false)
const hideDropdown = () => {
  showModal.value = false
}

let image = ref('')
const captureImage = async ($event) => {
  image.value = $event.target.files[0]

  const formData = new FormData()
  formData.append('avatar', image.value)
  const response = await ApiService.patch("/admin/edit-profile/",formData)
  if (response.success) {
    // alert('profile picture successfuly updated')
    localStorage.setItem('avatar', response.data.avatar)
    avatar.value = response.data.avatar
    // alert(avatar.value)
  }
}

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

// function toggleNavBar() {
//   store.navOpened = !store.navOpened
// }
// Clean up the event listener on component unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section class="w-full bg-[#53900F]/5">
    <header
      class="flex items-center justify-between sticky shadow zbg-white/100 z-20 top-0 px-2 zbg-[#53900F] bg-white"
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
          <!-- <input
            type="search"
            placeholder="Search"
            class="px-4 border-2 border-t-0 outline-none border-r-0 border-l-0 py-2"
          /> -->
        </div>

        <div class="relative text-center">
          <font-awesome-icon icon="bell" class="text-blue-500 text-xl"></font-awesome-icon>
        </div>
            <button @click="showModal = !showModal" class="flex gap-4 relative">
              <div class="w-8 h-8 overflow-hidden relative">
                <img
                  v-if="avatar"
                  :src="BASE_AVATAR + `${avatar}`"
                  alt="Profile"
                  class="w-full h-full rounded-full"
                />
                <!-- <img
                  v-else
                  src="@/assets/account.png"
                  alt="my profile"
                  class="w-full h-full rounded-full"
                /> -->
              </div>
              <div class="flex px-2 py-1 gap-4 justify-between items-center bg-white/70">
                <p class="">{{ name }}</p>
                <font-awesome-icon
                  icon="chevron-down"
                  class="absolutex text-lgz font-semibold"
                ></font-awesome-icon>
              </div>
              <div
                v-if="showModal"
                class="absolute bg-white/100 shadow-lg top-[100%] flex flex-col right-0 px-12 py-4 z-20 gap-4"
                ref="toggleDropdown"
                zdata-aos="fade-up"
              >

                <div class="w-20 h-20 relative p-1">
                  <img
                    v-if="avatar"
                    :src="BASE_AVATAR + `${avatar}`"
                    alt="Profile"
                    class="w-full h-full rounded-full"
                  />
                  <!-- <img v-else src="@/assets/account.png" alt="my profile" class="w-full h-full" /> -->

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
              
                <div class="flex flex-col gap-4">

                                
                  <router-link
                    :to="{ name: 'users' }"
                    class="flex gap-2 items-center text-sm"
                    exact-active-class="meyla-color4"
                    @click="hideDropdown"
                  >
                    <font-awesome-icon icon="user-circle" class="text-sm"></font-awesome-icon>
                    <span>Users</span></router-link
                  >

                  <router-link
                    :to="{ name: 'account' }"
                    class="flex gap-2 items-center text-sm"
                    exact-active-class="meyla-color4"
                    @click="hideDropdown"
                  >
                    <font-awesome-icon icon="user-circle" class="text-sm"></font-awesome-icon>
                    <span> My account</span></router-link
                  >

                  <button class="flex gap-2 items-center text-red-600 text-sm" @click="userLogOut">
                    <font-awesome-icon icon="sign-out-alt" class="text-red-600"></font-awesome-icon>
                    <span>log out</span>
                  </button>
                </div>
              </div>
            </button>
          </div>
        </header>

        <div class="w-full flex  relative">
      <LeftSide
        bar-class="shadow-lgx px-2 h-screen sticky left-0 ztop-[84px] z-10 bottom-0 overflow-auto bg-white
        "
        :class="[!minimize? 'w-[18%]' : 'w-2%', 'py-4']"
      ></LeftSide>
      <router-view></router-view>
    </div>
      </section>
</template>


