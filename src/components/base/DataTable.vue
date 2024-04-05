<template>
  <section class="w-full">
    <div class="py-2 px-2 w-full bg-white flex flex-col">
      <div class="flex justify-end">
        <div class="">
          <input type="text" class="border-black border px-4" v-model="searchQuery" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <caption class="flex justify-start">
          {{
            caption
          }}
        </caption>
        <table class="border border-black border-collapse w-full">
          <thead>
            <tr class="bg-gray-200">
              <th
                v-for="(head, i) in tableHeaders"
                :key="i"
                class="py-2 px-4"
                @click="sortBy(head.field)"
              >
                {{ head.label }}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="paginatedData && paginatedData.length">
            <tr v-for="(value, i) in paginatedData" :key="i" class="hover:bg-gray-100">
              <td class="py-2 px-4" v-for="(header, i) in tableHeaders" :key="i">
                {{ value[header.field] }}
              </td>
              <td class="py-2 px-4">
                <button
                  v-for="(action, i) in actions"
                  @click="handleAction(action, value)"
                  :class="{
                    'hover:cursor-pointer text-blue-500 py-1 px-2': action.duty === 'edit',
                    'hover:cursor-pointer text-red-500 py-1 px-2': action.duty === 'delete'
                  }"
                  :key="i"
                >
                  {{ action.label }}
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
          <button
            @click="prevPage"
            class="bg-black text-white px-4 py-2 rounded"
            v-if="currentPage != 1"
          >
            Previous
          </button>
          <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            class="bg-black text-white px-4 py-2 rounded"
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
          <input
            type="number"
            v-model="goToPage"
            class="border border-gray-300 rounded px-2 py-1"
          />
          <button @click="gotoPage" class="bg-gray-600 text-white px-4 py-2 rounded">Go</button>
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
      return [10, 25, 50] // Add more options if needed
    },
    filteredData() {
      if (this.searchQuery) {
        return this.tableValues.filter((item) => {
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
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
    editData(element) {
      alert(element.id)
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
    },
    handleAction(action, data) {
      if (action.duty === 'edit') {
        alert(data.id)
      } else {
        alert('Delete')
      }
    }
  }
}
</script>
