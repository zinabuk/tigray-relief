<template>
  <section class="w-[82%]" dir="ltr">
    <QuillEditor v-model:content="description"></QuillEditor>
    <button @click="submit" class="bg-[#53900F] text-white">Send</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import QuillEditor from '@/components/base/QuillEditor.vue'
const description = ref('')

const submit = () => {
  alert(description.value)
}
</script>
