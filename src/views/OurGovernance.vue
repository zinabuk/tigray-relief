<template>
  <div id="governance" class="bg-[#53900F]/10 overflow-auto">
    <OrgTree :data="treeData" />
  </div>
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
        role: '',
        profilePicture: "",
        children: [
          {
            name: 'Manager 1',
            role: '',
            children: [
              { name: 'Team Lead 1', role: '' },
              { name: 'Team Lead 2', role: '' }
            ]
          },
          {
            name: 'Manager 2',

            children: [
              {
                name: 'Team Lead 3',
                children: [
                  { name: 'Team Member 1' },
                  { name: 'Team Member 2' },
                  { name: 'Team Member 3' }
                ]
              },
              { name: 'Team Lead 4',
              children: [
                  { name: 'Team Member 1' },
                  { name: 'Team Member 2' },
                  { name: 'Team Member 3' }
                ]
            }
            ]
          },
          {
            name: 'Manager 3',
            children: [{ name: 'Team Lead 5' }, { name: 'Team Lead 6' }]
          }
        ]
      }
    }
  }
}
</script>

<style></style>
