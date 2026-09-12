import api from './api'

const subAdminService = {
  getAll: async () => {
    return api.get('/auth/subadmins')
  },

  getById: async (id) => {
    return api.get(`/auth/subadmins/${id}`)
  },

  create: async (data) => {
    return api.post('/auth/subadmins', data)
  },

  update: async (id, data) => {
    return api.put(`/auth/subadmins/${id}`, data)
  },

  delete: async (id) => {
    return api.delete(`/auth/subadmins/${id}`)
  },

  updateProfile: async (data) => {
    return api.put('/auth/profile', data)
  }
}

export default subAdminService
