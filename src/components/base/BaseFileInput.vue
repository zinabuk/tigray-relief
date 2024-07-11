<template>
  <div class="input-container relative flex flex-col">
    <input
      type="file"
      :accept="accept"
      id="label"
      @change="onFileChange($event)"
      class="absolute w-[1px] h-[1px] p-0 border-none"
      :class="fileClass"
    />
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      class="absolute top-1/2 transform -translate-y-1/2 left-4 text-whsite"
    />
    <label for="label" v-if="label" class="font-semibold border bg-white py-3 px-6 self-start">{{
      label
    }}</label>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue'
defineProps({
  icon: {
    type: String,
    default: ''
  },
  accept:{
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
const onFileChange = ($event) => {
  let file = $event.target.files[0]
  if (file) {
    // alert(file)
    emit('image-update', file)
  }
}
</script>
