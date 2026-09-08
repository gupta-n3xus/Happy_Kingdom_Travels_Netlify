import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, IndianRupee, FileCheck, Compass, BookOpen, X, User } from 'lucide-react'
import DOMPurify from 'dompurify'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { useBusinessContact } from '../context/SettingsContext'
import { createWhatsAppUrl } from '../utils/createWhatsAppUrl'
import { createGeneralMessage } from '../utils/createWhatsAppMessage'
import blogService from '../services/blogService'
import { formatDate } from '../utils/helpers'

const guides = [
  {
    title: 'Bhutan Trip Cost',
    description: 'Understand the major expenses involved in planning a Bhutan trip from India, including accommodation, transportation, sightseeing and applicable government charges.',
    path: '/travel-guide/bhutan-trip-cost',
    icon: IndianRupee,
  },
  {
    title: 'How to Reach Bhutan',
    description: 'Learn how to reach Bhutan from India by road or flight, including practical information about NJP, Bagdogra, Phuentsholing and Paro.',
    path: '/travel-guide/how-to-reach-bhutan',
    icon: MapPin,
  },
  {
    title: 'Best Time to Visit',
    description: 'Discover what each season is like in Bhutan and choose the best time based on your travel style, weather preferences and itinerary.',
    path: '/travel-guide/best-time-to-visit-bhutan',
    icon: Clock,
  },
  {
    title: 'Bhutan Entry Requirements',
    description: 'Learn about important travel documents, entry permits and other requirements for Indian travellers visiting Bhutan.',
    path: '/travel-guide/bhutan-entry-requirements',
    icon: FileCheck,
  },
]

const itineraries = [
  {
    duration: '4 Nights / 5 Days',
    suitable: 'Short holidays, first-time visitors with limited time, couples, weekend/short-break trips',
    route: ['Phuentsholing', 'Thimphu', 'Paro', 'Departure'],
  },
  {
    duration: '5 Nights / 6 Days',
    suitable: 'Balanced trip covering key highlights with comfortable pacing',
    route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro', 'Departure'],
  },
  {
    duration: '6 Nights / 7 Days',
    suitable: 'One of the most balanced Bhutan itineraries for first-time visitors',
    route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro', 'Phuentsholing / Departure'],
  },
  {
    duration: '7 Nights / 8 Days',
    suitable: 'A more relaxed itinerary with additional sightseeing and leisure time',
    route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro', 'Phuentsholing / Departure'],
  },
]

export default function TravelGuide() {
  const BUSINESS_CONTACT = useBusinessContact();
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    blogService.getAllPosts({ published: true }).then((res) => {
      setBlogPosts(res.data?.data || res.data || []);
    }).catch(() => {});
  }, []);

  const closeModal = useCallback(() => setSelectedPost(null), []);

  useEffect(() => {
    if (!selectedPost) return
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selectedPost, closeModal]);

  return (
    <>
      <SEO
        title="Bhutan Travel Guide – Tips, Costs & Planning | Happy Kingdom Travels"
        description="Everything you need to know to plan a comfortable and memorable Bhutan holiday from India. Travel costs, entry requirements, best time to visit, and more."
        keywords="bhutan travel guide, bhutan trip guide, bhutan planning, bhutan tips, bhutan travel information"
        type="website"
      />

      <section className="relative bg-gradient-to-br from-forest/95 to-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Travel Guide' }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Bhutan Travel Guide
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-8">
            Plan your Bhutan journey with practical information about travel costs, entry requirements, transportation, the best time to visit and recommended itineraries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/customize-your-trip"
              className="inline-flex items-center justify-center gap-2 bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-all"
            >
              Plan My Bhutan Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={createWhatsAppUrl(createGeneralMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 bg-gold rounded-full" />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Travel Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link
                key={guide.path}
                to={guide.path}
                className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-forest/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-forest" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center text-forest font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Blog & Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.slice(0, 6).map((post) => (
              <button
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-forest/10 transition-all duration-300 text-left"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  {post.category && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-forest/10 text-forest mb-3">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt || post.metaDescription || ''}
                  </p>
                  <span className="inline-flex items-center text-forest font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-gold rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Recommended Bhutan Itineraries</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mb-10">
            Different travellers need different trip durations. Here are popular itinerary lengths to help you choose the right Bhutan tour.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((itin) => (
              <div
                key={itin.duration}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{itin.duration}</h3>
                <p className="text-sm text-gray-500 mb-4">{itin.suitable}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-forest">
                  {itin.route.map((place, i) => (
                    <span key={i} className="flex items-center">
                      <span className="font-medium">{place}</span>
                      {i < itin.route.length - 1 && <span className="mx-1.5 text-gray-400">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/bhutan-tour-packages"
              className="inline-flex items-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all"
            >
              View Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Compass className="w-8 h-8 text-forest" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Can&apos;t Find the Right Bhutan Itinerary?</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Your Bhutan holiday doesn&apos;t have to follow a fixed package. Tell us your travel dates, preferred destinations, budget and travel style, and we&apos;ll help you plan an itinerary around your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/customize-your-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-all shadow-lg shadow-forest/25"
            >
              Customize My Trip
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={createWhatsAppUrl(createGeneralMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedPost.image && (
              <div className="h-64 sm:h-80 overflow-hidden rounded-t-2xl bg-gray-200">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                {selectedPost.category && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest/10 text-forest">
                    {selectedPost.category}
                  </span>
                )}
                {(selectedPost.createdAt || selectedPost.publishedAt) && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(selectedPost.createdAt || selectedPost.publishedAt)}
                  </span>
                )}
                {selectedPost.author && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {selectedPost.author}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h2>

              {selectedPost.excerpt && (
                <p className="text-gray-600 italic mb-6 border-l-4 border-forest/30 pl-4">
                  {selectedPost.excerpt}
                </p>
              )}

              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content || '<p>No content available.</p>') }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
