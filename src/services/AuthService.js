import ApiService from './apiService'

const AuthService = {
  async logIn(data) { 
    console.log(data)
    return ApiService.post('/admin/login', data)
  }
}

export default AuthService
