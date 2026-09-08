import { Star, BadgeCheck, Quote } from 'lucide-react'
import { formatDate } from '../utils/helpers'

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex mb-4">
        {[...Array(review.rating || 5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-accent fill-accent" />
        ))}
      </div>
      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      <p className="text-charcoal mb-6 leading-relaxed">{review.comment || review.message}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
          {review.name?.charAt(0) || 'A'}
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <p className="font-bold text-charcoal">{review.name}</p>
            {review.verified && (
              <span className="inline-flex items-center text-xs text-secondary font-medium">
                <BadgeCheck className="w-4 h-4 mr-0.5" />
                Verified
              </span>
            )}
          </div>
          <p className="text-sm text-muted">
            {review.location || 'Bhutan Traveler'}
            {review.travelDate && (
              <span className="ml-2">· {formatDate(review.travelDate)}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
