import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, Star, Camera, Mountain, Landmark, TreePine, Users, Heart, CheckCircle, Calendar, Compass, ShoppingBag } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createDestinationMessage } from '../../utils/createWhatsAppMessage'
import PackageCard from '../../components/PackageCard'
import packageService from '../../services/packageService'

const Thimphu = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const thimphuPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('thimphu') || (pkg.title && pkg.title.toLowerCase().includes('thimphu'))
        })
        setPackages(thimphuPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Culture, Markets, Museums, Urban Exploration', icon: Compass },
    { label: 'Recommended Stay', value: '1-2 Nights', icon: Clock },
    { label: 'Popular With', value: 'All Travellers', icon: Users },
    { label: 'Altitude', value: '~2,334m', icon: Mountain },
  ]

  const whyVisit = [
    {
      title: 'Capital City Experience',
      description: "Thimphu is one of the world's most unique capital cities — the only one without traffic lights. Experience a modern city that has retained its traditional character with monks, traditional architecture, and ancient customs woven into everyday urban life.",
      icon: Landmark,
    },
    {
      title: 'Buddha Dordenma',
      description: 'The giant 51-meter bronze statue of Buddha Dordenma overlooking the Thimphu valley is one of the largest Buddha statues in the world. The 125,000 smaller Buddha statues within it and the panoramic city views make this an unmissable spiritual landmark.',
      icon: Mountain,
    },
    {
      title: 'Tashichho Dzong',
      description: 'The majestic Tashichho Dzong serves as both the seat of Bhutan\'s government and a thriving Buddhist monastery. Its golden spires, white walls, and beautifully landscaped gardens make it one of the most photographed buildings in Bhutan.',
      icon: Landmark,
    },
    {
      title: 'Museums & Heritage',
      description: "Thimphu is home to some of Bhutan's finest museums, including the Folk Heritage Museum, the National Memorial Chorten, and the Textile Museum. Each offers a deep dive into Bhutan's rich cultural tapestry and living traditions.",
      icon: Camera,
    },
    {
      title: 'Vibrant Markets',
      description: "The Centenary Farmers' Market is the heart of Thimphu's social and commercial life. Browse organic produce, handwoven textiles, traditional medicines, and local crafts while experiencing the buzz of daily Bhutanese life.",
      icon: ShoppingBag,
    },
    {
      title: 'Traditional Arts',
      description: "Thimphu is the center of Bhutan's traditional arts and crafts. Visit the Zorig Chusum Institute to see master artists teaching the 13 traditional arts, from thangka painting to woodcarving and embroidery, preserving centuries-old techniques.",
      icon: Heart,
    },
  ]

  const topPlaces = [
    {
      name: 'Buddha Dordenma',
      description:
        "Perched on a hill overlooking Thimphu, the Buddha Dordenma is a gigantic 51-meter bronze and gold statue of Shakyamuni Buddha. It is one of the largest Buddha statues in the world and fulfills an ancient prophecy. The statue houses 125,000 smaller Buddha statues, each gilded in gold. The surrounding Kuensel Phodrang park offers sweeping panoramic views of the Thimphu valley, making it a perfect spot for meditation, photography, and quiet contemplation. Visit during sunset for the most dramatic light over the city.",
      icon: Mountain,
      duration: '1-2 hours',
    },
    {
      name: 'Tashichho Dzong',
      description:
        "Tashichho Dzong is the seat of Bhutan's government and the summer residence of the central monastic body. Built in 1641 and extensively renovated in the 1960s without a single architectural plan or nail, it exemplifies Bhutanese craftsmanship at its finest. The dzong's golden spires, ornate woodwork, and immaculate gardens create a stunning sight, especially when illuminated at night. Visitors can explore the outer courtyards and the main assembly hall during certain hours. The surrounding riverside gardens are perfect for a peaceful evening walk.",
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'National Memorial Chorten',
      description:
        "The National Memorial Chorten was built in 1974 to honor the memory of the Third King, Jigme Dorji Wangchuck. Designed in Tibetan style, it is one of the most important religious structures in Thimphu. Elderly residents circumambulate the chorten daily spinning prayer wheels, while young monks and laypeople gather for morning prayers. The surrounding gardens offer a peaceful respite from the city bustle, and the interior features intricate Buddhist paintings and statues representing various deities.",
      icon: Landmark,
      duration: '30-45 minutes',
    },
    {
      name: 'Motithang Takin Preserve',
      description:
        "The Motithang Takin Preserve is a small zoo-like enclosure that houses Bhutan's national animal, the Takin — a bizarre-looking yet gentle creature that is a cross between a goat and an antelope. Legend says the takin was created by the 15th-century saint Drukpa Kunley. The preserve is a lush forested area where you can see these unique animals up close. It's a fascinating stop for wildlife enthusiasts and anyone curious about Bhutan's natural heritage.",
      icon: TreePine,
      duration: '30-45 minutes',
    },
    {
      name: "Centenary Farmers' Market",
      description:
        "Located near the Wang Chhu River, the Centenary Farmers' Market is the largest domestic market in Thimphu and a must-visit for anyone wanting to experience local life. Stalls overflow with organic vegetables, aromatic chilies, yak cheese, dried meats, handwoven textiles, Bhutanese stamps, and traditional medicines. The weekend market is especially vibrant with farmers from surrounding valleys bringing their freshest produce. It's the perfect place to pick up unique souvenirs and sample authentic Bhutanese flavors.",
      icon: ShoppingBag,
      duration: '1-2 hours',
    },
    {
      name: 'Folk Heritage Museum',
      description:
        "The Folk Heritage Museum recreates a traditional Bhutanese farmhouse and provides visitors with a vivid insight into rural life in Bhutan. The three-story building houses household items, farming tools, kitchen utensils, and traditional textiles used by ordinary Bhutanese families. Exhibits change seasonally, showcasing traditional festivals, foods, and agricultural practices. The museum garden features medicinal plants and a traditional water mill. It's an essential stop for understanding the everyday culture that underpins Bhutanese society.",
      icon: Landmark,
      duration: '1-2 hours',
    },
  ]

  const thingsToDo = [
    {
      title: 'Visit Buddha Dordenma',
      description: "Stand before the colossal Buddha statue and soak in the panoramic views of Thimphu valley. The spiritual energy and architectural grandeur make this the defining experience of any visit to the capital.",
      icon: Mountain,
    },
    {
      title: 'Explore Tashichho Dzong',
      description: "Walk through the corridors of Bhutan's most important dzong, the seat of government and monastic body. Its stunning architecture and riverside setting are a photographer's dream.",
      icon: Landmark,
    },
    {
      title: 'Shop at Farmers\' Market',
      description: "Immerse yourself in the colors, aromas, and energy of the Centenary Farmers' Market. Sample local produce, buy handwoven textiles, and interact with Bhutanese vendors.",
      icon: ShoppingBag,
    },
    {
      title: 'Visit Museums',
      description: "Explore the Folk Heritage Museum, Textile Museum, and National Memorial Chorten to gain a deep understanding of Bhutan's history, culture, and living traditions.",
      icon: Camera,
    },
    {
      title: 'Experience Local Food',
      description: "Savor authentic Bhutanese cuisine — from fiery ema datshi (chili cheese) to momos, red rice, and jasha maru. Thimphu's restaurants and cafes offer everything from traditional to contemporary dining.",
      icon: Heart,
    },
    {
      title: 'Cultural Walking Tour',
      description: "Discover Thimphu on foot through its bustling streets, ancient temples, and hidden alleys. A guided walk reveals the city's unique blend of modern development and centuries-old traditions.",
      icon: Compass,
    },
  ]

  const seasons = [
    {
      season: 'Spring (March - May)',
      description: "Thimphu comes alive with blooming flowers and mild weather. The valleys turn green and the city enjoys pleasant daytime temperatures perfect for walking tours and outdoor sightseeing. Spring festivals bring masked dances and cultural celebrations to the dzongs and temples. It's an excellent time for photography with clear skies and vibrant landscapes.",
    },
    {
      season: 'Summer (June - August)',
      description: "The monsoon season brings lush greenery and occasional rainfall to Thimphu. While rain showers can be frequent, the city is at its most verdant with wildflowers blooming everywhere. Fewer tourists mean quieter experiences at popular sites. The annual Thimphu Tshechu festival usually falls in this season, offering an incredible cultural spectacle.",
    },
    {
      season: 'Autumn (September - November)',
      description: "Considered the best time to visit Thimphu, autumn brings crisp, clear skies with excellent visibility of the surrounding mountains. The weather is ideal for exploring the city on foot, visiting dzongs, and day trips to nearby valleys. The Thimphu Tshechu festival in autumn is one of the most vibrant celebrations in the Bhutanese calendar.",
    },
    {
      season: 'Winter (December - February)',
      description: "Winter in Thimphu is cold but beautiful, with frosty mornings and clear blue skies. Snow sometimes dusts the surrounding peaks creating a magical backdrop for the city. The lower tourist numbers mean you can explore the dzongs and museums in peaceful solitude. Warm clothing is essential, but the crisp mountain air and golden winter light make for stunning photography.",
    },
  ]

  const faqs = [
    {
      question: 'How do I get to Thimphu?',
      answer: "Thimphu does not have its own airport. The nearest airport is Paro International Airport, approximately 1.5 hours drive away. Most visitors fly into Paro and then travel to Thimphu by road. You can also enter Bhutan by road from Phuentsholing on the Indian border, which is about 6 hours drive to Thimphu. Your tour operator will arrange all transfers.",
    },
    {
      question: 'Is Thimphu safe for tourists?',
      answer: "Thimphu is one of the safest capital cities in the world. Bhutan has extremely low crime rates, and the people are known for their warmth and hospitality. The city is clean, well-organized, and very welcoming to visitors. Exercise normal travel precautions and you will have a wonderful, safe experience.",
    },
    {
      question: 'How many days should I spend in Thimphu?',
      answer: "We recommend spending 1 to 2 nights in Thimphu to cover the major highlights including Buddha Dordenma, Tashichho Dzong, the museums, and the farmers' market. If you want a more relaxed pace or plan to take day trips to nearby valleys like Punakha, 2 nights is ideal.",
    },
    {
      question: 'What is there to do in Thimphu?',
      answer: "Thimphu offers a wide range of activities: visit the giant Buddha Dordenma statue, explore Tashichho Dzong, shop at the Centenary Farmers' Market, visit museums like the Folk Heritage Museum, experience local Bhutanese cuisine, take a cultural walking tour, and see the national animal at Motithang Takin Preserve.",
    },
    {
      question: 'Does Thimphu really have no traffic lights?',
      answer: "That's correct — Thimphu is one of the few capital cities in the world without traffic lights. Instead, traffic police officers direct vehicles at major intersections using hand signals and batons. It's one of the many charming aspects that make Thimphu unique and has become a symbol of the city's blend of tradition and modernity.",
    },
    {
      question: 'What is the best time to visit Thimphu?',
      answer: "The best time to visit Thimphu is during autumn (September to November) when the skies are clear, the weather is pleasant, and major festivals like the Thimphu Tshechu take place. Spring (March to May) is also excellent with blooming flowers and comfortable temperatures. Winter visits offer fewer crowds and beautiful snowy mountain views.",
    },
    {
      question: 'Can I use Indian Rupees in Thimphu?',
      answer: "Yes, Indian Rupees (INR) are widely accepted in Thimphu alongside the local currency, the Ngultrum (BTN). However, ₹500 and ₹2000 notes may not be accepted everywhere due to counterfeit concerns. ATMs are available at several banks in Thimphu including Bank of Bhutan and Bhutan National Bank. It's wise to carry some cash as not all shops accept cards.",
    },
    {
      question: 'What should I wear in Thimphu?',
      answer: "Pack layers as Thimphu's weather can change quickly. Bring a warm jacket, comfortable walking shoes, and modest clothing that covers shoulders and knees for temple and dzong visits. Sunscreen and sunglasses are essential due to the high altitude. In winter, bring thermal layers and a good quality down jacket.",
    },
  ]

  const travelTips = [
    { title: 'Respect Dress Code at Dzongs', description: "When visiting Tashichho Dzong and other religious sites, dress modestly. Men should wear long pants and women should cover shoulders and knees. Remove hats and sunglasses before entering." },
    { title: 'Explore on Foot', description: "Thimphu is a very walkable city. The main market area, Memorial Chorten, and surrounding neighborhoods are best explored on foot. Wear comfortable shoes as there are some uphill sections around the dzong and temples." },
    { title: 'Carry Cash', description: "While some larger shops and hotels accept cards, many local vendors at the farmers' market and small shops prefer cash. Carry Ngultrum or Indian Rupees for convenience." },
    { title: 'Visit the Market on Weekends', description: "The Centenary Farmers' Market is most vibrant on Saturdays and Sundays when farmers from surrounding valleys bring their freshest produce. Plan your visit accordingly for the best experience." },
    { title: 'Try Local Food', description: "Don't miss trying ema datshi (chili cheese), the national dish of Bhutan. Thimphu has excellent restaurants serving both traditional Bhutanese cuisine and international options. Ask your guide for recommendations." },
    { title: 'Follow Photography Etiquette', description: "Always ask permission before photographing people, especially monks and religious ceremonies. Photography may be restricted inside some temples and dzongs. Your guide will advise on where photography is permitted." },
  ]

  const accommodation = [
    { category: 'Budget / Standard', description: 'Clean, comfortable hotels and guesthouses in the heart of Thimphu offering basic amenities and warm hospitality. Perfect for backpackers and budget-conscious travellers wanting an authentic city experience.' },
    { category: 'Comfort', description: 'Mid-range hotels with modern amenities, restaurants, and convenient locations near the town center. Great value for couples and families wanting comfort and easy access to Thimphu\'s attractions.' },
    { category: 'Premium', description: 'Upscale boutique properties with stunning valley views, spa facilities, fine dining, and personalized service. Ideal for travellers seeking a refined Bhutanese urban experience.' },
    { category: 'Luxury', description: 'World-class hotels offering the pinnacle of Bhutanese hospitality with exclusive dining, wellness programs, private tours, and breathtaking settings overlooking the Thimphu valley.' },
  ]

  const relatedDestinations = [
    { name: 'Paro', slug: 'paro', description: "Home to the iconic Tiger's Nest Monastery, ancient dzongs, and Bhutan's only international airport set in a stunning Himalayan valley." },
    { name: 'Punakha', slug: 'punakha', description: 'The ancient capital boasts the stunning Punakha Dzong at the confluence of two rivers and serene rice paddy trails through rural villages.' },
    { name: 'Phuentsholing', slug: 'phuentsholing', description: "Bhutan's gateway town on the Indian border offers a unique blend of cultures and is the starting point for overland journeys." },
    { name: 'Haa Valley', slug: 'haa-valley', description: 'A hidden gem with pristine beauty, ancient temples, and traditional farmhouses nestled between two river valleys far from tourist crowds.' },
    { name: 'Bumthang', slug: 'bumthang', description: "The spiritual heartland of Bhutan with four valleys filled with ancient temples, sacred sites, and the country's oldest Buddhist monasteries." },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Thimphu', BUSINESS_CONTACT.companyName))

  return (
    <>
      <SEO
        title={`Thimphu Bhutan Travel Guide – Things to Do, Places to Visit & Tours | ${BUSINESS_CONTACT.companyName}`}
        description={`Discover Thimphu Bhutan with our complete travel guide. Explore things to do in Thimphu, top places to visit, Thimphu tour packages, best time to visit, and Bhutan tours. Plan your Thimphu adventure with ${BUSINESS_CONTACT.companyName}.`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/thimphu-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Thimphu' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Thimphu, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Bhutan's vibrant capital city where ancient traditions blend seamlessly with modern life. Discover giant Buddha statues, majestic dzongs, bustling markets, and the world's only capital without traffic lights.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Thimphu</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Thimphu is the capital and largest city of Bhutan, and one of the most fascinating capitals in the world. It is the only capital city on earth without a single traffic light — instead, traffic police officers in white gloves direct vehicles at intersections with practiced precision. This charming detail perfectly captures what makes Thimphu special: a modern city that has chosen to retain its traditional character rather than abandon it for impersonal efficiency.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nestled in a wide valley along the banks of the Wang Chhu River at an altitude of 2,334 meters, Thimphu is home to approximately 115,000 people and serves as the political, economic, and cultural center of Bhutan. The city is a living tapestry where saffron-robed monks walk alongside office workers, ancient dzongs house modern government offices, and farmers sell organic produce at sleek contemporary markets. The massive Buddha Dordenma statue overlooking the valley, the majestic Tashichho Dzong, and the vibrant Centenary Farmers' Market are just a few of the experiences that make Thimphu an essential stop on any Bhutan journey.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're exploring world-class museums, shopping for handwoven textiles, sampling fiery ema datshi, or simply watching the world go by from a café terrace, Thimphu offers a unique urban Himalayan experience that is both deeply traditional and refreshingly modern.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Thimphu</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* Why Visit Thimphu */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Thimphu?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Thimphu offers a unique blend of urban charm, spiritual grandeur, and cultural richness that makes it unlike any other capital city in the world.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From towering Buddha statues to ancient dzongs and bustling markets, Thimphu's attractions blend spirituality, history, and everyday Bhutanese life.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Culture, shopping, food, and exploration await you in Bhutan's fascinating capital. Here are the top experiences to add to your itinerary.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Each season in Thimphu brings a unique character. Choose the time that suits your travel style.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Thimphu does not have its own airport, but it is easily accessible from other parts of Bhutan.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">From Paro by Road</h3>
              <p className="text-gray-600 leading-relaxed">
                The most common route is from Paro International Airport, just a 1.5-hour scenic drive along a well-maintained highway. The road winds through beautiful valleys and traditional villages, offering a wonderful introduction to the Bhutanese countryside.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">From Phuentsholing</h3>
              <p className="text-gray-600 leading-relaxed">
                The overland route from Phuentsholing on the Indian border takes approximately 6 hours by car. The scenic drive climbs through forests, river valleys, and small towns, providing a stunning journey through the heart of western Bhutan.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">No Airport in Thimphu</h3>
              <p className="text-gray-600 leading-relaxed">
                Thimphu is unique among world capitals in not having an airport. Plans for a new airport have been discussed, but for now all air access is through Paro. Your tour operator will arrange all ground transfers for a seamless journey.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Thimphu?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We recommend spending <strong className="text-gray-900">1 to 2 nights</strong> in Thimphu to fully experience the capital's highlights. With one night, you can visit Buddha Dordenma, Tashichho Dzong, and the National Memorial Chorten, plus explore the farmers' market.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A two-night stay allows for a more relaxed pace, giving you time to visit the Folk Heritage Museum, Motithang Takin Preserve, take a cultural walking tour, and enjoy the local food scene at your leisure.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Thimphu also serves as the perfect base for day trips to Punakha and Haa Valley, making it an excellent hub for exploring western Bhutan.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Thimphu Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Here's a suggested 2-day plan to make the most of your time in Thimphu.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">01</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 1: Arrival & City Exploration</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Arrive in Thimphu from Paro (1.5-hour drive)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Check into your hotel and freshen up</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Visit the National Memorial Chorten</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore Tashichho Dzong</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Evening stroll through Thimphu town center</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-forest relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">02</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 2: Culture & Markets</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Morning visit to Buddha Dordenma</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore the Folk Heritage Museum</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Visit Motithang Takin Preserve</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Shop at Centenary Farmers' Market</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Transfer to Paro or continue to next destination</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Thimphu?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Thimphu's diverse attractions make it a perfect destination for a wide range of travellers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Families', description: 'Museums, easy city walks, and the takin preserve make Thimphu perfect for family holidays with children of all ages.', icon: Users },
              { title: 'Culture Enthusiasts', description: 'Living Buddhist traditions, centuries-old dzongs, and master artisans offer deep cultural immersion for history and culture lovers.', icon: Landmark },
              { title: 'Solo Travellers', description: 'Safe, walkable, and welcoming — Thimphu is ideal for solo exploration, from quiet temple visits to bustling market wanderings.', icon: Compass },
              { title: 'Shoppers', description: 'Handwoven textiles, traditional masks, Bhutanese jewelry, and organic produce make Thimphu a paradise for unique, authentic souvenirs.', icon: ShoppingBag },
              { title: 'Food Lovers', description: 'From fiery ema datshi to momos, red rice, and international cuisine, Thimphu\u2019s restaurant scene offers something for every palate.', icon: Heart },
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your Thimphu trip with these practical tips from our travel experts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Thimphu offers accommodation for every budget and travel style, from budget hotels to world-class luxury properties.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Thimphu Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our curated tour packages that include Thimphu as a key destination in your Bhutan journey.
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
                We're curating the best Thimphu tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Thimphu</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about visiting Thimphu? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Explore Thimphu Your Way?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized Thimphu itinerary based on your interests, pace, and budget. Whether you want a quick capital city getaway or a deep cultural immersion, we'll design the perfect trip for you.
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
            Thimphu is just the beginning. Discover more incredible destinations across Bhutan.
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
            From seamless visa processing and expert local guides to handpicked accommodations and personalized itineraries, {BUSINESS_CONTACT.companyName} ensures your Thimphu adventure is effortless and unforgettable. We handle every detail so you can focus on experiencing the magic of Bhutan.
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

export default Thimphu
