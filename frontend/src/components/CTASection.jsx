import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const CTASection = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = 'primary',
}) => {
  const bgClass = variant === 'dark'
    ? 'bg-charcoal'
    : 'bg-primary'

  return (
    <section className={`${bgClass} text-white py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCTA && (
            <Link
              to={primaryCTA.link}
              className="bg-accent text-charcoal px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors inline-flex items-center justify-center"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
          {secondaryCTA && (
            <Link
              to={secondaryCTA.link}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTASection
