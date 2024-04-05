import axios from 'axios'
// import { useAppStore } from '@/stores/app' // Import your Pinia store for global state management

// import handleErrors from '@/utils/error'
import { BASE_URL } from '@/config'

const api = axios.create({
  baseURL: BASE_URL
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default api
