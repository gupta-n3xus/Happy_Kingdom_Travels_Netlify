import api from './api'

const enquiryService = {
  createEnquiry: async (data) => {
    return api.post('/enquiries', data)
  },
  getAllEnquiries: async (filters = {}) => {
    return api.get('/enquiries', filters)
  },
  getEnquiryById: async (id) => {
    return api.get(`/enquiries/${id}`)
  },
  updateEnquiryStatus: async (id, status) => {
    return api.put(`/enquiries/${id}`, { status })
  },
  deleteEnquiry: async (id) => {
    return api.delete(`/enquiries/${id}`)
  },
}

export default enquiryService
