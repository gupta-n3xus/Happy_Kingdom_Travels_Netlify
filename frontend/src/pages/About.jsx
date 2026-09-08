import { Link } from 'react-router-dom'
import { Shield, Users, Award, Heart, MapPin, Clock, Compass, Headphones } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import CTASection from '../components/CTASection'

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    desc: 'No hidden costs. What you see is what you pay. Every detail is shared upfront.',
  },
  {
    icon: Users,
    title: 'Expert Local Team',
    desc: 'Certified Bhutanese guides and experienced travel consultants who know every corner.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    desc: 'Premium accommodations, reliable transport, and seamless logistics throughout.',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    desc: 'Every trip is tailored to your preferences. No cookie-cutter itineraries.',
  },
  {
    icon: Compass,
    title: 'Authentic Experiences',
    desc: 'Go beyond tourist spots. We connect you with real Bhutanese culture and traditions.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Round-the-clock assistance during your trip. We are always just a call away.',
  },
]

const services = [
  'Complete trip planning and customization',
  'Bhutan visa processing assistance',
  'Airport transfers and local transport',
  'Hotel and resort bookings',
  'Licensed Bhutanese tour guides',
  'Cultural experiences and activities',
  'Trekking and adventure arrangements',
  '24/7 on-trip support',
]

const About = () => {
  return (
    <>
      <SEO
        title="About Us | Bhutan Travel Experts"
        description="Learn about our Bhutan travel expertise. Complete trip management, transparent pricing, and personalized itineraries for your perfect Bhutan vacation."
        keywords="about Bhutan travels, Bhutan travel company, Bhutan tour operator, Bhutan travel experts"
      />

      <section className="relative h-80 bg-gradient-to-r from-primary to-secondary flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Your trusted partner for authentic Bhutan experiences
          </p>
        </div>
      </section>

      <section className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-medium">Our Story</span>
              <h2 className="font-display text-4xl font-bold text-charcoal mt-2 mb-6">
                Passion for Bhutan
              </h2>
              <div className="space-y-4 text-muted">
                <p>
                  We are a team of travel enthusiasts dedicated to sharing the beauty and culture of
                  Bhutan with travelers from around the world. Our deep connection with the Land of
                  the Thunder Dragon drives everything we do.
                </p>
                <p>
                  Our team consists of experienced travel consultants and certified Bhutanese guides
                  who bring firsthand knowledge of Bhutan's hidden gems, cultural nuances, and the
                  best experiences the country has to offer.
                </p>
                <p>
                  We handle every aspect of your Bhutan journey — from initial planning and visa
                  processing to on-ground logistics and 24/7 support — so you can focus on creating
                  memories.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/punakha-hero.jpg"
                alt="Bhutan landscape"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center">
                  <div className="text-center mr-6">
                    <p className="font-display text-3xl font-bold text-primary">
                      <MapPin className="w-6 h-6 inline" />
                    </p>
                    <p className="text-muted text-sm">Bhutan Experts</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center ml-6">
                    <p className="font-display text-3xl font-bold text-accent">100%</p>
                    <p className="text-muted text-sm">Dedicated Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium">What We Do</span>
            <h2 className="font-display text-4xl font-bold text-charcoal mt-2 mb-4">
              Complete Trip Management
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              From the moment you reach out to the moment you return home, we handle everything
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="flex items-center p-4 bg-warmWhite rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <span className="text-primary font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-charcoal font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-medium">Why Choose Us</span>
            <h2 className="font-display text-4xl font-bold text-charcoal mt-2 mb-4">
              Our Values
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              What makes us the right choice for your Bhutan journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">{value.title}</h3>
                <p className="text-muted">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To make Bhutan accessible to every traveler while preserving its unique culture and
                environment. We believe in responsible tourism that benefits local communities and
                creates meaningful experiences for our guests.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold mb-4">Our Approach</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  <span>Personalized planning for every traveler</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  <span>Transparent pricing with no surprises</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  <span>Local expertise with global standards</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  <span>Commitment to sustainable tourism</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Explore Bhutan?"
        subtitle="Contact us today for a free consultation and personalized quote."
        primaryCTA={{ text: 'Contact Us', link: '/contact' }}
        secondaryCTA={{ text: 'View Packages', link: '/bhutan-tour-packages' }}
      />
    </>
  )
}

export default About
