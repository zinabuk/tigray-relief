<template>
  <div class="grid grid-cols-1 w-[82%]">
    <div class="rounded p-4 border"><h1>services</h1></div>
    <div class="rounded p-4"></div>
    <div class="rounded p-4"></div>
    <div class="rounded p-4"></div>
  </div>
  <!-- <div class="w-[82%] chart-container flex flex-col items-center justify-center">
    <h1 class="text-2xl font-semibold">Relief society of tigray</h1>
    <div class="w-full flex justify-between">
      <div ref="chart" class="h-auto"></div>
      <div ref="pieChart" class="h-auto"></div>
    </div>
    <div class="w-full h-screen">
      <div ref="pieChart2" class="h-full w-1/2 mx-auto"></div>
    </div>
    <div class="w-full h-screen">
      <div ref="barChart" class="h-full w-1/2 mx-auto"></div>
    </div>
  </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApexCharts from 'apexcharts'

const chart = ref(null)
const pieChart = ref(null)
const pieChart2 = ref(null)
const barChart = ref(null)

onMounted(() => {
  chart.value = new ApexCharts(chart.value, {
    chart: {
      type: 'line'
    },
    series: [
      {
        name: 'REST inside data',
        data: [10, 20, 30, 25, 35, 15]
      }
    ],
    xaxis: {
      categories: ['Services', 'Partners', 'Blogs', 'Donations', 'Messages', 'Tenders']
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          }
        }
      }
    ]
  })

  chart.value.render()

  pieChart.value = new ApexCharts(pieChart.value, {
    chart: {
      type: 'pie',
      width: '100%'
    },
    series: [44, 55, 13, 43, 22, 30],
    labels: ['Services', 'Partners', 'Blogs', 'Donations', 'Messages', 'Tenders']
  })

  pieChart.value.render()

  pieChart2.value = new ApexCharts(pieChart2.value, {
    chart: {
      type: 'pie',
      width: '100%'
    },
    series: [256800, 126000, 42008.65, 8308.89],
    labels: [
      'Rents and utilies',
      'Salaries and Benefits',
      'Marketing and Advertising',
      'Technology Infrastructure'
    ]
  })
  // pieChart2.value = new ApexCharts(pieChart2.value, {
  //   chart: {
  //     type: 'pie',
  //     width: '100%'
  //   },
  //   series: [2400000, 300000, 210000, 100000,80000, 60000, 60000, 40000],
  //   labels: [
  //     'Recruitment / Service fee',
  //     'Employers Subscription',
  //     'Agencies subscription',
  //     'Gigs subscription',
  //     'Sponsors',
  //     'Events list',
  //     'Featured Companies',
  //     'Telegram service/product advertisement'
  //   ]
  // })

  pieChart2.value.render()

  barChart.value = new ApexCharts(barChart.value, {
    chart: {
      type: 'bar',
      width: '100%'
    },
    series: [
      {
        data: [3418058.69, 1194820.54, 804000, 1419238.15]
      }
    ],
    xaxis: {
      categories: ['Revenue', 'Tax', 'Expense', 'Profit']
    },
    // colors: [ '#FFFF00','#0000FF', '#FF0000', '#00FF00']
    plotOptions: {
      bar: {
        distributed: true
      }
    }
  })

  barChart.value.render()
})
</script>

<style>
/* .chart-container {
  height: auto;
} */
</style>
