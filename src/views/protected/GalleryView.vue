<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
// const news = async () => {
//   const response = await ApiService.get()
// }
import { ref, onMounted } from 'vue'

const galleries = ref([])

const fetchGallers = async () => {
  try {
    const response = await ApiService.get('/admin/gallary')
    if (response.success) {
      galleries.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

const image = ref('')
const captureImage = (file) => {
   
  image.value = file
}

const saveGallery = async () => {
  const formData = new FormData()
  formData.append('gallary', image.value)
  const response = await ApiService.post('/admin/gallary', formData)
  if (response.success) {
    alert('Saved')
    fetchGallers()
  }
}
onMounted(() => {
  fetchGallers()
})
</script>

<template>
  <section class="w-[82%] bg-gray-50 px-[6%] py-12">
    <!-- <h1 class="text-center text-3xl">Services we provide</h1> -->

    <div class="grid grid-cols-1 md:grid-cols-12 place-items-start">
      <div class="col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
          <div v-for="(gallery, i) in galleries" :key="i" class="p-4 flex flex-col gap-2">
            <!-- <font-awesome-icon icon="user" class="text-green-600 mr-auto"></font-awesome-icon> -->
            <img
              :src="BASE_AVATAR + gallery.gallary"
              alt=""
              class="roudnded-full object-cover object-center transition-all duration-1000 hover:scale-[110%]"
            />
            <div class="flex gap-4">
              <button>
                <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
              </button>
              <button>
                <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 flex p-6 bg-white shadow">
        <form action="" @submit.prevent="saveGallery">
          <BaseFileInput @image-update="captureImage($event)" label="Add Logo"></BaseFileInput>
          <BaseButton type="submit">Save</BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>
