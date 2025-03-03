<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import { useRouter } from 'vue-router'
const router = useRouter()

import BaseInput from '@/components/base/BaseInput.vue'
import ApiService from '@/services/apiService'
import DataTable from '@/components/base/DataTableT.vue'
import { BASE_UPLOAD } from '@/config'
const route = useRoute()
const tableHeaders = [
  { label: 'Name', field: 'fullName' },
  { label: 'Email', field: 'email' },
  { label: 'Phone Number', field: 'phoneNumber' },
  { label: 'Document', field: 'document' },
]

const actions = [
  
  {
    label: 'delete',
    action: deleteTender,
    icon: 'trash',
    style: 'hover:cursor-pointer text-red-500 py-1 px-2'
  }
]
const searchApplicants = ref('')
const tenders = ref([])
const getTender = async () => {
  
  try {
    const response = await ApiService.get('users/all-tender-applicants/'+route.params.id)
    tenders.value = response.data
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ name: '404resource', params: { resource: 'Tender' } })
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
}

const filteredTenders = computed(() => {
  if (searchApplicants.value) {
    return tenders.value.filter((msg) => {
      return Object.values(msg).some((value) => {
        if (value !== null && value !== undefined) {
          return value.toString().toLowerCase().includes(searchApplicants.value.toLowerCase())
        }
        return false
      })
    })
  } else {
    return tenders.value
  }
})

async function deleteTender  (applicant) {
  try {
    const sure = window.confirm('Are you sure?')
    if (sure) {
      const response = await ApiService.delete(applicant.id)
      if (response.success) {
        alert('Applicant deleted successfully')
        getTender()  // Refresh the list of applicants after deletion
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ name: '404resource', params: { resource: 'Tender' } })
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
}
onMounted(getTender)
</script>

<template>
 <section class="w-[82%] flex flex-col flex-wrap gap-2 px-[1%] py-12">
    <div class="flex justify-between w-full">
      <h2 class="text-xl font-bold">Tender Applicants</h2>
       
    </div>
    
     <div class="w-full">
      <DataTable :tableHeaders="tableHeaders" :tableValues="tenders" :actions="actions" createExport=true exportTitle="vacancies" >
       <template #document ="{ item }" >
          <a  class="hover:text-primary action-cell" :href="BASE_UPLOAD + `${item.document }`" target="_blank" title="download letter">
             {{ item.document  }}
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
          <tr v-for="(applicant, i) in filteredTenders" :key="i">
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.fullName }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.email }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ applicant.phoneNumber }}</td>
            <td class="py-2 px-4 border-b border-gray-200">
              <a :href="BASE_UPLOAD + `${applicant.document }`" target="_blank" title="download letter">
                {{ applicant.document  }}
              </a>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              <a :href="BASE_UPLOAD + `${applicant.cv}`" target="_blank" title="download cv">
                {{ applicant.cv }}
              </a>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">
              <button @click="deleteTender(applicant.id)">
                <font-awesome-icon icon="trash" class="text-red-700"></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>  -->
  </section>
</template>
