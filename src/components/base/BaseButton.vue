<template>
  <div class="input-container relative">
    <button :class="` border rounded-md bg-[#53900F] text-white ${buttonClass}`" v-bind="$attrs" :disabled="disabled">
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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  buttonClass: {
    type: String,
    default: ''
  }
})
</script>
