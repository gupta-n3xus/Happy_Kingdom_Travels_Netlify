import { useState, useEffect, useRef, useCallback } from 'react'
import { Upload, Star, X, ChevronLeft, ChevronRight, Loader2, ImageIcon, Send, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import CTASection from '../components/CTASection'
import galleryService from '../services/galleryService'
import toast from 'react-hot-toast'
import { formatDate } from '../utils/helpers'

const CATEGORIES = ['All', 'Paro', 'Thimphu', 'Punakha', 'Bumthang', 'Other']
const PAGE_SIZE = 8

const Gallery = () => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [feedbackItems, setFeedbackItems] = useState([])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const [formData, setFormData] = useState({
    title: '',
    touristName: '',
    touristCity: '',
    rating: 5,
    caption: '',
    category: 'Paro'
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentSubmitting, setCommentSubmitting] = useState(false)

  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)
  const fileInputRef = useRef(null)

  const fetchGallery = useCallback(async (pageNum, category, append = false) => {
    if (append) setLoadingMore(true)
    else setLoading(true)

    try {
      const filters = { page: pageNum, limit: PAGE_SIZE }
      if (category !== 'All') filters.category = category

      const data = await galleryService.getGallery(filters)
      const newItems = data.data || []
      const pagination = data.pagination || {}

      if (append) {
        setItems(prev => [...prev, ...newItems])
      } else {
        setItems(newItems)
      }

      setHasMore(pageNum < pagination.totalPages)
    } catch (err) {
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const fetchFeedbackItems = useCallback(async () => {
    try {
      const data = await galleryService.getGallery({ page: 1, limit: 50 })
      const allItems = data.data || []
      const withFeedback = allItems.filter(item => item.caption && item.caption.trim())
      setFeedbackItems(withFeedback)
    } catch (err) {
      // silent
    }
  }, [])

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    setItems([])
    fetchGallery(1, activeCategory, false)
    fetchFeedbackItems()
  }, [activeCategory, fetchGallery, fetchFeedbackItems])

  useEffect(() => {
    if (page > 1) {
      fetchGallery(page, activeCategory, true)
    }
  }, [page, activeCategory, fetchGallery])

  useEffect(() => {
    if (loading || loadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    observerRef.current = observer

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [loading, loadingMore, hasMore])

  const handleFileSelect = (e) => {
    let files = Array.from(e.target.files)
    if (files.length > 5) {
      toast.error('Maximum 5 photos allowed')
      return
    }
    files = files.filter(file => file.size <= 10 * 1024 * 1024)
    if (files.length !== files.originalLength) {
      toast.error('Each photo must be less than 10MB')
      // Remove files that exceed 10MB
      files = files.filter(file => file.size <= 10 * 1024 * 1024)
    }
    setSelectedFiles(files)
    const newUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newUrls])
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.touristName.trim()) {
      toast.error('Please fill in title and your name')
      return
    }

    setSubmitting(true)
    try {
      if (selectedFiles.length === 0) {
        toast.error('Please upload at least one photo')
        setSubmitting(false)
        return
      }

      setUploading(true)
      const uploadData = await galleryService.uploadGalleryImages(selectedFiles)
      
      const { data } = await galleryService.createGalleryItem({
        images: uploadData.images,
        title: formData.title.trim(),
        caption: formData.caption.trim(),
        touristName: formData.touristName.trim(),
        touristCity: formData.touristCity.trim(),
        rating: formData.rating,
        category: formData.category
      })
      
      toast.success(data.message || 'Thank you! Your experience has been shared.')

      setFormData({ title: '', touristName: '', touristCity: '', rating: 5, caption: '', category: 'Paro' })
      setSelectedFiles([])
      setPreviewUrls([])

      setPage(1)
      setHasMore(true)
      fetchGallery(1, activeCategory, false)
      fetchFeedbackItems()
    } catch (err) {
      toast.error(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  const openLightbox = (index) => {
    setActiveIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const handleAddComment = async () => {
    if (!commentName.trim() || !commentText.trim()) {
      toast.error('Please enter your name and comment')
      return
    }
    const item = items[activeIndex]
    if (!item) return

    setCommentSubmitting(true)
    try {
      const res = await galleryService.addComment(item._id, {
        name: commentName.trim(),
        text: commentText.trim(),
      })
      setItems(prev => prev.map((it, i) => {
        if (i !== activeIndex) return it
        return { ...it, comments: [...(it.comments || []), res.data] }
      }))
      setCommentName('')
      setCommentText('')
      toast.success('Comment added!')
    } catch (err) {
      toast.error(err.message || 'Failed to add comment')
    } finally {
      setCommentSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Gallery | Tourist Experiences & Photos from Bhutan"
        description="Browse photos and experiences shared by our happy travelers. See real moments from Bhutan tours."
        keywords="Bhutan tour gallery, Bhutan travel photos, tourist experiences Bhutan"
      />

      <section className="relative h-64 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-white/80">
            Real experiences from our happy travelers
          </p>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-primary" />
              Share Your Experience
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Tiger's Nest Trek"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.touristName}
                    onChange={(e) => setFormData(prev => ({ ...prev, touristName: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Your City</label>
                  <input
                    type="text"
                    value={formData.touristCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, touristCity: e.target.value }))}
                    placeholder="e.g. Mumbai"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Destination</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= formData.rating
                            ? 'text-accent fill-accent'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Your Feedback</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Upload Photos *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {previewUrls.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors w-full justify-center"
                  >
                    <ImageIcon className="w-8 h-8 text-muted" />
                    <div className="text-left">
                      <p className="font-medium text-charcoal">Click to upload photos</p>
                      <p className="text-sm text-muted">JPG, PNG, WebP or GIF (max 5 photos, each max 10MB)</p>
                    </div>
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading photo...
                  </>
                ) : submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Share Your Experience
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {feedbackItems.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">What Travelers Say</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {feedbackItems.map((item) => (
                <div
                  key={item._id}
                  className="min-w-[320px] max-w-[320px] bg-warmWhite rounded-2xl p-6 snap-start shrink-0"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-charcoal mb-4 leading-relaxed line-clamp-4">"{item.caption}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.touristName}
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{item.touristName}</p>
                      <p className="text-xs text-muted">
                        {item.touristCity && `${item.touristCity} · `}
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-muted hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="break-inside-avoid bg-gray-200 rounded-xl animate-pulse" style={{ height: `${200 + Math.random() * 150}px` }} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-muted text-lg">No gallery items yet. Be the first to share!</p>
            </div>
          ) : (
            <>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {items.map((item, index) => (
                  <button
                    key={item._id}
                    onClick={() => openLightbox(index)}
                    className="break-inside-avoid block w-full group relative rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      style={{ minHeight: '150px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm">{item.title}</p>
                        {item.touristName && (
                          <p className="text-white/80 text-xs mt-1">by {item.touristName}</p>
                        )}
                        {item.comments?.length > 0 && (
                          <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {item.comments.length}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  {loadingMore && (
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {lightboxOpen && items.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 p-2"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 text-white/80 hover:text-white transition-colors z-10 p-2 bg-black/40 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 text-white/80 hover:text-white transition-colors z-10 p-2 bg-black/40 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <img
              src={items[activeIndex]?.image}
              alt={items[activeIndex]?.title}
              className="max-w-full max-h-[55vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{items[activeIndex]?.title}</p>
              {items[activeIndex]?.touristName && (
                <p className="text-white/70 text-sm mt-1">
                  by {items[activeIndex]?.touristName}
                  {items[activeIndex]?.touristCity && `, ${items[activeIndex].touristCity}`}
                </p>
              )}
            </div>

            <div className="mt-4 w-full max-w-lg bg-white/10 backdrop-blur-md rounded-xl p-4 max-h-[25vh] overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm font-medium">
                  Comments ({items[activeIndex]?.comments?.length || 0})
                </span>
              </div>

              {items[activeIndex]?.comments?.length > 0 ? (
                <div className="space-y-3 mb-3">
                  {items[activeIndex].comments.map((c) => (
                    <div key={c._id} className="bg-white/10 rounded-lg p-3">
                      <p className="text-white text-sm font-medium">{c.name}</p>
                      <p className="text-white/80 text-sm mt-1">{c.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-sm mb-3">No comments yet. Be the first!</p>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/40 outline-none focus:border-white/40"
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/40 outline-none focus:border-white/40"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  disabled={commentSubmitting}
                  className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors disabled:opacity-50"
                >
                  {commentSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      )}

      <CTASection />
    </>
  )
}

export default Gallery
