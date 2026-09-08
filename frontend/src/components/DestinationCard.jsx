import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

const destinationImages = {
  paro: '/images/paro-hero.jpg',
  thimphu: '/images/thimphu-hero.jpg',
  punakha: '/images/punakha-hero.jpg',
  phuentsholing: '/images/phuentsholing-hero.jpg',
  'haa-valley': '/images/haa-valley-hero.jpg',
  bumthang: '/images/bumthang-hero.jpg',
}

const DestinationCard = ({ destination }) => {
  const image = destination.image || destinationImages[destination.slug] || '/images/paro-hero.jpg'

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative h-80 rounded-2xl overflow-hidden block"
    >
      <img
        src={image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center text-white/80 text-sm mb-1">
          <MapPin className="w-4 h-4 mr-1" />
          Bhutan
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-3">{destination.name}</h3>
        {destination.shortDescription && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{destination.shortDescription}</p>
        )}
        <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </Link>
  )
}

export default DestinationCard
