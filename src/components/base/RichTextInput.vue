<template>
  <section class="w-full">
    <div ref="editorContainer" class="quill-editor w-full flex flex-col shadow"></div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import Quill from "quill"
import "quill/dist/quill.snow.css"

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Type something..." }
})

const emit = defineEmits(["update:modelValue"])
const editorContainer = ref(null)
let quill = null

onMounted(() => {
  quill = new Quill(editorContainer.value, {
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ header: [1, 2, 3, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["clean"],
        ["link", "image", "video"]
      ]
    },
    placeholder: props.placeholder
  })

  // initial content
  if (props.modelValue) {
    quill.clipboard.dangerouslyPasteHTML(props.modelValue)
  }

  quill.on("text-change", () => {
    emit("update:modelValue", quill.root.innerHTML)
  })
})

// keep Vue state in sync
watch(
  () => props.modelValue,
  (newVal) => {
    if (quill && newVal !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(newVal || "")
    }
  }
)

// ✅ clean up properly to avoid selection errors
onBeforeUnmount(() => {
  if (quill) {
    quill.off("text-change")
    quill = null
  }
})
</script>


<style scoped>
.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  direction: ltr;
}
</style>
