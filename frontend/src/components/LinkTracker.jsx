import { useEffect } from 'react'
import { trackQuickEnquiry } from '../utils/trackQuickEnquiry'

export default function LinkTracker() {
  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''

      if (href.startsWith('tel:')) {
        trackQuickEnquiry('phone_click', window.location.pathname)
      } else if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        trackQuickEnquiry('whatsapp_click', window.location.pathname)
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  return null
}
