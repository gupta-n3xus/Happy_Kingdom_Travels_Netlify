import api from './api'

const activityService = {
  getAll: async (params = {}) => {
    const { page = 1, limit = 50, userId } = params
    const query = new URLSearchParams({ page, limit })
    if (userId) query.append('userId', userId)
    return api.get(`/activity?${query}`)
  },

  getBySubAdmin: async (id, params = {}) => {
    const { page = 1, limit = 50 } = params
    return api.get(`/activity/subadmin/${id}?page=${page}&limit=${limit}`)
  },

  getSessions: async (params = {}) => {
    const { page = 1, limit = 20, userId } = params
    const query = new URLSearchParams({ page, limit })
    if (userId) query.append('userId', userId)
    return api.get(`/activity/sessions?${query}`)
  }
}

export default activityService
