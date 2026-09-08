import { useState, useEffect } from 'react'
import { Star, CheckCircle, Trash2 } from 'lucide-react'
import reviewService from '../../services/reviewService'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getAllReviews()
      setReviews(data.data || [])
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await reviewService.approveReview(id)
      toast.success('Review approved')
      fetchReviews()
    } catch (error) {
      toast.error('Failed to approve review')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    try {
      await reviewService.deleteReview(id)
      toast.success('Review deleted')
      fetchReviews()
    } catch (error) {
      toast.error('Failed to delete review')
    }
  }

  const filteredReviews = filter === 'all'
    ? reviews
    : filter === 'approved'
    ? reviews.filter(r => r.approved)
    : reviews.filter(r => !r.approved)

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal mb-6">Reviews</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'approved', 'pending'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white text-muted hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-5 h-5 bg-gray-200 rounded mr-1"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : filteredReviews.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted">No reviews found</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${review.approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {review.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="text-charcoal mb-4 line-clamp-3">{review.review}</p>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-medium text-charcoal">{review.customerName}</p>
                  <p className="text-sm text-muted">{review.city || 'Traveler'}</p>
                  {review.travelDate && (
                    <p className="text-xs text-muted">Traveled: {formatDate(review.travelDate)}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {review.verified && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Verified</span>
                  )}
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminReviews
