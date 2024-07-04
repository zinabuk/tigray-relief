<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'

import swal from 'sweetalert'

// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '@/stores/auth'
// const { language } = storeToRefs(useAuthStore())

const router = useRouter()
const heroData = ref({
  heroTitle: '',
  heroDescription: '',
  heroImage: null
})

const heroes = ref([])
const errorMessage = ref('')
const successMessage = ref('')
const editMode = ref(false)
const editId = ref(null)
const showModal = ref(false)

const saveHero = async () => {
  const formData = new FormData()
  formData.append('heroTitle', heroData.value.heroTitle)
  formData.append('heroDescription', heroData.value.heroDescription)
  if (heroData.value.heroImage) {
    formData.append('heroImage', heroData.value.heroImage)
  }

  try {
    const response = await ApiService.post('users/home', formData)
    if (response.success) {
      successMessage.value = response.message
      swal({
        title: response.message,
        icon: 'success'
      })
      fetchHeroes()
      resetForm()
      closeModal()
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = error.response.data.message
    } else {
      //   router.push({ name: 'NetwdorkError' })
    }
  }
}

const captureImage = (event) => {
  heroData.value.heroImage = event.target.files[0]
}

const fetchHeroes = async () => {
  try {
    const response = await ApiService.get('users/home')
    // alert(response.data.length)
    heroes.value = response.data
  } catch (error) {
    errorMessage.value = 'Failed to fetch achievements'
  }
}

const editItem = (id) => {
  console.log(id)
  //   const item = heroes.value.find((hero) => hero.id === id)
  //   if (item) {
  //     heroData.value = {
  //       heroTitle: { en: item.heroTitle.en, ti: item.heroTitle.ti },
  //       heroDescription: { en: item.heroDescription.en, ti: item.heroDescription.ti },
  //       heroImage: null
  //     }
  //     editMode.value = true
  //     editId.value = id
  //     showModal.value = true
  //   }
}

const deleteItem = async (id) => {
//   const sure = window.confirm('Are you sure? This operation cannot be undone.')
//   if (sure) {
    try {
      const response = await ApiService.delete('users/home/' + id)
      if (response.success) {
        successMessage.value = response.message
        fetchHeroes()
      }
    } catch (error) {
      errorMessage.value = 'Failed to delete hero'
    }
//   }
}

const resetForm = () => {
  heroData.value = {
    heroTitle: '',
    heroDescription: '',
    heroImage: null
  }
  editMode.value = false
  editId.value = null
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

onMounted(() => {
  fetchHeroes()
})
</script>

<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-whitez">
    <div class="flex justify-between w-full">
      <h2 class="text-xl font-bold">Brands</h2>
      <BaseButton @click="showModal = true" class="">
        <font-awesome-icon icon="plus" class="text-yellow-500"></font-awesome-icon> Add Branding
      </BaseButton>
    </div>
    <div v-if="heroes.length" class="col-span-12 w-full">
      <!-- <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->
      <div class="w-full mx-auto">
        <!-- <div class="col-span-6 md:col-span-8 flex justify-start items-center">
          <button @click="toggleLanguage" class="px-4 py-2 rounded text-blue-500">
            {{ showEnglish ? 'Tigrinya' : 'English' }}
          </button>
        </div> -->

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="hero in heroes" :key="hero.id" class="w-full md:w-auto">
            <div class="shadow-xl flex flex-col gap-2 p-4 zmax-w-xs bg-white">
              <img
                v-if="hero.heroImage"
                :src="`${BASE_AVATAR}${hero.heroImage}`"
                alt="Hero Image"
                class="w-full h-36 object-cover mb-4"
              />
              <div>
                <h3 class="font-bold">{{ hero.heroTitle }}</h3>
                <p class="break-words">{{ hero.heroDescription }}</p>
              </div>

              <div class="flex justify-end space-x-2">
                <button @click="editItem(hero.id)" class="text-blue-500">edit</button>
                <button @click="deleteItem(hero.id)" class="text-red-500">delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed modal inset-0 bg-black/60 bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">Add Brand</h3>
            <BaseButton @click="closeModal" type="button" class="px-4 py-2 rounded"
              >Cancel</BaseButton
            >
          </div>
          <div class="">
            <form @submit.prevent="saveHero" class="flex flex-col gap-4">
              <div class="">
                <div class="w-full zmd:w-1/2 py-4 flex px-2">
                  <BaseInput
                    v-model="heroData.heroTitle"
                    type="text"
                    required
                    inputClass="p-2 border border-gray-300 rounded"
                    placeholder="Hero Title"
                  ></BaseInput>
                </div>

                <div class="w-full zmd:w-1/2 py-4 px-2">
                  <BaseTextarea
                    v-model="heroData.heroDescription"
                    inputClass="p-2 border border-gray-300 rounded h-30"
                    placeholder="Hero Description"
                  ></BaseTextarea>
                </div>

                <div class="w-full px-2">
                  <BaseInput
                    @change="captureImage"
                    type="file"
                    inputClass="p-2 border border-gray-300 rounded"
                    placeholder="Image"
                  ></BaseInput>
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <BaseButton type="submit" class="px-2 py-2 rounded">{{
                  editMode ? 'Save changes' : 'Save Hero'
                }}</BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
