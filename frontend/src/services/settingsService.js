import api from './api'

const settingsService = {
  getSettings: async () => {
    return api.get('/settings')
  },
  updateSettings: async (data) => {
    return api.put('/settings', data)
  },
}

export default settingsService
