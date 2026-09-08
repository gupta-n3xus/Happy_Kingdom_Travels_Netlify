import { useState, useEffect } from 'react'
import { Quote, Star } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ReviewCard from '../components/ReviewCard'
import LoadingState from '../components/LoadingState'
import CTASection from '../components/CTASection'
import reviewService from '../services/reviewService'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await reviewService.getApprovedReviews()
      setReviews(data.data || [])
    } catch (err) {
      setError(err.message || 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <>
      <SEO
        title="Customer Reviews | Bhutan Travel Experiences"
        description="Read authentic reviews from our happy travelers. See why travelers trust us for their Bhutan adventure."
        keywords="Bhutan travel reviews, Bhutan tour reviews, customer testimonials, Bhutan travel feedback"
      />

      <section className="relative h-64 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'Reviews' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl text-white/80">
            What our travelers say about their Bhutan experience
          </p>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                  <span className="font-display text-3xl font-bold text-charcoal ml-2">
                    {averageRating}
                  </span>
                </div>
                <p className="text-muted text-sm">Average Rating</p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-charcoal">{reviews.length}</p>
                <p className="text-muted text-sm">Total Reviews</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingState message="Loading reviews..." />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted mb-4">{error}</p>
              <button
                onClick={fetchReviews}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                No Reviews Yet
              </h3>
              <p className="text-muted">Reviews will appear here once available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Ready for Your Own Bhutan Story?"
        subtitle="Join our happy travelers and create unforgettable memories."
        primaryCTA={{ text: 'Plan Your Trip', link: '/customize-your-trip' }}
        secondaryCTA={{ text: 'View Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default Reviews
