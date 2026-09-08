import api from './api'

const reviewService = {
  getApprovedReviews: async (filters = {}) => {
    return api.get('/reviews', filters)
  },
  getAllReviews: async () => {
    return api.get('/reviews/all')
  },
  createReview: async (data) => {
    return api.post('/reviews', data)
  },
  updateReview: async (id, data) => {
    return api.put(`/reviews/${id}`, data)
  },
  deleteReview: async (id) => {
    return api.delete(`/reviews/${id}`)
  },
  approveReview: async (id) => {
    return api.put(`/reviews/${id}/approve`)
  },
}

export default reviewService
