<template>
  <div class="w-[82%] flex flex-wrap items-center justify-center">
    <div class="w-1/2">
      <form
        @submit.prevent="submitForm"
        class="w-full bg-white rounded-lg p-6 shadow flex flex-col gap-2"
        enctype="multipart/form-data"
      >
        <h1 class="flex justify-center font-bold font-serif">Add New / Event</h1>

        <!-- Event Title -->
        <div class="flex justify-center">
          <BaseInput
            type="text"
            id="eventTitle"
            label="Title"
            v-model="event.eventTitle[currentLanguage]"
          />
        </div>

        <!-- Event Category -->
        <div class="flex justify-center">
          <BaseInput
            type="text"
            id="category"
            label="Category"
            v-model="event.category[currentLanguage]"
          />
        </div>

        <!-- Event Date -->
        <div class="flex justify-center">
          <BaseInput type="date" id="eventDate" label="Date" v-model="event.eventDate" />
        </div>

        <!-- Event Organizer -->
        <div class="flex justify-center">
          <BaseInput
            type="text"
            id="eventOrganizer"
            label="By"
            v-model="event.eventOrganizer[currentLanguage]"
          />
        </div>

        <!-- Event Description -->
        <div>
          <BaseTextarea
            v-model="event.eventDescription[currentLanguage]"
            placeholder="Description"
            label="Description"
          ></BaseTextarea>
        </div>

        <!-- Event Image -->
        <div class="flex justify-between">
          <div class="flex">
            <!-- <input type="file" id="eventImage" @change="handleFileChange" class="hidden" ref="eventImageInput" /> -->
            <BaseFileInput
              @change="handleFileChange"
              label="Add Picture"
              type="file"
              inputClass="p-2 border border-gray-300 rounded"
              placeholder="Image"
              accept="image/*"
            ></BaseFileInput>
            <!-- <label for="eventImage" class="cursor-pointer bg-[#539000]/70 hover:bg-white text-white hover:text-[#539000] font-medium py-2 px-4 rounded">image</label> -->
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-[#539000]/80 hover:bg-[#539000] text-white font-medium py-2 px-4 rounded"
            >
              Save Event
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
import BaseFileInput from '@/components/base/BaseFileInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import apiService from '@/services/apiService'

export default {
  components: {
    BaseInput,
    BaseTextarea,
    BaseFileInput
  },
  data() {
    return {
      currentLanguage: 'en',
      event: {
        eventTitle: { en: '', ti: '', am: '' },
        eventImage: null,
        eventDescription: { en: '', ti: '', am: '' },
        category: { en: '', ti: '', am: '' },
        eventDate: null,
        eventOrganizer: { en: '', ti: '', am: '' }
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
    toggleLanguage(lang) {
      this.currentLanguage = lang
    },
    async submitForm() {
      try {
        const formData = new FormData()
        formData.append('eventTitle', JSON.stringify(this.event.eventTitle))
        formData.append('eventImage', this.event.eventImage)
        formData.append('eventDescription', JSON.stringify(this.event.eventDescription))
        formData.append('category', JSON.stringify(this.event.category))
        formData.append('eventDate', this.event.eventDate)
        formData.append('eventOrganizer', JSON.stringify(this.event.eventOrganizer))

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
          alert('Event saved successfully')
          this.resetForm()
        }
      } catch (error) {
        console.error('Error saving event:', error)
      }
    },
    resetForm() {
      this.event = {
        eventTitle: { en: '', ti: '', am: '' },
        eventImage: null,
        eventDescription: { en: '', ti: '', am: '' },
        category: { en: '', ti: '', am: '' },
        eventDate: null,
        eventOrganizer: { en: '', ti: '', am: '' }
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
