import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Sun, CloudRain, Snowflake, Leaf, Calendar } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createGuideMessage } from '../../utils/createWhatsAppMessage'

const seasons = [
  {
    title: 'Spring',
    months: 'March to May',
    icon: Sun,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    highlights: [
      'Pleasant weather with moderate temperatures',
      'Beautiful rhododendrons and wildflowers in bloom',
      'Lush green landscapes across valleys',
      'Ideal for photography and sightseeing',
      'Perfect for outdoor experiences and trekking',
    ],
  },
  {
    title: 'Summer / Monsoon',
    months: 'June to August',
    icon: CloudRain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    highlights: [
      'Lush, vibrant green landscapes',
      'Monsoon rains in southern and eastern regions',
      'Possible road delays due to rainfall',
      'Fewer tourists at popular destinations',
      'Flexible planning needed for weather conditions',
    ],
  },
  {
    title: 'Autumn',
    months: 'September to November',
    icon: Leaf,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    highlights: [
      'Comfortable weather with clear skies',
      'Excellent mountain views and visibility',
      'Popular travel period with pleasant conditions',
      'Ideal for photography and sightseeing',
      'Festivals and cultural events in full swing',
    ],
  },
  {
    title: 'Winter',
    months: 'December to February',
    icon: Snowflake,
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    highlights: [
      'Cold temperatures, especially at higher altitudes',
      'Quieter atmosphere with fewer tourists',
      'Popular destinations like Thimphu and Paro accessible',
      'Warm clothing essential for comfortable travel',
      'Unique winter landscapes and clear mountain views',
    ],
  },
]

const seasonRecommendations = [
  { type: 'Honeymoon', period: 'Spring (March to May) or Autumn (September to November)' },
  { type: 'Family', period: 'Spring (March to May) or Autumn (September to November)' },
  { type: 'Photography', period: 'Spring (March to May) or Autumn (September to November)' },
  { type: 'Mountain views', period: 'Autumn (September to November)' },
  { type: 'Quiet holiday', period: 'Winter (December to February)' },
  { type: 'Nature lovers', period: 'Spring (March to May)' },
]

const faqs = [
  {
    question: 'What is the best month to visit Bhutan?',
    answer: 'March to May and September to November are generally considered the best periods for Bhutan travel.',
  },
  {
    question: 'Is March a good time to visit Bhutan?',
    answer: 'Yes, March marks the beginning of spring with pleasant weather and blooming flowers.',
  },
  {
    question: 'Is Bhutan good to visit in summer?',
    answer: 'Bhutan can be visited in summer, though monsoon rains may affect road travel in some areas.',
  },
  {
    question: 'Does it rain in Bhutan during monsoon?',
    answer: 'Yes, monsoon brings rain particularly in southern and eastern regions. Western Bhutan tends to be drier.',
  },
  {
    question: 'Is autumn good for Bhutan?',
    answer: 'Autumn is one of the most popular seasons with clear skies, comfortable temperatures and excellent mountain views.',
  },
  {
    question: 'Is Bhutan worth visiting in winter?',
    answer: 'Yes, winter offers a quieter experience with fewer tourists. Popular destinations like Thimphu and Paro are accessible.',
  },
  {
    question: 'Which season is best for honeymoon?',
    answer: 'Spring and autumn are recommended for honeymoon couples with pleasant weather and beautiful scenery.',
  },
  {
    question: 'Which season is best for families?',
    answer: 'Spring and autumn offer the most comfortable conditions for family travel with children.',
  },
]

export default function BestTimeToVisit() {
  const BUSINESS_CONTACT = useBusinessContact();

  return (
    <>
      <SEO
        title="Best Time to Visit Bhutan – Weather, Seasons & Guide | Happy Kingdom Travels"
        description="Discover the best time to visit Bhutan. Learn about spring, summer, autumn and winter seasons with weather details, travel tips and recommendations for every type of traveller."
        keywords="best time to visit Bhutan, Bhutan seasons, Bhutan weather, Bhutan travel season, when to visit Bhutan, Bhutan monsoon, Bhutan winter, Bhutan spring"
        type="website"
      />

      <section className="relative bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Travel Guide', path: '/travel-guide' },
              { label: 'Best Time to Visit' },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Best Time to Visit Bhutan
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-8">
            Bhutan is a year-round destination with each season offering its own charm. Whether you prefer blooming flowers in spring, lush greenery in monsoon, crisp mountain views in autumn, or a quiet winter escape, there is always a good time to visit the Land of the Thunder Dragon.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Seasons in Bhutan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {seasons.map((season) => {
            const Icon = season.icon
            return (
              <div
                key={season.title}
                className={`${season.bgColor} rounded-2xl p-6 lg:p-8 border ${season.borderColor} transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-12 h-12 ${season.iconBg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${season.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{season.title}</h3>
                    <p className="text-sm text-gray-500">{season.months}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {season.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Which Season Is Best for You?</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mb-8">
            The best time to visit Bhutan depends on what kind of trip you are planning. Here is a quick guide to help you choose the right season for your travel style.
          </p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="px-6 py-4 text-left font-semibold">Traveller Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Recommended Period</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonRecommendations.map((rec, idx) => (
                    <tr
                      key={rec.type}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{rec.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rec.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">
            These are general recommendations, not guarantees.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Season Timeline</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-pink-100 rounded-xl p-5 text-center border border-pink-200">
            <p className="text-sm font-bold text-pink-700">MAR–MAY</p>
            <p className="text-lg font-bold text-pink-800 mt-1">SPRING 🌸</p>
          </div>
          <div className="flex-1 bg-blue-100 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-sm font-bold text-blue-700">JUN–AUG</p>
            <p className="text-lg font-bold text-blue-800 mt-1">MONSOON 🌧️</p>
          </div>
          <div className="flex-1 bg-orange-100 rounded-xl p-5 text-center border border-orange-200">
            <p className="text-sm font-bold text-orange-700">SEP–NOV</p>
            <p className="text-lg font-bold text-orange-800 mt-1">AUTUMN 🍂</p>
          </div>
          <div className="flex-1 bg-indigo-100 rounded-xl p-5 text-center border border-indigo-200">
            <p className="text-sm font-bold text-indigo-700">DEC–FEB</p>
            <p className="text-lg font-bold text-indigo-800 mt-1">WINTER ❄️</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="w-8 h-8 text-forest" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Already Have Your Travel Dates?</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Tell us when you&apos;re travelling and we&apos;ll help you choose an itinerary suitable for that time of year.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25"
            >
              Get My Bhutan Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest border-2 border-forest px-8 py-3.5 rounded-xl font-bold hover:bg-forest/5 transition-all"
            >
              Customize My Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </section>

      <section className="bg-forest text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Plan Your Bhutan Trip?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you want a fixed package or a customized itinerary, we are here to help you plan the perfect Bhutan holiday.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/bhutan-tour-packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Explore Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-white/90 transition-all"
            >
              Customize Trip
            </Link>
            <a
              href={createWhatsAppUrl(createGuideMessage('Best Time to Visit Bhutan'))}
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
