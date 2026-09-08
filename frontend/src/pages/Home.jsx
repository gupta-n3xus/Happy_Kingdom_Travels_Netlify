import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  FileCheck,
  Building2,
  Truck,
  Camera,
  HeadphonesIcon,
  ArrowRight,
  MapPin,
  Heart,
  Users,
  Mountain,
  Gem,
  Wallet,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import SearchTripForm from '../components/SearchTripForm'
import PackageCard from '../components/PackageCard'
import DestinationCard from '../components/DestinationCard'
import CTASection from '../components/CTASection'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import packageService from '../services/packageService'
import destinationService from '../services/destinationService'
import { useBusinessContact } from '../context/SettingsContext'
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl'
import { createGeneralMessage } from '../utils/createWhatsAppMessage'

const services = [
  {
    icon: Car,
    title: 'NJP / Bagdogra Pickup',
    description: 'We arrange your arrival pickup and transfer from NJP station or Bagdogra airport to the Bhutan border.',
  },
  {
    icon: FileCheck,
    title: 'Bhutan Entry Assistance',
    description: 'Complete support with Bhutan entry permits, documentation, and border formalities handled for you.',
  },
  {
    icon: Building2,
    title: 'Hotels',
    description: 'Handpicked hotels and resorts across Bhutan, from heritage stays to luxury properties matching your preference.',
  },
  {
    icon: Truck,
    title: 'Private Transportation',
    description: 'Exclusive vehicles with experienced drivers for comfortable intercity and sightseeing travel throughout Bhutan.',
  },
  {
    icon: Camera,
    title: 'Sightseeing',
    description: 'Curated sightseeing tours to monasteries, dzongs, viewpoints, and hidden gems guided by local experts.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Local Trip Support',
    description: 'On-ground assistance throughout your trip for any adjustments, recommendations, or support you need.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Choose Your Trip',
    description: 'Browse packages or start with a custom enquiry.',
  },
  {
    number: '02',
    title: 'Customize',
    description: 'Tell us your dates, travellers, hotel preference and interests.',
  },
  {
    number: '03',
    title: 'Confirm',
    description: 'Receive your detailed quotation and confirm the trip.',
  },
  {
    number: '04',
    title: 'Travel',
    description: 'Enjoy Bhutan while our team manages the journey.',
  },
]

const placeholderDestinations = [
  {
    name: 'Paro',
    slug: 'paro',
    image: '/images/paro-hero.jpg',
    shortDescription: 'Home to the iconic Tiger\'s Nest Monastery, Paro Valley offers stunning landscapes and rich cultural heritage.',
  },
  {
    name: 'Thimphu',
    slug: 'thimphu',
    image: '/images/thimphu-hero.jpg',
    shortDescription: 'The capital city blends modern life with ancient traditions, featuring towering Buddha statues and bustling markets.',
  },
  {
    name: 'Punakha',
    slug: 'punakha',
    image: '/images/punakha-hero.jpg',
    shortDescription: 'Known for its spectacular dzong, Punakha sits at the confluence of two rivers surrounded by rice terraces.',
  },
  {
    name: 'Phuentsholing',
    slug: 'phuentsholing',
    image: '/images/phuentsholing-hero.jpg',
    shortDescription: 'The gateway to Bhutan from India, Phuentsholing offers a blend of cultures and natural beauty.',
  },
  {
    name: 'Haa Valley',
    slug: 'haa-valley',
    image: '/images/haa-valley-hero.jpg',
    shortDescription: 'A pristine valley with traditional farmhouses and ancient temples, far from the tourist crowds.',
  },
  {
    name: 'Bumthang',
    slug: 'bumthang',
    image: '/images/bumthang-hero.jpg',
    shortDescription: 'The cultural heartland of Bhutan with ancient temples and beautiful landscapes.',
  },
]

const packageTypes = [
  { icon: Heart, label: 'Honeymoon', link: '/bhutan-honeymoon-packages', color: 'from-pink-500 to-rose-500' },
  { icon: Users, label: 'Family', link: '/bhutan-family-packages', color: 'from-blue-500 to-indigo-500' },
  { icon: Users, label: 'Group', link: '/bhutan-group-packages', color: 'from-purple-500 to-violet-500' },
  { icon: Mountain, label: 'Adventure', link: '/bhutan-tour-packages', color: 'from-emerald-500 to-teal-500' },
  { icon: Gem, label: 'Luxury', link: '/bhutan-tour-packages', color: 'from-amber-500 to-orange-500' },
  { icon: Wallet, label: 'Budget', link: '/bhutan-tour-packages', color: 'from-cyan-500 to-blue-500' },
]

const cityPackages = [
  { city: 'Mumbai', link: '/bhutan-tour-from-mumbai' },
  { city: 'Delhi', link: '/bhutan-tour-from-delhi' },
  { city: 'Kolkata', link: '/bhutan-tour-from-kolkata' },
  { city: 'Bangalore', link: '/bhutan-tour-from-bangalore' },
  { city: 'Hyderabad', link: '/bhutan-tour-from-hyderabad' },
  { city: 'Chennai', link: '/bhutan-tour-from-chennai' },
]

