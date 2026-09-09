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
  uploadGalleryImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.upload('/upload/gallery-image', formData)
  }
}

export default galleryService
