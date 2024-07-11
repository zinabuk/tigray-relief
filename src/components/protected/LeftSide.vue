<script setup>
import SIDEBARITEMS from '@/constants/protected-sidebar'
import { watchEffect, ref } from 'vue'

const role = ref(localStorage.getItem('role'))
defineProps({
  barClass: {
    type: String,
    default: ''
  }
})

const items = SIDEBARITEMS.ADMIN_TABS
const stafItems = SIDEBARITEMS.STAFF_TABS
const navigationItems = ref([])
watchEffect(() => {
  if (role.value === 'admin') {
    navigationItems.value = items
  } else {
    navigationItems.value = stafItems
  }
})
</script>

<template>
  <aside
    :class="`${barClass} sidebar zbg-white border-r-2  bg-yellow-50s h-auto top-[68px] sticky text-[14px] shadow-xl border rounded-xl px-4 py-2 bg-white overflow-auto`"
  >
    <ul class=" ">
      <li v-for="(item, index) in navigationItems" :key="index" class="mb-2">
        <router-link
          :to="{ name: item.name }"
          :class="{
            'bg-[#53900F]/50 text-[#53900F] border   rounded-r-2xl font-bold ':
              $route.name === item.name
          }"
          exact
          active-class=""
          class="block py-1 px-2 zrounded-lg hover:bg-[#53900F]/30 hover:text-white transition-colors duration-200 "
          exact-path="true"
        >
          <font-awesome-icon v-if="item.icon" :icon="item.icon" />
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  /* background-color: #0f0f0f; */
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
