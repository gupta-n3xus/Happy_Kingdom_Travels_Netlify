import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plane, Clock, MapPin, ArrowRight, Train, Bus, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import PackageCard from '../components/PackageCard'
import LoadingState from '../components/LoadingState'
import CTASection from '../components/CTASection'
import packageService from '../services/packageService'
import { useBusinessContact } from '../context/SettingsContext'

const CITY_DATA = {
  Mumbai: {
    tagline: 'From the City of Dreams to the Land of the Thunder Dragon',
    description: 'Escape the bustling streets of Mumbai for the serene beauty of Bhutan. Direct flights from Mumbai make it convenient to reach this Himalayan paradise.',
    departureAirport: 'Chhatrapati Shivaji Maharaj International Airport (BOM)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 2.5 hours (direct via Kolkata)',
    flightFrequency: 'Daily flights available via Kolkata',
    directFlight: false,
    viaCity: 'Kolkata',
    trainRoute: {
      available: true,
      route: 'Mumbai → New Jalpaiguri (NJP) via Mumbai-Howrah Mail or Duronto',
      duration: 'Approximately 33-36 hours',
      tip: 'Train is a budget-friendly option but takes longer. NJP is 4-5 hours by road from Phuentsholing, Bhutan border.',
    },
    busRoute: {
      available: true,
      route: 'Mumbai → Siliguri via private luxury buses',
      duration: 'Approximately 28-32 hours',
    },
    roadDistance: '2,050 km',
    recommendedDuration: '6-8 days',
    bestRoute: 'Flight to Bagdogra/Kolkata → Drive to Paro (or fly Paro directly)',
    flightCost: '₹8,000 - ₹18,000 (one way, via Kolkata)',
    nearbyEntry: 'Phuentsholing (Bhutan border) is approximately 170 km from Bagdogra',
    faq: [
      {
        q: 'Are there direct flights from Mumbai to Bhutan?',
        a: 'Currently there are no direct flights. You can fly Mumbai to Kolkata and then take a connecting flight to Paro, Bhutan. Alternatively, fly to Bagdogra and drive to the Bhutan border.',
      },
      {
        q: 'What is the cheapest way to reach Bhutan from Mumbai?',
        a: 'The most economical option is taking a train from Mumbai to NJP (New Jalpaiguri) and then traveling by road to the Bhutan border at Phuentsholing. Budget airlines also offer competitive fares via Kolkata.',
      },
      {
        q: 'How many days are needed for a Bhutan trip from Mumbai?',
        a: 'We recommend 6-8 days minimum to cover Paro, Thimphu, and Punakha comfortably. This accounts for travel time from Mumbai.',
      },
      {
        q: 'Do I need a visa to visit Bhutan from Mumbai?',
        a: 'Indian nationals need a valid photo ID (passport or voter ID). International tourists require a visa which we help process.',
      },
    ],
  },
  Delhi: {
    tagline: 'From the Capital to the Last Shangri-La',
    description: 'Begin your journey from India\'s capital to Bhutan\'s pristine valleys. Multiple flight options from Delhi make Bhutan easily accessible.',
    departureAirport: 'Indira Gandhi International Airport (DEL)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 2-2.5 hours (direct)',
    flightFrequency: 'Daily flights via Kolkata',
    directFlight: false,
    viaCity: 'Kolkata',
    trainRoute: {
      available: true,
      route: 'Delhi → New Jalpaiguri (NJP) via Rajdhani Express or Dibrugarh Rajdhani',
      duration: 'Approximately 16-20 hours',
      tip: 'Rajdhani Express is the fastest train option. NJP to Phuentsholing is about 4-5 hours by road.',
    },
    busRoute: {
      available: true,
      route: 'Delhi → Siliguri via private luxury buses',
      duration: 'Approximately 18-22 hours',
    },
    roadDistance: '1,550 km',
    recommendedDuration: '6-8 days',
    bestRoute: 'Flight to Kolkata/Bagdogra → Drive or fly to Paro',
    flightCost: '₹6,000 - ₹15,000 (one way)',
    nearbyEntry: 'Phuentsholing is approximately 170 km from Bagdogra airport',
    faq: [
      {
        q: 'Can I fly directly from Delhi to Paro?',
        a: 'There are connecting flights via Kolkata. Druk Air and Bhutan Airlines operate flights from Kolkata to Paro.',
      },
      {
        q: 'What is the best train option from Delhi?',
        a: 'The Rajdhani Express to New Jalpaiguri (NJP) is the fastest and most comfortable option, taking about 16-20 hours.',
      },
      {
        q: 'Is it better to fly or take a train?',
        a: 'Flying saves significant time. However, if you\'re budget-conscious and have time, the train journey offers scenic views of the Indian plains.',
      },
      {
        q: 'Which Bhutan cities can I visit from Delhi?',
        a: 'You can visit Paro, Thimphu, Punakha, and other western Bhutan destinations. The eastern regions require additional travel.',
      },
    ],
  },
  Kolkata: {
    tagline: 'From the City of Joy to the Happiest Country',
    description: 'Fly from Kolkata to Bhutan — one of the shortest routes to reach this Himalayan kingdom. Regular flights make it the most convenient gateway.',
    departureAirport: 'Netaji Subhas Chandra Bose International Airport (CCU)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 1-1.5 hours (direct)',
    flightFrequency: 'Multiple flights weekly',
    directFlight: true,
    viaCity: null,
    trainRoute: {
      available: true,
      route: 'Kolkata → New Jalpaiguri (NJP) via Kanchankanya Express or other trains',
      duration: 'Approximately 10-12 hours',
      tip: 'Short and scenic train ride. NJP is a major hub with good connectivity to Bhutan border.',
    },
    busRoute: {
      available: true,
      route: 'Kolkata → Siliguri via private buses',
      duration: 'Approximately 12-14 hours',
    },
    roadDistance: '980 km',
    recommendedDuration: '5-7 days',
    bestRoute: 'Direct flight to Paro, or drive via Phuentsholing',
    flightCost: '₹5,000 - ₹12,000 (one way)',
    nearbyEntry: 'Phuentsholing is approximately 170 km from Bagdogra; 530 km from Kolkata by road',
    faq: [
      {
        q: 'Are there direct flights from Kolkata to Bhutan?',
        a: 'Yes! Druk Air operates direct flights from Kolkata to Paro, making it the most convenient route to Bhutan.',
      },
      {
        q: 'How long is the flight from Kolkata to Paro?',
        a: 'The flight is approximately 1 to 1.5 hours, making it one of the shortest international flights from India.',
      },
      {
        q: 'Can I drive to Bhutan from Kolkata?',
        a: 'Yes, you can drive to Phuentsholing (Bhutan border) in approximately 12-14 hours via NH34. From there, you can enter Bhutan and continue your journey.',
      },
      {
        q: 'What is the total trip cost from Kolkata?',
        a: 'A 5-day Bhutan trip from Kolkata typically costs ₹25,000-₹60,000 per person depending on accommodation and activities.',
      },
    ],
  },
  Bangalore: {
    tagline: 'From Silicon Valley to the Himalayan Kingdom',
    description: 'Take a break from tech life and explore Bhutan\'s rich culture and natural beauty. Well-connected flights via Kolkata make the journey smooth.',
    departureAirport: 'Kempegowda International Airport (BLR)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 3.5 hours (via Kolkata)',
    flightFrequency: 'Daily flights via Kolkata',
    directFlight: false,
    viaCity: 'Kolkata',
    trainRoute: {
      available: true,
      route: 'Bangalore → New Jalpaiguri (NJP) via Guwahati Express or connecting trains',
      duration: 'Approximately 30-36 hours',
      tip: 'Long train journey. Consider flying to Kolkata first and then connecting.',
    },
    busRoute: {
      available: false,
      route: 'No direct buses available. Consider flight to Kolkata or Bagdogra.',
      duration: 'N/A',
    },
    roadDistance: '2,300 km',
    recommendedDuration: '7-9 days',
    bestRoute: 'Flight to Kolkata → Connecting flight to Paro',
    flightCost: '₹10,000 - ₹22,000 (one way, via Kolkata)',
    nearbyEntry: 'Phuentsholing is approximately 170 km from Bagdogra airport',
    faq: [
      {
        q: 'What is the best way to reach Bhutan from Bangalore?',
        a: 'The best option is to fly from Bangalore to Kolkata, then take a connecting flight to Paro. Alternatively, fly to Bagdogra and drive to the Bhutan border.',
      },
      {
        q: 'Are there direct flights from Bangalore to Bhutan?',
        a: 'No direct flights currently. You\'ll need to connect via Kolkata or another Indian city.',
      },
      {
        q: 'How long does the total journey take?',
        a: 'By air: approximately 5-6 hours total (including layover in Kolkata). By train: 30+ hours.',
      },
      {
        q: 'What is the best time to visit Bhutan from Bangalore?',
        a: 'March to May and September to November offer the best weather. Monsoon (June-August) can cause flight delays.',
      },
    ],
  },
  Hyderabad: {
    tagline: 'From the City of Pearls to the Dragon Kingdom',
    description: 'Experience the magic of Bhutan from Hyderabad. Connect via Kolkata for the best flight options and shortest travel time.',
    departureAirport: 'Rajiv Gandhi International Airport (HYD)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 3 hours (via Kolkata)',
    flightFrequency: 'Daily flights via Kolkata',
    directFlight: false,
    viaCity: 'Kolkata',
    trainRoute: {
      available: true,
      route: 'Hyderabad → New Jalpaiguri (NJP) via Sachkhand Express + connecting trains',
      duration: 'Approximately 32-38 hours',
      tip: 'Train journey is long. Flying via Kolkata is strongly recommended.',
    },
    busRoute: {
      available: false,
      route: 'No direct buses. Fly to Kolkata or Bagdogra.',
      duration: 'N/A',
    },
    roadDistance: '2,100 km',
    recommendedDuration: '7-9 days',
    bestRoute: 'Flight to Kolkata → Connecting flight to Paro',
    flightCost: '₹9,000 - ₹20,000 (one way, via Kolkata)',
    nearbyEntry: 'Phuentsholing is approximately 170 km from Bagdogra airport',
    faq: [
      {
        q: 'Can I fly directly from Hyderabad to Bhutan?',
        a: 'No direct flights. The best route is via Kolkata, which has regular flights to Paro.',
      },
      {
        q: 'What is the cheapest way to travel from Hyderabad?',
        a: 'Fly to Kolkata on a budget airline, then take a connecting flight to Paro. Train via NJP is the cheapest but takes 30+ hours.',
      },
      {
        q: 'How many days should I plan for?',
        a: '7-9 days recommended to cover travel time and explore Paro, Thimphu, Punakha, and possibly Bumthang.',
      },
      {
        q: 'What should I pack from Hyderabad?',
        a: 'Bhutan is much colder than Hyderabad. Pack warm layers, comfortable walking shoes, and rain gear regardless of season.',
      },
    ],
  },
  Chennai: {
    tagline: 'From the Gateway of South India to Bhutan',
    description: 'Discover Bhutan\'s treasures from Chennai. Well-connected flights via Kolkata make your journey comfortable and convenient.',
    departureAirport: 'Chennai International Airport (MAA)',
    destinationAirport: 'Paro International Airport (PBH)',
    flightDuration: 'Approximately 3.5 hours (via Kolkata)',
    flightFrequency: 'Daily flights via Kolkata',
    directFlight: false,
    viaCity: 'Kolkata',
    trainRoute: {
      available: true,
      route: 'Chennai → New Jalpaiguri (NJP) via Chennai-Guwahati Express or connecting trains',
      duration: 'Approximately 34-40 hours',
      tip: 'Long journey by train. Flying via Kolkata is the most practical option.',
    },
    busRoute: {
      available: false,
      route: 'No direct buses. Fly via Kolkata.',
      duration: 'N/A',
    },
    roadDistance: '2,400 km',
    recommendedDuration: '7-9 days',
    bestRoute: 'Flight to Kolkata → Connecting flight to Paro',
    flightCost: '₹10,000 - ₹24,000 (one way, via Kolkata)',
    nearbyEntry: 'Phuentsholing is approximately 170 km from Bagdogra airport',
    faq: [
      {
        q: 'What is the best route from Chennai to Bhutan?',
        a: 'Fly from Chennai to Kolkata, then take a direct flight to Paro. This is the fastest and most convenient option.',
      },
      {
        q: 'Can I take a train from Chennai?',
        a: 'Yes, trains are available to NJP but the journey takes 34-40 hours. Budget travelers can consider this option.',
      },
      {
        q: 'How long is the total travel time?',
        a: 'By air: approximately 5-7 hours (including layover). By train: 34-40 hours.',
      },
      {
        q: 'What is the weather difference between Chennai and Bhutan?',
        a: 'Bhutan is significantly cooler. Even in summer, temperatures in Paro can be 15-25°C compared to Chennai\'s 30-38°C.',
      },
    ],
  },
}

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-charcoal pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-muted pb-4 leading-relaxed">{answer}</p>
      )}
    </div>
  )
}

