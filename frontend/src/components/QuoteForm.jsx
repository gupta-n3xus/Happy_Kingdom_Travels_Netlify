import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { CITIES, HOTEL_CATEGORIES, BUDGET_RANGES, TRAVEL_STYLES, INTERESTS } from '../constants'
import enquiryService from '../services/enquiryService'
import { trackEvent } from '../hooks/useAnalytics'
import { createCustomTripMessage } from '../utils/createWhatsAppMessage'
import { openWhatsApp } from '../utils/createWhatsAppUrl'

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    travelFrom: '',
    travelDate: '',
    returnDate: '',
    adults: 2,
    children: 0,
    preferredPackage: '',
    hotelPreference: '',
    budgetRange: '',
    travelStyle: '',
    interests: [],
    specialRequirements: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.travelDate) {
      toast.error('Please fill in all required fields')
      return
    }

    if (loading) return
    setLoading(true)
    try {
      const whatsappMessage = createCustomTripMessage(formData)
      openWhatsApp(whatsappMessage)

      const enquiryData = {
        fullName: formData.name,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || undefined,
        email: formData.email || 'noemail@provided.com',
        travelFrom: formData.travelFrom || undefined,
        travelDate: formData.travelDate,
        returnDate: formData.returnDate || undefined,
        adults: Number(formData.adults),
        children: Number(formData.children),
        hotelPreference: formData.hotelPreference || undefined,
        budgetRange: formData.budgetRange || undefined,
        travelStyle: formData.travelStyle || undefined,
        interests: formData.interests.length > 0 ? formData.interests : undefined,
        specialRequirements: formData.specialRequirements || undefined,
        message: formData.message || undefined,
      }

      if (formData.preferredPackage && /^[a-f\d]{24}$/i.test(formData.preferredPackage)) {
        enquiryData.preferredPackage = formData.preferredPackage
      }

      await enquiryService.createEnquiry(enquiryData).catch(() => {})
      trackEvent('quote_submit', {
        source: 'custom_trip_form',
        travelStyle: formData.travelStyle || '',
        budgetRange: formData.budgetRange || '',
      })
      toast.success('WhatsApp opened with your trip details.')
      setFormData({
        name: '',
        phone: '',
        whatsappNumber: '',
        email: '',
        travelFrom: '',
        travelDate: '',
        returnDate: '',
        adults: 2,
        children: 0,
        preferredPackage: '',
        hotelPreference: '',
        budgetRange: '',
        travelStyle: '',
        interests: [],
        specialRequirements: '',
        message: '',
      })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">WhatsApp Number</label>
          <input
            type="tel"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Travelling From</label>
          <select
            name="travelFrom"
            value={formData.travelFrom}
            onChange={handleChange}
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
          <label className="block text-sm font-medium text-charcoal mb-1">Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            min={formData.travelDate || new Date().toISOString().split('T')[0]}
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
          <label className="block text-sm font-medium text-charcoal mb-1">Preferred Package</label>
          <input
            type="text"
            name="preferredPackage"
            value={formData.preferredPackage}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
            placeholder="e.g. Honeymoon Special, Family Tour"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Hotel Preference</label>
          <select
            name="hotelPreference"
            value={formData.hotelPreference}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Any</option>
            {HOTEL_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Budget Range</label>
          <select
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          >
            <option value="">Select Budget</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
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
            <option value="">Select Style</option>
            {TRAVEL_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Interests</label>
        <div className="flex flex-wrap gap-3">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                formData.interests.includes(interest)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-charcoal border-gray-200 hover:border-primary'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Special Requirements</label>
        <textarea
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          placeholder="Any dietary needs, accessibility requirements, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-warmWhite text-charcoal"
          placeholder="Tell us more about your trip plans..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-charcoal py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-charcoal mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Get My Free Quote
          </>
        )}
      </button>
    </form>
  )
}

export default QuoteForm
