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

const Paro = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const paroPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('paro') || (pkg.title && pkg.title.toLowerCase().includes('paro'))
        })
        setPackages(paroPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Culture, Photography, Hiking, Heritage', icon: Compass },
    { label: 'Recommended Stay', value: '1-2 Nights', icon: Clock },
    { label: 'Popular With', value: 'Couples, Families, First-Time Visitors', icon: Users },
    { label: 'Altitude', value: '~2,200m', icon: Mountain },
    { label: 'Best Time', value: 'Mar-May, Sep-Nov', icon: Calendar },
  ]

  const whyVisit = [
    {
      title: 'Cultural Heritage',
      description: 'Paro is home to centuries-old monasteries, traditional festivals, and living Bhutanese traditions that offer an authentic glimpse into Himalayan Buddhist culture.',
      icon: Landmark,
    },
    {
      title: "Tiger's Nest Monastery",
      description: 'The iconic Taktsang Monastery perched on a 900m cliff face is one of the most sacred sites in Buddhism and a once-in-a-lifetime pilgrimage.',
      icon: Mountain,
    },
    {
      title: 'Himalayan Landscapes',
      description: 'Lush valleys, pine forests, and snow-capped peaks create breathtaking backdrops for every journey through Paro.',
      icon: TreePine,
    },
    {
      title: 'Historic Dzongs',
      description: "Impressive fortress-monasteries like Rinpung Dzong showcase Bhutan's unique blend of religious and administrative architecture.",
      icon: Landmark,
    },
    {
      title: 'Traditional Architecture',
      description: 'Every building in Paro follows centuries-old architectural rules, featuring intricate woodwork, painted motifs, and whitewashed walls.',
      icon: Compass,
    },
    {
      title: 'Photography Paradise',
      description: 'From misty mornings over the valley to vibrant festival costumes, Paro offers endless opportunities for stunning photography.',
      icon: Camera,
    },
  ]

  const topPlaces = [
    {
      name: "Tiger's Nest (Taktsang)",
      description:
        "Tiger's Nest is Bhutan's most famous monastery, clinging dramatically to a sheer cliff face at 3,120m above the Paro valley. According to legend, Guru Rinpoche flew here on a tigress's back in the 8th century. The hike takes approximately 2-3 hours uphill through pine forest, offering panoramic views along the way. Wear comfortable shoes, carry water, and start early to avoid the midday sun. The spiritual energy and jaw-dropping scenery make this the defining experience of any Bhutan trip.",
      icon: Mountain,
      duration: '4-5 hours (round trip)',
    },
    {
      name: 'Rinpung Dzong',
      description:
        'Known as the Fortress on a Heap of Jewels, Rinpung Dzong is one of the most impressive and best-preserved dzongs in Bhutan. Built in the 17th century, it houses the monastic body of Paro and the offices of the regional government. The annual Paro Tsechu festival is held in its courtyard, attracting thousands of visitors with masked dances, music, and celebrations. Walk through the traditional cantilever bridge at the entrance and admire the intricate woodwork and murals inside.',
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'National Museum of Bhutan',
      description:
        "Located above Rinpung Dzong in a circular tower, the National Museum houses a remarkable collection of Bhutanese art, thangka paintings, textiles, weapons, and natural history exhibits. The museum provides an excellent introduction to Bhutan's history, culture, and biodiversity. It is the ideal first stop for visitors wanting to understand the country before exploring further. Allow 2-3 hours to explore the galleries thoroughly.",
      icon: Camera,
      duration: '2-3 hours',
    },
    {
      name: 'Drukgyel Dzong',
      description:
        "The ruins of Drukgyel Dzong, a 17th-century fortress that once defended the Paro valley from Tibetan invasions, stand as a powerful reminder of Bhutan's martial history. The fortress is undergoing restoration and visitors can walk through the lower sections while enjoying spectacular views of Mount Jomolhari on clear days. The journey through rice paddies and traditional villages to reach the dzong is itself a rewarding experience.",
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'Kyichu Lhakhang',
      description:
        'One of the oldest temples in Bhutan, Kyichu Lhakhang was built in the 7th century by the Tibetan King Songtsen Gampo. It is one of 108 temples he built across the Himalayas to subdue a demoness. The temple contains a sacred orange tree that bears fruit year-round and is a popular pilgrimage site for both Bhutanese and international visitors seeking blessings and peace.',
      icon: Landmark,
      duration: '30-45 minutes',
    },
    {
      name: 'Paro Valley',
      description:
        "The Paro Valley itself is a breathtaking destination with terraced rice paddies, traditional farmhouses, winding rivers, and dense pine forests. Walk along the riverside paths, visit local farmhouses to experience rural Bhutanese life, or simply soak in the serenity of the valley. The valley's natural beauty and slower pace of life make it the perfect complement to the grandeur of Tiger's Nest.",
      icon: TreePine,
      duration: 'Half day or more',
    },
  ]

  const thingsToDo = [
    {
      title: "Hike Tiger's Nest",
      description: "Conquer Bhutan's most iconic trail and stand before the legendary cliffside monastery. The hike rewards you with spiritual energy, stunning valley views, and a sense of accomplishment you'll never forget.",
      icon: Mountain,
    },
    {
      title: 'Explore Dzongs',
      description: "Visit Rinpung Dzong and other ancient fortresses to experience the grandeur of Bhutanese architecture and understand the country's unique system of religious and secular governance.",
      icon: Landmark,
    },
    {
      title: 'Visit National Museum',
      description: "Dive into Bhutan's rich cultural tapestry with art, textiles, weapons, and natural history exhibits that tell the story of this fascinating Himalayan kingdom.",
      icon: Camera,
    },
    {
      title: 'Photography Walks',
      description: 'Capture the golden light on ancient temples, the vibrant colors of prayer flags, misty valleys, and the daily life of Bhutanese people in the streets of Paro.',
      icon: Camera,
    },
    {
      title: 'Local Market Shopping',
      description: 'Browse handmade textiles, traditional masks, Bhutanese jewelry, and organic honey at the Paro local market. Each item is crafted with centuries-old techniques.',
      icon: Heart,
    },
    {
      title: 'Traditional Hot Stone Bath',
      description: 'End your day with a traditional Bhutanese hot stone bath where river stones heated over a fire are dropped into herb-infused water for deep relaxation and healing.',
      icon: TreePine,
    },
  ]

  const seasons = [
    {
      season: 'Spring (March - May)',
      description: "Rhododendrons bloom across the valley in spectacular reds and pinks. The weather is mild, skies are clear, and the landscape is vibrant with new growth. Ideal for hiking Tiger's Nest and enjoying panoramic mountain views. Spring festivals also bring the valleys alive with masked dances and cultural celebrations.",
    },
    {
      season: 'Summer (June - August)',
      description: 'The monsoon season brings lush greenery to Paro but also frequent rainfall and misty conditions. While trails can be slippery and visibility lower, the valley is at its most verdant. Fewer tourists mean quieter experiences at popular sites. Pack waterproof gear and enjoy the dramatic cloud formations over the mountains.',
    },
    {
      season: 'Autumn (September - November)',
      description: "Considered the best time to visit Paro, autumn brings crisp clear skies, golden rice paddies, and spectacular views of snow-capped peaks. The weather is perfect for hiking, and festivals add cultural richness to your trip. Temperatures are comfortable and the valley glows with harvest colors.",
    },
    {
      season: 'Winter (December - February)',
      description: 'Winter in Paro is cold but beautiful, with snow-dusted mountains and frost-covered valleys. The skies are clear most days, making it excellent for photography. Fewer visitors mean you can explore dzongs and temples in peaceful solitude. Warm clothing is essential, but the reward is an intimate, serene Bhutan experience.',
    },
  ]

  const faqs = [
    {
      question: 'How do I get to Paro, Bhutan?',
      answer: "Paro is served by Paro International Airport, Bhutan's only international airport. You can fly in from Delhi, Kathmandu, Kolkata, Bangkok, or Singapore on Druk Air or Bhutan Airlines. Alternatively, you can enter Bhutan by road from Phuentsholing (5-6 hours drive) and continue to Paro.",
    },
    {
      question: "How difficult is the Tiger's Nest hike?",
      answer: "The Tiger's Nest hike is moderately challenging, taking 2-3 hours uphill through pine forests. The trail has a steady incline with some steep sections. Anyone with reasonable fitness can complete it. Rest stops with tea and snacks are available along the way. Start early to avoid afternoon clouds.",
    },
    {
      question: 'How many days do I need in Paro?',
      answer: "We recommend spending 1-2 nights in Paro to cover the major highlights including Tiger's Nest, Rinpung Dzong, and the National Museum. If you want a more relaxed pace or plan to take a hot stone bath, 2 nights is ideal.",
    },
    {
      question: 'Is Paro safe for tourists?',
      answer: 'Paro is one of the safest destinations in the world. Bhutan has very low crime rates, and the local people are known for their warmth and hospitality. Exercise normal travel precautions and you will have a wonderful, safe experience.',
    },
    {
      question: 'What is the best time to visit Paro?',
      answer: "The best time to visit Paro is during spring (March-May) and autumn (September-November) when the weather is clear, temperatures are comfortable, and views are spectacular. Autumn offers golden rice paddies, while spring brings blooming rhododendrons.",
    },
    {
      question: 'Do I need a guide to visit Paro?',
      answer: "Bhutan requires all international tourists to book through a licensed tour operator. Your guide will handle all permits and accompany you throughout Paro. Local guides provide invaluable insights into the history, culture, and significance of each site you visit.",
    },
    {
      question: 'What should I wear in Paro?',
      answer: "Pack layers as Paro's weather can change quickly. Bring a warm jacket, comfortable hiking shoes, and modest clothing that covers shoulders and knees for temple visits. Sunscreen and sunglasses are essential year-round due to the high altitude.",
    },
    {
      question: 'Are there ATMs in Paro?',
      answer: 'Yes, Paro has several banks and ATMs including Bank of Bhutan and Bhutan National Bank. However, it is wise to carry some cash as not all shops accept cards. Indian Rupees are widely accepted alongside the local Ngultrum.',
    },
  ]

  const travelTips = [
    { title: 'Wear Comfortable Shoes', description: "The Tiger's Nest trail and dzong visits involve significant walking and climbing stairs. Sturdy, broken-in hiking shoes with good grip are essential for safety and comfort." },
    { title: 'Dress in Layers', description: "Paro's weather can shift from warm sunshine to cool mist quickly. Layered clothing lets you adjust throughout the day and stay comfortable during both the hike and temple visits." },
    { title: 'Respect Sacred Sites', description: 'Always remove shoes before entering temples and dzongs. Walk clockwise around stupas and monasteries. Ask permission before photographing monks or religious ceremonies.' },
    { title: 'Carry Water and Snacks', description: "Stay hydrated during the Tiger's Nest hike and other outdoor activities. Bring at least 1.5 liters of water and energy snacks to keep your energy levels up on the trail." },
    { title: 'Follow Your Guide', description: "Your licensed guide provides essential context about Bhutan's culture, history, and etiquette. Follow their instructions at sacred sites and respect their advice on local customs." },
    { title: 'Keep Documents Secure', description: 'Carry copies of your passport, visa, and travel insurance separately from originals. Bhutan requires tourists to carry their visa approval letter at all times during their stay.' },
  ]

  const accommodation = [
    { category: 'Budget / Standard', description: 'Clean, comfortable guesthouses and hotels offering basic amenities and warm hospitality. Perfect for backpackers and budget-conscious travelers wanting an authentic experience.' },
    { category: 'Comfort', description: 'Mid-range hotels with modern amenities, restaurant facilities, and convenient locations near the town center. Great value for couples and families wanting comfort without the premium price tag.' },
    { category: 'Premium', description: 'Upscale hotels and boutique properties with stunning valley views, spa facilities, fine dining, and personalized service. Ideal for travelers seeking a refined Bhutanese experience.' },
    { category: 'Luxury', description: 'World-class resorts offering the pinnacle of Bhutanese hospitality with private tours, exclusive dining, wellness programs, and breathtaking settings.' },
  ]

  const relatedDestinations = [
    { name: 'Thimphu', slug: 'thimphu', description: "Bhutan's capital city blends modern development with ancient tradition, home to the massive Buddha Dordenma statue and vibrant weekend markets." },
    { name: 'Punakha', slug: 'punakha', description: 'The ancient capital boasts the stunning Punakha Dzong at the confluence of two rivers and serene rice paddy trails through rural villages.' },
    { name: 'Phuentsholing', slug: 'phuentsholing', description: "Bhutan's gateway town on the Indian border offers a unique blend of cultures and is the starting point for overland journeys." },
    { name: 'Haa Valley', slug: 'haa-valley', description: 'A hidden gem with pristine beauty, ancient temples, and traditional farmhouses nestled between two river valleys far from tourist crowds.' },
    { name: 'Bumthang', slug: 'bumthang', description: "The spiritual heartland of Bhutan with four valleys filled with ancient temples, sacred sites, and the country's oldest Buddhist monasteries." },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Paro'))

  return (
    <>
      <SEO
        title="Paro Bhutan Travel Guide - Places to Visit, Things to Do & Tours | Happy Kingdom Travels"
        description="Discover Paro Bhutan with our complete travel guide. Explore Tiger's Nest Monastery, top places to visit, things to do, best time to visit, and Bhutan tours. Plan your Paro adventure with Happy Kingdom Travels."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/paro-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Paro' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Paro, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Discover the legendary Tiger's Nest Monastery, ancient dzongs, and the breathtaking valley that welcomes every visitor to Bhutan. Paro is where your Himalayan journey begins.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Paro</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Paro is the first glimpse most visitors get of Bhutan, and it sets the tone for an extraordinary journey. Home to Bhutan's only international airport, the Paro Valley is a stunning basin of terraced rice paddies, ancient monasteries, and traditional farmhouses framed by towering Himalayan peaks. This is where the iconic Tiger's Nest Monastery clings to a sheer cliff face, where centuries-old dzongs still stand as administrative and spiritual centers, and where the rhythm of traditional Bhutanese life continues undisturbed by the outside world.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Whether you're drawn by the spiritual magnetism of Tiger's Nest, the architectural grandeur of Rinpung Dzong, or simply the desire to experience one of the most pristine valleys in the Himalayas, Paro delivers a travel experience unlike anywhere else on earth. The valley's compact size means you can explore world-class cultural sites, hike legendary trails, and immerse yourself in Bhutanese traditions all within a short stay.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With its rich tapestry of history, spirituality, and natural beauty, Paro is not just a stopover but the heart of any Bhutan experience. From the moment your plane descends through the mountains to land on Bhutan's only runway, you know you're entering somewhere truly special.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Paro</h2>
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

      {/* Why Visit Paro */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Paro?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Paro offers a perfect blend of spirituality, history, and natural beauty that makes it an unmissable destination in Bhutan.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From sacred cliffside monasteries to ancient fortresses, Paro's attractions are steeped in history and spiritual significance.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Adventure, culture, and relaxation await you in Paro. Here are the top experiences to add to your itinerary.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Each season in Paro brings a unique character. Choose the time that suits your travel style.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Getting to Paro is straightforward with multiple travel options available.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">By Air</h3>
              <p className="text-gray-600 leading-relaxed">
                Paro International Airport is Bhutan's only international airport, connected to Delhi, Kathmandu, Kolkata, Bangkok, and Singapore via Druk Air and Bhutan Airlines. The approach through the Himalayan valleys is one of the world's most spectacular landings.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <Footprints className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">By Road from Phuentsholing</h3>
              <p className="text-gray-600 leading-relaxed">
                The overland route from Phuentsholing on the Indian border takes approximately 5-6 hours by car. The scenic drive winds through forests, river valleys, and small towns, offering a wonderful introduction to the Bhutanese countryside.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-forest" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">From Thimphu</h3>
              <p className="text-gray-600 leading-relaxed">
                Thimphu is just a 1.5-hour scenic drive from Paro along a well-maintained highway. Many visitors combine both destinations in a single trip, making the transfer an easy and picturesque journey through the heart of Bhutan.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Paro?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We recommend spending <strong className="text-gray-900">1 to 2 nights</strong> in Paro to fully experience the valley's highlights. With one night, you can visit Rinpung Dzong, the National Museum, and make the iconic Tiger's Nest hike on the following day.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A two-night stay allows for a more relaxed pace, giving you time to explore Kyichu Lhakhang, Drukgyel Dzong, and the Paro Valley at leisure. It also leaves room for a traditional hot stone bath and some shopping at the local market.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Paro also serves as the perfect starting or ending point for a broader Bhutan itinerary, with easy connections to Thimphu and other destinations.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Paro Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Here's a suggested 3-day plan to make the most of your time in Paro.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">01</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 1: Arrival & Sightseeing</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Arrive at Paro International Airport</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Check into your hotel and freshen up</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Visit Rinpung Dzong and the cantilever bridge</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore the National Museum of Bhutan</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Evening stroll through Paro town</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-forest relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">02</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 2: Tiger's Nest Hike</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Early breakfast and drive to the trailhead</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Hike to Tiger's Nest Monastery (2-3 hours)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore the monastery complex</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Lunch at the cafeteria with valley views</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Hike down and visit Kyichu Lhakhang</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
              <div className="absolute top-6 right-6 text-5xl font-bold text-forest/10">03</div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">Day 3: Explore & Depart</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Morning visit to Drukgyel Dzong</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Explore Paro Valley and local farmhouses</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Traditional hot stone bath (optional)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Shopping for souvenirs at the local market</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>Transfer to airport for departure</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Paro?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Paro's diverse attractions make it a perfect destination for a wide range of travellers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Couples', description: 'Romantic valley walks, cozy heritage stays, and the spiritual intimacy of Tiger\'s Nest make Paro ideal for couples.', icon: Heart },
              { title: 'Honeymooners', description: 'Begin your married life with a once-in-a-lifetime journey through pristine Himalayan landscapes and ancient sacred sites.', icon: Heart },
              { title: 'Families', description: 'Educational museum visits, easy nature walks, and the welcoming Bhutanese culture make Paro perfect for family holidays.', icon: Users },
              { title: 'Solo Travellers', description: 'Find solitude in the mountains, connect with fellow travellers on the Tiger\'s Nest trail, and discover yourself in this peaceful valley.', icon: Compass },
              { title: 'Photography Lovers', description: 'From dramatic cliffside monasteries to golden-hour valley views, Paro is a photographer\'s dream at every turn.', icon: Camera },
              { title: 'Culture Enthusiasts', description: 'Living Buddhist traditions, centuries-old dzongs, and vibrant festivals offer deep cultural immersion for history and culture lovers.', icon: Landmark },
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your Paro trip with these practical tips from our travel experts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Paro offers accommodation for every budget and travel style, from budget guesthouses to world-class luxury resorts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Paro Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our curated tour packages that include Paro as a key destination in your Bhutan journey.
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
                We're curating the best Paro tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Paro</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about visiting Paro? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Explore Paro Your Way?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized Paro itinerary based on your interests, pace, and budget. Whether you want a quick Tiger's Nest getaway or a deep cultural immersion, we'll design the perfect trip for you.
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
            Paro is just the beginning. Discover more incredible destinations across Bhutan.
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
            From seamless visa processing and expert local guides to handpicked accommodations and personalized itineraries, Happy Kingdom Travels ensures your Paro adventure is effortless and unforgettable. We handle every detail so you can focus on experiencing the magic of Bhutan.
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

export default Paro
