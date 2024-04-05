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
  <div class="grid w-full px-[6%] py-12 bg-gray-50">
    <div class="py-12 flex flex-col items-center justify-center gap-4">
      <h1 class="text-center text-5xl font-semibold">OOPs!</h1>

      <p class="text-center text-xl" id="it">
        It looks like you are experiencing some network problem, please take a breath and
      </p>
      <router-link
        to="/"
        class="px-4 py-3 border border-[#539000] text-[#539000] font-bold bg-white"
        >click here</router-link
      >
      to try again.
    </div>
  </div>
</template>
<style scoped></style>
