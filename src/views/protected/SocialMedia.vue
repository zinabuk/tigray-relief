<template>
  <section
    class="col-span-10 w-full px-[6%] py-12 flex flex-col items-center gap-4 bg-slate-50 flex-wrap break-words"
  >
    <!-- Add Contact Button -->
    <button
      @click="showAddModal = true"
      class="bg-[#53900F] text-white self-end shadow-sm rounded-xl flex items-center px-2 py-1"
    >
      Add social media
    </button>

    <!-- Start of social media pages -->
    <div class="w-full">
      <h1>Social Media pages</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
        <div
          v-for="(contact, i) in contacts"
          :key="i"
          class="p-4 flex flex-col gap-2 bg-white justify-between shadow-sm"
        >
          <p class="text-xl font-semibold">{{ contact.platform }}</p>
          <a :href="contact.link" target="_blank" class="text-black/80 underline">{{
            contact.link
          }}</a>
          <div class="flex gap-8">
            <button @click="editContact(contact)" title="Edit">
              <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
            </button>
            <button @click="deleteContact(contact.id)" title="Delete">
              <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of social media pages -->
    <hr class="my-2 h-[2px] bg-black/60 w-full" />
    <div class="w-full px-4">
      <h1 class="text-lg font-semibold mb-4">Twitter and Facebook Latest Posts</h1>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Loop through posts -->
        <div
          class="w-full flex flex-col p-2 bg-white shadow-lg rounded-lg"
          v-for="post in posts"
          :key="post.id"
        >
          <h2 class="text-md font-semibold">{{ post.platform }}</h2>
          <div v-if="post.platform.toLowerCase() === 'facebook'">
            <iframe
              :src="post.post"
              class="w-full h-[400px] rounded-lg"
              loading="lazy"
              style="border: none"
            ></iframe>
          </div>
          <div
            v-else-if="post.platform.toLowerCase() === 'twitter'"
            v-html="post.post"
            class="w-full"
          ></div>

          <div class="flex gap-4 mt-2">
            <button
              class="bg-blue-500 text-white rounded px-4 py-1"
              @click.prevent="editMedia(post)"
            >
              Edit
            </button>
            <!-- <button class="bg-red-500 text-white rounded px-4 py-1" @click="deleteMedia(post.id)">
              Delete
            </button> -->
          </div>
        </div>
      </div>

      <!-- Edit/Add Social Media Post Modal -->
    </div>

    <!-- Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 overflow-auto flex items-center justify-center z-50 bg-black/50"
    >
      <div class="bg-white shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">
              {{ edit ? 'Edit Contact' : 'Add Contact' }}
            </h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">
              Cancel
            </button>
          </div>
          <form @submit.prevent="saveContact" class="flex flex-col gap-4 mt-4">
            <BaseInput
              v-model="form.platform"
              type="text"
              required
              :placeholder="'Contact platform'"
            />
            <BaseInput v-model="form.link" type="text" :placeholder="'Contact Number'" />
            <BaseButton type="submit" class="w-full px-2 py-2 rounded">Save Contact</BaseButton>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit social media post modal -->
    <div
      class="fixed modal inset-0 z-50 bg-black/40 p-8 flex flex-col items-center justify-center w-full"
      v-if="showEmbedModal"
    >
      <form
        @submit.prevent="saveEmbededMedia"
        class="w-full flex flex-col md:w-1/2 bg-white p-4 gap-2 shadow rounded-md"
      >
        <button class="self-end" type="button" @click.prevent="showEmbedModal = false">
          <font-awesome-icon icon="times" class="hover:text-red-700"></font-awesome-icon>
        </button>
        <base-input
          v-model="embedMedia.platform"
          label="Platform"
          placeholder="facebook or twitter"
        ></base-input>

        <base-input
          v-model="embedMedia.post"
          label="Post / Link"
          placeholder="'https://...'"
        ></base-input>
        <base-button type="submit" class="px-4 py-1">Save</base-button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const contacts = ref([])
const form = ref({
  id: null,
  platform: '',
  link: ''
})
const showAddModal = ref(false)
const edit = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const fetchContacts = async () => {
  try {
    const response = await ApiService.get('/admin/social-medias')
    if (response) {
      contacts.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
  }
}

const saveContact = async () => {
  const formData = {
    platform: form.value.platform,
    link: form.value.link
  }
  try {
    let response
    if (edit.value) {
      response = await ApiService.patch(`/admin/social-medias/${form.value.id}`, formData)
    } else {
      response = await ApiService.post('/admin/social-medias', formData)
    }

    if (response.success) {
      successMessage.value = response.message
      fetchContacts()
      closeModal()
    } else {
      errorMessage.value = 'Failed to save contact'
    }
  } catch (error) {
    console.error('Failed to save contact:', error)
    errorMessage.value = 'Failed to save contact'
  }
}

const deleteContact = async (id) => {
  const sure = window.confirm('Are you sure you want to delete this contact?')
  if (sure) {
    try {
      const response = await ApiService.delete(`/admin/social-medias/${id}`)
      if (response.success) {
        fetchContacts()
      } else {
        errorMessage.value = 'Failed to delete contact'
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
      errorMessage.value = 'Failed to delete contact'
    }
  }
}

const editContact = (contact) => {
  form.value.id = contact.id
  form.value.platform = contact.platform
  form.value.link = contact.link

  edit.value = true
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    platform: '',
    link: ''
  }
  edit.value = false
  errorMessage.value = ''
  successMessage.value = ''
}
const showEmbedModal = ref(false)
const embedMedia = ref({
  platform: '',
  post: ''
})

const editMedia = (post) => {
  embedMedia.value = post
  showEmbedModal.value = true
}

const saveEmbededMedia = async () => {
  try {
    const response = await ApiService.post('/admin/social-media-posts', embedMedia.value)
    if (response.success) {
      alert('Media saved successfully!') // Handle success feedback
      showEmbedModal.value = false // Close modal if needed
      embedMedia.value = {} // Reset form
      fetchSocialMediaPosts()
    }
  } catch (error) {
    alert('Failed to save media. Please try again.')
  }
}

const posts = ref([])

const fetchSocialMediaPosts = async () => {
  try {
    const response = await ApiService.get('/admin/social-media-posts')
    if (response.success) {
      posts.value = response.data
    }
  } catch (error) {
    alert('Failed to save media. Please try again.')
  }
}

onMounted(() => {
  fetchContacts(), fetchSocialMediaPosts()
})
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
