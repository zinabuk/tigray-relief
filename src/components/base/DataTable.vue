<template>
  <section class="w-full">
    <div class="py-2 px-2 w-full bg-white flex flex-col">
      <div class="flex justify-end">
        <div class="">
          <input
            type="text"
            class="outl border px-2 py-0"
            v-model="searchQuery"
            placeholder="Search"
          />
        </div>
      </div>
      <div class="overflow-auto w-full">
        <caption class="flex justify-start">
          {{
            caption
          }}
        </caption>
        <table class="border border-blackf border-collapse w-full overflow-auto">
          <thead class="w-full">
            <tr class="bg-gray-200">
              <th v-for="(head, i) in tableHeaders" :key="i" class="" @click="sortBy(head.field)">
                {{ head.label }}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="paginatedData && paginatedData.length">
            <tr v-for="(value, i) in paginatedData" :key="i" class="hover:bg-gray-100">
              <td class="" v-for="(header, i) in tableHeaders" :key="i">
                <span v-if="header !== 'Applicants'">
                  {{ value[header.field] }}
                </span>

                <span v-else>{{ value['Applicants'.applicantId.length] }}</span>
              </td>
              <td class="flex">
                <button
                  v-for="(action, i) in actions"
                  @click="action.action(value)"
                  :class="action.style"
                  :key="i"
                >
                  <font-awesome-icon v-if="action.icon" :icon="action.icon"></font-awesome-icon>
                  <span v-else>{{ action.label }}</span>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="w-full">
              No data available
            </tr>
          </tbody>
        </table>
        <div
          class="flex justify-end gap-3 items-center py-4"
          v-if="paginatedData && paginatedData.length"
        >
          <button @click="prevPage" class="bg-black text-white rounded" v-if="currentPage != 1">
            Previous
          </button>
          <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            class="bg-black text-white rounded"
            v-if="currentPage < totalPages"
          >
            Next
          </button>
          <!-- Dropdown for setting items per page -->
          <select
            v-model="itemsPerPage"
            @change="updatePagination"
            class="border border-gray-300 rounded"
          >
            <option value="Per page" disabled>Per page</option>

            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <!-- Input for go to page -->
          <input type="number" v-model="goToPage" class="border border-gray-300 rounded" />
          <button @click="gotoPage" class="bg-gray-600 text-white px-2 rounded">Go</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
      sortDirection: 'asc'
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
