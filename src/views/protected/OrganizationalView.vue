<template>
    <section class="w-[82%] px-[6%] py-12 flex flex-col items-center gap-4 bg-white rounded-2xl">
      <div id="governance" class="bg-[#53900F]/10 overflow-auto">
        <OrgTree :data="treeData" />
      </div>
    </section>
  </template>
  
  <script>
  import OrgTree from '@/components/open/OpenTree.vue'
  
  export default {
    name: 'App',
    components: {
      OrgTree
    },
    data() {
      return {
        treeData: {
          name: 'CEO',
          role: 'Chief Executive Officer',
          profilePicture: "/path/to/ceo-profile.jpg",
          children: [
            {
              name: 'Manager 1',
              role: 'Manager',
              profilePicture: "/path/to/manager1-profile.jpg",
              children: [
                { name: 'Team Lead 1', role: 'Team Lead', profilePicture: "/path/to/teamlead1-profile.jpg" },
                { name: 'Team Lead 2', role: 'Team Lead', profilePicture: "/path/to/teamlead2-profile.jpg" }
              ]
            },
            {
              name: 'Manager 2',
              role: 'Manager',
              profilePicture: "/path/to/manager2-profile.jpg",
              children: [
                {
                  name: 'Team Lead 3',
                  role: 'Team Lead',
                  profilePicture: "/path/to/teamlead3-profile.jpg",
                  children: [
                    { name: 'Team Member 1', profilePicture: "/path/to/teammember1-profile.jpg" },
                    { name: 'Team Member 2', profilePicture: "/path/to/teammember2-profile.jpg" },
                    { name: 'Team Member 3', profilePicture: "/path/to/teammember3-profile.jpg" }
                  ]
                },
                {
                  name: 'Team Lead 4',
                  role: 'Team Lead',
                  profilePicture: "/path/to/teamlead4-profile.jpg",
                  children: [
                    { name: 'Team Member 1', profilePicture: "/path/to/teammember1-profile.jpg" },
                    { name: 'Team Member 2', profilePicture: "/path/to/teammember2-profile.jpg" },
                    { name: 'Team Member 3', profilePicture: "/path/to/teammember3-profile.jpg" }
                  ]
                }
              ]
            },
            {
              name: 'Manager 3',
              role: 'Manager',
              profilePicture: "/path/to/manager3-profile.jpg",
              children: [
                { name: 'Team Lead 5', profilePicture: "/path/to/teamlead5-profile.jpg" },
                { name: 'Team Lead 6', profilePicture: "/path/to/teamlead6-profile.jpg" }
              ]
            }
          ]
        }
      }
    }
  }
  </script>
  
  <style></style>
  