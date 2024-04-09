<script setup>

var options = {
  chart: {
    type: 'line'
  },
  series: [
    {
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }
  ],
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
}

var chart = new ApexCharts(document.querySelector('#chart'), options)

chart.render()
</script>

<template>
  <section class="w-[82%] py-12 bg-white px-[6%] flex items-center justify-center">
    <h1 class="text-4xl">Relief Society of Tigray</h1>
    <div id="chart"></div>
  </section>
</template>

<style scoped></style>
