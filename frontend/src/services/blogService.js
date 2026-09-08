import api from './api'

const blogService = {
  getAllPosts: async (filters = {}) => {
    return api.get('/blog', filters)
  },
  getPostBySlug: async (slug) => {
    return api.get(`/blog/${slug}`)
  },
  createPost: async (data) => {
    return api.post('/blog', data)
  },
  updatePost: async (id, data) => {
    return api.put(`/blog/${id}`, data)
  },
  deletePost: async (id) => {
    return api.delete(`/blog/${id}`)
  },
}

export default blogService
