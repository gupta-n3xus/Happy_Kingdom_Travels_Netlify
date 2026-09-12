import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, Star, Camera, Mountain, Landmark, TreePine, Users, Heart, CheckCircle, Calendar, Compass, Footprints } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createDestinationMessage } from '../../utils/createWhatsAppMessage'
import PackageCard from '../../components/PackageCard'
import packageService from '../../services/packageService'

const Phuentsholing = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const phuentsholingPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('phuentsholing') || (pkg.title && pkg.title.toLowerCase().includes('phuentsholing'))
        })
        setPackages(phuentsholingPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Gateway, Transit, Border Experience, Culture', icon: Compass },
    { label: 'Recommended Stay', value: '0-1 Night', icon: Clock },
    { label: 'Popular With', value: 'Indian Travellers, Road Trip Enthusiasts', icon: Users },
    { label: 'Altitude', value: '~290m', icon: Mountain },
    { label: 'Best Time', value: 'Oct-May (dry months)', icon: Calendar },
  ]

  const whyVisit = [
    {
      title: 'Gateway to Bhutan',
      description: 'Phuentsholing is the primary overland entry point into Bhutan from India, making it the first taste of the Land of the Thunder Dragon for travellers arriving by road from West Bengal.',
      icon: Compass,
    },
    {
      title: 'India-Bhutan Border',
      description: 'Experience the unique India-Bhutan international border crossing, where two cultures, currencies, and ways of life meet at a single point separated by a gate and an immigration desk.',
      icon: Landmark,
    },
    {
      title: 'Cultural Blend',
      description: 'A fascinating mix of Bhutanese and Indian cultures, where traditional Bhutanese architecture sits alongside Indian markets, and Hindi, Nepali, Dzongkha, and English are all spoken on the same streets.',
      icon: Users,
    },
    {
      title: 'Local Markets',
      description: 'Browse vibrant markets selling Bhutanese handicrafts, handwoven textiles, traditional stamps, incense, and local products alongside Indian goods at competitive prices.',
      icon: Heart,
    },
    {
      title: 'Starting Point for Bhutan',
      description: 'For overland travellers, Phuentsholing marks the beginning of the Bhutan adventure. From here, scenic drives lead to Thimphu, Paro, and beyond through winding mountain roads.',
      icon: Footprints,
    },
    {
      title: 'Jaigaon Connection',
      description: 'The bustling Indian town of Jaigaon sits directly across the border, creating a unique twin-town dynamic where daily cross-border trade and movement are a way of life.',
      icon: MapPin,
    },
  ]

  const topPlaces = [
    {
      name: 'Bhutan Gate',
      description:
        'The iconic Bhutan Gate is the ceremonial archway marking the international border between Bhutan and India. This beautifully ornate structure features traditional Bhutanese woodwork and paintings, making it the most photographed landmark in the town. Standing beneath the gate, you can literally be in two countries at once — a symbolic and memorable moment for every traveller. The gate is located at the end of the main road and serves as the official immigration checkpoint for overland travellers entering Bhutan.',
      icon: Landmark,
      duration: '15-30 minutes',
    },
    {
      name: 'Zangto Pelri Park',
      description:
        'A peaceful central park in the heart of Phuentsholing, Zangto Pelri Park features a small-scale replica of the famous Taktsang (Tiger\'s Nest) Monastery. The park is a favourite spot for locals and visitors alike, offering shaded walking paths, manicured gardens, and a quiet retreat from the busy border streets. The miniature Tiger\'s Nest replica provides an excellent photo opportunity and a preview of what awaits deeper in Bhutan. Children especially enjoy the open spaces and the park-like setting.',
      icon: TreePine,
      duration: '30-45 minutes',
    },
    {
      name: 'Amo Chhu Crocodile Park',
      description:
        'Located about 5 km from the town centre, the Amo Chhu Crocodile Park is a family-friendly attraction that houses several species of crocodiles and alligators in naturalistic enclosures. The park is a popular stop for families travelling with children and offers educational exhibits about reptile conservation. Set along the riverbank, the park also provides pleasant walking trails and a chance to see these ancient creatures up close in a safe environment.',
      icon: TreePine,
      duration: '1-2 hours',
    },
    {
      name: 'Local Markets',
      description:
        'Phuentsholing\'s bustling markets offer a unique shopping experience where Bhutanese and Indian products sit side by side. Browse through stalls selling handwoven Bhutanese textiles, traditional stamps, wooden masks, incense sticks, and local cheese alongside Indian electronics, clothing, and groceries. The market area is also a great place to sample local street food and experience the everyday life of this border town. Bargaining is common and expected.',
      icon: Heart,
      duration: '1-2 hours',
    },
    {
      name: 'Border Experience',
      description:
        'Walking across the India-Bhutan border at Phuentsholing is a unique experience in itself. The border is marked by the ornate Bhutan Gate on one side and a simpler Indian checkpoint on the other. Watch as trucks loaded with goods cross between the two countries, observe the immigration process, and feel the cultural shift as you step from one nation into another. The area around the border is lively with shops, eateries, and the constant movement of people and commerce.',
      icon: Footprints,
      duration: '30-60 minutes',
    },
  ]

  const thingsToDo = [
    {
      title: 'Visit Bhutan Gate',
      description: 'Stand at the iconic border archway and capture the moment you cross between India and Bhutan. The ornate gate is a symbol of the friendship between the two nations and an essential photo stop.',
      icon: Landmark,
    },
    {
      title: 'Explore the Markets',
      description: 'Dive into the bustling local markets to shop for Bhutanese handicrafts, textiles, stamps, and local products. The markets are a sensory experience full of colors, aromas, and friendly banter.',
      icon: Heart,
    },
    {
      title: 'Crocodile Park Visit',
      description: 'Take a short trip to the Amo Chhu Crocodile Park for a family-friendly outing. See crocodiles and alligators in natural settings along the riverbank and enjoy the peaceful surroundings.',
      icon: TreePine,
    },
    {
      title: 'Border Walk',
      description: 'Walk between the Indian and Bhutanese sides of the border to experience the cultural contrast. Observe the daily cross-border movement of locals and the unique twin-town atmosphere.',
      icon: Footprints,
    },
    {
      title: 'Try Local Food',
      description: 'Sample a mix of Bhutanese and Indian cuisine at local eateries. From momos and ema datshi-inspired dishes to Indian thalis and street food, the border town offers a delicious fusion of flavors.',
      icon: Compass,
    },
    {
      title: 'Begin Your Bhutan Journey',
      description: 'Use Phuentsholing as your launching pad for a Bhutan adventure. Complete immigration formalities and embark on the scenic overland drive to Thimphu, Paro, or Punakha through stunning Himalayan landscapes.',
      icon: Mountain,
    },
  ]

  const seasons = [
    {
      season: 'Winter (October - February)',
      description: 'The best time to visit Phuentsholing is during the cooler, drier months. The weather is pleasant with clear skies, making it comfortable for border crossings and exploring the town. Roads to interior Bhutan are also in better condition during this period.',
    },
    {
      season: 'Spring (March - May)',
      description: 'Spring brings warmer temperatures and occasional pre-monsoon showers. The surrounding hills begin to green up, and it is a reasonable time to visit before the monsoon rains set in. Roads remain accessible for onward travel.',
    },
    {
      season: 'Monsoon (June - September)',
      description: 'The monsoon season brings heavy rainfall that can affect road conditions between Phuentsholing and interior Bhutan. Landslides are possible on mountain roads. While the town itself remains accessible, travel beyond Phuentsholing may be disrupted. Plan accordingly if visiting during this period.',
    },
  ]

  const howToReach = [
    {
      title: 'By Road from NJP/Bagdogra',
      description: 'The most common route for Indian travellers is driving from New Jalpaiguri (NJP) railway station or Bagdogra Airport in West Bengal. The journey takes approximately 3-4 hours by car through scenic tea gardens and foothills of the Eastern Himalayas. Shared taxis and private vehicles are readily available.',
      icon: Compass,
    },
    {
      title: 'Direct from Jaigaon',
      description: 'Jaigaon, the Indian border town, is directly adjacent to Phuentsholing and accessible on foot. Travellers already in Jaigaon can simply walk across the border after completing immigration formalities at the checkpoint.',
      icon: Footprints,
    },
    {
      title: 'From Kolkata / Siliguri',
      description: 'For travellers from Kolkata, the overnight train to NJP followed by a road journey is the most popular option. Siliguri serves as the regional hub with connectivity by road, rail, and air (Bagdogra) to Phuentsholing.',
      icon: MapPin,
    },
  ]

  const accommodation = [
    { category: 'Budget / Standard', description: 'Simple hotels and guesthouses near the border offering basic amenities. Ideal for overnight transit stays and budget-conscious travellers who want a clean, no-frills rest before continuing into Bhutan.' },
    { category: 'Comfort', description: 'Mid-range hotels with modern amenities, restaurants, and convenient locations in the town centre. Suitable for families and travellers wanting a comfortable overnight stay with good dining options.' },
    { category: 'Premium', description: 'Upscale hotels with enhanced facilities, business centres, and quality dining. Best for travellers who want a more refined experience or are using Phuentsholing as a base for cross-border activities.' },
  ]

  const travelTips = [
    { title: 'Verify Current Entry Rules', description: `Immigration rules and permits for entering Bhutan can change. Always check the latest entry requirements, visa regulations, and permit processes with the Bhutanese immigration authorities or your tour operator before travelling. ${BUSINESS_CONTACT.companyName} can guide you on current regulations.` },
    { title: 'Carry Valid Documents', description: 'You will need a valid passport (for international travellers) or valid photo ID (for Indian nationals entering Bhutan overland). Carry multiple photocopies and keep originals secure. Indian nationals may need an Entry Permit — confirm requirements before your trip.' },
    { title: 'Exchange Currency Before Crossing', description: 'The Indian Rupee is accepted in Phuentsholing and widely in Bhutan, but exchange rates may vary. The Bhutanese Ngultrum is pegged to the INR at par. Carry some local currency for smaller purchases on the Bhutanese side.' },
    { title: 'Start Early for Onward Travel', description: 'If Phuentsholing is a transit stop, begin your journey early in the morning to reach Thimphu (5-6 hours) or Paro (6-7 hours) before dark. Mountain roads require careful driving and daylight navigation.' },
    { title: 'Respect Border Etiquette', description: 'The border crossing is an international boundary. Be respectful, follow immigration procedures, carry your documents, and do not photograph restricted areas near the checkpoints. Follow queue discipline and have your papers ready.' },
    { title: 'Pack for Warmer Weather', description: 'Phuentsholing sits at a much lower altitude than Thimphu or Paro and is considerably warmer. Pack light, breathable clothing for your time here, but carry layers for when you ascend to higher elevations in interior Bhutan.' },
  ]

  const faqs = [
    {
      question: 'Do all travellers enter Bhutan through Phuentsholing?',
      answer: 'No. Phuentsholing is one of several entry points into Bhutan. Many international tourists fly directly into Paro International Airport from Delhi, Kathmandu, Kolkata, Bangkok, or Singapore. Phuentsholing is the primary overland entry point from India, mainly used by road travellers. The entry point depends on your itinerary and travel preferences.',
    },
    {
      question: 'What is the India-Bhutan border crossing like?',
      answer: 'The border crossing at Phuentsholing is straightforward. Walk through Bhutan Gate, present your documents at the Bhutanese immigration desk, and receive your entry permit or stamp. The process is generally efficient but can be busy during peak hours. Indian nationals with valid ID can obtain an entry permit on arrival.',
    },
    {
      question: 'Can I get picked up from Jaigaon or Phuentsholing?',
      answer: `Yes, we offer pickup services from Phuentsholing and nearby Jaigaon for guests booking Bhutan tour packages with ${BUSINESS_CONTACT.companyName}. Our team can arrange transportation from the border to your hotel or for onward travel into Bhutan. Contact us on WhatsApp for details.`,
    },
    {
      question: 'Do I need a permit to enter Bhutan from Phuentsholing?',
      answer: 'Indian nationals entering Bhutan overland at Phuentsholing generally need an Entry Permit issued at the border immigration office. International tourists (non-Indian) typically require a visa arranged in advance through a licensed Bhutanese tour operator. Permit requirements can change, so verify current rules before travel.',
    },
    {
      question: 'How long does immigration take at Phuentsholing?',
      answer: 'Immigration processing typically takes 15-30 minutes but can take longer during busy periods, holidays, or weekends. Arrive with your documents filled out and ready to expedite the process. Weekday mornings are generally the quickest times to cross.',
    },
    {
      question: 'What is there to do in Phuentsholing for a few hours?',
      answer: 'Phuentsholing offers several attractions for a short visit: photograph the iconic Bhutan Gate, stroll through Zangto Pelri Park, visit the Amo Chhu Crocodile Park, explore the local markets, and enjoy a meal at a local restaurant. The town is compact and most sights are within walking distance of the border.',
    },
    {
      question: 'Is Phuentsholing safe for tourists?',
      answer: 'Phuentsholing is a safe and welcoming town for tourists. As with any international border area, exercise normal travel precautions — keep your documents secure, be aware of your belongings in crowded markets, and follow immigration procedures. The local community is accustomed to travellers and generally helpful.',
    },
    {
      question: 'Can I use Indian Rupees in Phuentsholing?',
      answer: 'Yes, the Indian Rupee (INR) is widely accepted in Phuentsholing and throughout Bhutan since the Bhutanese Ngultrum is pegged at par with the INR. You can pay in INR for most purchases, services, and transportation. ATMs are available on both sides of the border.',
    },
  ]

  const relatedDestinations = [
    { name: 'Paro', slug: 'paro', description: 'Home to the iconic Tiger\'s Nest Monastery, ancient dzongs, and Bhutan\'s only international airport nestled in a stunning Himalayan valley.' },
    { name: 'Thimphu', slug: 'thimphu', description: "Bhutan's capital city blends modern development with ancient tradition, home to the massive Buddha Dordenma statue and vibrant weekend markets." },
    { name: 'Punakha', slug: 'punakha', description: 'The ancient capital boasts the stunning Punakha Dzong at the confluence of two rivers and serene rice paddy trails through rural villages.' },
    { name: 'Haa Valley', slug: 'haa-valley', description: 'A hidden gem with pristine beauty, ancient temples, and traditional farmhouses nestled between two river valleys far from tourist crowds.' },
    { name: 'Bumthang', slug: 'bumthang', description: "The spiritual heartland of Bhutan with four valleys filled with ancient temples, sacred sites, and the country's oldest Buddhist monasteries." },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Phuentsholing', BUSINESS_CONTACT.companyName))

  return (
    <>
      <SEO
        title={`Phuentsholing Bhutan Travel Guide - Gateway to Bhutan, Jaigaon & Tours | ${BUSINESS_CONTACT.companyName}`}
        description={`Discover Phuentsholing Bhutan — the gateway from India. Explore Bhutan Gate, border crossing, local markets, Jaigaon connection, and Bhutan tour packages. Plan your Phuentsholing journey with ${BUSINESS_CONTACT.companyName}.`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/phuentsholing-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Phuentsholing' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Phuentsholing, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            The gateway to Bhutan from India — where two cultures meet at an international border, and your Himalayan journey begins.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/bhutan-tour-packages"
              className="bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-colors inline-flex items-center gap-2"
            >
              Explore Packages <ArrowRight size={18} />
            </Link>
            <Link
              to="/customize-your-trip"
              className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Customize Trip <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gold rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Phuentsholing</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Phuentsholing is Bhutan's most important overland gateway, a southern border town that serves as the primary entry point for travellers arriving from India's West Bengal state. Sitting at an altitude of just 290 metres, the town enjoys a significantly warmer climate than Bhutan's highland destinations and serves as the first taste of the Kingdom for thousands of overland visitors each year. The town lies directly across from the Indian town of Jaigaon, and the two communities are separated only by the ornate Bhutan Gate and an international immigration checkpoint.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Unlike Bhutan's mountain monasteries and ancient dzongs, Phuentsholing offers a different kind of experience — a bustling commercial centre where Bhutanese and Indian cultures blend seamlessly on the same streets. Traditional Bhutanese architecture shares space with Indian market stalls, and multiple languages echo through the daily commerce. For overland travellers, Phuentsholing is both a transit point and an experience in itself: the moment you cross the border, you feel the shift in atmosphere, architecture, and pace that signals you have entered the Land of the Thunder Dragon.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              While many travellers pass through Phuentsholing on their way to Thimphu, Paro, or Punakha, the town rewards those who take time to explore its markets, parks, and the unique border experience. It is a fascinating contrast to the rest of Bhutan and a reminder that this small Himalayan kingdom sits at the crossroads of South Asian cultures. Whether you stay for an hour or an overnight, Phuentsholing marks the beginning of something special.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Phuentsholing</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickFacts.map((fact, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <fact.icon className="w-8 h-8 text-forest mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-1">{fact.label}</p>
                <p className="font-semibold text-gray-900 text-sm">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Phuentsholing?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Phuentsholing offers a unique border-town experience that sets the tone for your entire Bhutan journey.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyVisit.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Places */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From the iconic border gate to local parks and markets, Phuentsholing's attractions reflect its unique position as a crossroads town.
          </p>
          <div className="space-y-6">
            {topPlaces.map((place, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <place.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-xl">{place.name}</h3>
                      <span className="text-xs bg-forest/10 text-forest px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock size={12} /> {place.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{place.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Things to Do */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your time at the gateway to Bhutan with these experiences.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thingsToDo.map((activity, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <activity.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Phuentsholing's low altitude means warmer weather year-round, but monsoon conditions can affect onward travel.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {seasons.map((season, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-forest" />
                  <h3 className="font-bold text-gray-900 text-lg">{season.season}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{season.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Phuentsholing is easily accessible from India's West Bengal, making it the most convenient overland entry to Bhutan.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {howToReach.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Many Days */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gold rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Phuentsholing?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Most travellers spend <strong className="text-gray-900">0 to 1 night</strong> in Phuentsholing. It is primarily a transit point where you complete immigration formalities before continuing to Thimphu (5-6 hours), Paro (6-7 hours), or other destinations in Bhutan.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                If you arrive late in the day, an overnight stay is recommended to start the scenic mountain drive the next morning in daylight. Phuentsholing has comfortable accommodation options for a one-night stay and enough attractions to fill a few hours.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For travellers with limited time, it is possible to complete immigration in Phuentsholing and continue to Thimphu or Paro on the same day, though the long drive is best started early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Phuentsholing Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            A typical 2-day plan using Phuentsholing as your Bhutan entry point.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">01</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 1: NJP/Bagdogra to Phuentsholing</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Depart from NJP railway station or Bagdogra Airport</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Scenic 3-4 hour drive through tea gardens and foothills</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Arrive in Phuentsholing and check into your hotel</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Visit Bhutan Gate and explore the border area</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Evening stroll through local markets and dinner</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-forest relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">02</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 2: Immigration & Onward Journey</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Early morning immigration formalities at the checkpoint</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Visit Zangto Pelri Park and the miniature Tiger's Nest</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore local markets for Bhutanese souvenirs</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Begin scenic drive to Thimphu or Paro (5-7 hours)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Arrive at your destination and begin Bhutan exploration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Visit */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Phuentsholing?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Phuentsholing is an essential stop for certain types of travellers entering Bhutan overland.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Indian Travellers', description: 'The most convenient overland entry point for Indians, with familiar language, currency, and cuisine on the Indian side before crossing into Bhutan.', icon: Users },
              { title: 'Road Trip Enthusiasts', description: 'The drive from NJP or Bagdogra through tea gardens and foothills to Phuentsholing is a scenic start to an epic Himalayan road trip adventure.', icon: Compass },
              { title: 'Budget Travellers', description: 'Overland entry via Phuentsholing can be more affordable than flying into Paro, making it a popular choice for budget-conscious travellers.', icon: Heart },
              { title: 'First-Time Bhutan Visitors', description: 'Crossing the border on foot through Bhutan Gate gives first-time visitors a memorable, tangible introduction to the Kingdom.', icon: Star },
              { title: 'Cultural Explorers', description: 'The India-Bhutan border dynamic, twin-town atmosphere, and cultural blend make Phuentsholing a fascinating study in cross-border life.', icon: Landmark },
              { title: 'Transit Travellers', description: 'Those using the overland route to reach Thimphu, Paro, or Punakha find Phuentsholing a convenient and interesting first stop.', icon: MapPin },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Practical advice to make your border crossing and stay in Phuentsholing smooth and enjoyable.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-forest" />
                  <h3 className="font-bold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Accommodation in Phuentsholing ranges from basic transit hotels to comfortable mid-range properties.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodation.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-forest text-lg mb-2">{item.category}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Phuentsholing Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our tour packages that include Phuentsholing as a key stop on your Bhutan overland journey.
          </p>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-forest border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading packages...</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id || pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Mountain className="w-12 h-12 text-forest/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Packages Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're curating the best Phuentsholing and overland Bhutan tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/bhutan-tour-packages"
                  className="bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-colors inline-flex items-center gap-2"
                >
                  View All Packages <ArrowRight size={18} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Phuentsholing</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about crossing into Bhutan at Phuentsholing? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Plan Your Bhutan Journey From Phuentsholing?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized itinerary that starts from Phuentsholing and takes you through the best of Bhutan. Whether it's a quick transit or a complete overland adventure, we'll design the perfect trip for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/customize-your-trip"
              className="bg-gold text-forest px-8 py-3.5 rounded-xl font-bold hover:bg-gold/90 transition-colors inline-flex items-center gap-2"
            >
              Customize Trip <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Other Destinations</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Phuentsholing is just the beginning. Discover more incredible destinations across Bhutan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {relatedDestinations.map((dest, index) => (
              <Link
                key={index}
                to={`/destinations/${dest.slug}`}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-forest/20 transition-all group"
              >
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-forest/20 transition-colors">
                  <MapPin className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-forest transition-colors">{dest.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{dest.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-6 h-6 text-gold fill-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Plan Your Bhutan Journey With {BUSINESS_CONTACT.companyName}</h2>
            <Star className="w-6 h-6 text-gold fill-gold" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            From seamless border crossing assistance and entry permit guidance to expert local guides and handpicked accommodations, {BUSINESS_CONTACT.companyName} ensures your Bhutan adventure starting from Phuentsholing is effortless and unforgettable. We handle every detail so you can focus on experiencing the magic of the Kingdom.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/bhutan-tour-packages"
              className="bg-forest text-white px-8 py-3.5 rounded-xl font-bold hover:bg-forest/90 transition-colors inline-flex items-center gap-2"
            >
              Browse Packages <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Phuentsholing
