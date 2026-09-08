import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Users, Phone, MessageCircle, ChevronRight, Info, ArrowLeft, Star, Send } from 'lucide-react';
import SEO from '../components/SEO';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ItineraryTimeline from '../components/ItineraryTimeline';
import InclusionList from '../components/InclusionList';
import ExclusionList from '../components/ExclusionList';
import FAQAccordion from '../components/FAQAccordion';
import Modal from '../components/Modal';
import { createPackageMessage } from '../utils/createWhatsAppMessage';
import { createWhatsAppUrl, openWhatsApp } from '../utils/createWhatsAppUrl';
import packageService from '../services/packageService';
import reviewService from '../services/reviewService';
import enquiryService from '../services/enquiryService';
import { useBusinessContact } from '../context/SettingsContext';
import toast from 'react-hot-toast';
import { trackEvent } from '../hooks/useAnalytics';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'inclusions', label: 'Inclusions' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'faqs', label: 'FAQs' },
];

export default function PackageDetails() {
  const BUSINESS_CONTACT = useBusinessContact();
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    adults: 2,
    children: 0,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState({
    customerName: '',
    city: '',
    rating: 5,
    review: '',
    travelDate: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [packageReviews, setPackageReviews] = useState([]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewSubmitting) return;
    setReviewSubmitting(true);
    try {
      await reviewService.createReview({
        ...reviewData,
        package: pkg._id,
        rating: Number(reviewData.rating),
      });
      setReviewSubmitted(true);
      setReviewData({ customerName: '', city: '', rating: 5, review: '', travelDate: '' });
      toast.success('Thank you! Your review has been submitted for approval.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [slug]);

  useEffect(() => {
    if (pkg?._id) {
      fetchPackageReviews(pkg._id);
    }
  }, [pkg?._id]);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await packageService.getPackageBySlug(slug);
      setPkg(data.data || data.package || data);
    } catch (err) {
      console.error('Failed to fetch package:', err);
      setError(err.message || 'Package not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackageReviews = async (packageId) => {
    try {
      const res = await reviewService.getApprovedReviews({ package: packageId });
      setPackageReviews(res.data?.data || res.data || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData((prev) => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? Number(value) : value,
    }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await enquiryService.createEnquiry({
        fullName: enquiryData.name,
        phone: enquiryData.phone,
        email: enquiryData.email,
        travelDate: enquiryData.travelDate,
        adults: Number(enquiryData.adults),
        children: Number(enquiryData.children),
        message: `${enquiryData.message}\n\nPackage: ${pkg.title} (${pkg.duration?.nights}N/${pkg.duration?.days}D)`,
        preferredPackage: pkg._id,
      });
      trackEvent('quote_submit', {
        source: 'package_detail',
        package: pkg.title,
        packageSlug: slug,
      })
      toast.success('Thank you! Your enquiry has been received. We will get back to you shortly.');
      setShowEnquiry(false);
      const whatsappMsg = createPackageMessage({
        packageName: pkg.title,
        duration: `${pkg.duration?.nights}N/${pkg.duration?.days}D`,
        travelDate: enquiryData.travelDate || 'Flexible',
      });
      openWhatsApp(whatsappMsg);
      setEnquiryData({ name: '', phone: '', email: '', travelDate: '', adults: 2, children: 0, message: '' });
    } catch (err) {
      toast.error('Sorry, we could not submit your enquiry. Please try again or contact us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', {
      source: 'package_detail',
      package: pkg.title,
      packageSlug: slug,
    })
    const message = createPackageMessage({
      packageName: pkg.title,
      duration: `${pkg.duration?.nights}N/${pkg.duration?.days}D`,
      travelDate: 'Flexible',
    });
    openWhatsApp(message);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingState message="Loading package details..." />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-white">
        <ErrorState message={error || 'Package not found.'} onRetry={fetchPackage} />
      </div>
    );
  }

  const fallbackImages = {
    '/images/bhutan-5n6d.jpg': '/images/pkg-highlights.jpg',
    '/images/bhutan-6n7d.jpg': '/images/pkg-classic.jpg',
    '/images/bhutan-7n8d.jpg': '/images/pkg-grand-explorer.jpg',
    '/images/bhutan-honeymoon.jpg': '/images/pkg-royal.jpg',
    '/images/bhutan-family.jpg': '/images/pkg-family-escape.jpg',
    '/images/bhutan-group.jpg': '/images/pkg-classic.jpg',
  };
  const rawHero = pkg.heroImage || pkg.images?.[0] || '';
  const heroImage = fallbackImages[rawHero] || rawHero;
  const nights = pkg.duration?.nights || 0;
  const days = pkg.duration?.days || (nights ? nights + 1 : 0);

  const seoTitle = pkg.seo?.metaTitle || `${pkg.title} | Bhutan Tour Packages`;
  const seoDescription = pkg.seo?.metaDescription || pkg.shortDescription || pkg.title;
  const seoKeywords = pkg.seo?.keywords?.join(', ') || '';

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Bhutan Packages', path: '/tours' },
    { label: pkg.title },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.shortDescription,
    url: typeof window !== 'undefined' ? window.location.href : '',
    touristType: pkg.suitableFor || [],
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: pkg.itinerary?.length || 0,
      itemListElement: pkg.itinerary?.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: day.title,
        description: day.description,
      })),
    },
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={heroImage}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative h-[420px] md:h-[500px] bg-gray-900 overflow-hidden">
        {heroImage && (
          <img
            src={heroImage}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/bhutan-tour-packages" className="hover:text-white">Bhutan Packages</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/50">{pkg.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {nights}N / {days}D
              </span>
              {pkg.category && (
                <>
                  <span className="text-white/30">|</span>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide">
                    {pkg.category}
                  </span>
                </>
              )}
              {pkg.travelStyle && (
                <>
                  <span className="text-white/30">|</span>
                  <span className="flex items-center gap-1 capitalize">
                    {pkg.travelStyle}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {pkg.title}
            </h1>

            {pkg.route && pkg.route.length > 0 && (
              <p className="text-white/80 text-base md:text-lg mb-4 max-w-3xl">
                {pkg.route.join(' → ')}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-semibold text-sm tracking-wide border border-white/10">
                Custom Quote
              </span>
              <div className="flex gap-2 ml-auto md:ml-0">
                <button
                  onClick={() => setShowEnquiry(true)}
                  className="bg-forest text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25 flex items-center gap-2"
                >
                  Get a Quote
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/bhutan-tour-packages"
            className="inline-flex items-center gap-2 text-forest hover:text-forest/80 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Package Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900 text-sm">{nights} Nights / {days} Days</p>
                    </div>
                  </div>
                  {pkg.route && pkg.route.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Route</p>
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{pkg.route.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {pkg.suitableFor && pkg.suitableFor.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 text-forest mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Suitable For</p>
                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{pkg.suitableFor.join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {pkg.startingPoints && pkg.startingPoints.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Starting Point</p>
                        <p className="font-medium text-gray-900 text-sm">{pkg.startingPoints[0]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex gap-1 border-b border-gray-100 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3.5 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-forest border-b-2 border-forest'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                          {pkg.description || pkg.shortDescription}
                        </p>
                      </div>

                      {pkg.tripHighlights && pkg.tripHighlights.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {pkg.tripHighlights.map((highlight, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-forest/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="text-forest text-xs font-bold">✓</span>
                                </div>
                                <span className="text-gray-700 text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pkg.suitableFor && pkg.suitableFor.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">Who is this for?</h3>
                          <div className="flex flex-wrap gap-2">
                            {pkg.suitableFor.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-forest/10 text-forest rounded-full text-sm font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {pkg.optionalActivities && pkg.optionalActivities.length > 0 && (
                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5 text-amber-600" />
                            <h3 className="font-bold text-amber-800">Optional Activities (Additional Cost)</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {pkg.optionalActivities.map((act) => (
                              <span key={act} className="px-3 py-1 bg-white text-amber-700 rounded-full text-sm border border-amber-200">
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'itinerary' && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Day-wise Itinerary</h3>
                      <ItineraryTimeline itinerary={pkg.itinerary} />
                    </div>
                  )}

                  {activeTab === 'inclusions' && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">What is Included</h3>
                      <InclusionList inclusions={pkg.inclusions} />
                    </div>
                  )}

                  {activeTab === 'exclusions' && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">What is Not Included</h3>
                      <ExclusionList exclusions={pkg.exclusions} />
                    </div>
                  )}

                  {activeTab === 'hotels' && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Accommodation</h3>
                      {pkg.accommodation && pkg.accommodation.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pkg.accommodation.map((acc, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{acc.hotelName || 'To be confirmed'}</h4>
                                {acc.category && (
                                  <span className="text-xs bg-forest/10 text-forest px-2 py-1 rounded-full font-medium">
                                    {acc.category}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 flex items-center mb-1">
                                <MapPin className="w-3.5 h-3.5 mr-1" />
                                {acc.location}
                              </p>
                              {acc.roomType && <p className="text-sm text-gray-600">Room: {acc.roomType}</p>}
                              <p className="text-sm text-gray-500 mt-1">{acc.nights} night(s)</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Hotel details will be shared with the final itinerary.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'faqs' && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                      {pkg.faq && pkg.faq.length > 0 ? (
                        <FAQAccordion faqs={pkg.faq} />
                      ) : (
                        <p className="text-gray-500">No FAQs available for this package.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-center mb-6">
                    {pkg.pricing?.showPrice && pkg.pricing?.startingFrom > 0 ? (
                      <>
                        <p className="text-gray-500 text-sm mb-1">Starting from</p>
                        <p className="text-3xl font-bold text-forest">₹{pkg.pricing.startingFrom.toLocaleString('en-IN')}</p>
                        <p className="text-gray-500 text-sm">/ person</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm mb-1">Pricing</p>
                        <p className="text-2xl font-bold text-forest">Contact for Price</p>
                        <p className="text-gray-500 text-sm">Call or WhatsApp for best rates</p>
                      </>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2" /> Duration
                      </span>
                      <span className="font-medium text-gray-900 text-sm">{nights}N / {days}D</span>
                    </div>
                    {pkg.route && pkg.route.length > 0 && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-2" /> Route
                        </span>
                        <span className="font-medium text-gray-900 text-sm">{pkg.route.length} stops</span>
                      </div>
                    )}
                    {pkg.suitableFor && pkg.suitableFor.length > 0 && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm flex items-center">
                          <Users className="w-4 h-4 mr-2" /> Ideal For
                        </span>
                        <span className="font-medium text-gray-900 text-sm line-clamp-1">{pkg.suitableFor[0]}</span>
                      </div>
                    )}
                    {pkg.travelStyle && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Style</span>
                        <span className="font-medium text-gray-900 text-sm capitalize">{pkg.travelStyle}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowEnquiry(true)}
                    className="w-full bg-forest text-white py-3.5 rounded-xl font-bold text-lg hover:bg-forest/90 transition-colors mb-3 shadow-lg shadow-forest/25"
                  >
                    Get a Personalised Quote
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </button>

                  <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-2">Need help? Call us</p>
                    <a
                      href={BUSINESS_CONTACT.phoneLink}
                      className="text-forest font-bold flex items-center justify-center text-lg hover:text-forest/80 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {BUSINESS_CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Want to customise this package?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We can modify this itinerary to match your dates, budget, and preferences.
            Get a personalised quote in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(createPackageMessage({ title: pkg.title, price: pkg.price, duration: `${pkg.duration?.nights}N/${pkg.duration?.days}D` }))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS_CONTACT.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-forest text-forest px-8 py-3.5 rounded-xl font-semibold hover:bg-forest/5 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS_CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/bhutan-tour-packages" className="block text-center py-4 bg-white rounded-xl border border-gray-100 hover:border-forest hover:shadow-md transition-all font-medium text-forest">
              View All Packages
            </Link>
            <Link to="/customize-your-trip" className="block text-center py-4 bg-white rounded-xl border border-gray-100 hover:border-forest hover:shadow-md transition-all font-medium text-forest">
              Custom Trip Planner
            </Link>
            <a
              href={createWhatsAppUrl(createPackageMessage({ title: pkg.title, price: pkg.price, duration: `${pkg.duration?.nights}N/${pkg.duration?.days}D` }))}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 bg-white rounded-xl border border-gray-100 hover:border-forest hover:shadow-md transition-all font-medium text-forest"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Have questions about this trip?</h2>
          <p className="text-gray-600 mb-6">
            Our travel experts are ready to help you plan the perfect Bhutan holiday.
          </p>
          <a
            href={`tel:${BUSINESS_CONTACT.phone}`}
            className="inline-flex items-center gap-2 bg-forest text-white px-8 py-3 rounded-xl font-semibold hover:bg-forest/90 transition-all"
          >
            <Phone className="w-5 h-5" />
            Call {BUSINESS_CONTACT.phone}
          </a>
        </div>
      </section>

      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">Before You Go</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Visa & Permits</h3>
              <p className="text-sm text-gray-600">
                Indian nationals need a visa for Bhutan. We handle the entire visa process — just provide your documents in advance. The visa fee is included in the package.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Best Time to Visit</h3>
              <p className="text-sm text-gray-600">
                March to May and September to November are the best seasons. Spring offers rhododendron blooms, while autumn provides clear skies and stunning mountain views.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">What to Pack</h3>
              <p className="text-sm text-gray-600">
                Layered clothing, comfortable walking shoes, sunscreen, sunglasses, and a light rain jacket. We provide a detailed packing list upon booking confirmation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Health & Safety</h3>
              <p className="text-sm text-gray-600">
                Bhutan is very safe for travellers. The altitude varies — we ensure proper acclimatisation. Carry any personal medications. Basic first-aid is provided on all trips.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Why Book with Happy Kingdom Travels?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We are a registered Bhutanese travel company based in Jaigaon. Every trip is managed
            by our local team — no middlemen, no hidden costs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏔️</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Local Expertise</h3>
              <p className="text-xs text-gray-600 mt-1">Bhutanese team on ground</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">No Hidden Costs</h3>
              <p className="text-xs text-gray-600 mt-1">Transparent pricing</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Custom Itineraries</h3>
              <p className="text-xs text-gray-600 mt-1">Tailored to your needs</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">24/7 Support</h3>
              <p className="text-xs text-gray-600 mt-1">WhatsApp & phone support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to explore Bhutan?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get a personalised quote in minutes. Our travel experts will craft the perfect itinerary for your dream Bhutan trip.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createWhatsAppUrl(createPackageMessage({ title: pkg.title, price: pkg.price, duration: `${pkg.duration?.nights}N/${pkg.duration?.days}D` }))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-forest px-8 py-3.5 rounded-xl font-semibold hover:bg-white/90 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS_CONTACT.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call {BUSINESS_CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Customer Reviews</h2>
          {packageReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packageReviews.map((r) => (
                <div key={r._id} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center gap-1 mb-2 text-gold">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    &quot;{r.review}&quot;
                  </p>
                  <p className="text-xs font-medium text-gray-900">— {r.customerName}{r.city ? `, ${r.city}` : ''}</p>
                  {r.travelDate && (
                    <p className="text-xs text-gray-400 mt-1">Traveled: {new Date(r.travelDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet for this package. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Share Your Experience</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Your review will appear after admin approval.</p>

          {reviewSubmitted ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">Your review has been submitted and is pending approval. It will appear on the site once approved.</p>
              <button
                onClick={() => setReviewSubmitted(false)}
                className="text-forest font-semibold text-sm hover:underline"
              >
                Submit Another Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={reviewData.customerName}
                    onChange={handleReviewChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={reviewData.city}
                    onChange={handleReviewChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Mumbai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Rating *</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData((prev) => ({ ...prev, rating: star }))}
                        className="text-2xl transition-colors"
                      >
                        <Star
                          className={`w-7 h-7 ${star <= reviewData.rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={reviewData.travelDate}
                    onChange={handleReviewChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Your Review *</label>
                <textarea
                  name="review"
                  required
                  rows={4}
                  maxLength={1000}
                  value={reviewData.review}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell others about your experience with this package..."
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{reviewData.review.length}/1000</p>
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3 rounded-xl font-semibold hover:bg-forest/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Modal
        isOpen={showEnquiry}
        onClose={() => setShowEnquiry(false)}
        title={`Enquire About ${pkg.title}`}
      >
        <form onSubmit={handleEnquirySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
              value={enquiryData.name}
              onChange={handleEnquiryChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                value={enquiryData.phone}
                onChange={handleEnquiryChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                value={enquiryData.email}
                onChange={handleEnquiryChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Travel Date</label>
            <input
              type="date"
              name="travelDate"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
              value={enquiryData.travelDate}
              onChange={handleEnquiryChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Adults</label>
              <input
                type="number"
                name="adults"
                min="1"
                max="20"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                value={enquiryData.adults}
                onChange={handleEnquiryChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Children</label>
              <input
                type="number"
                name="children"
                min="0"
                max="20"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all"
                value={enquiryData.children}
                onChange={handleEnquiryChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Message</label>
            <textarea
              name="message"
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent outline-none transition-all resize-none"
              value={enquiryData.message}
              onChange={handleEnquiryChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-forest text-white py-3 rounded-lg font-bold hover:bg-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
          </button>
        </form>
      </Modal>
    </>
  );
}