const CityLandingPage = ({ city }) => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  const cityInfo = CITY_DATA[city]

  useEffect(() => {
    fetchPackages()
  }, [city])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages({ city })
      setPackages(data.packages || [])
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!cityInfo) {
    return (
      <div className="min-h-screen bg-warmWhite flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
            City information coming soon
          </h2>
          <p className="text-muted mb-6">
            We're preparing travel guides for {city}. Contact us for details.
          </p>
          <Link
            to="/customize-your-trip"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            Get Custom Quote
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`Bhutan Tour Package from ${city} | Bhutan Travel from ${city}`}
        description={`Book Bhutan tour packages from ${city}. Best prices, customized itineraries, and expert guidance for your Bhutan trip from ${city}.`}
        keywords={`Bhutan tour from ${city}, Bhutan package from ${city}, Bhutan trip from ${city}, travel to Bhutan from ${city}`}
      />

      <section className="relative h-96 bg-gradient-to-r from-primary to-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/paro-hero.jpg"
            alt={`Bhutan tour from ${city}`}
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs
            items={[
              { label: 'Packages', path: '/bhutan-tour-packages' },
              { label: `From ${city}` },
            ]}
          />
          <div className="flex items-center text-white/80 mb-4">
            <Plane className="w-5 h-5 mr-2" />
            Bhutan Tour from {city}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {cityInfo.tagline}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">{cityInfo.description}</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Plane className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted text-sm">Departure</p>
                <p className="font-medium text-charcoal text-sm">{cityInfo.departureAirport}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted text-sm">Flight Duration</p>
                <p className="font-medium text-charcoal text-sm">{cityInfo.flightDuration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted text-sm">Arrival</p>
                <p className="font-medium text-charcoal text-sm">{cityInfo.destinationAirport}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted text-sm">Road Distance</p>
                <p className="font-medium text-charcoal text-sm">{cityInfo.roadDistance}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  How to Reach Bhutan from {city}
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-100 rounded-xl p-6">
                    <h3 className="font-display text-lg font-bold text-charcoal mb-3 flex items-center">
                      <Plane className="w-5 h-5 mr-2 text-primary" />
                      By Air
                    </h3>
                    <p className="text-muted mb-3">
                      {cityInfo.directFlight
                        ? `Direct flights are available from ${city} to Paro International Airport. ${cityInfo.flightFrequency}.`
                        : `Fly from ${city} to ${cityInfo.viaCity} and take a connecting flight to Paro International Airport, Bhutan. ${cityInfo.flightFrequency}.`
                      }
                    </p>
                    <p className="text-sm text-primary font-medium">
                      Estimated one-way fare: {cityInfo.flightCost}
                    </p>
                  </div>

                  {cityInfo.trainRoute.available && (
                    <div className="border border-gray-100 rounded-xl p-6">
                      <h3 className="font-display text-lg font-bold text-charcoal mb-3 flex items-center">
                        <Train className="w-5 h-5 mr-2 text-green-500" />
                        By Train
                      </h3>
                      <p className="text-muted mb-2">{cityInfo.trainRoute.route}</p>
                      <p className="text-muted text-sm mb-2">Duration: {cityInfo.trainRoute.duration}</p>
                      <p className="text-sm text-muted italic">{cityInfo.trainRoute.tip}</p>
                    </div>
                  )}

                  {cityInfo.busRoute.available && (
                    <div className="border border-gray-100 rounded-xl p-6">
                      <h3 className="font-display text-lg font-bold text-charcoal mb-3 flex items-center">
                        <Bus className="w-5 h-5 mr-2 text-amber-500" />
                        By Road
                      </h3>
                      <p className="text-muted mb-2">{cityInfo.busRoute.route}</p>
                      <p className="text-muted text-sm">Duration: {cityInfo.busRoute.duration}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-primary/5 rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-charcoal mb-3">
                    Recommended Journey Structure
                  </h3>
                  <p className="text-muted">
                    <strong>{city} → Bagdogra/Kolkata → Bhutan</strong>
                  </p>
                  <p className="text-muted mt-2">
                    {cityInfo.bestRoute}. Recommended trip duration: <strong>{cityInfo.recommendedDuration}</strong> to cover Paro, Thimphu, and Punakha comfortably.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Tour Packages from {city}
                </h2>

                {loading ? (
                  <LoadingState message="Loading packages..." />
                ) : packages.length === 0 ? (
                  <div className="text-center py-12 bg-warmWhite rounded-xl">
                    <MapPin className="w-12 h-12 text-muted mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                      Packages Coming Soon
                    </h3>
                    <p className="text-muted mb-4">
                      We're curating special packages from {city}. Contact us for personalized options.
                    </p>
                    <Link
                      to="/customize-your-trip"
                      className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
                    >
                      Get Custom Quote <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packages.map((pkg) => (
                      <PackageCard key={pkg._id} pkg={pkg} />
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-primary" />
                  Frequently Asked Questions from {city}
                </h2>
                <div>
                  {cityInfo.faq.map((item, index) => (
                    <FaqItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-display text-xl font-bold text-charcoal mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-muted text-sm">From {city}</span>
                    <span className="font-medium text-charcoal text-sm">{cityInfo.roadDistance}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-muted text-sm">Flight Time</span>
                    <span className="font-medium text-charcoal text-sm">{cityInfo.flightDuration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-muted text-sm">Trip Duration</span>
                    <span className="font-medium text-charcoal text-sm">{cityInfo.recommendedDuration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-muted text-sm">Best Route</span>
                    <span className="font-medium text-charcoal text-sm">Via {cityInfo.viaCity || 'Direct'}</span>
                  </div>
                </div>
                <Link
                  to="/customize-your-trip"
                  className="block w-full bg-accent text-charcoal text-center py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors mt-6"
                >
                  Get Free Quote
                </Link>
                <a
                  href={BUSINESS_CONTACT.phoneLink}
                  className="block w-full border-2 border-primary text-primary text-center py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors mt-3"
                >
                  Call: {BUSINESS_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready to Travel from ${city}?`}
        subtitle="Let us handle everything from flights to hotels to sightseeing."
        primaryCTA={{ text: 'Customize Your Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'Contact Us', link: '/contact' }}
      />
    </>
  )
}

export default CityLandingPage
