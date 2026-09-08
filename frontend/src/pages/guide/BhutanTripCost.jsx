import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, CheckCircle, XCircle, HelpCircle, IndianRupee, Users, Calendar, Hotel, Car, Eye, FileText } from 'lucide-react'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createGuideMessage } from '../../utils/createWhatsAppMessage'

const costFactors = [
  {
    icon: Hotel,
    title: 'Accommodation',
    description: 'Hotel category significantly impacts trip cost. Options range from budget stays to premium resorts. Higher-star hotels and unique heritage properties cost more.',
  },
  {
    icon: Car,
    title: 'Transportation',
    description: 'Ground transport for sightseeing, airport transfers and intercity travel varies based on vehicle type. Private vehicles cost more than shared options.',
  },
  {
    icon: Eye,
    title: 'Sightseeing',
    description: 'Entry fees to monuments, monasteries and museums, plus guided tours, add to the overall cost. Some experiences and activities have separate charges.',
  },
  {
    icon: FileText,
    title: 'Government Charges',
    description: 'Sustainable Development Fee (SDF) and other applicable government taxes are part of the Bhutan travel cost structure for international visitors.',
  },
]

const durationComparison = [
  {
    duration: '4N / 5D',
    suitable: 'Short holidays, first-time visitors with limited time, couples',
  },
  {
    duration: '5N / 6D',
    suitable: 'Balanced trip covering key highlights with comfortable pacing',
  },
  {
    duration: '6N / 7D',
    suitable: 'One of the most popular and balanced itineraries for first-time visitors',
  },
  {
    duration: '7N / 8D',
    suitable: 'A relaxed itinerary with additional sightseeing and leisure time',
  },
]

const includedItems = [
  'Hotel accommodation on double sharing basis',
  'Daily breakfast at the hotel',
  'All ground transportation for sightseeing and transfers',
  'Experienced driver for the entire trip',
  'All applicable parking and toll charges',
  'Sightseeing as per the planned itinerary',
  'Guide services where applicable',
  'All applicable permits and entry fees',
]

const notIncludedItems = [
  'Train or flight tickets to and from Bhutan',
  'Personal expenses like shopping, tips and laundry',
  'Meals other than those specified in the package',
  'Optional activities and adventure sports',
  'Travel insurance',
  'Anything not explicitly mentioned in the package inclusions',
]

const faqs = [
  {
    question: 'How much does a Bhutan trip from India cost?',
    answer: 'The cost depends on several factors including number of travellers, duration, hotel category, transportation and activities. Contact us for a personalized quotation.',
  },
  {
    question: 'What affects the cost of a Bhutan tour?',
    answer: 'Accommodation category, transportation type, number of nights, sightseeing, guide services and government charges all influence the final cost.',
  },
  {
    question: 'Is hotel accommodation included?',
    answer: 'Yes, accommodation is typically included in our packages. The hotel category can be customized based on your preference.',
  },
  {
    question: 'Is transportation included?',
    answer: 'Ground transportation for sightseeing and transfers is included in applicable packages.',
  },
  {
    question: 'Is SDF included in the package?',
    answer: 'SDF charges, where applicable, will be clearly mentioned in your quotation.',
  },
  {
    question: 'Can I customize my Bhutan package?',
    answer: 'Yes, we specialize in custom itineraries. Tell us your requirements and we\'ll prepare a personalized plan.',
  },
  {
    question: 'Does the cost change for solo travellers?',
    answer: 'Solo travellers may have different per-person costs compared to groups. Contact us for solo traveller pricing.',
  },
  {
    question: 'Is Bhutan cheaper for groups?',
    answer: 'Group travel can reduce per-person costs due to shared transportation and accommodation arrangements.',
  },
  {
    question: 'Can I get a personalized Bhutan quotation?',
    answer: 'Absolutely. Share your travel dates, group size and preferences and our team will prepare a detailed quotation.',
  },
]

export default function BhutanTripCost() {
  const BUSINESS_CONTACT = useBusinessContact();

  return (
    <>
      <SEO
        title="Bhutan Trip Cost from India – Complete Guide | Happy Kingdom Travels"
        description="Planning a Bhutan trip from India? Understand the complete cost breakdown including accommodation, transportation, sightseeing, government charges and get a personalized quotation."
        keywords="bhutan trip cost, bhutan tour cost from india, bhutan travel cost, bhutan trip cost from india, bhutan package cost, bhutan tour cost"
        type="website"
      />

      <section className="relative bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Travel Guide', path: '/travel-guide' },
              { label: 'Bhutan Trip Cost' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Bhutan Trip Cost from India
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-8">
            The cost of a Bhutan trip depends on multiple factors including the number of travellers, duration of stay, hotel category, transportation and sightseeing preferences. Here&apos;s a detailed guide to help you understand what goes into the cost and how to plan within your budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan Trip Cost'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote on WhatsApp
            </a>
            <Link
              to="/customize-your-trip"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
            >
              Customize My Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            What Determines Bhutan Trip Cost?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {costFactors.map((factor) => {
            const Icon = factor.icon
            return (
              <div
                key={factor.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{factor.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{factor.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Duration Comparison
            </h2>
          </div>
          <p className="text-gray-600 max-w-3xl mb-10">
            Different trip durations suit different travel styles. Choose the one that fits your schedule and preferences.
          </p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-forest/5 border-b border-gray-100">
                    <th className="px-6 py-4 text-sm font-bold text-gray-900">Duration</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-900">Suitable For</th>
                  </tr>
                </thead>
                <tbody>
                  {durationComparison.map((item, index) => (
                    <tr
                      key={item.duration}
                      className={`border-b border-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-forest" />
                          <span className="font-semibold text-gray-900">{item.duration}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.suitable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            What Is Included in a Bhutan Package?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {includedItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              What Is Usually Not Included?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notIncludedItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <IndianRupee className="w-8 h-8 text-gold" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Want to know exactly how much your Bhutan trip will cost?
            </h2>
          </div>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Every trip is different. Share your travel dates, group size and preferences and we&apos;ll prepare a personalized quotation with a clear cost breakdown.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan Trip Cost'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-forest" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Ready to Plan Your Bhutan Trip?
            </h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you want a fixed package or a fully customized itinerary, we&apos;re here to help you plan the perfect Bhutan trip within your budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/bhutan-tour-packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25"
            >
              <Eye className="w-5 h-5" />
              Explore Packages
            </Link>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Customize Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={createWhatsAppUrl(createGuideMessage('Bhutan Trip Cost'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
