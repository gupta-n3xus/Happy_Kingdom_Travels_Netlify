import { useState } from 'react'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { DURATIONS, TRAVEL_STYLES } from '../constants'
import { STATES, STATE_CITIES } from '../data/states'
import enquiryService from '../services/enquiryService'
import { createTripPlannerMessage } from '../utils/createWhatsAppMessage'
import { openWhatsApp } from '../utils/createWhatsAppUrl'
import { getClientInfoSync, fetchGeoInBackground, getCachedGeo } from '../utils/clientInfo'

const SearchTripForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    travelDate: '',
    adults: 2,
    children: 0,
    duration: '',
    customDuration: '',
    travelStyle: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      if (name === 'state') {
        newData.city = ''
      }
      if (name === 'duration' && value !== 'custom') {
        newData.customDuration = ''
      }
      return newData
    })
  }

  const cities = formData.state ? (STATE_CITIES[formData.state] || []) : []

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.state || !formData.city || !formData.travelDate || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    if (loading) return
    setLoading(true)
    try {
      const finalDuration = formData.duration === 'custom' ? formData.customDuration : formData.duration
      const whatsappMessage = createTripPlannerMessage(formData)
      openWhatsApp(whatsappMessage)

      fetchGeoInBackground()
      const clientInfo = getClientInfoSync()

      await enquiryService.createEnquiry({
        fullName: formData.fullName || 'Trip Search',
        phone: formData.phone,
        email: formData.email || 'pending@pending.com',
        travelFrom: `${formData.city}, ${formData.state}`,
        travelDate: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        preferredDuration: finalDuration || undefined,
        travelStyle: formData.travelStyle || undefined,
        message: `Duration: ${finalDuration || 'Any'}, Style: ${formData.travelStyle || 'Any'}`,
        source: 'trip_planner',
        ...clientInfo,
      }).then((res) => {
        const geo = getCachedGeo()
        if (geo && res?.data?._id) {
          fetch('/api/enquiries/geo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: res.data._id, ipAddress: geo.ipAddress, location: geo.location }),
          }).catch(() => {})
        }
      }).catch((err) => {
        console.error('Enquiry submit failed:', err)
      })

      toast.success('WhatsApp opened with your trip details.')
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        travelDate: '',
        adults: 2,
        children: 0,
        duration: '',
        customDuration: '',
        travelStyle: '',
      })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Mobile Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="e.g. 9876543210"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. you@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Select State</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">City *</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={!formData.state}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Travel Date *</label>
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Adults</label>
          <input
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleChange}
            min={1}
            max={20}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Children</label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            min={0}
            max={10}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Preferred Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Any Duration</option>
            {DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {formData.duration === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Custom Duration *</label>
            <input
              type="text"
              name="customDuration"
              value={formData.customDuration}
              onChange={handleChange}
              required
              placeholder="e.g. 3N/4D, 10 days, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Travel Style</label>
          <select
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Any Style</option>
            {TRAVEL_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-accent text-charcoal py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2" />
            Getting Your Quote...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Get My Bhutan Quote
          </>
        )}
      </button>
    </form>
  )
}

export default SearchTripForm
