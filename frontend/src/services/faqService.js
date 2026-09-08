import api from './api'

const faqService = {
  getAllFaqs: async () => {
    return api.get('/faqs')
  },
  createFaq: async (data) => {
    return api.post('/faqs', data)
  },
  updateFaq: async (id, data) => {
    return api.put(`/faqs/${id}`, data)
  },
  deleteFaq: async (id) => {
    return api.delete(`/faqs/${id}`)
  },
}

export default faqService
