<template>
    <div class="w-[82%] flex flex-wrap items-center justify-center">
      <div class="w-1/2">
        <form
          @submit.prevent="submitForm"
          class="w-full bg-white rounded-lg p-6 shadow flex flex-col gap-2"
          enctype="multipart/form-data"
        >
          <h1 class="flex justify-center font-bold font-serif">Add Team</h1>
  
          <!-- Event Title -->
          <div class="flex justify-center">
            <BaseInput type="text" id="eventTitle" label="Event Title" v-model="team.fullName" />
          </div>
  
          <!-- Event Category -->
          <div class="flex justify-center">
            <BaseInput type="text" id="category" label="Category" v-model="team.profession" />
          </div>
  
          <!-- Event Date -->
         
   
          <!-- Event Description -->
  
          <div>
            <BaseTextarea
              v-model="team.biography"
              placeholder="Write an event Description"
              label="Description"
            ></BaseTextarea>
            
          </div>
          <!-- Event Image -->
          <div class="flex justify-between">
            <div class="flex">
              <input
                type="file"
                id="eventImage"
                @change="handleFileChange"
                class="hidden"
                ref="eventImageInput"
              />
              <label
                for="eventImage"
                class="cursor-pointer bg-[#539000]/70 hover:bg-white text-white hover:text-[#539000] font-medium py-2 px-4 rounded"
              >
                image
              </label>
            </div>
            <!-- Submit Button -->
            <div class="flex justify-end">
              <BaseButton label="">Submit</BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
  </template>
  
  <script>
  import BaseInput from '@/components/base/BaseInput.vue'
  import BaseTextarea from '@/components/base/BaseTextarea.vue'
  import BaseButton from '@/components/base/BaseButton.vue'
  import apiService from '@/services/apiService'
  
  export default {
    components: {
      BaseInput,
      BaseTextarea,
      BaseButton
    },
    data() {
      return {
        toggleMobileMenu: true,
        team: {
          fullName: '',
          profession: '',
          biography: '',
          image: '',
         
        }
      }
    },
    mounted() {
      this.fetchEvents()
    },
    methods: {
      handleFileChange(event) {
        this.team.image = event.target.files[0]
      },
      async submitForm() {
        try {
          const formData = new FormData()
          formData.append('fullName', this.team.fullName)
          formData.append('profession', this.team.profession)
          formData.append('biography', this.team.biography)
          formData.append('image', this.team.image) 
  
          const request = {
            method: 'POST',
            url: '/admin/our-teams',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          }
          const response = await apiService.request(request)
  
          if (response.success) {
            alert('OK')
            this.team = { 
            }
          }
        } catch (error) {
          console.error(error)
        }
      },
      async fetchEvents() {
        const apiUrl = '/events'
        try {
          const response = await apiService.get(apiUrl)
          this.eventData = response.data.data
          console.log(this.eventData)
        } catch (error) {
          console.error('Error fetching events:', error)
        }
      }
    }
  }
  </script>
  
  <style></style>
  