<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
// const news = async () => {
//   const response = await ApiService.get()
// }
import { ref, onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { currentLanguage } = storeToRefs(useAuthStore())

const departments = ref([])
const fetchServices = async () => {
  try {
    const response = await ApiService.get('/admin/departments')
    if (response.success) {
      departments.value = response.data.map((item) => ({
        ...item,
        departmentTitle: JSON.parse(item.departmentTitle),
        departmentDescription: JSON.parse(item.departmentDescription)
      }))
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<template>
  <section class="w-full">
    <div class="w-full relative hidden md:block">
      <img
        src="@/assets/img/1.jpg"
        alt=""
        class="w-full hidden md:flex md:max-h-[222px] object-cover"
      />
      <div
        class="absolute inset-0 w-full text-center bg-black/80 md:text-white flex flex-col items-center justify-center gap-2"
      >
        <h1 class="text-4xl font-bold">{{ $t('Our Departments') }}</h1>
        <div class="flex gap-4 max-sm:self-start items-center justify-center">
          <!-- <router-link to="/" class="px-4 py-2 rounded-xl md:text-white font-bold">{{
            $t('Home')
          }}</router-link>
          <span>></span> -->
          <router-link to="/products" class="text-[#539000] px-4 py-2">{{
            $t('Departments')
          }}</router-link>
        </div>
      </div>
    </div>
  </section>
  <!-- Services -->
  <section class="w-full bg-green-900/10 px-[2%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->
    <div class="grid grid-cols-1 w-full zmd:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(service, i) in departments"
        :key="i"
        class="zp-4 flex flex-col md:flex-row gap-8 bg-white shadow overflow-hidden w-full"
        data-aos="fade-up"
      >
        <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
        <div
          :class="[
            i % 2 === 0 ? 'md:order-1' : 'md:order-2',
            'basis-1/2 zshadow-orange-800 shadow overflow-hidden max-h-[500px]'
          ]"
          class="shadow rounded-xl"
        >
          <img
            v-if="service.departmentImage"
            :src="BASE_AVATAR + service.departmentImage"
            alt=""
            class="w-full h-full zring-2 zring-yellow-300 zrounded-full object-cover hover:scale-[1.2] transition-transform duration-500 ease-in-out hover:bg-[#53900F]"
          />

          <p v-else class="w-20 h-20 rounded-full text-6xl">
            {{ service.departmentTitle[currentLanguage] }}
          </p>
        </div>
        <div
          :class="[
            i % 2 === 0 ? 'order-2' : 'order-1',
            'basis-1/2',
            'flex flex-col gap-4 p-8 shadow-xl'
          ]"
        >
          <h1 class="text-2xl font-bold">{{ service.departmentTitle[currentLanguage] }}</h1>
          <div class="relative">
            <span class="w-1/4 absolute z-40 inset-0 h-[2px] bg-[#53900F]"></span>
            <hr class="h-[2px] absolute inset-0 bg-gray-200" />
          </div>
          <p class="line-clamp-5z" v-html="service.departmentDescription[currentLanguage]">
          </p>

          <router-link
            class="text-[#53900F] flex flex-col"
            :to="{
              name: 'department-detail',
              params: { title: service.departmentTitle[currentLanguage] }
            }"
            ><span>{{ $t('Read More') }}</span>
            <hr class=""
          /></router-link>
        </div>
      </div>
    </div>
  </section>
</template>
