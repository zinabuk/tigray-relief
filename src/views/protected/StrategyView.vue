<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- Strategies -->
    <button
      @click="showAddModal = true"
      class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]"
    >
      <font-awesome-icon
        icon="add"
        class="bg-white text-[#539000] p-2 rounded-full"
      ></font-awesome-icon>
      Add strategy
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <div
        v-for="(strategy, i) in strategies"
        :key="i"
        class="p-4 flex flex-col gap-2 bg-white hover:bg-[#53900F] hover:text-white justify-between shadow-xl"
      >
        <h1 class="text-2xl font-bold">{{ strategy.title[currentLanguage] }}</h1>
        <p class="line-clamp-5">{{ strategy.description[currentLanguage] }}</p>
        <img
          v-if="strategy.image"
          :src="BASE_AVATAR + strategy.image"
          alt=""
          class="w-24 h-24 ring-2 ring-yellow-300 rounded-full mx-auto"
        />
        <a :href="BASE_UPLOAD + strategy.document" target="_blank" class="text-blue-500 underline">
          {{ strategy.document }}
        </a>
        <div class="flex gap-2 justify-end">
          <button @click="editStrategy(strategy)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deleteStrategy(strategy.id)">
            <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showAddModal"
      class="fixed inset-0 overflow-auto flex items-center z-50 justify-center modal bg-black/50 bg-opacity-50"
    >
      <div class="bg-white shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ edit ? 'Edit Strategy' : 'Add Strategy' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <div class="bg-white flex flex-col gap-2 w-full pt-2">
            <div class="flex w-full justify-between">
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
            </div>
            <form @submit.prevent="saveStrategy" class="flex flex-col gap-4">
              <div class="flex flex-col gap-6">
                <BaseInput
                  v-model="form.title[currentLanguage]"
                  type="text"
                  required
                  inputClass="p-2 border border-gray-300 rounded"
                  :placeholder="$t('Strategy title')"
                ></BaseInput>

                <BaseTextarea
                  v-model="form.description[currentLanguage]"
                  inputClass="p-2 border border-gray-300 rounded"
                  placeholder="Strategy description"
                ></BaseTextarea>
              </div>
              <div class="flex justify-end gap-2 flex-col">
                <div class="flex justify-between">
                  <BaseFileInput
                    @change="handleFileChange"
                    label="Attach Strategy"
                    type="file"
                    inputClass="p-2 border border-gray-300 rounded"
                    placeholder="Image"
                    accept="application/pdf"
                  ></BaseFileInput>
                  <BaseInput
                    @change="handleImageChange"
                    label="Add picture"
                    type="file"
                    inputClass="p-2 border border-gray-300 rounded"
                    placeholder="Image"
                    accept="image/*"
                  ></BaseInput>
                </div>
                <span>{{ logo }}</span>
                <span>{{ image1 }}</span>
                <BaseButton type="submit" class="w-full px-2 py-2 rounded">
                  Save Strategy
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
import { BASE_UPLOAD } from '@/config'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import { ref, onMounted } from 'vue'

const strategies = ref([])
const fetchStrategies = async () => {
  try {
    const response = await ApiService.get('/admin/strategies')
    if (response) {
      strategies.value = response.data.map((item) => ({
        ...item,
        title: JSON.parse(item.title),
        description: JSON.parse(item.description)
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

const showAddModal = ref(false)
const currentLanguage = ref('en')
const toggleLanguage = (lang) => {
  currentLanguage.value = lang
}
const form = ref({
  id: null,
  title: { en: '', ti: '', am: '' },
  description: { en: '', ti: '', am: '' },
  document: '',
  image: ''
})

const logo = ref('')
const handleFileChange = (event) => {
  const file = event.target.files[0]
  form.value.document = file
  logo.value = file.name
}

const image1 = ref('')
const handleImageChange = (event) => {
  const file = event.target.files[0]
  form.value.image = file
  image1.value = file.name
}
const errorMessage = ref('')
const successMessage = ref('')

const edit = ref(false)
const editStrategy = (strategy) => {
  form.value = {
    id: strategy.id,
    title: { ...strategy.title },
    description: { ...strategy.description },
    document: strategy.document,
    image: strategy.image
  }
  edit.value = true
  showAddModal.value = true
}

const saveStrategy = async () => {
  const formData = new FormData()
  formData.append('title', JSON.stringify(form.value.title))
  formData.append('description', JSON.stringify(form.value.description))
  formData.append('image', form.value.image)
  if (form.value.strategy instanceof File) {
    formData.append('document', form.value.document)
  }
  // if (form.value.image instanceof File) {
  // formData.append('image', form.value.image)
  // }
  try {
    if (edit.value) {
      const response = await ApiService.patch('/admin/strategies/' + form.value.id, formData)
      if (response.data.success) {
        successMessage.value = response.data.message
        fetchStrategies()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Strategy'
      }
    } else {
      const res = await ApiService.post('/admin/strategies', formData)
      if (res.data.success) {
        successMessage.value = res.data.message
        fetchStrategies()
        closeModal()
      } else {
        errorMessage.value = 'Failed to save Strategy'
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to save Strategy'
  }
}

const deleteStrategy = async (id) => {
  try {
    const response = await ApiService.delete('/admin/strategies/' + id)
    if (response.data.success) {
      fetchStrategies()
    } else {
      errorMessage.value = 'Failed to delete Strategy'
    }
  } catch (error) {
    errorMessage.value = 'Failed to delete Strategy'
  }
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    title: { en: '', ti: '', am: '' },
    description: { en: '', ti: '', am: '' },
    document: '',
    image: ''
  }
  edit.value = false
  logo.value = ''
}

onMounted(() => {
  fetchStrategies()
})
</script>

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
