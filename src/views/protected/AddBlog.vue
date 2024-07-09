<template>
  <div class="w-[82%] flex flex-wrap items-center justify-center">
    <div class="w-1/2">
      <div class="flex justify-center gap-16 py-2">
        <BaseButton @click="toggleLanguage('en')" :class="{ 'bg-green-900 text-white': currentLanguage === 'en', 'bg-gray-200': currentLanguage !== 'en' }">English</BaseButton>
        <BaseButton @click="toggleLanguage('am')" :class="{ 'bg-green-900 text-white': currentLanguage === 'am', 'bg-gray-200': currentLanguage !== 'am' }">Amharic</BaseButton>
        <BaseButton @click="toggleLanguage('ti')" :class="{ 'bg-green-900 text-white': currentLanguage === 'ti', 'bg-gray-200': currentLanguage !== 'ti' }">Tigrigna</BaseButton>
      </div>
      <form @submit.prevent="submitForm" class="w-full bg-white rounded-lg p-6 shadow flex flex-col gap-2" enctype="multipart/form-data">
        <h1 class="flex justify-center font-bold font-serif">Add event</h1>

        <!-- Event Title -->
        <div class="flex justify-center">
          <BaseInput type="text" id="eventTitle" label="Event Title" v-model="event.eventTitle[currentLanguage]" />
        </div>

        <!-- Event Category -->
        <div class="flex justify-center">
          <BaseInput type="text" id="category" label="Category" v-model="event.category[currentLanguage]" />
        </div>

        <!-- Event Date -->
        <div class="flex justify-center">
          <BaseInput type="date" id="eventDate" label="Event Date" v-model="event.eventDate" />
        </div>

        <!-- Event Organizer -->
        <div class="flex justify-center">
          <BaseInput type="text" id="eventOrganizer" label="Event Organizer" v-model="event.eventOrganizer[currentLanguage]" />
        </div>
        
        <!-- Event Description -->
        <div>
          <BaseTextarea v-model="event.eventDescription[currentLanguage]" placeholder="Write an event Description" label="Description"></BaseTextarea>
        </div>

        <!-- Event Image -->
        <div class="flex justify-between">
          <div class="flex">
            <input type="file" id="eventImage" @change="handleFileChange" class="hidden" ref="eventImageInput" />
            <label for="eventImage" class="cursor-pointer bg-[#539000]/70 hover:bg-white text-white hover:text-[#539000] font-medium py-2 px-4 rounded">image</label>
          </div>
          
          <!-- Submit Button -->
          <div class="flex justify-end">
            <button type="submit" class="bg-[#539000]/80 hover:bg-[#539000] text-white font-medium py-2 px-4 rounded">Save Event</button>
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
      currentLanguage: 'en',
      event: {
        eventTitle: { en: '', ti: '', am: '' },
        eventImage: null,
        eventDescription: { en: '', ti: '', am: '' },
        category: { en: '', ti: '', am: '' },
        eventDate: null,
        eventOrganizer: { en: '', ti: '', am: '' },
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
      this.currentLanguage = lang;
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
        eventOrganizer: { en: '', ti: '', am: '' },
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
