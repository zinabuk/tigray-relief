<template>
  <div class="input-container relative flex w-full flex-col">
    <input
      v-bind="$attrs"
      :accept="accept"
      :id="uniqueId"
      @change="onFileChange($event)"
      class="absolute w-[1px] h-[1px] p-0 border-none"
      :class="fileClass"
    />
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="absolute top-1/2 transform -translate-y-1/2 left-4 ztext-white"
    />
    <label
      :for="uniqueId"
      v-if="label"
      class="font-semibold border bg-white py-3 ml-4 px-6 self-start"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  fileClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['image-update'])

// Generate a unique ID for each instance
const uniqueId = `file-input-${Math.random().toString(36).slice(2, 9)}`

const onFileChange = ($event) => {
  let file = $event.target.files[0]
  if (file) {
    emit('image-update', file)
  }
}
</script>
