<template>
  <section class="w-[%] px-[6%] py-12 flex flex-col items-center gap-4 bg-slate-50">
    <!-- Add Contact Button -->
    <button
      @click="showAddModal = true"
      class="bg-[#53900F] self-end shadow flex items-center px-2 py-1 text-white rounded-2xl"
    >
      <!-- <font-awesome-icon icon="plus"></font-awesome-icon> -->
      Add Contact
    </button>

    <!-- Contact Cards -->
    <div class="w-full gap-4 place-content-center">
      <div
        v-for="(contact, i) in contacts"
        :key="i"
        class="p-4 flex flex-col gap-2 bg-white justify-between"
      >
        <div class="flex gap-12">
          <h1>Email:</h1>
          <p class="">{{ contact.mail }}</p>
        </div>
        <div class="flex gap-12">
          <h1>Phone:</h1>
          <p>{{ contact.contactNumber }}</p>
        </div>
        <div class="flex gap-12">
          <h1>Address:</h1>
          <p>{{ contact.address }}</p>
        </div>
        <div class="flex gap-12">
          <h1>Open Hours</h1>
          <p>{{ contact.openHours }}</p>
        </div>
        <div class="flex gap-6">
          <button
            @click="editContact(contact)"
            class="bg-slate-200 px-2 rounded text-sm text-blue-500"
          >
            Edit
          </button>
          <button
            @click="deleteContact(contact.id)"
            class="bg-slate-200 px-2 rounded text-sm text-red-500"
          >
            Delete
          </button>
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
            <BaseInput v-model="form.mail" type="text" required :placeholder="'Contact Mail'" />
            <BaseInput v-model="form.contactNumber" type="text" :placeholder="'Contact Number'" />
            <BaseInput
              v-model="form.address"
              type="text"
              required
              :placeholder="'Contact Address'"
            />
            <BaseInput
              v-model="form.openHours"
              type="text"
              required
              :placeholder="'Opening Hours'"
            />
            <BaseFileInput @change="handleFileChange" :placeholder="'form.addresse'" />
            <BaseButton type="submit" class="w-full px-2 py-2 rounded">Save Contact</BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApiService from '@/services/apiService'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'

const contacts = ref([])
const form = ref({
  id: null,
  mail: '',
  contactNumber: '',
  address: '',
  openHours: ''
})
const showAddModal = ref(false)
const edit = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const fetchContacts = async () => {
  try {
    const response = await ApiService.get('/admin/contact-address')
    if (response) {
      contacts.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
  }
}

const saveContact = async () => {
  const formData = {
    mail: form.value.mail,
    contactNumber: form.value.contactNumber,
    address: form.value.address,
    openHours: form.value.openHours
  }
  try {
    let response
    if (edit.value) {
      response = await ApiService.patch(`/admin/contact-address/${form.value.id}`, formData)
    } else {
      response = await ApiService.post('/admin/contact-address', formData)
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
      const response = await ApiService.delete(`/admin/contact-address/${id}`)
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
  form.value.mail = contact.mail
  form.value.contactNumber = contact.contactNumber
  form.value.address = contact.address
  form.value.openHours = contact.openHours
  edit.value = true
  showAddModal.value = true
}

const handleFileChange = (file) => {
  form.value.address = file
}

const closeModal = () => {
  showAddModal.value = false
  form.value = {
    id: null,
    mail: '',
    contactNumber: '',
    address: '',
    openHours: ''
  }
  edit.value = false
  errorMessage.value = ''
  successMessage.value = ''
}

onMounted(() => {
  fetchContacts()
})
</script>

<style scoped>
/* Add scoped styles if needed */
h1 {
  font-weight: 600;
}
</style>
