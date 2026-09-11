import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Plus, X, Upload, Image, Link } from 'lucide-react'
import packageService from '../../services/packageService'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminPackageEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    destination: 'Bhutan',
    shortDescription: '',
    description: '',
    duration: { nights: 5, days: 6 },
    startingPrice: '',
    showPrice: false,
    currency: 'INR',
    packageType: 'standard',
    travelStyle: 'comfort',
    heroImage: '',
    images: [],
    route: [],
    startingPoints: [],
    tripHighlights: [],
    suitableFor: [],
    inclusions: [],
    exclusions: [],
    optionalActivities: [],
    itinerary: [],
    accommodation: [],
    faq: [],
    seo: { title: '', description: '', keywords: [] },
    published: true,
    featured: false,
  })
  const [heroImageMode, setHeroImageMode] = useState('url')
  const [galleryImageMode, setGalleryImageMode] = useState('url')
  const [uploading, setUploading] = useState(false)
  const heroFileRef = useRef(null)
  const galleryFileRef = useRef(null)

  useEffect(() => {
    if (id) fetchPackage()
  }, [id])

  const fetchPackage = async () => {
    setLoading(true)
    try {
      const data = await api.get(`/packages/admin/${id}`)
      const pkg = data.data
      setFormData({
        title: pkg.title || '',
        destination: pkg.destination || 'Bhutan',
        shortDescription: pkg.shortDescription || '',
        description: pkg.description || '',
        duration: pkg.duration || { nights: 5, days: 6 },
        startingPrice: pkg.pricing?.startingFrom || pkg.startingPrice || '',
        showPrice: pkg.pricing?.showPrice || false,
        currency: pkg.pricing?.currency || pkg.currency || 'INR',
        packageType: pkg.category || pkg.packageType || 'standard',
        travelStyle: pkg.travelStyle || 'comfort',
        heroImage: pkg.heroImage || '',
        images: pkg.images || [],
        route: pkg.route || [],
        startingPoints: pkg.startingPoints || [],
        tripHighlights: pkg.tripHighlights || [],
        suitableFor: pkg.suitableFor || [],
        inclusions: (pkg.inclusions || []).map(item => typeof item === 'string' ? { text: item } : item),
        exclusions: (pkg.exclusions || []).map(item => typeof item === 'string' ? { text: item } : item),
        optionalActivities: pkg.optionalActivities || [],
        itinerary: pkg.itinerary || [],
        accommodation: pkg.accommodation || [],
        faq: (pkg.faq || pkg.faqs || []).map(f => ({ question: f.question, answer: f.answer })),
        seo: pkg.seo ? { title: pkg.seo.metaTitle || '', description: pkg.seo.metaDescription || '', keywords: pkg.seo.keywords || [] } : { title: '', description: '', keywords: [] },
        published: pkg.status === 'active' || pkg.published,
        featured: pkg.featured || false,
      })
    } catch (error) {
      toast.error('Failed to fetch package')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file, field) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const result = await api.upload('/upload/image', fd)
      if (field === 'heroImage') {
        setFormData(prev => ({ ...prev, heroImage: result.url }))
      } else if (field === 'images') {
        setFormData(prev => ({ ...prev, images: [...prev.images, result.url] }))
      }
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleHeroFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file, 'heroImage')
  }

  const handleGalleryFileChange = (e) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => handleImageUpload(file, 'images'))
    }
  }

  const removeGalleryImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        title: formData.title,
        destination: formData.destination,
        shortDescription: formData.shortDescription,
        description: formData.description,
        duration: {
          nights: Number(formData.duration.nights),
          days: Number(formData.duration.days),
        },
        category: formData.packageType,
        travelStyle: formData.travelStyle,
        heroImage: formData.heroImage,
        images: formData.images,
        route: formData.route,
        startingPoints: formData.startingPoints,
        tripHighlights: formData.tripHighlights,
        suitableFor: formData.suitableFor,
        inclusions: formData.inclusions.map(item => typeof item === 'string' ? item : item.text),
        exclusions: formData.exclusions.map(item => typeof item === 'string' ? item : item.text),
        optionalActivities: formData.optionalActivities,
        itinerary: formData.itinerary,
        accommodation: formData.accommodation,
        faq: formData.faq,
        seo: {
          metaTitle: formData.seo.title,
          metaDescription: formData.seo.description,
          keywords: formData.seo.keywords,
        },
        pricing: {
          startingFrom: Number(formData.startingPrice),
          currency: formData.currency,
          priceType: 'on_request',
          showPrice: formData.showPrice,
        },
        status: formData.published ? 'active' : 'draft',
        featured: formData.featured,
      }
      if (id) {
        await packageService.updatePackage(id, payload)
        toast.success('Package updated successfully')
      } else {
        await packageService.createPackage(payload)
        toast.success('Package created successfully')
      }
      navigate('/admin/packages')
    } catch (error) {
      toast.error(error.message || 'Failed to save package')
    } finally {
      setSaving(false)
    }
  }

  const addInclusion = () => {
    setFormData({ ...formData, inclusions: [...formData.inclusions, { text: '' }] })
  }

  const updateInclusion = (index, value) => {
    const updated = [...formData.inclusions]
    updated[index] = { text: value }
    setFormData({ ...formData, inclusions: updated })
  }

  const removeInclusion = (index) => {
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, i) => i !== index) })
  }

  const addExclusion = () => {
    setFormData({ ...formData, exclusions: [...formData.exclusions, { text: '' }] })
  }

  const updateExclusion = (index, value) => {
    const updated = [...formData.exclusions]
    updated[index] = { text: value }
    setFormData({ ...formData, exclusions: updated })
  }

  const removeExclusion = (index) => {
    setFormData({ ...formData, exclusions: formData.exclusions.filter((_, i) => i !== index) })
  }

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, {
        dayNumber: formData.itinerary.length + 1,
        title: '',
        description: '',
        locations: [],
        activities: [],
        meals: { breakfast: false, lunch: false, dinner: false },
        overnightAt: '',
        hotel: '',
        distance: '',
        travelTime: '',
      }],
    })
  }

  const updateItineraryDay = (index, field, value) => {
    const updated = [...formData.itinerary]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, itinerary: updated })
  }

  const removeItineraryDay = (index) => {
    const updated = formData.itinerary.filter((_, i) => i !== index)
    updated.forEach((day, i) => { day.dayNumber = i + 1 })
    setFormData({ ...formData, itinerary: updated })
  }

  const addHotel = () => {
    setFormData({
      ...formData,
      accommodation: [...formData.accommodation, { location: '', hotelName: '', category: '3-star', roomType: '', nights: '' }],
    })
  }

  const updateHotel = (index, field, value) => {
    const updated = [...formData.accommodation]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, accommodation: updated })
  }

  const removeHotel = (index) => {
    setFormData({ ...formData, accommodation: formData.accommodation.filter((_, i) => i !== index) })
  }

  const addFaq = () => {
    setFormData({ ...formData, faq: [...formData.faq, { question: '', answer: '' }] })
  }

  const updateFaq = (index, field, value) => {
    const updated = [...formData.faq]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, faq: updated })
  }

  const removeFaq = (index) => {
    setFormData({ ...formData, faq: formData.faq.filter((_, i) => i !== index) })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/admin/packages')} className="mr-4 text-muted hover:text-charcoal">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-charcoal">{id ? 'Edit Package' : 'New Package'}</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Package'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Title</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Short Description</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Full Description</label>
                <textarea rows="6" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Hero Image</label>
                <div className="flex gap-2 mb-2">
                  <button type="button" onClick={() => setHeroImageMode('url')} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${heroImageMode === 'url' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    <Link className="w-3.5 h-3.5" /> URL
                  </button>
                  <button type="button" onClick={() => setHeroImageMode('upload')} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${heroImageMode === 'upload' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                </div>
                {heroImageMode === 'url' ? (
                  <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" placeholder="https://example.com/image.jpg" value={formData.heroImage} onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })} />
                ) : (
                  <div>
                    <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={handleHeroFileChange} />
                    <button type="button" onClick={() => heroFileRef.current?.click()} disabled={uploading} className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary transition-colors">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      ) : (
                        <>
                          <Image className="w-8 h-8 mx-auto text-muted mb-2" />
                          <p className="text-sm text-muted">Click to upload hero image</p>
                          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP up to 10MB</p>
                        </>
                      )}
                    </button>
                  </div>
                )}
                {formData.heroImage && (
                  <div className="mt-2 relative">
                    <img src={formData.heroImage} alt="Hero preview" className="w-full h-40 object-cover rounded-lg" />
                    <button type="button" onClick={() => setFormData({ ...formData, heroImage: '' })} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X className="w-3 h-3" /></button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Gallery Images</label>
                <div className="flex gap-2 mb-2">
                  <button type="button" onClick={() => setGalleryImageMode('url')} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${galleryImageMode === 'url' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    <Link className="w-3.5 h-3.5" /> URL
                  </button>
                  <button type="button" onClick={() => setGalleryImageMode('upload')} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${galleryImageMode === 'upload' ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200'}`}>
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                </div>
                {galleryImageMode === 'url' ? (
                  <div className="flex gap-2">
                    <input type="url" id="galleryUrlInput" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" placeholder="https://example.com/image.jpg" />
                    <button type="button" onClick={() => { const input = document.getElementById('galleryUrlInput'); if (input.value) { setFormData(prev => ({ ...prev, images: [...prev.images, input.value] })); input.value = ''; } }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light">Add</button>
                  </div>
                ) : (
                  <div>
                    <input ref={galleryFileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryFileChange} />
                    <button type="button" onClick={() => galleryFileRef.current?.click()} disabled={uploading} className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary transition-colors">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 mx-auto text-muted mb-1" />
                          <p className="text-sm text-muted">Click to upload gallery images</p>
                          <p className="text-xs text-gray-400 mt-1">Select multiple files at once</p>
                        </>
                      )}
                    </button>
                  </div>
                )}
                {formData.images.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                        <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Inclusions</h2>
              <button type="button" onClick={addInclusion} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.inclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item.text || item} onChange={(e) => updateInclusion(index, e.target.value)} placeholder="e.g., Hotel accommodation" />
                  <button type="button" onClick={() => removeInclusion(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Exclusions</h2>
              <button type="button" onClick={addExclusion} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.exclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item.text || item} onChange={(e) => updateExclusion(index, e.target.value)} placeholder="e.g., Flights" />
                  <button type="button" onClick={() => removeExclusion(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Trip Highlights</h2>
              <button type="button" onClick={() => setFormData({ ...formData, tripHighlights: [...formData.tripHighlights, ''] })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.tripHighlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.tripHighlights]; u[index] = e.target.value; setFormData({ ...formData, tripHighlights: u }); }} placeholder="e.g., Tiger's Nest visit" />
                  <button type="button" onClick={() => setFormData({ ...formData, tripHighlights: formData.tripHighlights.filter((_, i) => i !== index) })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Suitable For</h2>
              <button type="button" onClick={() => setFormData({ ...formData, suitableFor: [...formData.suitableFor, ''] })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.suitableFor.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.suitableFor]; u[index] = e.target.value; setFormData({ ...formData, suitableFor: u }); }} placeholder="e.g., Couples, Families" />
                  <button type="button" onClick={() => setFormData({ ...formData, suitableFor: formData.suitableFor.filter((_, i) => i !== index) })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Itinerary</h2>
              <button type="button" onClick={addItineraryDay} className="text-primary text-sm font-medium hover:text-primary-light">+ Add Day</button>
            </div>
            <div className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-primary">Day {day.dayNumber}</span>
                    <button type="button" onClick={() => removeItineraryDay(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                  </div>
                  <input type="text" placeholder="Day title" className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-primary" value={day.title} onChange={(e) => updateItineraryDay(index, 'title', e.target.value)} />
                  <textarea placeholder="Day description" rows="2" className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-primary" value={day.description} onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}></textarea>

                  <div className="mb-2">
                    <label className="block text-xs font-medium text-muted mb-1">Activities (comma separated)</label>
                    <input type="text" placeholder="e.g. Dzong visit, Market shopping, Tiger's Nest hike" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={(day.activities || []).join(', ')} onChange={(e) => updateItineraryDay(index, 'activities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-medium text-muted mb-1">Locations (comma separated)</label>
                    <input type="text" placeholder="e.g. Paro Dzong, Tiger's Nest" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={(day.locations || []).join(', ')} onChange={(e) => updateItineraryDay(index, 'locations', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                  </div>

                  <div className="mb-2">
                    <label className="block text-xs font-medium text-muted mb-1">Meals</label>
                    <div className="flex gap-4">
                      {['breakfast', 'lunch', 'dinner'].map((meal) => (
                        <label key={meal} className="flex items-center gap-1.5 text-sm text-charcoal cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" checked={day.meals?.[meal] || false} onChange={(e) => updateItineraryDay(index, 'meals', { ...day.meals, [meal]: e.target.checked })} />
                          {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Overnight at" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={day.overnightAt || day.hotel || ''} onChange={(e) => { updateItineraryDay(index, 'overnightAt', e.target.value); updateItineraryDay(index, 'hotel', e.target.value); }} />
                    <input type="text" placeholder="Distance" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={day.distance || ''} onChange={(e) => updateItineraryDay(index, 'distance', e.target.value)} />
                    <input type="text" placeholder="Travel time" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={day.travelTime || ''} onChange={(e) => updateItineraryDay(index, 'travelTime', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Accommodation</h2>
              <button type="button" onClick={addHotel} className="text-primary text-sm font-medium hover:text-primary-light">+ Add Hotel</button>
            </div>
            <div className="space-y-4">
              {formData.accommodation.map((hotel, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-charcoal">Hotel {index + 1}</span>
                    <button type="button" onClick={() => removeHotel(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Hotel name" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={hotel.hotelName || ''} onChange={(e) => updateHotel(index, 'hotelName', e.target.value)} />
                    <input type="text" placeholder="Location" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={hotel.location || ''} onChange={(e) => updateHotel(index, 'location', e.target.value)} />
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={hotel.category || '3-star'} onChange={(e) => updateHotel(index, 'category', e.target.value)}>
                      <option value="budget">Budget</option>
                      <option value="3-star">3-Star</option>
                      <option value="4-star">4-Star</option>
                      <option value="5-star">5-Star</option>
                      <option value="luxury">Luxury</option>
                    </select>
                    <input type="text" placeholder="Room type" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={hotel.roomType || ''} onChange={(e) => updateHotel(index, 'roomType', e.target.value)} />
                    <input type="number" min="1" placeholder="Number of Nights" className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary" value={hotel.nights || ''} onChange={(e) => updateHotel(index, 'nights', Number(e.target.value))} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">FAQs</h2>
              <button type="button" onClick={addFaq} className="text-primary text-sm font-medium hover:text-primary-light">+ Add FAQ</button>
            </div>
            <div className="space-y-4">
              {formData.faq.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-charcoal">FAQ {index + 1}</span>
                    <button type="button" onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                  </div>
                  <input type="text" placeholder="Question" className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-primary" value={faq.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} />
                  <textarea placeholder="Answer" rows="2" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={faq.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)}></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Pricing & Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.showPrice} onChange={(e) => setFormData({ ...formData, showPrice: e.target.checked })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="text-sm font-medium text-charcoal">Show Price on Website</span>
              </div>
              {formData.showPrice && (
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Starting Price (₹)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.startingPrice} onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Destination</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="e.g., Bhutan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Nights</label>
                  <input type="number" min="1" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.duration.nights} onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, nights: Number(e.target.value) } })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Days</label>
                  <input type="number" min="1" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.duration.days} onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, days: Number(e.target.value) } })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Package Type</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.packageType} onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}>
                  <option value="standard">Standard</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="family">Family</option>
                  <option value="group">Group</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Travel Style</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.travelStyle} onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}>
                  <option value="budget">Budget</option>
                  <option value="comfort">Comfort</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className="text-sm font-medium text-charcoal">Featured Package</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Route</h2>
              <button type="button" onClick={() => setFormData({ ...formData, route: [...formData.route, ''] })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.route.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.route]; u[index] = e.target.value; setFormData({ ...formData, route: u }); }} placeholder="e.g., Paro → Thimphu → Punakha" />
                  <button type="button" onClick={() => setFormData({ ...formData, route: formData.route.filter((_, i) => i !== index) })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Starting Points</h2>
              <button type="button" onClick={() => setFormData({ ...formData, startingPoints: [...formData.startingPoints, ''] })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.startingPoints.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.startingPoints]; u[index] = e.target.value; setFormData({ ...formData, startingPoints: u }); }} placeholder="e.g., Bagdogra Airport" />
                  <button type="button" onClick={() => setFormData({ ...formData, startingPoints: formData.startingPoints.filter((_, i) => i !== index) })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-charcoal">Optional Activities</h2>
              <button type="button" onClick={() => setFormData({ ...formData, optionalActivities: [...formData.optionalActivities, ''] })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
            </div>
            <div className="space-y-2">
              {formData.optionalActivities.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.optionalActivities]; u[index] = e.target.value; setFormData({ ...formData, optionalActivities: u }); }} placeholder="e.g., River Rafting" />
                  <button type="button" onClick={() => setFormData({ ...formData, optionalActivities: formData.optionalActivities.filter((_, i) => i !== index) })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Meta Title</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.seo.title} onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, title: e.target.value } })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Meta Description</label>
                <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.seo.description} onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, description: e.target.value } })}></textarea>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-charcoal">Keywords</label>
                  <button type="button" onClick={() => setFormData({ ...formData, seo: { ...formData.seo, keywords: [...formData.seo.keywords, ''] } })} className="text-primary text-sm font-medium hover:text-primary-light">+ Add</button>
                </div>
                <div className="space-y-2">
                  {formData.seo.keywords.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={item} onChange={(e) => { const u = [...formData.seo.keywords]; u[index] = e.target.value; setFormData({ ...formData, seo: { ...formData.seo, keywords: u } }); }} placeholder="e.g., bhutan tour packages" />
                      <button type="button" onClick={() => setFormData({ ...formData, seo: { ...formData.seo, keywords: formData.seo.keywords.filter((_, i) => i !== index) } })} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-charcoal mb-4">Settings</h2>
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
              <span className="ml-2 text-sm text-charcoal">Published</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminPackageEditor
