<template>
  <section class="w-full">
    <div ref="editorContainer" class="quill-editor w-full flex flex-col"></div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editorContainer = ref(null)
const quill = ref(null)

onMounted(() => {
  quill.value = new Quill(editorContainer.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ header: [1, 2, 3, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
        ['direction', 'rtl'] // Optional: Add RTL support
      ]
    },
    placeholder: 'Type something...',
    bounds: editorContainer.value,
    clipboard: {
      matchVisual: false
    }
  })

  // Set initial content and direction based on content
  quill.value.root.innerHTML = props.modelValue || ''

  quill.value.on('text-change', () => {
    const content = quill.value.root.innerHTML
    emit('update:modelValue', content)
  })
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (quill.value) {
      quill.value.root.innerHTML = newVal
    }
  }
)
</script>

<style scoped>
.quill-editor {
  /* height: 300px; Adjust height as needed */
}
</style>
