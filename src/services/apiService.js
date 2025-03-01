// import axios from 'axios'
// import { BASE_URL } from '@/config'
import api from '../utils/ApiInterceptor'

class ApiService {
  constructor() {
    this.setHeader(localStorage.getItem('access_token'))
  }
  async get(endpoint) {
    // alert(endpoint)
    const response = await api.get(endpoint)
    return response.data
  }

  async post(endpoint, data) {
    // console.log(data)
    const response = await api.post(endpoint, data)
    return response.data
  }
  async postRequest(endpoint, data) {
    // console.log(data)
    const response = await api.post(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
  async patch(endpoint, data) {
    const response = await api.patch(endpoint, data)
    return response.data
  }

  async delete(endpoint) {
    const response = await api.delete(endpoint)
    return response.data
  }
  async request(req) {
    const response = await api.request(req)
    return response.data
  }

  async applyJob(endpoint, data) {
    const response = await api.post(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
  async getCareerById(endpoint) {
    const response = await api.get(endpoint)
    return response.data
  }
  async updateCareer(endpoint, data) {
    const response = await api.post(endpoint, data)
    return response.data
  }
  async applyTender(endpoint, data) {
    const response = await api.patch(endpoint, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
  setHeader(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }
  removeHeader() {
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('access_token')
    localStorage.removeItem('role')
    localStorage.removeItem('avatar')
  }
}

export default new ApiService()
