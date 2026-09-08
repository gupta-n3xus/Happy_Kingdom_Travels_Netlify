import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, ArrowRight, Percent } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import PackageCard from '../components/PackageCard'
import LoadingState from '../components/LoadingState'
import CTASection from '../components/CTASection'
import packageService from '../services/packageService'

const GroupPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages({ category: 'group' })
      setPackages(data.data || data.packages || [])
    } catch (error) {
      console.error('Failed to fetch group packages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Bhutan Group Tour Packages | Group Travel in Bhutan"
        description="Travel with your group to Bhutan. Corporate retreats, school trips, and group adventures with special discounts and customized itineraries."
        keywords="Bhutan group packages, Bhutan group tour, corporate retreat Bhutan, school trip Bhutan"
      />

      <section className="relative h-96 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/pkg-classic.jpg"
            alt="Bhutan group travel"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Group Packages' }]} />
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 mr-3" />
            <span className="text-white/80 text-lg">Group Adventures</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Bhutan Group Tour Packages
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Travel together and save more. Special group discounts and customized itineraries for teams, friends, and organizations.
          </p>
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <Percent className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-amber-500">Group Discounts</p>
              <p className="text-muted text-sm">Special pricing for larger groups</p>
            </div>
            <div className="p-4">
              <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-amber-500">Flexible Dates</p>
              <p className="text-muted text-sm">Choose dates that work for everyone</p>
            </div>
            <div className="p-4">
              <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-amber-500">Team Building</p>
              <p className="text-muted text-sm">Activities designed for groups</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Group Tour Packages
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Perfect for corporate groups, school trips, wedding parties, and friend circles
            </p>
          </div>

          {loading ? (
            <LoadingState message="Loading group packages..." />
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                Group Packages Coming Soon
              </h3>
              <p className="text-muted max-w-md mx-auto mb-6">
                We're preparing special group packages for Bhutan. Contact us for customized group itineraries and exclusive discounts.
              </p>
              <Link
                to="/customize-your-trip"
                className="inline-flex items-center bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Get Group Quote <ArrowRight className="ml-2 w-4 h-4" />
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

      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Benefits of Group Travel in Bhutan
              </h2>
              <div className="space-y-4">
                <p className="text-white/90">
                  Bhutan is an ideal destination for group travel, offering shared experiences that strengthen bonds and create lasting memories.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Percent className="w-5 h-5 mr-3" />
                    Significant discounts for groups of 10+
                  </li>
                  <li className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    Dedicated group coordinator for seamless logistics
                  </li>
                  <li className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3" />
                    Customized itineraries for corporate retreats and events
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3" />
                    Team building activities and cultural workshops
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold mb-4">Plan Your Group Trip</h3>
              <p className="text-white/80 mb-6">
                Tell us about your group size, travel dates, and preferences. We'll handle everything.
              </p>
              <Link
                to="/customize-your-trip"
                className="block w-full bg-accent text-charcoal text-center py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Get Your Group Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Custom Group Itinerary?"
        subtitle="From corporate retreats to wedding celebrations, we handle groups of all sizes."
        primaryCTA={{ text: 'Customize Your Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'View All Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default GroupPackages
