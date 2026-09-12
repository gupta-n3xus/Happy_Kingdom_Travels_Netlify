import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Plane, Car, CheckCircle } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createGuideMessage } from '../../utils/createWhatsAppMessage'

const roadEntryPoints = [
  {
    name: 'Phuentsholing',
    description: 'The most popular road entry point for travellers from India, located on the border with West Bengal. Well-connected to NJP and Bagdogra.',
  },
  {
    name: 'Samtse',
    description: 'A border town in southern Bhutan, accessible from certain Indian states. Less commonly used by tourists from eastern India.',
  },
  {
    name: 'Gelephu',
    description: 'A southern border town in Bhutan, connected to the Indian state of Assam. Suitable for travellers from western and central India.',
  },
  {
    name: 'Samdrup Jongkhar',
    description: 'An eastern border town connected to the Indian state of Assam. Useful for travellers approaching from the east.',
  },
]

const comparisonRows = [
  { option: 'Road', bestFor: 'Scenic journey and travellers starting around North Bengal' },
  { option: 'Flight', bestFor: 'Faster access to Bhutan from major Indian cities' },
  { option: 'NJP/Bagdogra pickup', bestFor: 'Convenient for package travellers who want everything arranged' },
]

export default function HowToReachBhutan() {
  const BUSINESS_CONTACT = useBusinessContact();

  const faqs = [
    {
      question: 'How can I reach Bhutan from India?',
      answer: 'Bhutan can be reached from India by road through border towns like Phuentsholing, or by flight to Paro International Airport from select Indian cities.',
    },
    {
      question: 'Can I travel to Bhutan by road?',
      answer: 'Yes, several road entry points exist including Phuentsholing, Samtse, Gelephu and Samdrup Jongkhar. Phuentsholing is the most commonly used by travellers from India.',
    },
    {
      question: 'Can I fly directly to Bhutan?',
      answer: 'Yes, Paro International Airport receives flights from select Indian cities. Schedules depend on current airline operations.',
    },
    {
      question: 'How do I travel from NJP to Bhutan?',
      answer: 'From NJP Railway Station, you can travel by road to Phuentsholing (approximately 4-5 hours) and then continue into Bhutan.',
    },
    {
      question: 'How far is Bagdogra from the Bhutan border?',
      answer: 'Bagdogra Airport is approximately 3-4 hours from Phuentsholing, the main Bhutan border town.',
    },
    {
      question: `Can ${BUSINESS_CONTACT.companyName} pick me up from NJP?`,
      answer: 'Yes, for applicable packages we can arrange pickup from NJP Railway Station and coordinate onward transportation to Bhutan.',
    },
    {
      question: 'Can you pick me up from Bagdogra Airport?',
      answer: 'Yes, we can arrange pickup from Bagdogra Airport as part of your Bhutan package.',
    },
    {
      question: 'Which is better, road or flight?',
      answer: 'Road travel offers scenic views and is ideal for travellers from North Bengal. Flights provide faster access to Bhutan from major cities.',
    },
  ]

  return (
    <>
      <SEO
        title={`How to Reach Bhutan from India – Road, Flight & NJP Guide | ${BUSINESS_CONTACT.companyName}`}
        description="Learn how to reach Bhutan from India by road or flight, including practical information about NJP, Bagdogra, Phuentsholing and Paro airport."
        keywords="how to reach bhutan from india, njp to bhutan, bagdogra to bhutan, bhutan road entry, bhutan flight, travel to bhutan"
        type="article"
      />

      <section className="bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Travel Guide', path: '/travel-guide' },
              { label: 'How to Reach Bhutan' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How to Reach Bhutan from India
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl">
            Bhutan can be reached from India by both road and air. Learn about the different routes, entry points and how to plan your journey.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Reaching Bhutan by Road</h2>
        </div>
        <p className="text-gray-600 max-w-3xl mb-8">
          Bhutan has several land border entry points from India. The most commonly used by tourists is Phuentsholing, which is well-connected to the Indian states of West Bengal and Sikkim.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadEntryPoints.map((point) => (
            <div
              key={point.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{point.name}</h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">NJP / Bagdogra to Bhutan</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mb-8">
              <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700">Mumbai / Delhi / Kolkata</span>
              <span className="text-forest text-2xl font-bold">↓</span>
              <span className="px-4 py-2 bg-forest/10 rounded-lg font-medium text-forest">NJP / Bagdogra</span>
              <span className="text-forest text-2xl font-bold">↓</span>
              <span className="px-4 py-2 bg-forest/10 rounded-lg font-medium text-forest">Phuentsholing</span>
              <span className="text-forest text-2xl font-bold">↓</span>
              <span className="px-4 py-2 bg-gold/20 rounded-lg font-bold text-forest">Bhutan</span>
            </div>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
              Travellers arriving at NJP Railway Station or Bagdogra Airport can continue towards the Bhutan border by road. The journey from NJP or Bagdogra to Phuentsholing takes approximately 3-5 hours depending on traffic and road conditions.
            </p>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
              For applicable packages, {BUSINESS_CONTACT.companyName} can arrange pickup from NJP Railway Station or Bagdogra Airport and coordinate onward transportation to Bhutan.
            </p>
            <div className="text-center">
              <Link
                to="/customize-your-trip"
                className="inline-flex items-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all"
              >
                Plan My Bhutan Trip
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Reaching Bhutan by Flight</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mb-8">
            <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700">India</span>
            <Plane className="w-6 h-6 text-forest" />
            <span className="px-4 py-2 bg-forest/10 rounded-lg font-medium text-forest">Paro International Airport</span>
            <span className="text-forest text-2xl font-bold">↓</span>
            <span className="px-4 py-2 bg-forest/10 rounded-lg font-medium text-forest">Paro</span>
            <span className="text-forest text-2xl font-bold">↓</span>
            <span className="px-4 py-2 bg-gold/20 rounded-lg font-bold text-forest">Thimphu / Punakha</span>
          </div>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Paro International Airport is Bhutan&apos;s only international airport and receives flights from select Indian cities. The airport is located in a valley surrounded by mountains, making the landing a scenic experience. Direct flights and schedules depend on current airline operations, so we recommend checking availability for your travel dates.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Road vs Flight</h2>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-forest/5 border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-bold text-gray-900">Option</th>
                    <th className="text-left px-6 py-4 font-bold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.option} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.option}</td>
                      <td className="px-6 py-4 text-gray-600">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">How {BUSINESS_CONTACT.companyName} Helps</h2>
        </div>
        <p className="text-gray-600 max-w-3xl mb-8">
          Instead of arranging every part of your Bhutan journey separately, we can coordinate applicable pickup, transportation, accommodation, sightseeing and travel assistance through one package. Our team handles the logistics so you can focus on enjoying your trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/bhutan-tour-packages"
            className="inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all"
          >
            Explore Bhutan Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={createWhatsAppUrl(createGuideMessage('How to Reach Bhutan', BUSINESS_CONTACT.companyName))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="bg-gradient-to-br from-forest/95 to-forest text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Plan Your Bhutan Trip?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            From NJP or Bagdogra pickup to hotels, transportation, sightseeing and trip planning, {BUSINESS_CONTACT.companyName} can help you organize your Bhutan journey according to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/bhutan-tour-packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Explore Bhutan Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-forest transition-all"
            >
              Customize My Trip
            </Link>
            <a
              href={createWhatsAppUrl(createGuideMessage('How to Reach Bhutan', BUSINESS_CONTACT.companyName))}
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
