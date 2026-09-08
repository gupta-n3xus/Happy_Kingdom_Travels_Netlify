import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const trustItems = [
  'Complete Trip Management',
  'Transparent Pricing',
  'NJP / Bagdogra Pickup',
  'Custom Itineraries',
]

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  primaryCTA,
  secondaryCTA,
  showTrustIndicators = false,
}) => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary via-primary-light to-secondary">
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-charcoal/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
        )}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-20 w-full">
        <div className="max-w-3xl">
          {subtitle && (
            <span className="inline-block px-4 py-2 bg-accent/20 rounded-full text-accent font-medium mb-6">
              {subtitle}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          {showTrustIndicators && (
            <div className="flex flex-wrap gap-4 mb-8">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-accent mr-2" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            {primaryCTA && (
              <Link
                to={primaryCTA.link}
                className="bg-accent text-charcoal px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            {secondaryCTA && (
              <Link
                to={secondaryCTA.link}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-charcoal transition-colors flex items-center justify-center"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
