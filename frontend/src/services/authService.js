import api from './api'

const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    if (data.sessionId) {
      localStorage.setItem('sessionId', data.sessionId)
    }
    return data
  },
  getMe: async () => {
    return api.get('/auth/me')
  },
  logout: async () => {
    const sessionId = localStorage.getItem('sessionId')
    try {
      await api.post('/auth/logout', { sessionId })
    } catch (e) {
      // silently fail - logout endpoint may not exist yet
    }
    localStorage.removeItem('token')
    localStorage.removeItem('sessionId')
  },
}

export default authService
