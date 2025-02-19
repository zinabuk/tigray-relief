<template>
  <div class="w-full p-6">
    <h1 class="text-xl zfont-bold mb-6">Dashboard</h1>
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Services</h2>
        <p class="text-2xl font-bold text-blue-500">{{ totalServices }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Vacancies</h2>
        <p class="text-2xl font-bold text-green-500">{{ totalVacancies }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Board Members</h2>
        <p class="text-2xl font-bold text-yellow-500">{{ totalBoardMembers }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Volunteers</h2>
        <p class="text-2xl font-bold text-teal-500">{{ totalVolunteers }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Donations</h2>
        <p class="text-2xl font-bold text-pink-500">{{ totalDonations }}</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 class="text-xl font-semibold">Total Partners</h2>
        <p class="text-2xl font-bold text-indigo-500">{{ totalPartners }}</p>
      </div>
    </div>

    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold text-center">Volunteers Distribution</h2>
        <apexchart type="pie" :options="volunteersChartOptions" :series="volunteersChartSeries" />
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold text-center">Donations Distribution</h2>
        <apexchart type="pie" :options="donationsChartOptions" :series="donationsChartSeries" />
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
// import VueApexCharts from 'vue3-apexcharts';
import ApiService from '@/services/apiService'

export default defineComponent({
  components: {
    // apexchart: VueApexCharts
  },
  setup() {
    const totalServices = ref(0)
    const totalVacancies = ref(0)
    const totalBoardMembers = ref(0)
    const totalVolunteers = ref(0)
    const totalDonations = ref(0)
    const totalPartners = ref(0)

    const volunteersChartOptions = ref({
      chart: { type: 'pie' },
      labels: ['Active Volunteers', 'Inactive Volunteers'],
      colors: ['#4CAF50', '#FF9800']
    })
    const volunteersChartSeries = ref([0, 0])

    const donationsChartOptions = ref({
      chart: { type: 'pie' },
      labels: ['One-Time Donations', 'Monthly Donations', 'Yearly Donations'],
      colors: ['#FF6384', '#36A2EB', '#FFCE56']
    })
    const donationsChartSeries = ref([0, 0, 0])

    // Fetch data on mounted
    onMounted(async () => {
      try {
        const [partners, vacancies, services, donations, volunteers, boardMembers] =
          await Promise.all([
            ApiService.get('/users/partnerships'),
            ApiService.get('/admin/vacancies'),
            ApiService.get('/admin/services'),
            ApiService.get('/users/donations'),
            ApiService.get('/users/volunteers'),
            ApiService.get('/admin/our-teams')
          ])

        totalPartners.value = partners.data.length
        totalVacancies.value = vacancies.data.length
        totalServices.value = services.data.length
        totalDonations.value = donations.data.length
        totalVolunteers.value = volunteers.data.length
        totalBoardMembers.value = boardMembers.data.length

        // Assume we have to break down the volunteer and donation data into distributions
        volunteersChartSeries.value = [
          volunteers.data.filter((v) => v.status === 'active').length,
          volunteers.data.filter((v) => v.status === 'inactive').length
        ]

        donationsChartSeries.value = [
          donations.data.filter((d) => d.type === 'one-time').length,
          donations.data.filter((d) => d.type === 'monthly').length,
          donations.data.filter((d) => d.type === 'yearly').length
        ]
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    return {
      totalServices,
      totalVacancies,
      totalBoardMembers,
      totalVolunteers,
      totalDonations,
      totalPartners,
      volunteersChartOptions,
      volunteersChartSeries,
      donationsChartOptions,
      donationsChartSeries
    }
  }
})
</script>
