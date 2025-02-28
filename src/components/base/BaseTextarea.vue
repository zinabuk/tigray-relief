<template>
  <div class="input-container relative w-full">
    <label :for="label" v-if="label" class="font-semibdold">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      :id="label"
      :class="textareaClasses"
      class="px-4 py-2 w-full border rounded-md focus:border-[#53900F] focus:outline-none"
    ></textarea>
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="absolute top-[16px] transform -tranlslate-y-1/2 left-4 texdt-white"
    />
  </div>
</template>

<script setup>
// import { defineProps } from 'vue'

// Define props
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  rows: {
    type: [String, Number],
    default: 3
  },
  cols: {
    type: [String, Number],
    default: 30
  },
  textareaClasses: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})
</script>
