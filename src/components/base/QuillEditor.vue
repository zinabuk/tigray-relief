<template>
  <div ref="editorContainer" class="quill-editor"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Import Quill's CSS

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
        ['clean']
      ]
    },
    placeholder: 'Type something...', // Optional placeholder
    bounds: editorContainer.value,
    clipboard: {
      matchVisual: false // Prevent mismatched direction on paste
    }
  })

  // Set the direction explicitly to prevent reversal
  quill.value.root.setAttribute('dir', 'ltr')

  quill.value.on('text-change', () => {
    const content = quill.value.root.innerHTML
    emit('update:modelValue', content)
  })

  // Set initial content if provided
  quill.value.root.innerHTML = props.modelValue || ''
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (quill.value) {
      quill.value.root.innerHTML = newVal // Update the editor when content changes
    }
  }
)
</script>

<style scoped>
.quill-editor {
  /* height: 300px; Adjust height as needed */
}
</style>
