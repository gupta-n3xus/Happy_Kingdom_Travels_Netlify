import api from './api'

const galleryService = {
  getGallery: async (filters = {}) => {
    return api.get('/gallery', filters)
  },
  getAllGallery: async (filters = {}) => {
    return api.get('/gallery/all', filters)
  },
  createGalleryItem: async (data) => {
    return api.post('/gallery', data)
  },
  updateGalleryItem: async (id, data) => {
    return api.put(`/gallery/${id}`, data)
  },
  deleteGalleryItem: async (id) => {
    return api.delete(`/gallery/${id}`)
  },
  approveGalleryItem: async (id) => {
    return api.put(`/gallery/${id}/approve`)
  },
  uploadGalleryImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.upload('/upload/gallery-image', formData)
  },
  uploadGalleryImages: async (files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return api.upload('/upload/gallery-images', formData)
  },
  addComment: async (galleryId, data) => {
    return api.post(`/gallery/${galleryId}/comments`, data)
  },
  deleteComment: async (galleryId, commentId) => {
    return api.delete(`/gallery/${galleryId}/comments/${commentId}`)
  }
}

export default galleryService
