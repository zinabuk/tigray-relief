<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useRouter } from 'vue-router'
const router = useRouter()

import ApiService from '@/services/apiService'
import DataTable from '@/components/base/DataTableT.vue'
import { BASE_UPLOAD } from '@/config'
const route = useRoute()
const tableHeaders = [
  { label: 'Name', field: 'fullName' },
  { label: 'Email', field: 'email' },
  { label: 'Phone Number', field: 'phoneNumber' },
  { label: 'Cover Letter', field: 'message' },
  { label: 'Resume', field: 'resume' }
]

const actions = [
  {
    label: 'delete',
    action: deleteJob,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  }
]
const searchApplicants = ref('')
const jobs = ref([])
const getJApplicants = async () => {
  try {
    const response = await ApiService.get('users/all-applicants/' + route.params.id)
    jobs.value = response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ name: '404resource', params: { resource: 'Job' } })
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
}

const filteredJobs = computed(() => {
  if (searchApplicants.value) {
    return jobs.value.filter((msg) => {
      return Object.values(msg).some((value) => {
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(searchApplicants.value.toLowerCase())
        }
        return false
      })
    })
  } else {
    return jobs.value
  }
})
const job = ref({})
async function getJob() {
  try {
    const response = await ApiService.getCareerById('/admin/vacancies/' + route.params.id)

    if (response.success) {
      job.value = { ...response.data }
    }
  } catch (error) {
    if (error.response && error.response.status === 404 && error.response.data) {
      return
    } else {
      return
    }
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getJob()
    }
  },
  { immediate: true }
)

async function deleteJob(applicant) {
  try {
    const sure = window.confirm('Are you sure?')
    if (sure) {
      const response = await ApiService.delete('/users/applications/' + applicant.id)
      if (response.success) {
        alert('Applicant deleted successfully')
        getJApplicants() // Refresh the list of applicants after deletion
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert(error)
    } else {
      alert(error)
    }
  }
}
onMounted(() => {
  getJApplicants()
})
</script>

<template>
  <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <button
      @click.prevent="$router.go(-1)"
      class="self-start bg-white text-sm px-2 text-[#53900F] font-bold"
    >
      Back
    </button>
    <div class="flex justify-betweenz w-full gap-4">
      <h2 class="text-x d">Applicants:</h2>
      <h1 class="underline underline-offset-4">{{ job.jobTitle }}</h1>
    </div>
    <div class="w-full">
      <DataTable
        :tableHeaders="tableHeaders"
        :tableValues="filteredJobs"
        :actions="actions"
        createExport="true"
      >
        <template #cv="{ item }">
          <a
            class="hover:text-primary action-cell underline text-blue-600"
            :href="BASE_UPLOAD + item.resume"
            target="_blank"
            rel="noopener noreferrer"
            title="Download CV"
          >
            View CV
          </a>
        </template>
      </DataTable>
    </div>
    <!--     
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200">Name</th>
            <th class="py-2 px-4 border-b border-gray-200">Email</th>
            <th class="py-2 px-4 border-b border-gray-200">Phone Number</th>
            <th class="py-2 px-4 border-b border-gray-200">Application Letter</th>
            <th class="py-2 px-4 border-b border-gray-200">CV</th>
            <th class="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(applicant, i) in filteredJobs" :key="i">
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.fullName }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.email }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.phoneNumber }}</td>
            <td class="py-2 px-4 border-b border-gray-200">
              <a :href="BASE_UPLOAD + `${applicant.applicationLetter}`" target="_blank" title="download letter">
                {{ applicant.applicationLetter }}
              </a>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              <a :href="BASE_UPLOAD + `${applicant.cv}`" target="_blank" title="download cv">
                {{ applicant.cv }}
              </a>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              <button @click="deleteJob(applicant.id)">
                <font-awesome-icon icon="trash" class="text-red-700"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>  -->
  </section>
</template>
