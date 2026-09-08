import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import PackageCard from '../components/PackageCard'
import LoadingState from '../components/LoadingState'
import CTASection from '../components/CTASection'
import packageService from '../services/packageService'

const HoneymoonPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages({ category: 'honeymoon' })
      setPackages(data.data || data.packages || [])
    } catch (error) {
      console.error('Failed to fetch honeymoon packages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Bhutan Honeymoon Packages | Romantic Getaways in Bhutan"
        description="Create magical memories with our Bhutan honeymoon packages. Romantic stays, private tours, and exclusive experiences for couples in the Land of the Thunder Dragon."
        keywords="Bhutan honeymoon packages, romantic Bhutan tour, Bhutan couples trip, honeymoon in Bhutan"
      />

      <section className="relative h-96 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/pkg-royal.jpg"
            alt="Romantic Bhutan landscape"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Honeymoon Packages' }]} />
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 mr-3 fill-white" />
            <span className="text-white/80 text-lg">Romantic Escapes</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Bhutan Honeymoon Packages
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Begin your journey together in the land of happiness. Romantic retreats, stunning mountain views, and intimate experiences await.
          </p>
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <p className="font-display text-2xl font-bold text-pink-500">Romantic</p>
              <p className="text-muted text-sm">Handpicked Stays</p>
            </div>
            <div className="p-4">
              <p className="font-display text-2xl font-bold text-pink-500">Private</p>
              <p className="text-muted text-sm">Exclusive Experiences</p>
            </div>
            <div className="p-4">
              <p className="font-display text-2xl font-bold text-pink-500">Memorable</p>
              <p className="text-muted text-sm">Forever Moments</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Romantic Getaways in Bhutan
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Handpicked honeymoon experiences designed for couples seeking romance and adventure
            </p>
          </div>

          {loading ? (
            <LoadingState message="Loading honeymoon packages..." />
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                Romantic Packages Coming Soon
              </h3>
              <p className="text-muted max-w-md mx-auto mb-6">
                We're curating special honeymoon packages for Bhutan. Contact us for a personalized romantic getaway.
              </p>
              <Link
                to="/customize-your-trip"
                className="inline-flex items-center bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Plan Your Honeymoon <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Bhutan for Your Honeymoon?
              </h2>
              <div className="space-y-4">
                <p className="text-white/90">
                  Bhutan offers an unparalleled romantic setting with its pristine valleys, ancient dzongs, and serene monasteries nestled in the Himalayas.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 fill-white" />
                    Stunning mountain backdrops for unforgettable moments
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 fill-white" />
                    Private stays in boutique hotels and traditional farmhouses
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 fill-white" />
                    Couples' spa experiences and traditional hot stone baths
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 fill-white" />
                    Intimate dining experiences with panoramic views
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-white/80 mb-6">
                Tell us about your dream honeymoon and we'll create the perfect itinerary.
              </p>
              <Link
                to="/customize-your-trip"
                className="block w-full bg-accent text-charcoal text-center py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Get Your Honeymoon Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Want a Custom Honeymoon?"
        subtitle="Every couple is unique. Let us design a honeymoon that's perfectly yours."
        primaryCTA={{ text: 'Customize Your Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'View All Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default HoneymoonPackages
