import { useState, useEffect, useRef } from 'react'
import { Save, Upload, X, Image } from 'lucide-react'
import settingsService from '../../services/settingsService'
import api from '../../services/api'
import { useRefreshSettings } from '../../context/SettingsContext'
import toast from 'react-hot-toast'

const AdminSettings = () => {
  const refreshSettings = useRefreshSettings()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const heroFileRef = useRef(null)
  const [formData, setFormData] = useState({
    companyName: '',
    contact: { mobile1: '', mobile2: '', whatsapp: '' },
    email: '',
    address: '',
    socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' },
    analytics: { ga4Id: '', gtmId: '' },
    seo: { defaultTitle: '', defaultDescription: '' },
    heroImage: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getSettings()
      const settings = data.data || {}
      setFormData({
        companyName: settings.companyName || '',
        contact: {
          mobile1: settings.contact?.mobile1 || settings.phone || '',
          mobile2: settings.contact?.mobile2 || '',
          whatsapp: settings.contact?.whatsapp || settings.whatsapp || '',
        },
        email: settings.email || '',
        address: settings.address || '',
        socialLinks: settings.socialLinks || { facebook: '', instagram: '', twitter: '', youtube: '' },
        analytics: settings.analytics || { ga4Id: '', gtmId: '' },
        seo: settings.seo || { defaultTitle: '', defaultDescription: '' },
        heroImage: settings.heroImage || '',
      })
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await settingsService.updateSettings(formData)
      if (refreshSettings) await refreshSettings()
      toast.success('Settings saved')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleHeroUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const result = await api.upload('/upload/image', fd)
      setFormData(prev => ({ ...prev, heroImage: result.url }))
      toast.success('Hero image uploaded')
    } catch (error) {
      toast.error(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const updateContact = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }))
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
        <h1 className="text-2xl font-bold text-charcoal">Settings</h1>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Homepage Hero Image</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
              <button type="button" onClick={() => heroFileRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50">
                {uploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <span className="text-sm text-gray-500">JPG, PNG, WebP — max 10MB</span>
            </div>
            {formData.heroImage && (
              <div className="relative inline-block">
                <img src={formData.heroImage} alt="Hero preview" className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200" />
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, heroImage: '' }))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {!formData.heroImage && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Image className="w-4 h-4" />
                <span>No hero image set — default image will be used</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Company Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Address</label>
              <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Contact Numbers</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Mobile Number 1</label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.contact.mobile1} onChange={(e) => updateContact('mobile1', e.target.value)} placeholder="+91 XXXXX XXXXX" />
              <p className="text-xs text-gray-400 mt-1">Primary contact number for calls</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Mobile Number 2 <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.contact.mobile2} onChange={(e) => updateContact('mobile2', e.target.value)} placeholder="+91 XXXXX XXXXX" />
              <p className="text-xs text-gray-400 mt-1">Secondary contact number (leave empty if not needed)</p>
            </div>
          </div>

          <h2 className="font-bold text-charcoal mb-4 mt-6 pt-6 border-t border-gray-100">WhatsApp</h2>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">WhatsApp Number</label>
            <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.contact.whatsapp} onChange={(e) => updateContact('whatsapp', e.target.value)} placeholder="91XXXXXXXXXX" />
            <p className="text-xs text-gray-400 mt-1">Country code + number without spaces (e.g. 919876543210)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Facebook URL</label>
              <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.socialLinks.facebook} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Instagram URL</label>
              <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.socialLinks.instagram} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Twitter URL</label>
              <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.socialLinks.twitter} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">YouTube URL</label>
              <input type="url" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.socialLinks.youtube} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, youtube: e.target.value } })} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Analytics</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Google Analytics 4 ID</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.analytics.ga4Id} onChange={(e) => setFormData({ ...formData, analytics: { ...formData.analytics, ga4Id: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Google Tag Manager ID</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.analytics.gtmId} onChange={(e) => setFormData({ ...formData, analytics: { ...formData.analytics, gtmId: e.target.value } })} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Default SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Default Meta Title</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.seo.defaultTitle} onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, defaultTitle: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Default Meta Description</label>
              <textarea rows="2" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.seo.defaultDescription} onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, defaultDescription: e.target.value } })}></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings
