import ApiService from './apiService'

const AuthService = {
  async logIn(data) {
    return ApiService.post('admin/login', data)
  }
}

export default AuthService
