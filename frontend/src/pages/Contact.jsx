import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import enquiryService from '../services/enquiryService'
import { useBusinessContact } from '../context/SettingsContext'
import { trackEvent } from '../hooks/useAnalytics'
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl'
import { createContactMessage } from '../utils/createWhatsAppMessage'

const Contact = () => {
  const BUSINESS_CONTACT = useBusinessContact()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await enquiryService.createEnquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Subject: ${formData.subject}\n${formData.message}`,
      })
      trackEvent('enquiry_submit', {
        source: 'contact_page',
        subject: formData.subject || 'general',
      })
      toast.success('Thank you! Your enquiry has been received. We\'ll get back to you shortly.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      window.open(createWhatsAppUrl(createContactMessage(formData.subject || 'general enquiry', BUSINESS_CONTACT.companyName)), '_blank')
    } catch (error) {
      toast.error('Sorry, we couldn\'t submit your enquiry. Please try again or contact us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const phoneDetails = [];
  if (BUSINESS_CONTACT.mobile1) phoneDetails.push(BUSINESS_CONTACT.mobile1);
  if (BUSINESS_CONTACT.mobile2) phoneDetails.push(BUSINESS_CONTACT.mobile2);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: phoneDetails.length > 0 ? phoneDetails : [BUSINESS_CONTACT.phone],
      link: BUSINESS_CONTACT.phoneLink,
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [BUSINESS_CONTACT.email],
      link: `mailto:${BUSINESS_CONTACT.email}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: BUSINESS_CONTACT.address.split(', ').length > 1
        ? [BUSINESS_CONTACT.address.split(', ').slice(0, 2).join(', ') + ',', BUSINESS_CONTACT.address.split(', ').slice(2).join(', ')]
        : [BUSINESS_CONTACT.address],
      link: BUSINESS_CONTACT.mapsUrl,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 10:00 AM - 7:00 PM', 'Sunday: 11:00 AM - 5:00 PM'],
      link: null,
    },
  ]

  return (
    <>
      <SEO
        title="Contact Us | Get Your Bhutan Trip Quote"
        description="Contact us for booking Bhutan tour packages, enquiries, and customized itineraries. We're here to help plan your perfect Bhutan trip."
        keywords="contact Bhutan travels, Bhutan tour enquiry, Bhutan trip quote"
      />

      <section className="relative h-64 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">
            We'd love to hear from you. Let's plan your Bhutan adventure!
          </p>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Package inquiry, Custom trip"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your travel plans..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-light transition-colors flex items-center disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-sm ${info.link ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`}
                >
                  {info.link ? (
                    <a href={info.link} className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted text-sm">{detail}</p>
                        ))}
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal mb-1">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <a
                href={createWhatsAppUrl(createContactMessage('general enquiry', BUSINESS_CONTACT.companyName))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                className="block bg-green-500 text-white rounded-2xl p-6 shadow-sm hover:bg-green-600 transition-colors"
              >
                <div className="flex items-center">
                  <MessageCircle className="w-8 h-8 mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp Us</h3>
                    <p className="text-white/80 text-sm">Quick response guaranteed</p>
                  </div>
                </div>
              </a>

              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-4">Prefer a Call?</h3>
                <p className="text-white/80 mb-4">
                  Leave your number and we'll call you back within 30 minutes during business hours.
                </p>
                <a
                  href={BUSINESS_CONTACT.phoneLink}
                  className="block w-full bg-accent text-charcoal text-center py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                >
                  Call Now: {BUSINESS_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-8">Find Us</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4298.772516784102!2d89.3816424302067!3d26.853299158557977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1788341693943!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Our Office Location"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
