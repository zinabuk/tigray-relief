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
const core_tabs = ref([])
const support_tabs = ref([])
watchEffect(() => {
  if (role.value === 'admin') {
    navigationItems.value = items
    core_tabs.value = items.CORE_TABS
    support_tabs.value = items.SUPPORT_TABS
  } else {
    navigationItems.value = stafItems
  }
})
</script>

<template>
  <div :class="`${barClass}`" v-bind="$attrs" v-if="role === 'admin'">
    <h1 class="text-sm">System</h1>
    <ul class="w-full">
      <li v-for="(item, index) in core_tabs" :key="index" class="pl-2 text-[14px]">
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

    <h1 class="text-sm font-semibolds">Support</h1>
    <ul class="">
      <li v-for="(item, index) in support_tabs" :key="index" class="pl-2 text-[14px]">
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
