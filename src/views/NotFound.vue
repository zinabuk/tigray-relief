<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'Page'
  }
})
</script>
<template>
  <div class="grid w-full grid-cols-1 h-screen justify-between py-12 bg-[#1d4354]/5">
    <div class="py-12 flex flex-col items-center justify-center gap-4">
      <h1 class="text-center text-5xl font-semibold">OOPs! &hearts;</h1>
      <p class="text-center text-xl" id="it">{{ resource }} is not found.</p>
      <router-link to="/" class="px-4 py-3 border border-iq-color1 text-iq-color1"
        >Take Me Home</router-link
      >
    </div>
  </div>
</template>
<style scoped></style>
