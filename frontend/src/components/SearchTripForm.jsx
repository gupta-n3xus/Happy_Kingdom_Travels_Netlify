import { useState } from 'react'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { CITIES, DURATIONS, TRAVEL_STYLES } from '../constants'
import enquiryService from '../services/enquiryService'
import { createTripPlannerMessage } from '../utils/createWhatsAppMessage'
import { openWhatsApp } from '../utils/createWhatsAppUrl'

const SearchTripForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    travelFrom: '',
    travelDate: '',
    adults: 2,
    children: 0,
    duration: '',
    travelStyle: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.travelFrom || !formData.travelDate || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    if (loading) return
    setLoading(true)
    try {
      await enquiryService.createEnquiry({
        fullName: formData.fullName || 'Trip Search',
        phone: formData.phone,
        email: formData.email || 'pending@pending.com',
        travelFrom: formData.travelFrom,
        travelDate: formData.travelDate,
        adults: Number(formData.adults),
        children: Number(formData.children),
        preferredDuration: formData.duration || undefined,
        travelStyle: formData.travelStyle || undefined,
        message: `Duration: ${formData.duration || 'Any'}, Style: ${formData.travelStyle || 'Any'}`,
        source: 'trip_planner',
      })

      const whatsappMessage = createTripPlannerMessage(formData)
      openWhatsApp(whatsappMessage)

      toast.success('Enquiry submitted! WhatsApp opened with your trip details.')
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        travelFrom: '',
        travelDate: '',
        adults: 2,
        children: 0,
        duration: '',
        travelStyle: '',
      })
    } catch {
      toast.error('We couldn\'t submit your trip request. Please try again or contact us on WhatsApp.')
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
          <label className="block text-sm font-medium text-charcoal mb-1">Travel From *</label>
          <select
            name="travelFrom"
            value={formData.travelFrom}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Select City</option>
            {CITIES.map((city) => (
              <option key={city.slug} value={city.name}>
                {city.name}
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
