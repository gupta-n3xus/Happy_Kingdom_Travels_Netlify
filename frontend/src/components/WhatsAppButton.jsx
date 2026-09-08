import { MessageCircle } from 'lucide-react'
import { useBusinessContact } from '../context/SettingsContext'
import { trackEvent } from '../hooks/useAnalytics'

const WhatsAppButton = () => {
  const BUSINESS_CONTACT = useBusinessContact();

  const handleClick = () => {
    trackEvent('whatsapp_click', {
      source: 'floating_button',
      page: window.location.pathname,
    })
  }

  return (
    <a
      href={BUSINESS_CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}

export default WhatsAppButton
