<script setup>
const teamData = [
  {
    name: 'Zinabu Kalayou',
    role: 'Manager'
  },
  {
    name: 'Haftom Q',
    role: 'Developer'
  },
  {
    name: 'Shumuye A.',
    role: 'Designer'
  },
  {
    name: 'Derhotsion',
    role: 'Marketing Specialist'
  },
  {
    name: 'Michael Wilson',
    role: 'Sales Representative'
  },
  {
    name: 'Sarah Thompson',
    role: 'Project Coordinator'
  }
]
</script>

<template>
  <div class="about w-full min-h-[calc(100vh_-_80px)] relative">
    <img
      src="@/assets/33.jpg"
      alt="rest image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 w-full flex justify-end items-center px-12">
      <div class="bg-white/60 text-black/80 font-bold w-1/2 p-4 flex flex-col gap-4">
        <h1 class="text-2xl">About Us</h1>
        <p class="text-lg line-clamp-3">
          The Tigray Relief Association (TRA) is a humanitarian organization based in Tigray, a
          region in northern Ethiopia. It was founded in 1979 during the Ethiopian Civil War to
          provide relief and support to people affected by the conflict. region in northern
          Ethiopia. It was founded in 1979 during the Ethiopian Civil War to provide relief and
          support to people affected by the conflict. region in northern Ethiopia. It was founded in
          1979 during the Ethiopian Civil War to provide relief and support to people affected by
          the conflict. region in northern Ethiopia. It was founded in 1979 during the Ethiopian
          Civil War to provide relief and support to people affected by the conflict.
        </p>
        <a href="#establishment" class="text-green-600">Know More</a>
      </div>
    </div>
  </div>
  <section class="w-full py-12 px-[6%] grid grid-cols-1 md:grid-cols-2 gap-4" id="establishment">
    <div class="flex flex-col">
      <h1 class="text-4xl font-bold mb-4">Who we are.</h1>
      <p class="text-lg" data-aos="fade-right">
        The Tigray Relief Association (TRA) is a humanitarian organization based in Tigray, a region
        in northern Ethiopia. It was founded in 1979 during the Ethiopian Civil War to provide
        relief and support to people affected by the conflict.
        <br />
        The primary purpose of the organization is to alleviate human suffering and provide
        assistance to vulnerable populations in Tigray. Over the years, the TRA has been involved in
        various relief and development programs, including emergency response during times of
        crisis, such as droughts and conflicts. Their activities have included providing food aid,
        healthcare services, education support, water and sanitation initiatives, and livelihood
        programs.
        <br />
      </p>
      <router-link
        to="/"
        class="bg-[#539000] self-center px-4 py-2 text-white font-bold"
        data-aos="fade-right"
        >Get in touch</router-link
      >
    </div>
    <img src="@/assets/3.jpg" alt="" class="w-full object-cover h-auto" data-aos="fade-left" />
  </section>

  <section class="flex flex-col px-[6%] gap-4 py-12 bg-gray-50 items-center">
    <div class="w-full mx-auto">
      <h1 class="text-center text-2xl font-semibold">
        CAUSES AND POSITIVE CHANGE ALL OVER THE REGION
      </h1>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="p-6 flex flex-col gap-4 shadow bg-white items-center justify-center"
        data-aos="fade-right"
      >
        <!-- <font-awesome-icon icon="bullseye" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/target.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Mission</h1>
        <p>Rest's mission is to empower the local church to serve the most vulnerable.</p>
      </div>
      <div
        class="p-6 flex flex-col gap-4 shadow bg-white items-center justify-center"
        data-aos="fade-up"
      >
        <!-- <font-awesome-icon icon="eye" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/vision.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Vision</h1>
        <p>Rest's mission is to empower the local church to serve the most vulnerable.</p>
      </div>
      <div
        class="p-6 flex flex-col gap-4 shadow bg-white items-center justify-center"
        data-aos="fade-right"
      >
        <!-- <font-awesome-icon icon="balance-scale" class="text-6xl text-[#539000]"></font-awesome-icon> -->
        <img
          src="https://restindia.org/wp-content/uploads/2022/09/united.png"
          alt=""
          class="w-24 h-24"
        />
        <h1 class="text-2xl font-bold">Our Values</h1>
        <p>Rest's mission is to empower the local church to serve the most vulnerable.</p>
      </div>
    </div>
  </section>

  <!-- Our teams section -->
  <section class="flex flex-col px-[6%] gap-4 py-12 bg-white">
    <h1 class="text-2xl text-center">Our Team</h1>
    <div class="grid grid-cols-3 gap-4 py-8 justify-center items-center">
      <div
        v-for="(team, index) in teamData"
        :key="index"
        data-aos="fade-up"
        class="py-6 px-4 text-center bg-gray-50 rounded shadow flex flex-col gap-2 flex-wrap"
      >
        <img src="@/assets/3.jpg" alt="" class="h-3y/4 w-full" />
        <h1 class="text-xl font-semibold">{{ team.name }}</h1>
        <p class="text-gray-700">{{ team.role }}</p>
      </div>
    </div>
  </section>
</template>

<style>
.about {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}
</style>
