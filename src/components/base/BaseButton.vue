<template>
  <div class="input-container relative w-full">
    <button class="px-4 py-2 bg-[#539000] text-white" v-bind="$attrs">
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        class="absolute top-1/2 transform -translate-y-1/2 left-4 text-white"
      />
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  inputClass: {
    type: String,
    default: ''
  }
})
</script>
