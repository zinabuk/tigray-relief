<script setup>
import { ref, onMounted } from 'vue';
import DataTable from '@/components/base/DataTable.vue';
import ApiService from '@/services/apiService';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseFileInput from '@/components/base/BaseFileInput.vue';
import dayjs from 'dayjs';

const currentLanguage = ref('en'); 

const toggleLanguage = (lang) => {
  currentLanguage.value = lang;
};

const tableHeaders = [
{ label: 'Logo', field: 'logo' },
  { label: 'Title', field: 'businessName' },
  { label: 'Email Address', field: 'email' },
  { label: 'Phone', field: 'phoneNumber' },
  { label: 'Link', field: 'website' },
  { label: 'Service', field: 'specializeArea' },
  { label: 'Description', field: 'description' }
];

const partnerships = ref([]);
const actions = [
  {
    label: 'edit',
    action: openEditModal,
    icon: 'edit',
    style: 'hover:cursor-pointer text-blue-500 py-1 px-2'
  },
  {
    label: 'delete',
    action: deletePartner,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  },
  {
    label: 'verify',
    action: deletePartner,
    icon: 'eye',
    style: 'hover:cursor-pointer text-green-500 py-1 px-2'
  }
];

async function fetchPartners() {
  const response = await ApiService.get('/users/partnerships');

  if (response.success) {
    partnerships.value = response.data.map((item) => ({
      ...item,
      businessName: JSON.parse(item.businessName),
      description: JSON.parse(item.description),
      specializeArea: JSON.parse(item.specializeArea),
    }));
  }
}

const isEditing = ref(false);
const editForm = ref({
  businessName: { en: '', ti: '', am: '' },
  email: '',
  phoneNumber: '',
  website: '',
  specializeArea: { en: '', ti: '', am: '' },
  description: { en: '', ti: '', am: '' },
  logo: '',
});
let formatDate = ref('');

function openEditModal(partner) {
  isEditing.value = true;
  editForm.value = { ...partner };
  formatDate.value = dayjs(editForm.value.eventDate).format('YYYY-MM-DD');
}


const updatePartner = async () => {
  const formData = new FormData();
  formData.append('businessName', JSON.stringify(editForm.value.businessName));
  formData.append('email', editForm.value.email);
  formData.append('phoneNumber', editForm.value.phoneNumber);
  formData.append('website', editForm.value.website);
  formData.append('specializeArea', JSON.stringify(editForm.value.specializeArea));
  formData.append('description', JSON.stringify(editForm.value.description));
  if (image.value) {
    formData.append('logo', image.value);
  }

  try {
    const response = await ApiService.patch(
      '/users/partnerships/' + editForm.value.id,
      formData
    );
    if (response.success) {
      fetchPartners();
      setTimeout(() => {
        closeEditModal();
      }, 3000);
    }
  } catch (error) {
    console.error('Error updating donation:', error);
  }
};

async function deletePartner(partner) {
  const accept = window.confirm('Undo is not possible');
  if (accept) {
    const response = await ApiService.delete(`/users/partnerships/${partner.id}`);
    if (response.success) {
      fetchPartners();
    }
  }
}

const image = ref('');
const handleFileChange = (file) => {
  image.value = file;
};

function closeEditModal() {
  isEditing.value = false;
}

const isAdd = ref(false);
const toggleAdd = () => {
  isAdd.value = true;
};

const form = ref({
  businessName: { en: '', ti: '', am: '' },
  email: '',
  phoneNumber: '',
  website: '',
  specializeArea: { en: '', ti: '', am: '' },
  description: { en: '', ti: '', am: '' },
  logo: '',
});

const submitPartner = async () => {
  const formData = new FormData();
  formData.append('businessName', JSON.stringify(form.value.businessName));
  formData.append('email', form.value.email);
  formData.append('phoneNumber', form.value.phoneNumber);
  formData.append('website', form.value.website);
  formData.append('specializeArea', JSON.stringify(form.value.specializeArea));
  formData.append('description', JSON.stringify(form.value.description));
  if (image.value) {
    formData.append('logo', image.value);
  }


  const res = await ApiService.post('/users/partnerships', formData);
  if (res.success) {
    fetchPartners();
  }
};

onMounted(fetchPartners);
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <button class="bg-[#539000] text-white self-end px-2 py-1" @click="toggleAdd">
      Add Partner
    </button>
    <DataTable :tableHeaders="tableHeaders" :tableValues="partnerships" :actions="actions"  :currentLanguage="currentLanguage"></DataTable>
  </section>
  <div
    class="w-full modal fixed inset-0 flex z-50 justify-center items-center bg-black/80 overflow-auto md:py-12"
    v-if="isEditing"
  >
      <div class="w-1/2 bg-white rounded px-8"> 
      <div class="flex justify-between px-8 py-4">
          <p>Edit Partner</p>     
          <button @click="closeEditModal" class="self-end text-xl bg-gray-500 text-white rounded-sm">
            Cancel
          </button>
        </div>
      <div class="flex justify-center gap-36 py-2">
        <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }">English</BaseButton>
        <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }">Amharic</BaseButton>
        <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }">Tigrigna</BaseButton>
      </div>
      <form @submit.prevent="updatePartner" class="w-full flex flex-col gap-2 px-1">
        <BaseInput
          v-model="editForm.businessName[currentLanguage]"
          type="text"
          label="Business Name"
          inputClass="px-4 py-3"
        ></BaseInput>
        <BaseInput
          v-model="editForm.email"
          type="email"
          label="Email"
          required
          inputClass="px-4 py-3"
          placeholder="Job Title"
        ></BaseInput>
        <BaseInput
          v-model="editForm.website"
          inputClass="px-8 py-3"
          placeholder="Enter your website's link"
        ></BaseInput>
        <BaseInput
          v-model="editForm.specializeArea[currentLanguage]"
          required
          inputClass="px-8 "
          placeholder="Specialize area"
        ></BaseInput>
        <BaseInput
          v-model="editForm.phoneNumber"
          type="text"
          label="Phone Number"
          required
          inputClass="px-4 "
        ></BaseInput>
        <BaseTextarea
          v-model="editForm.description[currentLanguage]"
          rows="4"
          label="Description"
          textareaClasses="px-8"
        ></BaseTextarea>  
        <div class="flex justify-between">
        <BaseFileInput @image-update="handleFileChange($event)" type="file" accept="image/*" label="Add Logo"></BaseFileInput>
          <BaseButton type="submit">Save Changes</BaseButton>

        </div>
      </form>

  </div>
</div>

  <div
    v-if="isAdd"
    class="w-full z-30 bg-black/80 fixed inset-0 flex flex-col items-center justify-center p-6 gap-2 shadow rounded-lg modal "
  >
    <div class="w-1/2 bg-white rounded">
    <div class="flex justify-between px-8 py-4">
      <h1 class="text-center text-2xl font-semibold">Partnership Form</h1>
          <button type="button" class="bg-gray-600 text-white px-4 py-2" @click="isAdd = false">
            Cancel
          </button>
    </div>
      <p class="justify-self-end text-green-500 bg-white" v-if="success">{{ success }}</p>
      <div class="flex justify-center gap-40 py-2">
        <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }">English</BaseButton>
        <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }">Amharic</BaseButton>
        <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }">Tigrigna</BaseButton>
      </div>
      <form @submit.prevent="submitPartner" class="w-full flex flex-col gap-4 px-4">
        <BaseInput
          v-model="form.businessName[currentLanguage]"
          type="text"
          required
          inputClass="px-8 py-1"
          placeholder="Your business name"
        ></BaseInput>
        <BaseInput
          v-model="form.email"
          type="email"
          inputClass="px-8 py-1"
          required
          placeholder="Enter Your Email"
          autocomplete="true"
        ></BaseInput>
        <BaseInput
          v-model="form.phoneNumber"
          type="text"
          inputClass="px-8 py-1"
          required
          placeholder="Enter Your Phone number"
        ></BaseInput>
        <BaseInput
          v-model="form.website"
          inputClass="px-8 py-1"
          placeholder="Enter your website's link"
        ></BaseInput>
        <BaseInput
          v-model="form.specializeArea[currentLanguage]"
          required
          inputClass="px-8 py-1"
          placeholder="Specialize area"
        ></BaseInput>
        <BaseTextarea
          v-model="form.description[currentLanguage]"
          rows="4"
          textareaClasses="px-8"
          placeholder="Description"
        ></BaseTextarea>
        <div class="flex justify-between">
        <BaseFileInput @image-update="handleFileChange($event)" label="Add Logo"></BaseFileInput>
        <p v-if="message" class="text-red-700">{{ message }}</p>
      
          <BaseButton type="submit" class="self-start">Submit</BaseButton>

        </div>
      </form>
      </div>
    </div>

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
