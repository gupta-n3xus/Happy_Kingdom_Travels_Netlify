import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, Star, Camera, Mountain, Landmark, TreePine, Users, Heart, CheckCircle, Calendar, Compass, Waves } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createDestinationMessage } from '../../utils/createWhatsAppMessage'
import PackageCard from '../../components/PackageCard'
import packageService from '../../services/packageService'

const Punakha = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const punakhaPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('punakha') || (pkg.title && pkg.title.toLowerCase().includes('punakha'))
        })
        setPackages(punakhaPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Dzongs, Nature, Romance, Valley Scenery', icon: Compass },
    { label: 'Recommended Stay', value: '1-2 Nights', icon: Clock },
    { label: 'Popular With', value: 'Couples, Honeymooners, Nature Lovers', icon: Users },
    { label: 'Altitude', value: '~1,200m', icon: Mountain },
    { label: 'Best Time', value: 'Mar-May, Sep-Nov', icon: Calendar },
  ]

  const whyVisit = [
    {
      title: 'Punakha Dzong',
      description: 'Often called the most beautiful dzong in Bhutan, Punakha Dzong sits majestically at the confluence of the Mo Chhu and Pho Chhu rivers. Its stunning architecture, rich history, and riverside setting make it an unmissable landmark.',
      icon: Landmark,
    },
    {
      title: 'River Confluence',
      description: 'The dramatic meeting of the Mo Chhu (Mother River) and Pho Chhu (Father River) creates a breathtaking natural spectacle. The turquoise and green waters merge amidst lush valley walls, offering peaceful riverside walks.',
      icon: Waves,
    },
    {
      title: 'Suspension Bridge',
      description: "Bhutan's longest suspension bridge draped in colourful prayer flags connects the road to the dzong. Walking across it with the river rushing below is an unforgettable experience and a photographer's delight.",
      icon: Compass,
    },
    {
      title: 'Chimi Lhakhang',
      description: 'Known as the Temple of Fertility, this 15th-century monastery founded by Lama Drukpa Kuenley is a pilgrimage site for couples seeking blessings. The walk through rice paddies and villages to reach it is equally rewarding.',
      icon: Heart,
    },
    {
      title: 'Valley Landscapes',
      description: 'Punakha Valley is one of the most fertile and picturesque in Bhutan. Lush rice terraces, traditional farmhouses, and warm subtropical forests create a landscape that feels like a Himalayan paradise.',
      icon: TreePine,
    },
    {
      title: 'Khamsum Yulley Namgyal Chorten',
      description: 'A spectacular hilltop chorten reached by a scenic hike through rice paddies and forest. The panoramic views of the valley from the top are among the most rewarding in all of Bhutan.',
      icon: Mountain,
    },
  ]

  const topPlaces = [
    {
      name: 'Punakha Dzong',
      description:
        'Punakha Dzong, officially known as Pungtang Dewachen Phodrang, is arguably the most beautiful dzong in Bhutan. Built in 1638-37 by Zhabdrung Ngawang Namgyal, it sits at the dramatic confluence of the Mo Chhu and Pho Chhu rivers. The dzong houses the administrative offices of the Punakha district and the winter residence of the Central Monastic Body. In spring, the courtyard is framed by blooming jacaranda trees in stunning purple, creating one of Bhutan\'s most photographed scenes. Walk across the traditional cantilever bridge and marvel at the intricate woodwork, murals, and sacred relics inside.',
      icon: Landmark,
      duration: '2-3 hours',
    },
    {
      name: 'Punakha Suspension Bridge',
      description:
        'The longest suspension bridge in Bhutan stretches across the Pho Chhu river, connecting the main road to the path leading to Punakha Dzong. Colourful prayer flags flutter overhead as the bridge sways gently with the river breeze below. The walk across offers panoramic views of the river, the valley walls, and the dzong in the distance. It is a popular photography spot and a serene place to soak in the natural beauty of Punakha. Early morning visits offer the best light and fewer crowds.',
      icon: Compass,
      duration: '20-30 minutes',
    },
    {
      name: 'Chimi Lhakhang',
      description:
        'Perched on a small hillock surrounded by rice paddies, Chimi Lhakhang is the Temple of Fertility founded by the beloved "Divine Madman" Lama Drukpa Kuenley in the 15th century. The temple is a pilgrimage site for couples hoping to conceive and for visitors seeking blessings of all kinds. The walk to the temple passes through charming villages, paddy fields, and forested trails, offering an authentic glimpse into rural Punakha life. The temple\'s vibrant murals and peaceful courtyard make it a deeply spiritual experience.',
      icon: Heart,
      duration: '1-2 hours (including walk)',
    },
    {
      name: 'Khamsum Yulley Namgyal Chorten',
      description:
        'This ornate hilltop chorten was built over nine years by the Queen Mother to bring peace and harmony to Bhutan. The hike to reach it winds through rice terraces, suspension bridges, and forest, culminating in breathtaking panoramic views of the entire Punakha Valley and the winding river below. The chorten itself is a masterpiece of Bhutanese craftsmanship, adorned with intricate carvings and vibrant paintings. It is one of the most rewarding short hikes in the country.',
      icon: Mountain,
      duration: '2-3 hours (round trip)',
    },
    {
      name: 'Mo Chhu & Pho Chhu Rivers',
      description:
        'The Mo Chhu (Mother River) and Pho Chhu (Father River) are the lifeblood of Punakha Valley. Their confluence at the dzong is a sacred site, and their waters support the lush agriculture of the valley. Rafting on the Mo Chhu offers gentle rapids perfect for beginners and families, while the riverside walks along both rivers are peaceful and scenic. The clear turquoise and emerald waters contrast beautifully with the green valley walls and white dzong walls.',
      icon: Waves,
      duration: 'Half day or more',
    },
    {
      name: 'Punakha Valley',
      description:
        'The Punakha Valley is one of the most fertile and warm valleys in Bhutan, situated at a lower altitude than most of the country. Lush rice terraces cascade down the hillsides, traditional farmhouses dot the landscape, and subtropical vegetation thrives in the mild climate. The valley offers a glimpse into Bhutanese agrarian life, with farmers working the fields and villagers going about their daily routines. Walk through the villages, visit local homes, and enjoy the tranquillity of this Himalayan paradise.',
      icon: TreePine,
      duration: 'Half day or more',
    },
  ]

  const thingsToDo = [
    {
      title: 'Visit Punakha Dzong',
      description: "Explore the most beautiful dzong in Bhutan, walk through its grand courtyards, admire sacred relics, and soak in the spiritual atmosphere where two rivers meet in a dramatic embrace.",
      icon: Landmark,
    },
    {
      title: 'Walk the Suspension Bridge',
      description: "Cross Bhutan's longest suspension bridge draped in prayer flags, with the Pho Chhu river rushing below. A serene and photogenic experience, especially in the soft morning light.",
      icon: Compass,
    },
    {
      title: 'Hike to the Chorten',
      description: "Trek through rice paddies and forest to reach the spectacular Khamsum Yulley Namgyal Chorten perched on a hilltop, rewarding you with the most panoramic valley views in Punakha.",
      icon: Mountain,
    },
    {
      title: 'Valley Walks',
      description: 'Stroll through traditional villages, lush rice terraces, and riverside paths in the warm, fertile Punakha Valley. Meet friendly locals and experience authentic rural Bhutanese life.',
      icon: TreePine,
    },
    {
      title: 'River Experiences',
      description: 'Enjoy gentle white-water rafting on the Mo Chhu, riverside picnics, or simply sit by the confluence and watch the waters merge in shades of turquoise and emerald.',
      icon: Waves,
    },
    {
      title: 'Photography',
      description: 'Capture the dzong reflected in the river, suspension bridges framed by prayer flags, golden rice terraces, and the lush green valley that makes Punakha a photographer\'s dream.',
      icon: Camera,
    },
  ]

  const seasons = [
    {
      season: 'Spring (March - May)',
      description: 'Punakha comes alive in spring with blooming jacaranda trees turning the dzong courtyard purple. The weather is warm and pleasant, rice paddies are being planted, and the valley is vibrant with new growth. This is arguably the best time to visit Punakha, with comfortable temperatures and stunning natural beauty.',
    },
    {
      season: 'Summer (June - August)',
      description: 'The monsoon season brings heavy rainfall to Punakha, making the valley incredibly lush and green but also muddy. Rivers swell with rainwater and rafting is at its most thrilling. While outdoor activities may be limited on rainy days, the valley is at its most verdant and dramatic. Pack waterproof gear and embrace the green paradise.',
    },
    {
      season: 'Autumn (September - November)',
      description: 'Autumn brings clear skies, golden rice terraces ready for harvest, and comfortable warm weather in Punakha. The valley glows with harvest colours and the river waters are crystal clear. The Punakha Drubchen festival adds cultural richness with its dramatic re-enactment of a 17th-century battle.',
    },
    {
      season: 'Winter (December - February)',
      description: 'Winter in Punakha is mild compared to higher-altitude destinations in Bhutan. The valley remains relatively warm, making it a popular winter retreat. Clear skies offer excellent visibility of the surrounding mountains and the dzong looks magnificent against the blue sky. Fewer tourists mean a more intimate experience.',
    },
  ]

  const howToReach = [
    {
      title: 'By Road from Thimphu',
      description: 'The most common route to Punakha is from Thimphu, a scenic 3-4 hour drive via the spectacular Dochula Pass (3,100m). The pass offers stunning panoramic views of the Eastern Himalayas on clear days, including Mount Gangkar Puensum. The road descends through lush forests into the warm Punakha Valley.',
      icon: Compass,
    },
    {
      title: 'By Road from Paro',
      description: 'From Paro, drive to Thimphu (1.5 hours) and continue to Punakha via Dochula Pass. The total journey takes approximately 5-6 hours and offers a wonderful cross-section of Bhutanese landscapes, from alpine forests to subtropical valleys.',
      icon: Compass,
    },
    {
      title: 'From Phuentsholing',
      description: 'The overland route from Phuentsholing on the Indian border passes through Thimphu before reaching Punakha. The full journey takes approximately 8-10 hours and is best split with an overnight stop in Thimphu.',
      icon: MapPin,
    },
  ]

  const sampleItinerary = [
    {
      day: 'Day 1',
      title: 'Thimphu to Punakha via Dochula Pass',
      activities: [
        'Depart Thimphu after breakfast',
        'Stop at Dochula Pass for panoramic Himalayan views and photographs',
        'Visit the 108 memorial chortens at Dochula',
        'Descend through forests into the warm Punakha Valley',
        'Check into your hotel and freshen up',
        'Walk across the Punakha Suspension Bridge',
        'Evening stroll along the Pho Chhu riverbank',
      ],
    },
    {
      day: 'Day 2',
      title: 'Punakha Dzong & Valley Sightseeing',
      activities: [
        'Morning visit to the magnificent Punakha Dzong',
        'Walk through the traditional cantilever bridge',
        'Hike to Khamsum Yulley Namgyal Chorten',
        'Enjoy panoramic valley views from the hilltop',
        'Visit Chimi Lhakhang (Temple of Fertility)',
        'Walk through rice terraces and village trails',
        'Optional: Rafting on the Mo Chhu river',
        'Return to hotel or continue to next destination',
      ],
    },
  ]

  const whoShouldVisit = [
    { title: 'Couples', description: "Punakha's romantic riverside setting, warm climate, and serene valleys make it the most romantic destination in Bhutan for couples seeking intimacy and beauty.", icon: Heart },
    { title: 'Honeymooners', description: 'With its stunning dzong, riverside walks, and lush valley scenery, Punakha offers the perfect romantic backdrop for honeymooners starting their journey together.', icon: Heart },
    { title: 'Nature Lovers', description: 'The fertile valley, river confluences, subtropical forests, and abundant birdlife make Punakha a paradise for those who love the natural world.', icon: TreePine },
    { title: 'Photography Enthusiasts', description: "From the dzong reflected in river waters to golden rice terraces and prayer-flag-draped bridges, Punakha offers endless photographic opportunities.", icon: Camera },
    { title: 'Culture Enthusiasts', description: "Bhutan's most beautiful dzong, ancient fertility temples, and living agricultural traditions offer deep cultural immersion in a stunning setting.", icon: Landmark },
    { title: 'Adventure Seekers', description: 'White-water rafting on the Mo Chhu, hilltop hikes to chortens, and suspension bridge crossings add adventure to the peaceful Punakha experience.', icon: Mountain },
  ]

  const travelTips = [
    { title: 'Layer Your Clothing', description: "Punakha is warmer than Thimphu and Paro, but mornings and evenings can still be cool. Layered clothing lets you adjust throughout the day for comfort during valley walks and dzong visits." },
    { title: 'Wear Comfortable Shoes', description: 'Valley walks, village trails, and the hike to Khamsum Yulley Namgyal Chorten involve uneven terrain. Sturdy, comfortable walking shoes with good grip are essential.' },
    { title: 'Carry Sun Protection', description: "The lower altitude means stronger UV rays in Punakha. Bring sunscreen, sunglasses, and a hat to protect yourself during outdoor activities and hikes." },
    { title: 'Respect Sacred Sites', description: 'Remove shoes before entering dzongs and temples. Walk clockwise around chortens and monasteries. Dress modestly and ask permission before photographing monks or religious ceremonies.' },
    { title: 'Start Early for Hikes', description: 'The hike to Khamsum Yulley Namgyal Chorten is best done in the morning when the weather is clear and the trail is not too warm. Carry water and wear a hat.' },
    { title: 'Book Guides in Advance', description: 'Bhutan requires all international tourists to book through a licensed tour operator. Your guide will handle permits, provide cultural context, and ensure you have the best Punakha experience.' },
  ]

  const accommodation = [
    { category: 'Budget / Standard', description: 'Clean guesthouses and hotels in Punakha town offering basic amenities and warm Bhutanese hospitality. Perfect for budget-conscious travellers wanting an authentic experience.' },
    { category: 'Comfort', description: 'Mid-range hotels and resorts with valley or river views, modern amenities, and restaurant facilities. Great value for couples and families wanting comfort without premium pricing.' },
    { category: 'Premium', description: 'Boutique properties and upscale hotels with stunning river or valley views, spa facilities, fine dining, and personalized service. Ideal for a refined Punakha experience.' },
    { category: 'Luxury', description: 'World-class luxury resorts set in breathtaking locations along the river or in the valley, offering exclusive dining, wellness programs, and bespoke experiences.' },
  ]

  const faqs = [
    {
      question: 'How do I get to Punakha from Thimphu?',
      answer: 'Punakha is a scenic 3-4 hour drive from Thimphu via the spectacular Dochula Pass at 3,100m. The pass offers stunning Himalayan views on clear days. The road is well-maintained and your tour guide or driver will handle the journey comfortably.',
    },
    {
      question: 'How many days do I need in Punakha?',
      answer: 'We recommend spending 1-2 nights in Punakha to cover the major highlights including Punakha Dzong, the Suspension Bridge, Chimi Lhakhang, and the hike to Khamsum Yulley Namgyal Chorten. A 2-night stay allows for a more relaxed pace and optional rafting.',
    },
    {
      question: 'Is Punakha warmer than Thimphu?',
      answer: 'Yes, Punakha is significantly warmer than Thimphu due to its lower altitude of around 1,200m compared to Thimphu at 2,300m. The subtropical climate makes Punakha a popular winter retreat when higher valleys are cold.',
    },
    {
      question: 'What is the best time to visit Punakha?',
      answer: 'Spring (March-May) is arguably the best time to visit Punakha with blooming jacaranda trees around the dzong. Autumn (September-November) offers golden rice terraces and clear skies. Winter is mild and less crowded.',
    },
    {
      question: 'Is Punakha safe for tourists?',
      answer: 'Punakha is extremely safe for tourists. Bhutan has very low crime rates and the local people are known for their warmth and hospitality. Exercise normal travel precautions and enjoy a worry-free visit.',
    },
    {
      question: 'Can I go rafting in Punakha?',
      answer: 'Yes, white-water rafting on the Mo Chhu river is available in Punakha. The rapids range from gentle Class I-II perfect for beginners and families to more challenging sections. Your tour operator can arrange a rafting experience.',
    },
    {
      question: 'What is Chimi Lhakhang famous for?',
      answer: 'Chimi Lhakhang, the Temple of Fertility, was founded by Lama Drukpa Kuenley in the 15th century. It is a pilgrimage site for couples seeking blessings for children and for visitors seeking spiritual blessings. The walk through rice paddies to reach it is equally memorable.',
    },
    {
      question: 'Do I need a guide to visit Punakha Dzong?',
      answer: 'Yes, Bhutan requires all international tourists to book through a licensed tour operator. Your guide will accompany you to Punakha Dzong and all other sites, providing invaluable cultural context and handling any necessary permits.',
    },
  ]

  const relatedDestinations = [
    { name: 'Paro', slug: 'paro', description: "Home to the iconic Tiger's Nest Monastery, ancient dzongs, and Bhutan's only international airport set in a stunning Himalayan valley." },
    { name: 'Thimphu', slug: 'thimphu', description: "Bhutan's vibrant capital blends modern development with ancient tradition, home to the massive Buddha Dordenma statue and lively weekend markets." },
    { name: 'Phuentsholing', slug: 'phuentsholing', description: "Bhutan's gateway town on the Indian border offers a unique blend of cultures and is the starting point for overland journeys into the country." },
    { name: 'Haa Valley', slug: 'haa-valley', description: 'A hidden gem with pristine beauty, ancient temples, and traditional farmhouses nestled between two river valleys far from tourist crowds.' },
    { name: 'Bumthang', slug: 'bumthang', description: "The spiritual heartland of Bhutan with four valleys filled with ancient temples, sacred sites, and the country's oldest Buddhist monasteries." },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Punakha'))

  return (
    <>
      <SEO
        title="Punakha Bhutan Travel Guide - Punakha Dzong, Things to Do & Tours | Happy Kingdom Travels"
        description="Discover Punakha Bhutan with our complete travel guide. Explore the stunning Punakha Dzong, top places to visit, things to do, best time to visit, and Bhutan tours. Plan your Punakha adventure with Happy Kingdom Travels."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/punakha-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Punakha' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Punakha, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Discover the spectacular Punakha Dzong standing at the confluence of two sacred rivers, lush rice terraces, and the warmest valley in the Himalayan kingdom. Punakha is Bhutan's most romantic destination.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Punakha</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Punakha is the former capital of Bhutan and home to what many consider the most beautiful dzong in the entire Himalayan kingdom. Nestled at the confluence of the Mo Chhu (Mother River) and Pho Chhu (Father River), this ancient fortress-monastery has stood as a symbol of Bhutanese power and spirituality since the 17th century. The valley it anchors is one of the most fertile in the country, with lush rice terraces cascading down hillsides and traditional farmhouses dotting the landscape.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Punakha enjoys a uniquely warm and subtropical climate, making it the most comfortable valley to visit year-round and a popular winter retreat for Bhutanese royalty. The confluence of two sacred rivers, the legendary Temple of Fertility at Chimi Lhakhang, and the spectacular hilltop chorten of Khamsum Yulley Namgyal create a destination that blends spiritual significance with natural beauty in a way that few places on earth can match.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're seeking a romantic escape through rice paddy trails, a spiritual pilgrimage to ancient dzongs, or simply the peace of a river valley far from the modern world, Punakha delivers an experience that stays with you long after you leave. Its warmth, both in climate and in the hearts of its people, makes it a destination you'll want to return to again and again.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Punakha</h2>
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

      {/* Why Visit Punakha */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Punakha?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Punakha offers a unique blend of dzong grandeur, river beauty, fertile valley landscapes, and romantic warmth that sets it apart from any other destination in Bhutan.
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

      {/* Top Places to Visit */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From majestic dzongs and sacred temples to stunning river confluences and fertile valleys, Punakha's attractions are steeped in beauty and spiritual significance.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Adventure, spirituality, and natural beauty await you in Punakha. Here are the top experiences to add to your itinerary.
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

      {/* Best Time to Visit */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Punakha's lower altitude gives it a warmer climate than most of Bhutan. Each season brings its own charm to this fertile valley.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Punakha is easily accessible by road from major Bhutanese destinations, with the journey itself being a scenic highlight.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {howToReach.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{method.title}</h3>
                <p className="text-gray-600 leading-relaxed">{method.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Punakha?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We recommend spending <strong className="text-gray-900">1 to 2 nights</strong> in Punakha to experience its highlights. With one night, you can visit Punakha Dzong, walk the Suspension Bridge, and explore the valley on the second day before continuing your journey.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A two-night stay allows for a more relaxed pace, giving you time to hike to Khamsum Yulley Namgyal Chorten, visit Chimi Lhakhang, enjoy rafting on the Mo Chhu, and leisurely explore the villages and rice terraces of the valley.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Punakha pairs perfectly with Thimphu (3-4 hours drive) and is often included as a key stop on broader Bhutan itineraries. Most visitors travel from Thimphu via the spectacular Dochula Pass.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Punakha Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Here's a suggested 2-day plan to make the most of your time in Punakha.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {sampleItinerary.map((day, index) => (
              <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border ${index === 1 ? 'border-forest' : 'border-gray-100'} relative`}>
                <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">0{index + 1}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-1">{day.day}</h3>
                <p className="text-forest font-semibold mb-3">{day.title}</p>
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Visit */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Punakha?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Punakha's warm climate, romantic scenery, and cultural richness make it a perfect destination for a wide range of travellers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoShouldVisit.map((item, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your Punakha trip with these practical tips from our travel experts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Punakha offers accommodation for every budget and travel style, from riverside guesthouses to world-class luxury resorts.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Punakha Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our curated tour packages that include Punakha as a key destination in your Bhutan journey.
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
                We're curating the best Punakha tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Punakha</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about visiting Punakha? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Explore Punakha Your Way?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized Punakha itinerary based on your interests, pace, and budget. Whether you want a romantic riverside getaway or a deep cultural immersion, we'll design the perfect trip for you.
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
            Punakha is just the beginning. Discover more incredible destinations across Bhutan.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Plan Your Bhutan Journey With Happy Kingdom Travels</h2>
            <Star className="w-6 h-6 text-gold fill-gold" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            From seamless visa processing and expert local guides to handpicked accommodations and personalized itineraries, Happy Kingdom Travels ensures your Punakha adventure is effortless and unforgettable. We handle every detail so you can focus on experiencing the magic of Bhutan.
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

export default Punakha