const Home = () => {
  const BUSINESS_CONTACT = useBusinessContact();

  const [packages, setPackages] = useState([])
  const [destinations, setDestinations] = useState([])
  const [packagesLoading, setPackagesLoading] = useState(true)
  const [destinationsLoading, setDestinationsLoading] = useState(true)
  const [packagesError, setPackagesError] = useState(null)
  const [destinationsError, setDestinationsError] = useState(null)

  const fetchPackages = async () => {
    setPackagesLoading(true)
    setPackagesError(null)
    try {
      const res = await packageService.getAllPackages()
      setPackages(res.data || res.packages || [])
    } catch (err) {
      setPackagesError(err.message)
    } finally {
      setPackagesLoading(false)
    }
  }

  const fetchDestinations = async () => {
    setDestinationsLoading(true)
    setDestinationsError(null)
    try {
      const res = await destinationService.getAllDestinations()
      setDestinations(res.data || res.destinations || [])
    } catch (err) {
      setDestinationsError(err.message)
    } finally {
      setDestinationsLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
    fetchDestinations()
  }, [])

  return (
    <>
      <SEO
        title="Bhutan Tour Packages | Complete Bhutan Travel Management"
        description="Discover Bhutan with complete tour packages including hotels, transportation, sightseeing and local assistance. Customized itineraries from NJP/Bagdogra."
        keywords="Bhutan tour packages, Bhutan travel, Bhutan trip from India, Bhutan itinerary, Bhutan hotels"
      />

      {/* SECTION 1 — HERO */}
      <HeroSection
        title="Explore Bhutan. We'll Handle the Journey."
        subtitle="Complete Bhutan tour packages with hotels, transportation, sightseeing and local assistance — planned around your trip."
        backgroundImage="/images/paro-hero.jpg"
        primaryCTA={{ text: 'Explore Bhutan Packages', link: '/bhutan-tour-packages' }}
        secondaryCTA={{ text: 'Plan My Trip', link: '/customize-your-trip' }}
        showTrustIndicators={true}
      />

      {/* SECTION 2 — QUICK TRIP PLANNER */}
      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-accent font-medium">Quick & Easy</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2">
              Plan Your Bhutan Trip
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <SearchTripForm />
          </div>
        </div>
      </section>

      {/* SECTION 3 — POPULAR BHUTAN PACKAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <span className="text-accent font-medium">Curated for You</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2">
                Popular Bhutan Tour Packages
              </h2>
            </div>
            <Link
              to="/bhutan-tour-packages"
              className="mt-4 md:mt-0 text-primary font-medium hover:text-primary-light flex items-center"
            >
              View All Packages <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {packagesLoading ? (
            <LoadingState message="Loading packages..." />
          ) : packagesError ? (
            <ErrorState message="Failed to load packages." onRetry={fetchPackages} />
          ) : packages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted text-lg">No packages available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id || pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — COMPLETE TRIP MANAGEMENT */}
      <section className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium">End-to-End Service</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-4">
              You Arrive. We Handle the Rest.
            </h2>
            <p className="text-muted max-w-3xl mx-auto text-lg">
              From the moment you arrive at NJP or Bagdogra until your return journey, our team coordinates the major elements of your Bhutan trip.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium">Simple Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Four simple steps from enquiry to your Bhutan adventure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-display font-bold text-white">{step.number}</span>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — BHUTAN DESTINATIONS */}
      <section className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-medium">Discover Bhutan</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2">
              Explore Bhutan Destinations
            </h2>
          </div>

          {destinationsLoading ? (
            <LoadingState message="Loading destinations..." />
          ) : destinationsError ? (
            <ErrorState message="Failed to load destinations." onRetry={fetchDestinations} />
          ) : destinations.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderDestinations.map((dest) => (
                <DestinationCard key={dest.slug} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <DestinationCard key={dest._id || dest.slug} destination={dest} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7 — PACKAGE TYPES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-medium">Travel Your Way</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2">
              Find Your Bhutan Trip
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {packageTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <Link
                  key={index}
                  to={type.link}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-charcoal text-lg">{type.label}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8 — BHUTAN FROM YOUR CITY */}
      <section className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-medium">Pan-India Departures</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-4">
              Travelling to Bhutan from India?
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Choose your departure city and explore our tailored Bhutan packages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityPackages.map((item) => (
              <Link
                key={item.city}
                to={item.link}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-charcoal mb-1">
                    Bhutan Tour Package from {item.city}
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    Complete Bhutan trip with pickup from {item.city} and expert planning.
                  </p>
                  <span className="text-primary font-medium text-sm flex items-center group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <CTASection
        title="Ready to Explore Bhutan?"
        subtitle="Tell us your travel dates and what you want from your trip. We'll help plan the rest."
        primaryCTA={{ text: 'Plan My Bhutan Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'WhatsApp Us', link: createWhatsAppUrl(createGeneralMessage()) }}
      />
    </>
  )
}

export default Home
