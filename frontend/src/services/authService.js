import api from './api'

const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    return data
  },
  getMe: async () => {
    return api.get('/auth/me')
  },
  logout: () => {
    localStorage.removeItem('token')
  },
}

export default authService
