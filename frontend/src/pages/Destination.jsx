import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Clock, Star, ArrowRight, Calendar, Mountain, CheckCircle } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import LoadingState from '../components/LoadingState'
import PackageCard from '../components/PackageCard'
import CTASection from '../components/CTASection'
import destinationService from '../services/destinationService'

const Destination = () => {
  const { slug } = useParams()
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDestination()
  }, [slug])

  const fetchDestination = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await destinationService.getDestinationBySlug(slug)
      setDestination(data.destination)
    } catch (err) {
      setError(err.message || 'Failed to load destination')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-warmWhite">
        <LoadingState message="Loading destination..." />
      </div>
    )
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-warmWhite flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">Destination Not Found</h2>
          <p className="text-muted mb-6">The destination you're looking for doesn't exist.</p>
          <Link
            to="/bhutan-tour-packages"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            Browse Packages
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${destination.name} | Bhutan Destinations`}
        description={destination.description || `Explore ${destination.name} in Bhutan - discover attractions, best time to visit, and how to reach.`}
        keywords={`${destination.name}, Bhutan ${destination.name}, visit ${destination.name} Bhutan`}
        image={destination.image}
      />

      <section className="relative h-96 bg-gradient-to-r from-primary to-secondary">
        <img
          src={destination.image || '/images/paro-hero.jpg'}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Breadcrumbs
              items={[
                { label: 'Destinations', path: '/bhutan-tour-packages' },
                { label: destination.name },
              ]}
            />
            <div className="flex items-center text-white/80 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              Bhutan
            </div>
            <h1 className="font-display text-5xl font-bold text-white mb-4">{destination.name}</h1>
            {destination.tagline && (
              <p className="text-xl text-white/80">{destination.tagline}</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  About {destination.name}
                </h2>
                <div className="text-muted leading-relaxed">
                  <p className="text-lg mb-6">{destination.description}</p>
                </div>

                {destination.highlights && destination.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-bold text-charcoal mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <Star className="w-5 h-5 text-accent mt-0.5 mr-3 shrink-0" />
                          <span className="text-muted">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {destination.howToReach && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    How to Reach {destination.name}
                  </h3>
                  <p className="text-muted leading-relaxed">{destination.howToReach}</p>
                </div>
              )}

              {destination.bestTimeToVisit && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Best Time to Visit
                  </h3>
                  <p className="text-muted leading-relaxed">{destination.bestTimeToVisit}</p>
                </div>
              )}

              {destination.thingsToDo && destination.thingsToDo.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-charcoal mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    Things to Do in {destination.name}
                  </h3>
                  <ul className="space-y-3">
                    {destination.thingsToDo.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {destination.packages && destination.packages.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                    Packages in {destination.name}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.packages.map((pkg) => (
                      <PackageCard key={pkg._id} pkg={pkg} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-display text-xl font-bold text-charcoal mb-4">Plan Your Visit</h3>
                <div className="space-y-4 mb-6">
                  {destination.bestTime && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-muted text-sm">Best Time</span>
                      <span className="font-medium text-charcoal text-sm">{destination.bestTime}</span>
                    </div>
                  )}
                  {destination.altitude && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-muted text-sm">Altitude</span>
                      <span className="font-medium text-charcoal text-sm">{destination.altitude}</span>
                    </div>
                  )}
                  {destination.temperature && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-muted text-sm">Temperature</span>
                      <span className="font-medium text-charcoal text-sm">{destination.temperature}</span>
                    </div>
                  )}
                  {destination.duration && (
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-muted text-sm">Suggested Duration</span>
                      <span className="font-medium text-charcoal text-sm">{destination.duration}</span>
                    </div>
                  )}
                </div>
                <Link
                  to="/customize-your-trip"
                  className="block w-full bg-primary text-white text-center py-3 rounded-lg font-bold hover:bg-primary-light transition-colors"
                >
                  Plan Your Trip
                </Link>
                <Link
                  to="/contact"
                  className="block w-full border-2 border-primary text-primary text-center py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors mt-3"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready to Visit ${destination.name}?`}
        subtitle="Let us create a personalized itinerary for your Bhutan adventure."
        primaryCTA={{ text: 'Get Custom Quote', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'View All Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default Destination
