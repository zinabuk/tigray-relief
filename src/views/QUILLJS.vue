<template>
  <section class="w-[82%] ">
    <QuillEditor v-model="content"></QuillEditor>
    <button @click="submit">Send</button>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import QuillEditor from '@/components/base/QuillEditor.vue'
const content = ref('')

const submit = () => {
  alert(content.value)
}
</script>
