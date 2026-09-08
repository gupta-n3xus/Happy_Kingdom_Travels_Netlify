import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col animate-fade-in">
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-display text-xl font-bold text-charcoal">{title}</h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-charcoal transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
