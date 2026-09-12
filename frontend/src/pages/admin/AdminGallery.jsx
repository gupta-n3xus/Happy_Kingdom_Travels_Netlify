import { useState, useEffect, useRef } from 'react'
import { Plus, Edit, Trash2, X, Star, Upload, Loader2, ImageIcon, MessageCircle } from 'lucide-react'
import galleryService from '../../services/galleryService'
import { useAuth } from '../../context/AuthContext'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const CATEGORIES = ['Paro', 'Thimphu', 'Punakha', 'Bumthang', 'Other']

const AdminGallery = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const canEdit = isAdmin || user?.permissions?.includes('gallery:edit')
  const canDelete = isAdmin || user?.permissions?.includes('gallery:delete')
  const canApprove = isAdmin || user?.permissions?.includes('gallery:approve')
  const canUpload = isAdmin || user?.permissions?.includes('gallery:upload')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [removedImages, setRemovedImages] = useState([])
  const [expandedComments, setExpandedComments] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    touristName: '',
    touristCity: '',
    rating: 5,
    caption: '',
    category: 'Paro',
    image: '',
    order: 0
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const data = await galleryService.getAllGallery()
      setItems(data.data || [])
    } catch (error) {
      console.error('Failed to fetch gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      touristName: '',
      touristCity: '',
      rating: 5,
      caption: '',
      category: 'Paro',
      image: '',
      order: 0
    })
    setPreviewUrl(null)
    setSelectedFile(null)
    setRemovedImages([])
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      touristName: item.touristName || '',
      touristCity: item.touristCity || '',
      rating: item.rating || 5,
      caption: item.caption || '',
      category: item.category || 'Other',
      image: item.image || '',
      order: item.order || 0
    })
    setPreviewUrl(null)
    setSelectedFile(null)
    setRemovedImages([])
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setPreviewUrl(null)
    setSelectedFile(null)
    setRemovedImages([])
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.touristName.trim()) {
      toast.error('Please fill in title and tourist name')
      return
    }

    setSaving(true)
    try {
      let imageUrl = formData.image

      if (selectedFile) {
        setUploading(true)
        const uploadData = await galleryService.uploadGalleryImage(selectedFile)
        imageUrl = uploadData.url
        setUploading(false)
      }

      if (!imageUrl) {
        toast.error('Please upload an image')
        setSaving(false)
        return
      }

      const payload = {
        ...formData,
        image: imageUrl
      }

      if (editingItem) {
        const currentImages = (editingItem.images?.length > 0 ? editingItem.images : (editingItem.image ? [editingItem.image] : []))
          .filter(img => !removedImages.includes(img))
        if (selectedFile) {
          payload.images = [...currentImages, imageUrl]
          payload.image = payload.images[0]
        } else {
          payload.images = currentImages
          payload.image = currentImages[0] || imageUrl
        }
        await galleryService.updateGalleryItem(editingItem._id, payload)
        toast.success('Gallery item updated')
      } else {
        await galleryService.createGalleryItem(payload)
        toast.success('Gallery item created')
      }

      closeModal()
      fetchItems()
    } catch (err) {
      toast.error(err.message || 'Failed to save')
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return
    try {
      await galleryService.deleteGalleryItem(id)
      toast.success('Gallery item deleted')
      fetchItems()
    } catch (error) {
      toast.error('Failed to delete gallery item')
    }
  }

  const handleToggleApproval = async (id, currentApproved) => {
    try {
      if (isAdmin) {
        await galleryService.updateGalleryItem(id, { approved: !currentApproved })
        toast.success(currentApproved ? 'Item removed from public gallery' : 'Item approved and now public')
      } else {
        await galleryService.approveGalleryItem(id)
        toast.success('Item approved and now public')
      }
      fetchItems()
    } catch (error) {
      toast.error('Failed to update approval status')
    }
  }

  const handleDeleteComment = async (galleryId, commentId) => {
    if (!window.confirm('Delete this comment?')) return
    try {
      await galleryService.deleteComment(galleryId, commentId)
      setItems(prev => prev.map(it => {
        if (it._id !== galleryId) return it
        return { ...it, comments: it.comments.filter(c => c._id !== commentId) }
      }))
      toast.success('Comment deleted')
    } catch (err) {
      toast.error(err.message || 'Failed to delete comment')
    }
  }

  const filteredItems = (filter === 'All' ? items : items.filter(i => i.category === filter))
    .filter(i => statusFilter === 'all' || (statusFilter === 'approved' && i.approved) || (statusFilter === 'pending' && !i.approved))

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-charcoal">Gallery</h1>
        {canUpload && (
          <button
            onClick={openCreateModal}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === cat
                ? 'bg-primary text-white'
                : 'bg-white text-muted hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'approved'].map((status) => {
          const count = status === 'all' ? items.length : items.filter(i => i.approved === (status === 'approved')).length
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Tourist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Comments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-muted">
                    No gallery items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12">
                        {(item.images?.length > 0 ? item.images : (item.image ? [item.image] : [])).length > 2 && (
                          <img
                            src={(item.images?.length > 0 ? item.images : [item.image])[2]}
                            alt=""
                            className="absolute top-0 left-2 w-12 h-12 rounded-lg object-cover border border-gray-200 opacity-40"
                          />
                        )}
                        {(item.images?.length > 0 ? item.images : (item.image ? [item.image] : [])).length > 1 && (
                          <img
                            src={(item.images?.length > 0 ? item.images : [item.image])[1]}
                            alt=""
                            className="absolute top-0 left-1 w-12 h-12 rounded-lg object-cover border border-gray-200 opacity-70"
                          />
                        )}
                        <img
                          src={(item.images?.length > 0 ? item.images : (item.image ? [item.image] : ['']))[0]}
                          alt={item.title}
                          className="relative w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-charcoal">{item.title}</p>
                      {item.caption && (
                        <p className="text-sm text-muted truncate max-w-xs">{item.caption}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-charcoal">{item.touristName}</p>
                      {item.touristCity && (
                        <p className="text-sm text-muted">{item.touristCity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted text-sm">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <button
                        onClick={() => setExpandedComments(expandedComments === item._id ? null : item._id)}
                        className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {item.comments?.length || 0}
                      </button>
                      {expandedComments === item._id && item.comments?.length > 0 && (
                        <div className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-72 max-h-60 overflow-y-auto">
                          <p className="text-xs font-medium text-muted mb-2">Comments</p>
                          <div className="space-y-2">
                            {item.comments.map((c) => (
                              <div key={c._id} className="flex items-start justify-between gap-2 bg-gray-50 rounded-lg p-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-charcoal truncate">{c.name}</p>
                                  <p className="text-xs text-muted truncate">{c.text}</p>
                                </div>
                                {canDelete && (
                                  <button
                                    onClick={() => handleDeleteComment(item._id, c._id)}
                                    className="shrink-0 p-1 text-muted hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                    title="Delete comment"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {item.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {canApprove && (
                          <button
                            onClick={() => handleToggleApproval(item._id, item.approved)}
                            className={`p-2 rounded-lg transition-colors ${
                              item.approved
                                ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-50'
                                : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                            }`}
                            title={item.approved ? 'Remove from public' : 'Approve and make public'}
                          >
                            {item.approved ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        )}
                        {canEdit && (
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-charcoal">
                {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-muted hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g. Tiger's Nest Visit"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Tourist Name *</label>
                  <input
                    type="text"
                    value={formData.touristName}
                    onChange={(e) => setFormData(prev => ({ ...prev, touristName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Tourist City</label>
                  <input
                    type="text"
                    value={formData.touristCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, touristCity: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Rating</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'text-accent fill-accent'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Feedback / Caption</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  placeholder="Tourist feedback text..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">Images *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/heic,image/heif,image/jxl,image/svg+xml,image/avif"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {editingItem && (
                  <div className="mb-3">
                    <p className="text-xs text-muted mb-2">Current images:</p>
                    <div className="flex gap-2 flex-wrap">
                      {(editingItem.images?.length > 0 ? editingItem.images : (editingItem.image ? [editingItem.image] : [])).map((img, idx) => (
                        removedImages.includes(img) ? null : (
                          <div key={idx} className="relative inline-block">
                            <img
                              src={img}
                              alt={`${editingItem.title} ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => setRemovedImages(prev => [...prev, img])}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      ))}
                      {removedImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setRemovedImages([])}
                          className="text-xs text-primary hover:underline self-center"
                        >
                          Restore removed
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {previewUrl ? (
                  <div>
                    <p className="text-xs text-muted mb-2">New image:</p>
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null)
                          setPreviewUrl(null)
                          if (fileInputRef.current) fileInputRef.current.value = ''
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 px-6 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors w-full justify-center"
                  >
                    <ImageIcon className="w-6 h-6 text-muted" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-charcoal">Click to upload</p>
                      <p className="text-xs text-muted">JPG, PNG, WebP, GIF, HEIC, JPEG XL, SVG or AVIF (max 10MB)</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 text-muted hover:text-charcoal font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : editingItem ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGallery
