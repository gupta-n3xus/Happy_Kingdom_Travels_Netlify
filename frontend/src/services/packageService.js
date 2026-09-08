import api from './api'

const packageService = {
  getAllPackages: async (filters = {}) => {
    return api.get('/packages', filters)
  },
  getPackageBySlug: async (slug) => {
    return api.get(`/packages/${slug}`)
  },
  createPackage: async (data) => {
    return api.post('/packages', data)
  },
  updatePackage: async (id, data) => {
    return api.put(`/packages/${id}`, data)
  },
  deletePackage: async (id) => {
    return api.delete(`/packages/${id}`)
  },
}

export default packageService
