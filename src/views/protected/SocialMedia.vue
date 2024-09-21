<template>
  <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
    <!-- Add Contact Button -->
    <button @click="showAddModal = true" class="text-[#539000] self-end border flex items-center px-2 py-1 border-[#539000]">
      <font-awesome-icon icon="plus" class="bg-white text-[#539000] p-2 rounded-full"></font-awesome-icon>
      Add social media
    </button>

    <!-- Contact Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
      <div v-for="(contact, i) in contacts" :key="i" class="p-4 flex flex-col gap-2 bg-white justify-between shadow">
        <p class="text-xl font-semibold">{{ contact.platform }}</p>
        <a :href="contact.link" target="_blank" class="text-blue-500 underline">{{ contact.link }}</a>
        <div class="flex gap-2 justify-end">
          <button @click="editContact(contact)">
            <font-awesome-icon icon="edit" class="text-blue-500"></font-awesome-icon>
          </button>
          <button @click="deleteContact(contact.id)">
            <font-awesome-icon icon="trash" class="text-red-500"></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showAddModal" class="fixed inset-0 overflow-auto flex items-center justify-center z-50 bg-black/50">
      <div class="bg-white shadow-lg w-full max-w-md p-6">
        <div class="text-center">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">{{ edit ? 'Edit Contact' : 'Add Contact' }}</h3>
            <button @click="closeModal" type="button" class="p-1 text-white bg-gray-500 rounded">Cancel</button>
          </div>
          <form @submit.prevent="saveContact" class="flex flex-col gap-4 mt-4">
            <BaseInput v-model="form.platform" type="text" required :placeholder="'Contact platform'" />
            <BaseInput v-model="form.link" type="text" :placeholder="'Contact Number'" />
           <BaseButton type="submit" class="w-full px-2 py-2 rounded">Save Contact</BaseButton>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/apiService';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const contacts = ref([]);
const form = ref({
  id: null,
  platform: '',
  link: '',
});
const showAddModal = ref(false);
const edit = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const fetchContacts = async () => {
  try {
    const response = await ApiService.get('/admin/social-medias');
    if (response) {
      contacts.value = response.data
    }
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
  }
};

const saveContact = async () => {
  const formData = {
    platform: form.value.platform,
    link: form.value.link
    
  }
  try {
    let response;
    if (edit.value) {
      response = await ApiService.patch(`/admin/social-medias/${form.value.id}`, formData);
    } else {
      response = await ApiService.post('/admin/social-medias', formData);
    }
    
    if (response.success) {
      successMessage.value = response.message;
      fetchContacts();
      closeModal();
    } else {
      errorMessage.value = 'Failed to save contact';
    }
  } catch (error) {
    console.error('Failed to save contact:', error);
    errorMessage.value = 'Failed to save contact';
  }
};

const deleteContact = async (id) => {
  const sure = window.confirm('Are you sure you want to delete this contact?');
  if (sure) {
    try {
      const response = await ApiService.delete(`/admin/social-medias/${id}`);
      if (response.success) {
        fetchContacts();
      } else {
        errorMessage.value = 'Failed to delete contact';
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
      errorMessage.value = 'Failed to delete contact';
    }
  }
};

const editContact = (contact) => {
  form.value.id = contact.id;
  form.value.platform = contact.platform;
  form.value.link = contact.link;

  edit.value = true;
  showAddModal.value = true;
};


const closeModal = () => {
  showAddModal.value = false;
  form.value = {
    id: null,
    platform: '',
    link: ''
  };
  edit.value = false;
  errorMessage.value = '';
  successMessage.value = '';
};

onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
