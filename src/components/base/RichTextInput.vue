<template>
  <section class="w-full">
    <div ref="editorContainer" class="quill-editor w-full flex flex-col shadow"></div>
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
        [{ color: ['blue', 'green', 'red'] }, { background: [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    },
    placeholder: 'Type something...',
    bounds: editorContainer.value,
    clipboard: {
      matchVisual: false
    }
  })

  // Set initial content and ensure LTR direction
  quill.value.root.innerHTML = props.modelValue || ''
  quill.value.root.style.direction = 'ltr'

  // **Fix height issue**
  quill.value.root.style.minHeight = '200px' // Adjust this value as needed
  quill.value.root.style.maxHeight = '400px'
  quill.value.root.style.overflowY = 'auto'

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
      quill.value.root.style.direction = 'ltr'
    }
  }
)
</script>

<style scoped>
.quill-editor {
  min-height: 200px; /* Ensures proper input height */
  max-height: 400px;
  overflow-y: auto;
  direction: ltr; /* Ensure LTR direction */
}
</style>
