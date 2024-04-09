<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import WebsiteHeader from '@/components/open/WebsiteHeader.vue'
import FooterComponent from '@/components/open/FooterComponent.vue'

import { reactive } from 'vue'
import NavItems from '@/constants/open-navigation.js'

const items = reactive(NavItems)
</script>

<template>
  <section class="w-full">
    <WebsiteHeader :items="items"></WebsiteHeader>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </section>
</template>
