import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import PackageCard from '../components/PackageCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useBusinessContact } from '../context/SettingsContext';
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl';
import { createGeneralMessage } from '../utils/createWhatsAppMessage';

const DURATION_FILTERS = [
  { label: 'All', value: '' },
  { label: '3–4 Nights', value: '3-4' },
  { label: '5–6 Nights', value: '5-6' },
  { label: '7–8 Nights', value: '7-8' },
  { label: '8+ Nights', value: '8+' },
];

const TRAVEL_STYLE_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Budget', value: 'budget' },
  { label: 'Comfort', value: 'comfort' },
  { label: 'Premium', value: 'premium' },
  { label: 'Luxury', value: 'luxury' },
];

const CATEGORY_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Group', value: 'group' },
  { label: 'Honeymoon', value: 'honeymoon' },
  { label: 'Family', value: 'family' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Standard', value: 'standard' },
  { label: 'Luxury', value: 'luxury' },
];

export default function BhutanPackages() {
  const BUSINESS_CONTACT = useBusinessContact();
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    duration: '',
    travelStyle: '',
    category: searchParams.get('category') || '',
  });

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setFilters((prev) => {
      if (prev.category === cat) return prev;
      return { ...prev, category: cat };
    });
  }, [searchParams]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.duration) params.append('duration', filters.duration);
      if (filters.travelStyle) params.append('travelStyle', filters.travelStyle);
      if (filters.category) params.append('category', filters.category);
      const query = params.toString();
      const url = `/api/packages${query ? `?${query}` : ''}`;
      const data = await fetch(url).then((r) => r.json());
      setPackages(data.data || data.packages || []);
    } catch (err) {
      setError(err.message || 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`Bhutan Tour Packages — 4N to 9N | ${BUSINESS_CONTACT.companyName}`}
        description={`Browse curated Bhutan tour packages from Jaigaon & Phuentsholing. Group, solo, honeymoon, family & cultural tours with local expert guides. ${BUSINESS_CONTACT.companyName}.`}
        keywords="bhutan tour packages, bhutan packages from india, bhutan group tour, bhutan honeymoon, bhutan family tour, bhutan tour from jaigaon"
        canonical="/tours"
        type="website"
      />

      <section className="bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span className="text-white">Bhutan Tour Packages</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Bhutan Tour Packages
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl">
            Discover our curated collection of Bhutan tours — from quick 3-night escapes to
            comprehensive 9-day explorations. Every trip is led by certified local guides.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Filter Your Trip</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <div className="flex flex-wrap gap-2">
              {DURATION_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilterChange('duration', f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    filters.duration === f.value
                      ? 'bg-forest text-white border-forest shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-forest hover:text-forest'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_STYLE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilterChange('travelStyle', f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    filters.travelStyle === f.value
                      ? 'bg-forest text-white border-forest shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-forest hover:text-forest'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFilterChange('category', f.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    filters.category === f.value
                      ? 'bg-forest text-white border-forest shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-forest hover:text-forest'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {Object.entries(filters).map(([key, value]) =>
              value ? (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key, '')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-forest/10 text-forest rounded-full text-xs font-medium"
                >
                  {key === 'duration' ? `${value}N` : key === 'travelStyle' ? value.charAt(0).toUpperCase() + value.slice(1) : value.charAt(0).toUpperCase() + value.slice(1)}
                  <span className="text-forest/60 hover:text-forest">×</span>
                </button>
              ) : null
            )}
            <button
              onClick={() => setFilters({ duration: '', travelStyle: '', category: '' })}
              className="text-xs text-gray-500 hover:text-forest underline"
            >
              Clear all
            </button>
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchPackages} />
        ) : packages.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏔️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or contact us for a custom package.
            </p>
            <a
              href={createWhatsAppUrl(createGeneralMessage(BUSINESS_CONTACT.companyName))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-xl font-semibold hover:bg-forest/90 transition-all"
            >
              Ask on WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-forest">{packages.length}</span> packages found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id || pkg.slug} pkg={pkg} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Can&apos;t find the right package?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We specialise in custom Bhutan itineraries. Tell us your dates, budget, and
            interests — we&apos;ll build a trip that&apos;s perfect for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(createGeneralMessage(BUSINESS_CONTACT.companyName))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25"
            >
              Get a Custom Quote on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS_CONTACT.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-forest text-forest px-8 py-3.5 rounded-xl font-semibold hover:bg-forest/5 transition-all"
            >
              Call {BUSINESS_CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
