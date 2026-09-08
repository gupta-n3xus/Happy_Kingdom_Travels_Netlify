import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import settingsService from '../../services/settingsService'
import toast from 'react-hot-toast'

const AdminSettings = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    socialLinks: { facebook: '', instagram: '', twitter: '' },
    analytics: { ga4Id: '', gtmId: '' },
    seo: { defaultTitle: '', defaultDescription: '' },
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
        phone: settings.phone || '',
        whatsapp: settings.whatsapp || '',
        email: settings.email || '',
        address: settings.address || '',
        socialLinks: settings.socialLinks || { facebook: '', instagram: '', twitter: '' },
        analytics: settings.analytics || { ga4Id: '', gtmId: '' },
        seo: settings.seo || { defaultTitle: '', defaultDescription: '' },
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
      toast.success('Settings saved')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
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
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-charcoal mb-4">Business Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Company Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">WhatsApp</label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
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
