<script setup>
import ApiService from '@/services/apiService'

import { BASE_AVATAR } from '@/config'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseButton from '@/components/base/BaseButton.vue'
// const news = async () => {
//   const response = await ApiService.get()
// }

import swal from 'sweetalert'
// import { useRouter } from 'vue-router'
// const router = useRouter()
import { ref, onMounted } from 'vue'
const currentLanguage = ref('en')

// const toggleLanguage = (lang) => {
//   currentLanguage.value = lang
// }
const teams = ref([])
const fetchTeams = async () => {
  try {
    const response = await ApiService.get('/admin/our-teams')

    if (response.success) {
      teams.value = response.data.map((item) => ({
        ...item,
        fullName: JSON.parse(item.fullName),
        profession: JSON.parse(item.profession),
        biography: JSON.parse(item.biography)
      }))
    }
  } catch (error) {
    // alert(error)
    if (error.response && error.response.data && error.response.status === 404) {
      return
    } else {
      setTimeout(() => {
        // router.push({ name: 'NetworkError' })
      }, 2000)
    }
  }
}

const deleteTeam = async (id) => {
  const res = await ApiService.delete('/admin/our-teams/' + id)
  if (res.success) {
    fetchTeams()
  }
  // }
}

let team = ref({
  fullName: { en: '', ti: '', am: '' },
  profession: { en: '', ti: '', am: '' },
  biography: { en: '', ti: '', am: '' },
  image: ''
})
let showEditModal = ref(false)

let eTeam = ref({ fullName: '', profession: '', biography: '', image: '' })
const editTeam = (team) => {
  eTeam.value = {
    id: team.id,
    fullName: { ...team.fullName },
    profession: { ...team.profession },
    biography: { ...team.biography },
    image: team.image
  }
  showEditModal.value = true
}

// const closeModal = () => {
//   showAddModal.value = false
//   edit.value = false
// }

let image = ref('')
const handleFileChange = (event) => {
  eTeam.value.image = event
  image.value = event.name
}
const imageName = ref('')
const imageEntry = (event) => {
  team.value.image = event
  imageName.value = event.name
}

let showAddModal = ref(false)
const updateTeam = async () => {
  const formData = new FormData()
  formData.append('fullName', JSON.stringify(eTeam.value.fullName))
  formData.append('profession', JSON.stringify(eTeam.value.profession))
  formData.append('biography', JSON.stringify(eTeam.value.biography))

  if (eTeam.value.image) {
    formData.append('image', eTeam.value.image)
  }

  const res = await ApiService.patch('/admin/our-teams/' + eTeam.value.id, formData)
  if (res) {
    fetchTeams()
    eTeam.value = {}
    swal({
      icon: 'success',
      title: 'Key personel created successfully'
    })
  }
}
const submitForm = async () => {
  const formData = new FormData()
  formData.append('fullName', JSON.stringify(team.value.fullName))
  formData.append('profession', JSON.stringify(team.value.profession))
  formData.append('biography', JSON.stringify(team.value.biography))

  if (team.value.image) {
    formData.append('image', team.value.image)
  }

  const res = await ApiService.post('/admin/our-teams', formData)
  if (res) {
    fetchTeams()
    team.value = {}
    showAddModal.value = false
    swal({
      icon: 'success',
      title: 'Personnel created successfully'
    })
  }
}

const showModal = () => {
  // console.log('Hello')

  if (!showAddModal.value) {
    showAddModal.value = true
  }
}
onMounted(() => {
  fetchTeams()
})
</script>

