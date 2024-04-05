<template>
  <div class="w-[82%] flex flex-wrap items-center justify-center">
    <div class="w-1/2">
      <form
        @submit.prevent="submitForm"
        class="w-full bg-white rounded-lg p-6 shadow flex flex-col gap-2"
        enctype="multipart/form-data"
      >
        <h1 class="flex justify-center font-bold font-serif">Add event</h1>

        <!-- Event Title -->
        <div class="flex justify-center">
          <BaseInput type="text" id="eventTitle" label="Event Title" v-model="event.eventTitle" />
        </div>

        <!-- Event Category -->
        <div class="flex justify-center">
          <BaseInput type="text" id="category" label="Category" v-model="event.category" />
        </div>

        <!-- Event Date -->
        <div class="flex justify-center">
          <BaseInput type="date" id="eventDate" label="Event Date" v-model="event.eventDate" />
        </div>

        <!-- Event Organizer -->
        <div class="flex justify-center">
          <BaseInput
            type="text"
            id="eventOrganizer"
            label="Event Organizer"
            v-model="event.eventOrganizer"
          />
        </div>
        <!-- Event Description -->

        <div>
          <BaseTextarea
            v-model="event.eventDescription"
            placeholder="Write an event Description"
            label="Description"
          ></BaseTextarea>
          <!-- <textarea
            id="eventDescription"
            v-model="event.eventDescription"
            class="h-40 w-full px-4 py-2 mt-2 text-purple-700 bg-white rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 border border-black-600"
            placeholder="Write an event Description"
          ></textarea> -->
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
            <button
              type="submit"
              class="bg-[#539000]/80 hover:bg-[#539000] text-white font-medium py-2 px-4 rounded"
            >
              Save Blog
            </button>
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
import apiService from '@/services/apiService'

export default {
  components: {
    BaseInput,
    BaseTextarea
  },
  data() {
    return {
      toggleMobileMenu: true,
      event: {
        eventTitle: '',
        eventImage: null,
        eventDescription: '',
        category: '',
        eventDate: null,
        eventOrganizer: ''
      }
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    handleFileChange(event) {
      this.event.eventImage = event.target.files[0]
    },
    async submitForm() {
      try {
        const formData = new FormData()
        formData.append('eventTitle', this.event.eventTitle)
        formData.append('eventImage', this.event.eventImage)
        formData.append('eventDescription', this.event.eventDescription)
        formData.append('category', this.event.category)
        formData.append('eventDate', this.event.eventDate)
        formData.append('eventOrganizer', this.event.eventOrganizer)

        const request = {
          method: 'POST',
          url: '/admin/events',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
        const response = await apiService.request(request)

        if (response.success) {
          alert('OK')
          this.event = {
            eventTitle: '',
            eventImage: null,
            eventDescription: '',
            category: '',
            eventDate: null,
            eventOrganizer: ''
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
