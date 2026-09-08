import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Baby, ArrowRight, Shield } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import PackageCard from '../components/PackageCard'
import LoadingState from '../components/LoadingState'
import CTASection from '../components/CTASection'
import packageService from '../services/packageService'

const FamilyPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages({ category: 'family' })
      setPackages(data.data || data.packages || [])
    } catch (error) {
      console.error('Failed to fetch family packages:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Bhutan Family Tour Packages | Family Holidays in Bhutan"
        description="Explore Bhutan with your family. Kid-friendly activities, comfortable stays, and memorable experiences for all ages in the Land of the Thunder Dragon."
        keywords="Bhutan family packages, Bhutan family tour, family holiday Bhutan, Bhutan with kids"
      />

      <section className="relative h-96 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/pkg-family-escape.jpg"
            alt="Bhutan family landscape"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Family Packages' }]} />
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 mr-3" />
            <span className="text-white/80 text-lg">Family Adventures</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Bhutan Family Tour Packages
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Create lasting memories with your loved ones. Safe, comfortable, and fun-filled family tours through Bhutan's enchanting landscapes.
          </p>
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <Baby className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-charcoal">Kid Friendly</p>
            </div>
            <div className="p-4">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-charcoal">Safe Travel</p>
            </div>
            <div className="p-4">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-charcoal">All Ages</p>
            </div>
            <div className="p-4">
              <ArrowRight className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-charcoal">Flexible Itineraries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
              Family-Friendly Bhutan Tours
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Carefully designed itineraries that cater to all ages, from toddlers to grandparents
            </p>
          </div>

          {loading ? (
            <LoadingState message="Loading family packages..." />
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                Family Packages Coming Soon
              </h3>
              <p className="text-muted max-w-md mx-auto mb-6">
                We're designing special family-friendly packages for Bhutan. Contact us for a customized family holiday.
              </p>
              <Link
                to="/customize-your-trip"
                className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Plan Your Family Trip <ArrowRight className="ml-2 w-4 h-4" />
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

      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Bhutan is Perfect for Families
              </h2>
              <div className="space-y-4">
                <p className="text-white/90">
                  Bhutan is one of the safest and most family-friendly destinations in Asia, offering gentle adventures and cultural experiences suitable for all ages.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 mr-3" />
                    One of the safest countries in the world
                  </li>
                  <li className="flex items-center">
                    <Baby className="w-5 h-5 mr-3" />
                    Gentle hikes and nature walks for all fitness levels
                  </li>
                  <li className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    Interactive cultural experiences kids love
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3" />
                    Comfortable accommodations with family rooms
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold mb-4">Plan Your Family Adventure</h3>
              <p className="text-white/80 mb-6">
                Share your family's travel style and preferences, and we'll create a safe and memorable Bhutan experience.
              </p>
              <Link
                to="/customize-your-trip"
                className="block w-full bg-accent text-charcoal text-center py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Get Your Family Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Family-Specific Itinerary?"
        subtitle="Every family is different. Let us create a trip that everyone will enjoy."
        primaryCTA={{ text: 'Customize Your Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'View All Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default FamilyPackages
