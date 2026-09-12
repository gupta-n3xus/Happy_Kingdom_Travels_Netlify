import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { NAV_LINKS } from '../constants'
import { useBusinessContact } from '../context/SettingsContext'
import logo from '../utils/logo/HKT.png'

const Navbar = () => {
  const BUSINESS_CONTACT = useBusinessContact();

  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const packageLinks = [
    { name: 'All Packages', path: '/bhutan-tour-packages' },
    { name: 'Honeymoon Packages', path: '/bhutan-honeymoon-packages' },
    { name: 'Family Packages', path: '/bhutan-family-packages' },
    { name: 'Group Packages', path: '/bhutan-group-packages' },
    { name: 'Customize Trip', path: '/customize-your-trip' },
  ]

  const navItems = NAV_LINKS.map((link) => {
    if (link.name === 'Packages') {
      return { ...link, name: 'Packages', hasDropdown: true }
    }
    return { ...link, hasDropdown: false }
  })

  return (
    <header className="relative w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt={BUSINESS_CONTACT.companyName}
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('packages')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-charcoal hover:text-primary'
                    }`}
                    aria-expanded={activeDropdown === 'packages'}
                    aria-haspopup="true"
                  >
                    {link.name}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform ${
                        activeDropdown === 'packages' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeDropdown === 'packages' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      {packageLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2.5 text-charcoal hover:bg-warmWhite hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-charcoal hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center lg:hidden space-x-2">
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal hover:text-primary transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-20 border-b border-gray-100">
            <Link to="/" className="flex items-center shrink-0" onClick={() => setIsOpen(false)}>
              <img
                src={logo}
                alt={BUSINESS_CONTACT.companyName}
                className="h-10 w-10 rounded-full object-cover"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-charcoal hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((link) =>
              link.hasDropdown ? (
                <div key={link.path}>
                  <div className="px-4 py-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {link.name}
                  </div>
                  {packageLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block pl-8 pr-4 py-3 rounded-lg font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-primary bg-green-50'
                          : 'text-charcoal hover:bg-warmWhite hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-green-50'
                      : 'text-charcoal hover:bg-warmWhite hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="px-4 pb-8 pt-4 border-t border-gray-100">
            <a
              href={BUSINESS_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 w-full bg-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
