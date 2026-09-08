import api from './api'

const destinationService = {
  getAllDestinations: async () => {
    return api.get('/destinations')
  },
  getDestinationBySlug: async (slug) => {
    return api.get(`/destinations/${slug}`)
  },
  createDestination: async (data) => {
    return api.post('/destinations', data)
  },
  updateDestination: async (id, data) => {
    return api.put(`/destinations/${id}`, data)
  },
  deleteDestination: async (id) => {
    return api.delete(`/destinations/${id}`)
  },
}

export default destinationService
