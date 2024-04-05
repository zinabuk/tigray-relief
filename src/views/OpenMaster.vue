<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import WebsiteHeader from '@/components/open/WebsiteHeader.vue'
import FooterComponent from '@/components/open/FooterComponent.vue'
</script>

<template> 
  <section class="w-full">
    <WebsiteHeader></WebsiteHeader>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </section>
</template>