<template>
  <section class="col-span-10 p-4 flex flex-col bg-slate-50 items-center gap-4">
    <!-- Services -->
    <button
      @click="showModal()"
      class="bg-[#53900F] self-end border flex items-center px-2 py-1 rounded-2xl text-white gap-2"
    >
      <font-awesome-icon icon="add"></font-awesome-icon>
      Add Director
    </button>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 place-content-center">
      <div
        v-for="(team, i) in teams"
        :key="i"
        class="flex flex-col gap-2 p-1 justify-between shadow bg-white"
      >
        <div class="w-full h-auto flex flex-col gap-2">
          <img
            v-if="team.image"
            :src="BASE_AVATAR + team.image"
            alt=""
            class="h-36 w-full rounded-sm"
          />
          <p v-else class="w-20 h-20 rounded-full text-2xl">{{ team.fullName[currentLanguage] }}</p>
          <h1 class="text-xl font-bold">{{ team.fullName[currentLanguage] }}</h1>
          <div class="relative">
            <span class="w-1/4 absolute z-20 inset-0 h-[2px] bg-green-600"></span>
            <hr class="h-[2px] absolute inset-0 bg-gray-200" />
          </div>
          <p class="line-clamp-5a">
            {{ team.profession[currentLanguage] }}
          </p>
        </div>

        <!-- <router-link class="text-[#539000]" to="/">Read More</router-link> -->
        <div class="flex gap-4">
          <button @click="editTeam(team)" class="text-blue-500 bg-slate-200 rounded px-2">
            <font-awesome-icon icon="edit"></font-awesome-icon>
            Edit
          </button>
          <button @click="deleteTeam(team.id)" class="text-red-500 bg-slate-200 px-2 rounded">
            <font-awesome-icon icon="trash"></font-awesome-icon>
            Delete
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showEditModal"
      class="fixed inset-0 overflow-auto flex items-center z-50 justify-center modal bg-black/80"
    >
      <div class="bg-white p-4 flex flex-col">
        <div class="flex justify-between">
          <h2 class="text-lg font-bold mb-4">Edit Team</h2>
          <button @click="showEditModal = false" class="bg-gray-500 text-white self-end p-2">
            cancel
          </button>
        </div>

        <form
          @submit.prevent="updateTeam"
          class="w-full rounded-lg p-6 shadow flex flex-col gap-2"
          enctype="multipart/form-data"
        >
          <div class="flex justify-center">
            <BaseInput
              type="text"
              id="fullName"
              label="Full Name"
              v-model="eTeam.fullName[currentLanguage]"
            />
          </div>
          <div class="flex justify-center">
            <BaseInput
              type="text"
              id="Profession"
              label="Profession"
              v-model="eTeam.profession[currentLanguage]"
            />
          </div>
          <div>
            <BaseTextarea
              v-model="eTeam.biography[currentLanguage]"
              placeholder="Biography"
              label="Biography"
            ></BaseTextarea>
          </div>
          <!-- Event Image -->
          <div class="flex justify-between">
            <div class="flex">
              <BaseFileInput
                @image-update="handleFileChange($event)"
                label="Add Picture"
                type="file"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Image"
                accept="image/*"
              ></BaseFileInput>
              <p>{{ imageName }}</p>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <BaseButton label="">Save Changes</BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div
      class="fixed modal inset-0 flex flex-wrap items-center justify-center z-50 bg-black/80"
      v-if="showAddModal"
    >
      <div class="w-1/2 bg-white p-4 flex flex-col">
        <div class="flex justify-between px-12">
          <h1 class="flex justify-center font-bold font-serif">Add Personnel</h1>
          <button @click="showAddModal = false" class="bg-gray-500 text-white self-end p-2">
            cancel
          </button>
        </div>

        <form
          @submit.prevent="submitForm"
          class="w-full rounded-lg p-6 shadow flex flex-col gap-2"
          enctype="multipart/form-data"
        >
          <div class="flex justify-center">
            <BaseInput
              type="text"
              required
              id="fullName"
              label="Full Name"
              v-model="team.fullName[currentLanguage]"
            />
          </div>
          <div class="flex justify-center">
            <BaseInput
              type="text"
              required
              id="Profession"
              label="Profession"
              v-model="team.profession[currentLanguage]"
            />
          </div>
          <div>
            <BaseTextarea
              v-model="team.biography[currentLanguage]"
              placeholder="Biography"
              label="Biography"
            ></BaseTextarea>
          </div>
          <!-- Event Image -->
          <div class="flex justify-between">
            <div class="flex">
              <BaseFileInput
                @image-update="imageEntry($event)"
                label="Add Picture"
                type="file"
                inputClass="p-2 border border-gray-300 rounded"
                placeholder="Image"
                accept="image/*"
              ></BaseFileInput>
              <p>{{ imageName }}</p>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <BaseButton label="" type="submit">Submit</BaseButton>
            </div>
          </div>
        </form>
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
