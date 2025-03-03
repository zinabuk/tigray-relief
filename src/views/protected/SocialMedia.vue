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

    <div class="w-full px-%]">
      <h1 class="text-lg font-semibold">Twitter and Facebook latest posts</h1>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <div class="w-full flex flex-wrap">
          <h1>Facebook</h1>
          <a
            href="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid0nCkkcn3n5iSbW1mVe7rQNVSUvGRy7SMGnKA6qL677H3n7jv3saLbXegay27Fo5MKl&show_text=true&width=500&appId&show_faces=true&share=true"
            target="_blank"
            style="max-width: 100%"
            class="break-all"
          >
            https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid0nCkkcn3n5iSbW1mVe7rQNVSUvGRy7SMGnKA6qL677H3n7jv3saLbXegay27Fo5MKl&show_text=true&width=500&appId&show_faces=true&share=true
          </a>

          <div class="flex gap-4">
            <button class="bg-white rounded shadow px-4 py-1 text-blue-500">Edit</button>
            <button class="bg-white rounded shadow px-4 py-1 text-red-500">Delete</button>
          </div>
        </div>

        <div class="w-full flex flex-wrap break-words">
          <h1>Twitter</h1>
          <a
            href="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid0nCkkcn3n5iSbW1mVe7rQNVSUvGRy7SMGnKA6qL677H3n7jv3saLbXegay27Fo5MKl&show_text=true&width=500&appId&show_faces=true&share=true"
            target="_blank"
            style="max-width: 100%"
            class="break-all"
          >
            https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRESTigray1978%2Fposts%2Fpfbid0nCkkcn3n5iSbW1mVe7rQNVSUvGRy7SMGnKA6qL677H3n7jv3saLbXegay27Fo5MKl&show_text=true&width=500&appId&show_faces=true&share=true
          </a>
          <div class="flex gap-4">
            <button class="bg-white rounded shadow px-4 py-1 text-blue-500">Edit</button>
            <button class="bg-white rounded shadow px-4 py-1 text-red-500">Delete</button>
          </div>
        </div>
      </div>
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
    <div class="fixed modal z-50" v-if="showEmbedModal">
      <form @submit.prevent="saveEmbededMedia">
        <base-input v-model="embedMedia.media" label="Media"></base-input>
        <base-input v-model="embedMedia.src" label="Source / Link"></base-input>
        <base-button type="submit">Save</base-button>
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
  media: '',
  src: ''
})

const saveEmbededMedia = async () => {
  try {
    const response = await ApiService.post('/admin/media', embedMedia.value)
    if (response.success) {
      alert('Media saved successfully!') // Handle success feedback
      showEmbedModal.value = false // Close modal if needed
      embedMedia.value = {} // Reset form
    }
  } catch (error) {
    alert('Failed to save media. Please try again.')
  }
}

onMounted(() => {
  fetchContacts()
})
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
