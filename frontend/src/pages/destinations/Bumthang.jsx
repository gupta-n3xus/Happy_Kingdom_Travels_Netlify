import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, Star, Camera, Mountain, Landmark, TreePine, Users, Heart, CheckCircle, Calendar, Compass, BookOpen } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createDestinationMessage } from '../../utils/createWhatsAppMessage'
import PackageCard from '../../components/PackageCard'
import packageService from '../../services/packageService'

const Bumthang = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const bumthangPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('bumthang') || (pkg.title && pkg.title.toLowerCase().includes('bumthang'))
        })
        setPackages(bumthangPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Spiritual Heritage, Ancient Temples, Culture, Nature', icon: Compass },
    { label: 'Recommended Stay', value: '2-3 Nights', icon: Clock },
    { label: 'Popular With', value: 'Culture Enthusiasts, Spiritual Travellers, Long Itinerary', icon: Users },
    { label: 'Altitude', value: '~2,600m - 3,000m', icon: Mountain },
    { label: 'Best Time', value: 'Mar-May, Sep-Nov', icon: Calendar },
  ]

  const whyVisit = [
    {
      title: 'Spiritual Heritage',
      description: 'Bumthang is the spiritual heartland of Bhutan, home to the most sacred temples and monasteries in the kingdom. This is where Buddhism first took root in Bhutan, making it a deeply significant pilgrimage destination.',
      icon: Landmark,
    },
    {
      title: 'Ancient Temples',
      description: 'From the 7th-century Jambay Lhakhang to Kurjey Lhakhang with its body print of Guru Rinpoche, Bumthang houses some of the oldest and most revered religious sites in the Himalayas.',
      icon: Landmark,
    },
    {
      title: 'Valley Landscapes',
      description: 'Bumthang comprises four magnificent valleys — Choekhor, Tang, Ura, and Chumey — each with its own distinct character, from lush meadows to dense forests and rolling hills.',
      icon: TreePine,
    },
    {
      title: 'Cultural Immersion',
      description: 'Experience authentic Bhutanese village life, traditional weaving, local cheese and honey production, and age-old festivals that have been celebrated here for centuries.',
      icon: Heart,
    },
    {
      title: 'Less Touristed',
      description: "Compared to Paro and Thimphu, Bumthang sees fewer visitors, offering a more intimate and authentic Bhutanese experience away from the crowds.",
      icon: Compass,
    },
    {
      title: 'Longer Journey',
      description: 'The journey to Bumthang is an adventure in itself, winding through stunning mountain passes, deep valleys, and remote villages that few tourists ever see.',
      icon: Mountain,
    },
  ]

  const topPlaces = [
    {
      name: 'Jambay Lhakhang',
      description:
        'One of the oldest temples in Bhutan, Jambay Lhakhang was built in the 7th century by the Tibetan King Songtsen Gampo as part of his campaign to subdue a demoness. The temple hosts the famous Jambay Lhakhang Drup festival annually, featuring sacred masked dances and the extraordinary fire dance ceremony. The ancient architecture and spiritual atmosphere make this a must-visit for anyone travelling to Bumthang.',
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'Kurjey Lhakhang',
      description:
        'Kurjey Lhakhang is a sacred complex of three temples located in theChoekhor Valley. The oldest temple contains the body imprint of Guru Rinpoche (Padmasambhava), who is credited with bringing Buddhism to Bhutan. The three temples represent the past, present, and future, and the site is surrounded by 108 chortens. This is one of the most important pilgrimage sites in the kingdom and a place of profound spiritual energy.',
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'Tamshing Lhakhang',
      description:
        'The oldest temple in Bumthang, Tamshing Lhakhang was founded in the 15th century by Pema Lingpa, one of Bhutan\'s most important treasure revealers. The temple houses rare wall paintings dating back centuries and a collection of ancient armour and weaponry. Visitors can receive blessings from the monks and explore the atmospheric interior filled with centuries of spiritual devotion.',
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'Burning Lake (Mebar Tsho)',
      description:
        'Burning Lake, or Mebar Tsho, is a sacred pool in the Tang Valley where Pema Lingpa discovered hidden treasures (terma) in the 15th century. According to legend, he lit a butter lamp and dove into the dark waters, emerging with sacred texts and relics. The deep, emerald-green pool surrounded by towering cliffs is a deeply spiritual site and a highlight of any Bumthang itinerary.',
      icon: Mountain,
      duration: '1 hour',
    },
    {
      name: 'Jakar',
      description:
        'Jakar is the main town in Bumthang and serves as the gateway to the four valleys. The town features Jakar Dzong, one of the most impressive fortress-monasteries in Bhutan, perched on a ridge above the town. Explore the local market, visit traditional bakeries, and experience the laid-back atmosphere of this charming mountain town.',
      icon: Landmark,
      duration: 'Half day',
    },
    {
      name: 'Ura Valley',
      description:
        'The highest of Bumthang\'s four valleys, Ura is known for its traditional villages, ancient monasteries, and sweeping views of the surrounding mountains. The valley is famous for its annual Ura Festival and is home to some of the best-preserved traditional architecture in Bhutan. A visit to Ura offers an authentic glimpse into rural Bhutanese life far from the tourist trail.',
      icon: TreePine,
      duration: 'Half day',
    },
  ]

  const thingsToDo = [
    {
      title: 'Temple Visits',
      description: 'Explore centuries-old temples and monasteries, each with its own unique history and spiritual significance. From Jambay Lhakhang to Kurjey, every visit is a journey through Bhutan\'s religious heritage.',
      icon: Landmark,
    },
    {
      title: 'Monastery Exploration',
      description: 'Discover the ancient monasteries of Bumthang, where monks have practiced Buddhism for over a millennium. Witness daily rituals, prayer ceremonies, and the timeless devotion that defines this spiritual heartland.',
      icon: BookOpen,
    },
    {
      title: 'Valley Sightseeing',
      description: 'Drive through the four valleys of Bumthang — Choekhor, Tang, Ura, and Chumey — each offering distinct landscapes from rolling meadows to dense pine forests and terraced hillsides.',
      icon: Mountain,
    },
    {
      title: 'Cultural Experiences',
      description: 'Participate in local traditions, visit weaving centers, sample Bumthang\'s famous cheese and honey, and attend traditional festivals that have been celebrated here for centuries.',
      icon: Heart,
    },
    {
      title: 'Nature Walks',
      description: 'Stroll through pristine forests, along river valleys, and across alpine meadows teeming with wildflowers. Bumthang\'s natural beauty provides the perfect complement to its spiritual heritage.',
      icon: TreePine,
    },
    {
      title: 'Local Food',
      description: 'Taste Bumthang\'s unique culinary specialties, including locally produced cheese, buckwheat pancakes, and traditional Bhutanese dishes prepared with fresh, organic ingredients from the valley.',
      icon: Camera,
    },
  ]

  const seasons = [
    {
      season: 'Spring (March - May)',
      description: 'Spring brings blooming wildflowers and rhododendrons across the valleys. The weather is mild and pleasant, ideal for temple visits and valley exploration. Bumthang is cooler than western Bhutan, so pack light layers.',
    },
    {
      season: 'Summer (June - August)',
      description: 'The monsoon season brings lush greenery but also heavy rainfall. Roads can be challenging during this period. However, the valleys are at their most verdant, and fewer tourists mean peaceful temple visits.',
    },
    {
      season: 'Autumn (September - November)',
      description: 'Considered the best time to visit Bumthang, autumn offers clear skies, golden landscapes, and spectacular views of the surrounding mountains. Several important festivals take place during this season, including the famous Jambay Lhakhang Drup.',
    },
    {
      season: 'Winter (December - February)',
      description: 'Winter in Bumthang is cold with occasional snowfall, especially at higher elevations. However, the clear skies offer stunning mountain views, and the serene atmosphere provides a deeply spiritual experience with fewer visitors.',
    },
  ]

  const faqs = [
    {
      question: 'How do I get to Bumthang, Bhutan?',
      answer: 'Bumthang is located in central Bhutan and is best reached by road from Thimphu, which takes a full day of driving (approximately 10-12 hours). The journey is scenic, passing through stunning mountain passes and valleys. Domestic flights to Bumthang are occasionally available but are weather-dependent and not reliable year-round. Most visitors include Bumthang as part of a longer Bhutan itinerary that starts from Paro or Thimphu.',
    },
    {
      question: 'How many days do I need in Bumthang?',
      answer: 'We recommend spending 2-3 nights in Bumthang to fully explore the four valleys and their ancient temples. This allows time for temple visits, valley excursions, cultural experiences, and a visit to Burning Lake without feeling rushed. Bumthang is best experienced at a slower pace.',
    },
    {
      question: 'What is the best time to visit Bumthang?',
      answer: 'The best time to visit Bumthang is during autumn (September to November) when the weather is clear, the landscapes are golden, and several important festivals take place. Spring (March to May) is also excellent with blooming wildflowers. Bumthang is cooler than western Bhutan, so even in summer, temperatures are pleasant.',
    },
    {
      question: 'Is Bumthang safe for tourists?',
      answer: 'Bumthang is extremely safe for tourists. Bhutan has very low crime rates, and the people of Bumthang are known for their warm hospitality. The area is remote but well-serviced, and your guide will ensure you have a comfortable and safe experience throughout your stay.',
    },
    {
      question: "What makes Bumthang different from Paro or Thimphu?",
      answer: "Bumthang is Bhutan's spiritual heartland, home to the oldest temples and most sacred religious sites in the kingdom. Unlike the more tourist-friendly Paro and Thimphu, Bumthang offers a deeper, more authentic cultural experience with fewer visitors. The journey itself is an adventure through remote mountain landscapes, and the four valleys each offer distinct experiences.",
    },
    {
      question: 'Do I need a guide to visit Bumthang?',
      answer: "Yes, all international tourists in Bhutan must book through a licensed tour operator, and your guide will accompany you throughout Bumthang. Given Bumthang's remote location and the cultural significance of its temples, having a knowledgeable guide is especially valuable for understanding the history and spiritual importance of each site.",
    },
  ]

  const travelTips = [
    { title: 'Pack Warm Layers', description: 'Bumthang sits at a higher altitude than western Bhutan and is noticeably cooler. Bring warm clothing including a fleece jacket, even in summer. Evenings can be chilly year-round.' },
    { title: 'Plan for the Journey', description: 'The road from Thimphu to Bumthang is long and winding. Break the journey with an overnight stop in Trongsa or accept that it will be a full day of travel. Start early and carry snacks and water.' },
    { title: 'Respect Sacred Sites', description: 'Always remove shoes before entering temples and monasteries. Walk clockwise around religious structures. Ask permission before photographing monks or religious ceremonies, and maintain silence in prayer halls.' },
    { title: 'Carry Cash', description: 'ATM availability in Bumthang is limited. Carry sufficient cash in Bhutanese Ngultrum or Indian Rupees for local purchases, entrance fees, and tips. Some hotels accept cards, but not all.' },
    { title: 'Take Your Time', description: 'Bumthang is best experienced slowly. Don\'t rush through temples and valleys. Allow time for quiet contemplation, spontaneous conversations with locals, and simply absorbing the spiritual atmosphere.' },
    { title: 'Follow Your Guide', description: 'Your licensed guide provides essential context about Bumthang\'s history, culture, and spiritual significance. Follow their instructions at sacred sites and respect their advice on local customs and etiquette.' },
  ]

  const accommodation = [
    { category: 'Budget / Standard', description: 'Simple guesthouses and lodges offering basic amenities and warm hospitality. Perfect for travellers wanting an authentic, no-frills Bhutanese experience in the heart of the valleys.' },
    { category: 'Comfort', description: 'Mid-range hotels and boutique lodges with modern amenities, restaurant facilities, and scenic locations. Great value for couples and families wanting comfort while exploring Bumthang\'s temples.' },
    { category: 'Premium', description: 'Upscale boutique properties with stunning valley views, traditional architecture, fine dining, and personalized service. Ideal for travellers seeking a refined spiritual retreat in Bumthang.' },
    { category: 'Luxury', description: 'World-class lodges offering the pinnacle of Bhutanese hospitality with private temple visits, exclusive cultural experiences, wellness programs, and breathtaking mountain settings.' },
  ]

  const sampleItinerary = [
    {
      day: 'Day 1',
      title: 'Thimphu to Bumthang',
      items: [
        'Early departure from Thimphu',
        'Scenic drive through Dochula Pass and Punakha Valley',
        'Stop at Trongsa for lunch and visit Trongsa Dzong',
        'Continue drive to Bumthang through stunning landscapes',
        'Evening arrival in Jakar and check into hotel',
      ],
    },
    {
      day: 'Day 2',
      title: 'Jambay, Kurjey & Tamshing',
      items: [
        'Morning visit to Jambay Lhakhang (7th century temple)',
        'Explore Kurjey Lhakhang complex and its three temples',
        'Afternoon visit to Tamshing Lhakhang (oldest temple in Bumthang)',
        'Walk through Jakar town and visit the local market',
        'Evening at leisure in Jakar',
      ],
    },
    {
      day: 'Day 3',
      title: 'Burning Lake & Ura Valley',
      items: [
        'Morning drive to Tang Valley for Burning Lake (Mebar Tsho)',
        'Explore the sacred pool and surrounding cliffs',
        'Afternoon excursion to Ura Valley',
        'Visit traditional villages and the Ura monastery',
        'Return to Jakar for farewell dinner',
      ],
    },
    {
      day: 'Day 4',
      title: 'Departure',
      items: [
        'Morning visit to Jakar Dzong (exterior)',
        'Final exploration of Bumthang town',
        'Depart for Thimphu or onward destination',
        'Scenic drive with photo stops along the way',
      ],
    },
  ]

  const relatedDestinations = [
    { name: 'Paro', slug: 'paro', description: 'Home to the iconic Tiger\'s Nest Monastery, ancient dzongs, and Bhutan\'s international airport — the gateway to the kingdom.' },
    { name: 'Thimphu', slug: 'thimphu', description: 'Bhutan\'s capital city blends modern development with ancient tradition, featuring the massive Buddha Dordenma statue and vibrant weekend markets.' },
    { name: 'Punakha', slug: 'punakha', description: 'The ancient capital boasts the stunning Punakha Dzong at the confluence of two rivers and serene rice paddy trails through rural villages.' },
    { name: 'Phuentsholing', slug: 'phuentsholing', description: 'Bhutan\'s gateway town on the Indian border offers a unique blend of cultures and is the starting point for overland journeys.' },
    { name: 'Haa Valley', slug: 'haa-valley', description: 'A hidden gem with pristine beauty, ancient temples, and traditional farmhouses nestled between two river valleys far from tourist crowds.' },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Bumthang'))

  return (
    <>
      <SEO
        title="Bumthang Bhutan Travel Guide – Places to Visit, Things to Do & Tours | Happy Kingdom Travels"
        description="Discover Bumthang Bhutan with our complete travel guide. Explore ancient temples, sacred sites, the four valleys, things to do, best time to visit, and Bhutan tours. Plan your Bumthang spiritual journey with Happy Kingdom Travels."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bumthang-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Bumthang' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Bumthang, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Journey to Bhutan's spiritual heartland — where ancient temples, sacred monasteries, and four magnificent valleys await in the cultural heart of the Himalayas.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Bumthang</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Bumthang is the spiritual heartland of Bhutan — a region where Buddhism first took root in the kingdom and where some of the most sacred temples and monasteries in the Himalayas stand today. Located in central Bhutan, Bumthang is not a single valley but a complex of four interconnected valleys: Choekhor, Tang, Ura, and Chumey. Each valley has its own distinct character, from the broad, fertile plains of Choekhor to the remote, forested heights of Ura.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Unlike the more tourist-friendly destinations of Paro and Thimphu, Bumthang offers a deeper, more intimate Bhutanese experience. The region is home to temples dating back to the 7th century, including Jambay Lhakhang and Kurjey Lhakhang, which are among the oldest religious structures in the kingdom. This is where Guru Rinpoche — the founder of Buddhism in Bhutan — left his body imprint, and where Pema Lingpa, one of Bhutan's most revered treasure revealers, discovered hidden sacred texts.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              A visit to Bumthang requires a longer itinerary due to its remote central location, but the journey itself is part of the adventure — winding through stunning mountain passes, deep river valleys, and traditional villages that few tourists ever see. For travellers seeking spiritual depth, cultural authenticity, and the beauty of Bhutan's interior, Bumthang is an unmissable destination.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Bumthang</h2>
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

      {/* Why Visit Bumthang */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Bumthang?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Bumthang offers a profound blend of spirituality, ancient heritage, and natural beauty that sets it apart from any other destination in Bhutan.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From ancient 7th-century temples to sacred hidden lakes, Bumthang's attractions are steeped in centuries of spiritual significance.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Spiritual exploration, cultural immersion, and natural beauty await you in Bumthang. Here are the top experiences to add to your itinerary.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Each season in Bumthang offers a distinct experience. Note that Bumthang is cooler than western Bhutan due to its higher altitude.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Bumthang is located in central Bhutan and requires a longer journey from the western hubs, but the route is scenic and rewarding.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">By Road from Thimphu</h3>
              <p className="text-gray-600 leading-relaxed">
                The most common route is a full-day drive from Thimphu to Bumthang (approximately 10-12 hours). The journey passes through Dochula Pass, Punakha, and Trongsa, offering spectacular mountain scenery. We recommend an overnight stop in Trongsa to break the journey.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Domestic Flights</h3>
              <p className="text-gray-600 leading-relaxed">
                Domestic flights to Bumthang's Yotongla airport are occasionally available from Paro, but they are weather-dependent and not reliable year-round. Flights operate only in clear conditions and may be cancelled at short notice.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">From Phuentsholing</h3>
              <p className="text-gray-600 leading-relaxed">
                The overland route from Phuentsholing on the Indian border is even longer (14-16 hours) and is not recommended for a direct journey. Most visitors fly into Paro and travel to Bumthang by road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Many Days */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gold rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Bumthang?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We recommend spending <strong className="text-gray-900">2 to 3 nights</strong> in Bumthang to fully experience its four valleys and ancient temples. With two nights, you can visit the major temples — Jambay Lhakhang, Kurjey Lhakhang, and Tamshing Lhakhang — and take an excursion to Burning Lake.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A three-night stay allows for a more relaxed pace, including visits to Ura Valley and Chumey Valley, as well as time to explore Jakar town, visit local weaving centers, and enjoy the serene atmosphere of this spiritual heartland.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Bumthang is best included as part of a longer Bhutan itinerary of 7-10 days, combined with Paro, Thimphu, and Punakha for a comprehensive kingdom experience.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Bumthang Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Here's a suggested 4-day plan to make the most of your time in Bumthang.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleItinerary.map((day, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">0{index + 1}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-1">{day.day}</h3>
                <p className="text-forest font-semibold text-sm mb-3">{day.title}</p>
                <ul className="space-y-2">
                  {day.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{item}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Bumthang?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Bumthang's unique character makes it ideal for travellers seeking depth, authenticity, and spiritual connection.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Culture Enthusiasts', description: 'Bumthang offers the deepest cultural immersion in Bhutan, with ancient temples, traditional weaving, and centuries-old festivals that showcase the kingdom\'s living heritage.', icon: Landmark },
              { title: 'Spiritual Travellers', description: 'As the spiritual heartland of Bhutan, Bumthang provides profound opportunities for meditation, prayer, and connecting with Buddhist traditions dating back over a millennium.', icon: BookOpen },
              { title: 'Long Itinerary', description: 'Bumthang requires a longer Bhutan trip (7-10 days), making it perfect for travellers who want to go beyond the highlights and experience the kingdom\'s interior.', icon: Compass },
              { title: 'Adventure Seekers', description: 'The journey to Bumthang through mountain passes and remote valleys is an adventure in itself, and the region offers hiking, nature walks, and off-the-beaten-path exploration.', icon: Mountain },
              { title: 'Photography Lovers', description: 'From ancient temple architecture to misty valley landscapes, traditional village life, and stunning mountain vistas, Bumthang offers endless photographic opportunities.', icon: Camera },
              { title: 'Nature Lovers', description: 'The four valleys of Bumthang showcase Bhutan\'s pristine natural beauty, from alpine meadows and dense forests to sacred lakes and rolling hillsides.', icon: TreePine },
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your Bumthang trip with these practical tips from our travel experts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Bumthang offers accommodation for every budget, from simple guesthouses to luxury lodges with valley views.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Bumthang Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our curated tour packages that include Bumthang as a key destination in your Bhutan journey.
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
                We're curating the best Bumthang tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Bumthang</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about visiting Bumthang? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Explore Bumthang Your Way?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized Bumthang itinerary based on your interests, pace, and budget. Whether you want a quick spiritual retreat or a deep cultural immersion across all four valleys, we'll design the perfect trip for you.
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
            Bumthang is best combined with other incredible destinations across Bhutan for a complete kingdom experience.
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
            From seamless visa processing and expert local guides to handpicked accommodations and personalized itineraries, Happy Kingdom Travels ensures your Bumthang adventure is effortless and unforgettable. We handle every detail so you can focus on experiencing the spiritual heartland of Bhutan.
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

export default Bumthang