<script setup>
import SIDEBARITEMS from '@/constants/protected-sidebar'
import { watchEffect, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const { minimize } = storeToRefs(useAuthStore())
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
  <div :class="`${barClass}`" v-bind="$attrs">
    <ul class=" ">
      <li v-for="(item, index) in navigationItems" :key="index" class="pl-2 text-[14px]">
        <router-link
          :to="{ name: item.name }"
          :class="{
            'bg-[#53900F]/50 text-[#53900F] border ': $route.name === item.name
          }"
          exact
          active-class=""
          class="py-1 px-2 hover:bg-[#53900F]/30 hover:text-white transition-colors flex gap-4 duration-200"
          exact-path="true"
        >
          <font-awesome-icon v-if="item.icon" :icon="item.icon" />
          <span v-if="!minimize"> {{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  /* background-color: #0f0f0f; */
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
