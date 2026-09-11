import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useBusinessContact } from '../context/SettingsContext'
import logo from '../utils/logo/HKT.png'

const Footer = () => {
  const BUSINESS_CONTACT = useBusinessContact();

  const bhutanTours = [
    { name: 'Bhutan Packages', path: '/bhutan-tour-packages' },
    { name: 'Honeymoon', path: '/bhutan-tour-packages?category=honeymoon' },
    { name: 'Family', path: '/bhutan-tour-packages?category=family' },
    { name: 'Group', path: '/bhutan-tour-packages?category=group' },
    { name: 'Custom Tours', path: '/customize-your-trip' },
  ]

  const travelGuide = [
    { name: 'Bhutan Trip Cost', path: '/travel-guide/bhutan-trip-cost' },
    { name: 'How to Reach Bhutan', path: '/travel-guide/how-to-reach-bhutan' },
    { name: 'Best Time to Visit', path: '/travel-guide/best-time-to-visit-bhutan' },
    { name: 'Entry Requirements', path: '/travel-guide/bhutan-entry-requirements' },
    { name: 'Itineraries', path: '/travel-guide' },
  ]

  const company = [
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faqs' },
  ]

  const legal = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
    { name: 'Cancellation Policy', path: '/cancellation-policy' },
  ]

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img src={logo} alt="Happy Kingdom Travels" className="h-12 w-12 rounded-full object-cover" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for authentic Bhutan travel experiences. Discover the Land of the Thunder Dragon with our expert-guided tours.
            </p>
            <div className="flex space-x-3">
              {BUSINESS_CONTACT.socialLinks.facebook && (
                <a href={BUSINESS_CONTACT.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_CONTACT.socialLinks.instagram && (
                <a href={BUSINESS_CONTACT.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_CONTACT.socialLinks.twitter && (
                <a href={BUSINESS_CONTACT.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {BUSINESS_CONTACT.socialLinks.youtube && (
                <a href={BUSINESS_CONTACT.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-bold mb-5 text-white uppercase tracking-wider">
              Bhutan Tours
            </h3>
            <ul className="space-y-3">
              {bhutanTours.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold mb-5 text-white uppercase tracking-wider">
              Travel Guide
            </h3>
            <ul className="space-y-3">
              {travelGuide.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold mb-5 text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-base font-bold mb-5 text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold mb-5 text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <a
                  href={BUSINESS_CONTACT.phoneLink}
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  {BUSINESS_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <a
                  href={BUSINESS_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONTACT.email}`}
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  {BUSINESS_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <a
                  href={BUSINESS_CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                  {BUSINESS_CONTACT.address}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Happy Kingdom Travels. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-500 text-sm hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
