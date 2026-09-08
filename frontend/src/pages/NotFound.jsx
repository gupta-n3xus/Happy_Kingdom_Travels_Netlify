import { Link } from 'react-router-dom'
import { Home, ArrowLeft, MapPin } from 'lucide-react'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found | Bhutan Travels" />

      <div className="min-h-screen bg-warmWhite flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="relative mb-8">
            <h1 className="font-display text-[10rem] font-bold text-primary/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="w-20 h-20 text-primary/30" />
            </div>
          </div>

          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
            Page Not Found
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-light transition-colors flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <Link
              to="/bhutan-tour-packages"
              className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Packages
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border-2 border-gray-200 text-muted px-8 py-4 rounded-lg font-bold hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
