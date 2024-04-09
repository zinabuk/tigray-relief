<script setup>
import SIDEBARITEMS from '@/constants/protected-sidebar'
defineProps({
  barClass: {
    type: String,
    default: ''
  }
})

const items = SIDEBARITEMS.ADMIN_TABS
</script>

<template>
  <aside
    :class="`${barClass} sidebar bg-white border-r-2  bg-yellow-50s h-[calc(100vh_-_68px)] top-[68px] sticky text-[16px] `"
  >
    <ul class="mt-4">
      <li v-for="(item, index) in items" :key="index" class="mb-2">
        <router-link
          :to="{ name: item.name }"
          :class="{
            'text-[#539000] border-r-2 rounded-none border-r-[#539000] font-bold ':
              $route.name === item.name
          }"
          exact
          active-class=""
          class="block py-1 px-2 rounded-lg hover:bg-yellow-300 hover:text-white transition-colors duration-200"
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
