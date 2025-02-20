<script setup>
import ApiService from '@/services/apiService'
import { BASE_AVATAR } from '@/config'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ref, onMounted } from 'vue'

const galleries = ref([])

const fetchGalleries = async () => {
  try {
    const response = await ApiService.get('/admin/gallery')
    if (response.success) {
      galleries.value = response.data
    }
  } catch (error) {
    alert(error)
  }
}

const image = ref(null)
const editImage = ref(null)
const editingGalleryId = ref(null)

const captureImage = (file) => {
  image.value = file
}

const captureEditImage = (file) => {
  editImage.value = file
}

const saveGallery = async () => {
  const formData = new FormData()
  formData.append('gallery', image.value)
  try {
    const response = await ApiService.post('/admin/gallery', formData)
    if (response.success) {
      alert('Saved')
      fetchGalleries()
    }
  } catch (error) {
    alert(error)
  }
}

const deleteGallery = async (id) => {
  try {
    const response = await ApiService.delete(`/admin/gallery/${id}`)
    if (response.success) {
      alert('Deleted')
      fetchGalleries()
    }
  } catch (error) {
    alert(error)
  }
}

const editGallery = (gallery) => {
  editingGalleryId.value = gallery.id
  editImage.value = gallery.gallery
}

const saveEditedGallery = async () => {
  const formData = new FormData()
  if (editImage.value) {
    formData.append('gallery', editImage.value)
  }
  try {
    const response = await ApiService.patch(`/admin/gallery/${editingGalleryId.value}`, formData)
    if (response.success) {
      alert('Updated')
      fetchGalleries()
      editingGalleryId.value = null
      editImage.value = null
    }
  } catch (error) {
    alert(error)
  }
}

onMounted(() => {
  fetchGalleries()
})
</script>

<template>
  <section class="col-span-10 bg-slate-50 px-[6%] py-12">
    <div class="grid grid-cols-1 md:grid-cols-12 place-items-start">
      <div class="col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-center">
          <div v-for="(gallery, i) in galleries" :key="i" class="p-4 flex flex-col gap-2">
            <img
              :src="BASE_AVATAR + gallery.gallery"
              alt=""
              class="w-48 h-48 object-cover object-center transition-all duration-1000 hover:scale-[110%]"
            />
            <div class="flex gap-4">
              <button @click="editGallery(gallery)" class="text-blue-500 bg-slate-200 rounded px-2">
                <font-awesome-icon icon="edit" ></font-awesome-icon>Edit
              </button>
              <button @click="deleteGallery(gallery.id)" class="text-red-500 bg-slate-200 rounded px-2">
                <font-awesome-icon icon="trash" ></font-awesome-icon>Delete
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 flex flex-col p-6 bg-white shadow">
        <form @submit.prevent="saveGallery" v-if="!editingGalleryId" class="flex flex-col gap-1">
          <BaseFileInput @image-update="captureImage" label="Add Gallery"
          type="file"
          accept="image/*" 
          ></BaseFileInput>
          <BaseButton type="submit" class="w-full">Save</BaseButton>
        </form>
        <form @submit.prevent="saveEditedGallery" v-else>
          <BaseFileInput @image-update="captureEditImage" label="Edit Gallery"
          type="file"
          accept="image/*"
          ></BaseFileInput>
          <BaseButton type="submit">Update</BaseButton>
          <BaseButton type="button"  class="bg-gray-500" @click="editingGalleryId = null; editImage = null">Cancel</BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>
