import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBusinessContact } from '../context/SettingsContext';
import { createPackageMessage } from '../utils/createWhatsAppMessage.js';
import { openWhatsApp } from '../utils/createWhatsAppUrl.js';

const fallbackImages = {
  '/images/bhutan-5n6d.jpg': '/images/pkg-highlights.jpg',
  '/images/bhutan-6n7d.jpg': '/images/pkg-classic.jpg',
  '/images/bhutan-7n8d.jpg': '/images/pkg-grand-explorer.jpg',
  '/images/bhutan-honeymoon.jpg': '/images/pkg-royal.jpg',
  '/images/bhutan-family.jpg': '/images/pkg-family-escape.jpg',
  '/images/bhutan-group.jpg': '/images/pkg-classic.jpg',
};

export default function PackageCard({ pkg }) {
  const BUSINESS_CONTACT = useBusinessContact();
  const [imgSrc, setImgSrc] = useState(null);

  const {
    slug,
    title,
    shortDescription,
    duration,
    route,
    suitableFor,
    category,
    travelStyle,
    tripHighlights,
    heroImage,
    images,
    pricing,
  } = pkg;

  const rawHero = heroImage || (images && images.length > 0 ? images[0] : null);
  const heroImg = imgSrc !== null ? imgSrc : (fallbackImages[rawHero] || rawHero);

  const handleImgError = () => {
    if (rawHero && fallbackImages[rawHero] && imgSrc === null) {
      setImgSrc(fallbackImages[rawHero]);
    } else {
      setImgSrc('__FAILED__');
    }
  };

  const categoryColors = {
    group: 'bg-forest/10 text-forest',
    honeymoon: 'bg-pink-100 text-pink-700',
    family: 'bg-blue-100 text-blue-700',
    adventure: 'bg-orange-100 text-orange-700',
    luxury: 'bg-gold/10 text-amber-700',
    standard: 'bg-gray-100 text-gray-700',
    budget: 'bg-teal-100 text-teal-700',
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = createPackageMessage({
      packageName: title,
      duration: duration ? `${duration.nights}N/${duration.days}D` : '',
      travelDate: 'Flexible',
    });
    openWhatsApp(message);
  };

  return (
    <Link
      to={`/packages/${slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-forest/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-gray-200">
        {heroImg && heroImg !== '__FAILED__' ? (
          <img
            src={heroImg}
            alt={title}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-forest/20 to-forest/5">
            🏔️
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {category && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          )}
          {duration && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
              {duration.nights}N/{duration.days}D
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest transition-colors mb-2 line-clamp-2">
          {title}
        </h3>

        {route && route.length > 0 && (
          <p className="text-sm text-gray-500 mb-2 truncate">
            📍 {route.join(' → ')}
          </p>
        )}

        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2 flex-1">
          {shortDescription}
        </p>

        {suitableFor && suitableFor.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {suitableFor.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-forest/5 text-forest/80 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {suitableFor.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                +{suitableFor.length - 3} more
              </span>
            )}
          </div>
        )}

        {tripHighlights && tripHighlights.length > 0 && (
          <div className="text-xs text-gray-500 mb-3 line-clamp-1">
            ✦ {tripHighlights[0]}
          </div>
        )}

        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
          {pricing?.showPrice && pricing?.startingFrom > 0 ? (
            <div className="flex-1">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-lg font-bold text-forest">₹{pricing.startingFrom.toLocaleString('en-IN')}</p>
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-sm font-semibold text-forest">Contact for Price</p>
            </div>
          )}
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 text-center py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all"
          >
            Ask on WhatsApp
          </button>
          <span className="text-sm text-forest font-semibold group-hover:underline whitespace-nowrap">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
