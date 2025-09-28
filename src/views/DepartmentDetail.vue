<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

// import slugify from '@/utils/slugify'
import ApiService from '@/services/apiService'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

import { BASE_AVATAR } from '@/config'
defineProps({
  title: {
    type: String,
    required: true
  }
})

const route = useRoute()
const department = ref([])

async function getDepartment() {
  try {
    // alert(route.params.title)
    const response = await ApiService.get('/admin/department/' + route.params.title)
    if (response.success) {
      department.value = response.data.map((item) => ({
        ...item,
        departmentTitle: JSON.parse(item.departmentTitle),
        departmentDescription: JSON.parse(item.departmentDescription)
      }))

      //  console.log(service.value)
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // alert(error)
    } else {
      setTimeout(() => {}, 5000)
    }
  }
}

// const services = ref([])
// async function getServices() {
//   try {
//     const response = await ApiService.get('/admin/services')
//     if (response.success) {
//       services.value = response.data.map((item) => ({
//         ...item,
//         serviceTitle: JSON.parse(item.serviceTitle),
//         serviceDescription: JSON.parse(item.serviceDescription)
//       }))
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 404 && error.response.data) {
//       return
//     } else {
//       setTimeout(() => {}, 5000)
//     }
//   }
// }
watchEffect(() => {
  if (route.params.title) {
    getDepartment()
  }
})
onMounted(getDepartment)
</script>
<template>
  <section class="w-full">
    <div
      class="w-full relative max-h-[222px] overflow-hidden"
      v-for="(dept, index) in department"
      :key="index"
    >
      <img
        v-if="dept.departmentImage"
        :src="BASE_AVATAR + `${dept.departmentImage}`"
        alt="My company"
        class="w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ dept.departmentTitle[currentLanguage] }}</h1>
        <div class="flex gap-4 items-center justify-center">
          <!-- <router-link to="/" class="px-4 py-2 rounded-xl text-white font-bold">{{
            $t('Home')
          }}</router-link> -->
          <!-- <span><font-awesome-icon icon="chevron-right"></font-awesome-icon></span> -->
          <router-link to="/departments" class="px-4 py-2">{{ $t('Departments') }}</router-link>

          <span><font-awesome-icon icon="chevron-right"></font-awesome-icon></span>

          <router-link
            :to="{
              name: 'department-detail',
              params: { title: dept.departmentTitle[currentLanguage] }
            }"
            class="text-[#539000] px-4 py-2"
            >{{ dept.departmentTitle[currentLanguage] }}</router-link
          >
        </div>
      </div>
    </div>
  </section>
  <section class="w-full px-[2%] py-12 bg-[#53900F]/10">
    <div
      class="w-full grid grid-cols-1 md:grid-cols-12 gap-4 bg-white"
      v-for="(dept, index) in department"
      :key="index"
    >
      <div class="relative w-full flex flex-col gap-4 group md:col-span-12">
        <div class="w-full max-h-[600px] overflow-hiddden">
          <img
            v-if="dept.departmentImage"
            :src="BASE_AVATAR + `${dept.departmentImage}`"
            alt="My company"
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div class="flex flex-col gap-2 py-6 bg-white translation-all duration-1000 px-4 relative">
          <div class="flex flex-col gap-4 py-2">
            <p class="text-gray-700">
              <span v-html=" dept.departmentDescription[currentLanguage] "> </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="w-full px-[2%] bg-white py-12 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(service, i) in services" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <img
          :src="BASE_AVATAR + service.serviceImage"
          alt=""
          class="max-h-[500px] rounded-xl w-full object-cover"
        />
      </div>
      <div class="flex flex-col flex-wrap gap-4 items-start justify-censter">
        <h6 class="text-gray-500"></h6>
        <h3 class="text-lg font-bold">
          {{ service.serviceTitle[currentLanguage] }}
        </h3>
        <p class="line-clamp-4">{{ service.serviceDescription[currentLanguage] }}</p>
        <router-link
          :to="{
            name: 'service-detail',
            params: { title: slugify(service.serviceTitle[currentLanguage]) }
          }"
          class="text-green-600 font-bold"
          >{{ $t('Read More') }}</router-link
        >
      </div>
    </div>
  </div> -->
</template>
