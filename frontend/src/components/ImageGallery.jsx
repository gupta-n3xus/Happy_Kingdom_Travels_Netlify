import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const ImageGallery = ({ images = [], alt = 'Gallery image' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = (index) => {
    setActiveIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 p-2"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 text-white/80 hover:text-white transition-colors z-10 p-2 bg-black/40 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 text-white/80 hover:text-white transition-colors z-10 p-2 bg-black/40 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt={`${alt} ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageGallery
