<template>
  <section class="w-full">
    <div class="py-4 px-4 w-full bg-white zshadow-lg rounded-lg flex flex-col gap-4">
      <!-- Search Bar -->
      <div class="flex justify-end">
        <input
          type="text"
          class="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="searchQuery"
          placeholder="🔍 Search..."
        />
      </div>

      <!-- Table Wrapper -->
      <div class="overflow-x-auto w-full">
        <caption class="text-lg font-semibold text-gray-700 mb-2">
          {{
            caption
          }}
        </caption>

        <table class="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr class="bg-slate-400 text-white text-left">
              <th
                v-for="(head, i) in tableHeaders"
                :key="i"
                class="px-4 py-1 cursor-pointer hover:bg-slate-500 transition-all"
                @click="sortBy(head.field)"
              >
                {{ head.label }}
                <font-awesome-icon
                  v-if="sortedField === head.field"
                  :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'"
                  class="ml-1"
                />
              </th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody v-if="paginatedData && paginatedData.length > 0">
            <tr
              v-for="(value, i) in paginatedData"
              :key="i"
              class="border-b hover:bg-gray-100 transition-all"
            >
              <td v-for="(header, j) in tableHeaders" :key="j" class="px-4 py-3 text-gray-800">
                <span v-if="header.field !== 'resume'" class="line-clamp-2">
                  {{ value[header.field] }}
                </span>
                <span v-else>
                  <a
                    class="hover:text-blue-500 underline"
                    :href="BASE_UPLOAD + value[header.field]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ value[header.field] ? 'View Resume' : 'No Resume' }}
                  </a>
                </span>

                <!-- <span v-else>{{ value['Applicants'.applicantId.length] }}</span> -->
              </td>

              <!-- Actions -->
              <td class="flex gap-2 py-3 px-4">
                <button
                  v-for="(action, k) in actions"
                  @click="action.action(value)"
                  :class="`px-3 py-1 ztext-white text-sm rounded-md shadow-md transition-all hover:opacity-80 ${action.style}`"
                  :key="k"
                >
                  <font-awesome-icon v-if="action.icon" :icon="action.icon"></font-awesome-icon>
                  <span v-else>{{ action.label }}</span>
                </button>
              </td>
            </tr>
          </tbody>

          <!-- No Data -->
          <tbody v-else>
            <tr>
              <td colspan="100%" class="text-center py-4 text-gray-500">No data available</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div
          class="flex justify-between items-center py-4 px-2 text-gray-700"
          v-if="paginatedData && paginatedData.length"
        >
          <button
            @click="prevPage"
            class="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition-all"
            v-if="currentPage !== 1"
          >
            ◀ Previous
          </button>

          <span class="font-semibold">Page {{ currentPage }} of {{ totalPages }}</span>

          <button
            @click="nextPage"
            class="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition-all"
            v-if="currentPage < totalPages"
          >
            Next ▶
          </button>

          <!-- Items Per Page -->
          <select
            v-model="itemsPerPage"
            @change="updatePagination"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Per page</option>
            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>

          <!-- Go to Page -->
          <div class="flex gap-2">
            <input
              type="number"
              v-model="goToPage"
              class="border border-gray-300 rounded-md px-3 py-1 w-16 focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="gotoPage"
              class="bg-blue-600/70 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-700 transition-all"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { BASE_AVATAR } from '@/config'
import { BASE_UPLOAD } from '@/config'
export default {
  props: {
    tableHeaders: Array,
    tableValues: Array,
    actions: Array,
    caption: String
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      goToPage: 1,
      sortByColumn: null,
      sortDirection: 'asc',
      BASE_AVATAR: BASE_AVATAR,
      BASE_UPLOAD: BASE_UPLOAD
    }
  },

  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.sortedData.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    sortedData() {
      if (this.sortByColumn) {
        const sortedData = [...this.filteredData]
        return sortedData.sort((a, b) => {
          const aVal = String(a[this.sortByColumn]) // Convert to string
          const bVal = String(b[this.sortByColumn]) // Convert to string

          // Use localeCompare for string values, otherwise use basic comparison
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            const modifier = this.sortDirection === 'asc' ? 1 : -1
            return modifier * aVal.localeCompare(bVal)
          } else {
            const modifier = this.sortDirection === 'asc' ? 1 : -1
            return modifier * (aVal - bVal)
          }
        })
      } else {
        return this.filteredData
      }
    },
    itemsPerPageOptions() {
      return [10, 25, 50, 'All'] // Add more options if needed
    },
    filteredData() {
      if (this.searchQuery) {
        return this.tableValues.filter((item) => {
          return Object.values(item).some((value) => {
            if (value !== null && value !== undefined) {
              return value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
            }
            return false
          })
        })
      } else {
        return this.tableValues
      }
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    searchTable() {
      this.currentPage = 1
    },
    sortBy(columnName) {
      if (this.sortByColumn === columnName) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortByColumn = columnName
        this.sortDirection = 'asc'
      }
    },
    updatePagination() {
      this.currentPage = 1
    },
    gotoPage() {
      if (this.goToPage >= 1 && this.goToPage <= this.totalPages) {
        this.currentPage = this.goToPage
      } else {
        this.goToPage = 1
      }
    }
  }
}
</script>
