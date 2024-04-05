<script setup>
const teamData = [
  {
    name: 'John Doe',
    role: 'Manager'
  },
  {
    name: 'Jane Smith',
    role: 'Developer'
  },
  {
    name: 'Alex Johnson',
    role: 'Designer'
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Specialist'
  },
  {
    name: 'Michael Wilson',
    role: 'Sales Representative'
  },
  {
    name: 'Sarah Thompson',
    role: 'Project Coordinator'
  },
  {
    name: 'David Brown',
    role: 'Accountant'
  },
  {
    name: 'Olivia Lee',
    role: 'HR Manager'
  },
  {
    name: 'Daniel Taylor',
    role: 'Quality Assurance Analyst'
  },
  {
    name: 'Sophia Rodriguez',
    role: 'Customer Support Representative'
  }
]
</script>

<template>
  <section class="w-full py-12 px-4 text-center bg-gray-50">
    <h1 class="text-xl">Rest Resources</h1>
    <h1 class="text-4xl">Our Team</h1>
    <div class="grid grid-cols-4 gap-4 py-8 justify-center items-center">
      <router-link
        v-for="(team, index) in teamData"
        :key="index"
        to="/"
        class="py-6 px-4 text-center bg-white rounded hover:bg-yellow-200/70 hover:text-white shadow w-4/5 flex flex-col gap-4 flex-wrap"
        ><h1 class="text-xl">{{ team.name }}</h1>
        <p class="text-lg">{{ team.role }}</p>
      </router-link>
    </div>
  </section>
</template>

<style>
/* @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  } */
</style>
