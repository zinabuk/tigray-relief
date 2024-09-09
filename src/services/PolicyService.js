import ApiService from './apiService'

class PolicyService {
  async getAllPolicies() {
    return ApiService.get('/admin/privacy-policy')
  }

  async createOrUpdatePolicy(id = '', data) {
    const request = {
      method: id ? 'PATCH' : 'POST',
      url: id ? `/admin/privacy-policy/${id}` : '/admin/privacy-policy',
      data: data
    }
    return ApiService.request(request)
  }

  async getPolicyByTitle(title) {
    return ApiService.get(`/admin/privacy-policy/${title}`)
  }

  async deletePolicyById(id) {
    return ApiService.delete(`/admin/privacy-policy/${id}`)
  }
}

export default new PolicyService()
