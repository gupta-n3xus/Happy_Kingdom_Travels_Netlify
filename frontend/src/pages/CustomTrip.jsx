import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CheckCircle, Phone, MessageCircle, HelpCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import QuoteForm from '../components/QuoteForm'
import { useBusinessContact } from '../context/SettingsContext'
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl'
import { createGeneralMessage } from '../utils/createWhatsAppMessage'

const steps = [
  {
    number: '1',
    title: 'Share Your Preferences',
    description: 'Fill out the form with your travel dates, group size, interests, and any special requirements.',
  },
  {
    number: '2',
    title: 'Receive Your Custom Itinerary',
    description: 'Our travel experts will design a personalized Bhutan itinerary based on your preferences within 24 hours.',
  },
  {
    number: '3',
    title: 'Refine & Confirm',
    description: 'Review the proposed itinerary, make adjustments, and confirm your booking with a simple payment process.',
  },
  {
    number: '4',
    title: 'Travel with Confidence',
    description: 'Enjoy complete trip management with 24/7 support, seamless logistics, and unforgettable experiences.',
  },
]

const CustomTrip = () => {
  const BUSINESS_CONTACT = useBusinessContact()
  return (
    <>
      <SEO
        title="Customize Your Bhutan Trip | Build Your Perfect Itinerary"
        description="Design your dream Bhutan trip. Share your preferences and we'll create a personalized itinerary with transparent pricing and expert guidance."
        keywords="custom Bhutan trip, tailor-made Bhutan tour, personalized Bhutan itinerary, Bhutan trip planner"
      />

      <section className="relative h-64 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Custom Trip' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Build Your Bhutan Trip
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Tell us your vision and we'll craft the perfect Bhutan experience
          </p>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                  Tell Us About Your Dream Trip
                </h2>
                <p className="text-muted mb-6">
                  Fill in as much detail as possible so we can create the perfect itinerary for you.
                </p>
                <QuoteForm />
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold text-charcoal mb-4">Need Immediate Help?</h3>
                <div className="space-y-4">
                  <a
                    href={BUSINESS_CONTACT.phoneLink}
                    className="flex items-center text-muted hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    {BUSINESS_CONTACT.phone}
                  </a>
                  <a
                    href={createWhatsAppUrl(createGeneralMessage(BUSINESS_CONTACT.companyName))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-muted hover:text-green-500 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-4">What Happens Next?</h3>
                <ul className="space-y-3 text-white/90 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 mr-3 shrink-0" />
                    <span>Our travel expert will contact you within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 mr-3 shrink-0" />
                    <span>You'll receive a detailed, personalized itinerary</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 mr-3 shrink-0" />
                    <span>Unlimited revisions until you're satisfied</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 mr-3 shrink-0" />
                    <span>No booking until you approve the itinerary</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">Frequently Asked</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-charcoal text-sm">Is there any charge for the quote?</p>
                    <p className="text-muted text-sm">No, quotes are completely free.</p>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">How quickly will I hear back?</p>
                    <p className="text-muted text-sm">Within 24 hours, usually sooner.</p>
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">Can I modify after booking?</p>
                    <p className="text-muted text-sm">Yes, subject to availability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CustomTrip
