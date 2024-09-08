<script setup>
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { ref, onMounted } from 'vue'

const faqs = ref([])

const fetchFaqs = async () => {
  try {
    const response = await ApiService.get('/admin/faqs')
    if (response) {
      faqs.value = response.data.map((item) => ({
        ...item,
        question: JSON.parse(item.question),
        answer: JSON.parse(item.answer)
      }))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {}, 2000)
    }
  }
}

let showAddModal = ref(false)
const currentLanguage = ref('en')
const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}
const form = ref({
  id: null,
  question: { en: '', ti: '', am: '' },
  answer: { en: '', ti: '', am: '' }
})

const errorMessage = ref('')
const successMessage = ref('')

let edit = ref(false)
const editFaq = (faq) => {
  form.value = {
    id: faq.id,
    question: { ...faq.question },
    answer: { ...faq.answer }
  }
  edit.value = true
  showAddModal.value = true
}

const saveFaq = async () => {
  const formData = {
    question: JSON.stringify(form.value.question),
    answer: JSON.stringify(form.value.answer)
  }
  try {
    if (edit.value) {
      console.log('Editing FAQ with ID:', form.value.id)
      const response = await ApiService.patch('/admin/faqs/' + form.value.id, formData)

      fetchFaqs()
      closeModal() // Close modal after successful edit
    } else {
      const res = await ApiService.post('/admin/faqs', formData)

      fetchFaqs()
      closeModal() // Close modal after successful save
    }
  } catch (error) {
    errorMessage.value = 'Failed to save FAQ'
  }
}

const deleteFaq = async (id) => {
  const sure = window.confirm('Are you sure to delete this FAQ?')
  if (sure) {
    try {
      const response = await ApiService.delete('/admin/faqs/' + id)
      if (response.data.success) {
        fetchFaqs()
      } else {
        errorMessage.value = 'Failed to delete FAQ'
      }
    } catch (error) {
      errorMessage.value = 'Failed to delete FAQ'
    }
  }
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    question: { en: '', ti: '', am: '' },
    answer: { en: '', ti: '', am: '' }
  }
  edit.value = false
}

onMounted(() => {
  fetchFaqs()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- FAQs -->
    <button
      @click="showAddModal = true"
      class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add FAQ
    </button>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
      <div
        v-for="(faq, i) in faqs"
        :key="i"
        class="p-4 flex flex-col gap-2 zbg-white hover:bg-[#53900F] hover:text-white justify-between shadow-xl bg-[#53900F]/10"
      >
        <h1 class="text-2xl font-bold">{{ faq.question[currentLanguage] }}</h1>
        <p class="line-clamp-5">
          {{ faq.answer[currentLanguage] }}
        </p>
        <div class="flex gap-2 justify-end">
          <button @click="editFaq(faq)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deleteFaq(faq.id)">
            <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showAddModal"
      class="fixed inset-0 overflow-auto flex items-center z-50 justify-center modal bg-black/50 bg-opacity-50 modal"
    >
      <div class="bg-white shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ edit ? 'Edit FAQ' : 'Add FAQ' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <div class="bg-white flex flex-col gap-2 w-full">
            <!-- <div class="flex w-full justify-between">
              <button
                @click="toggleLanguage('en')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'en',
                  'bg-gray-200': currentLanguage !== 'en'
                }"
                class="px-4 py-1"
              >
                English
              </button>
              <button
                @click="toggleLanguage('ti')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'ti',
                  'bg-gray-200': currentLanguage !== 'ti'
                }"
                class="px-4 py-1"
              >
                ትግርኛ
              </button>
              <button
                @click="toggleLanguage('am')"
                :class="{
                  'border-2 border-b-[#53900F]': currentLanguage === 'am',
                  'bg-gray-200': currentLanguage !== 'am'
                }"
                class="px-4 py-1"
              >
                አማርኛ
              </button>
            </div> -->
            <form @submit.prevent="saveFaq" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.question[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('Question')"
                ></BaseInput>
                <BaseTextarea
                  v-model="form.answer[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Answer"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <BaseButton type="submit" class="w-full px-2 py-2 rounded"> Save FAQ </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.modal {
  animation: modal 0.3s;
}

@keyframes modal {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
