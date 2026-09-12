import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, MapPin, Clock, Star, Camera, Mountain, Landmark, TreePine, Users, Heart, CheckCircle, Calendar, Compass, Flower2 } from 'lucide-react'
import SEO from '../../components/SEO'
import Breadcrumbs from '../../components/Breadcrumbs'
import FAQAccordion from '../../components/FAQAccordion'
import { useBusinessContact } from '../../context/SettingsContext'
import { createWhatsAppUrl } from '../../utils/createWhatsAppUrl'
import { createDestinationMessage } from '../../utils/createWhatsAppMessage'
import PackageCard from '../../components/PackageCard'
import packageService from '../../services/packageService'

const HaaValley = () => {
  const BUSINESS_CONTACT = useBusinessContact();
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await packageService.getAllPackages()
        const allPackages = res.data || res.packages || []
        const haaPackages = allPackages.filter((pkg) => {
          const routeStr = Array.isArray(pkg.route) ? pkg.route.join(' ') : (pkg.route || '')
          return routeStr.toLowerCase().includes('haa') || (pkg.title && pkg.title.toLowerCase().includes('haa'))
        })
        setPackages(haaPackages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const quickFacts = [
    { label: 'Best For', value: 'Nature, Photography, Villages, Quiet Experience', icon: Compass },
    { label: 'Recommended Stay', value: '1 Night / Day Trip', icon: Clock },
    { label: 'Popular With', value: 'Nature Lovers, Photography, Off-the-beaten-path', icon: Users },
    { label: 'Altitude', value: '~2,670m', icon: Mountain },
    { label: 'Best Time', value: 'Mar-May, Sep-Nov', icon: Calendar },
  ]

  const whyVisit = [
    {
      title: 'Traditional Village Life',
      description: 'Haa Valley is home to farming communities that have preserved their traditional Bhutanese way of life for centuries. Rice paddies, buckwheat fields, and potato farms line the valley floor, with farmers in traditional dress working the land much as their ancestors did.',
      icon: TreePine,
    },
    {
      title: 'Mountain Scenery',
      description: 'Flanked by the towering peaks of the Black and White Mountains, the valley offers breathtaking Himalayan panoramas. Snow-capped ridges frame emerald pastures and winding rivers, creating landscapes that shift dramatically with the seasons.',
      icon: Mountain,
    },
    {
      title: 'Ancient Temples',
      description: 'The twin temples of Lhakhang Karpo (White) and Lhakhang Nagpo (Black) are among the most historically significant religious sites in Bhutan. Built in the 7th century, they anchor the valley in deep spiritual heritage.',
      icon: Landmark,
    },
    {
      title: 'Less Crowded',
      description: 'Haa Valley receives far fewer visitors than Paro, Thimphu, or Punakha. The quiet trails, empty roads, and peaceful temples make it a rare find for travellers seeking solitude and an unspoiled Bhutan experience.',
      icon: Compass,
    },
    {
      title: 'Photography Paradise',
      description: 'From misty morning valley shots to golden-hour farmhouses and mountain silhouettes, Haa Valley offers endless composition opportunities. The changing light across the valley floor and temple grounds makes every hour a new scene.',
      icon: Camera,
    },
    {
      title: 'Authentic Bhutan',
      description: 'This is where Bhutan shows its most genuine self — away from tourist routes and commercial development. The valley reveals a living, breathing culture rooted in farming, faith, and the rhythms of the Himalayan seasons.',
      icon: Heart,
    },
  ]

  const topPlaces = [
    {
      name: 'Lhakhang Karpo (White Temple)',
      description:
        'One of two twin temples built in the 7th century by the Tibetan King Songtsen Gampo, Lhakhang Karpo is an important pilgrimage site in Bhutan. According to legend, the king drove a golden arrow into the ground from a distant mountaintop, and where it landed, these temples were built to subdue a demoness terrorizing the valley. The whitewashed walls, intricate woodwork, and peaceful courtyard surrounded by ancient trees make it a place of deep spiritual calm. Visitors can explore the temple grounds and observe monks going about their daily rituals.',
      icon: Landmark,
      duration: '1-2 hours',
    },
    {
      name: 'Lhakhang Nagpo (Black Temple)',
      description:
        'The twin sister temple to Lhakhang Karpo, Lhakhang Nagpo sits on a low hill just a short walk from its white counterpart. Built by the same Tibetan king in the same century, the Black Temple is smaller but equally significant. Its darker colour contrasts with the surrounding greenery, and the temple grounds are quieter, offering a more contemplative atmosphere. Together, the twin temples represent a sacred balance in Bhutanese spiritual geography and are a must-visit for anyone exploring Haa Valley.',
      icon: Landmark,
      duration: '1 hour',
    },
    {
      name: 'Haa Valley Viewpoint',
      description:
        'Perched along the winding road that enters the valley, this viewpoint offers a sweeping panorama of the entire Haa Valley — the fertile farmlands below, the river meandering through the valley floor, and the imposing snow-capped mountains rising on either side. The best time to visit is early morning when the valley is draped in mist, or late afternoon when the golden light bathes the landscape in warm tones. It is one of the most photographed spots in the district and a perfect introduction to the valley\'s beauty.',
      icon: Mountain,
      duration: '30 minutes',
    },
    {
      name: 'Katsho Village',
      description:
        'One of the most picturesque villages in Haa Valley, Katsho is a living example of traditional Bhutanese rural life. Wooden farmhouses with ornate window frames sit amid potato and buckwheat fields, while farmers tend their crops and livestock in the open pastures. The village has a small monastery and a community of friendly locals who welcome curious visitors. Walking through Katsho offers a rare, unscripted glimpse into how Bhutanese communities have lived for generations.',
      icon: TreePine,
      duration: '1-2 hours',
    },
    {
      name: 'Chele La Pass',
      description:
        'At 3,988 meters, Chele La is the highest motorable pass in Bhutan and offers one of the most spectacular mountain panoramas in the country. The drive from Haa or Paro to the pass winds through dense rhododendron and birch forests, opening to vast meadows dotted with prayer flags and wildflowers in spring. On clear days, the pass reveals stunning views of Jomolhari (7,326m) and Jichu Drake (6,989m). The altitude and wildflower meadows make it a favourite stop for photographers and nature lovers.',
      icon: Mountain,
      duration: '2-3 hours (including drive)',
    },
  ]

  const thingsToDo = [
    {
      title: 'Valley Sightseeing',
      description: "Drive through the winding valley roads, stopping at viewpoints and village corners to absorb the dramatic scenery of Bhutan's most serene valley surrounded by towering Himalayan peaks.",
      icon: Compass,
    },
    {
      title: 'Visit Twin Temples',
      description: 'Explore the ancient Lhakhang Karpo and Lhakhang Nagpo, learn their 7th-century legends, and observe the quiet monastic life that continues within their centuries-old walls.',
      icon: Landmark,
    },
    {
      title: 'Village Walks',
      description: 'Wander through traditional farming villages like Katsho and Lhakhang, meeting locals working their fields, and experiencing the unhurried pace of rural Bhutanese life.',
      icon: TreePine,
    },
    {
      title: 'Photography',
      description: 'Capture the valley from every angle — misty mornings, golden-hour farmhouses, snow-capped mountain backdrops, and ancient temples framed by prayer flags and ancient trees.',
      icon: Camera,
    },
    {
      title: 'Nature Walks',
      description: 'Follow trails along the valley floor and river banks, enjoying the fresh mountain air, wildflowers, birdsong, and the untouched natural beauty that surrounds every step.',
      icon: Flower2,
    },
    {
      title: 'Cultural Exploration',
      description: 'Visit the local gompa, observe Bhutanese Buddhist traditions up close, and gain a deeper understanding of how faith shapes daily life in this remote Himalayan valley.',
      icon: Landmark,
    },
  ]

  const seasons = [
    {
      season: 'Spring (March - May)',
      description: 'Haa Valley bursts into colour as rhododendrons bloom across the hillsides and wildflowers carpet the valley floor. The weather is mild, skies are mostly clear, and the valley is at its most vibrant. Chele La Pass is especially spectacular during this season with rhododendron-lined meadows at their peak.',
    },
    {
      season: 'Summer (June - August)',
      description: 'The monsoon season brings lush greenery to the valley, transforming every field and forest into a vivid emerald landscape. While rain is frequent, the dramatic clouds and mist create a moody, atmospheric beauty. The valley is at its most fertile and green.',
    },
    {
      season: 'Autumn (September - November)',
      description: 'Autumn is arguably the best time to visit Haa Valley. Clear skies reveal stunning mountain panoramas, golden and amber foliage lines the forests, and the harvested fields glow in warm tones. The crisp air and excellent visibility make this prime photography season.',
    },
    {
      season: 'Winter (December - February)',
      description: 'Winter brings snow to the higher peaks surrounding the valley, creating a dramatic white-and-green contrast. The valley itself remains relatively mild, and the clear skies offer some of the best mountain views of the year. Fewer visitors mean even greater solitude and peace.',
    },
  ]

  const howToReach = [
    {
      title: 'By Road from Paro via Chele La',
      description: 'The most scenic route, this drive takes approximately 3-4 hours over the spectacular Chele La Pass at 3,988m. The pass offers breathtaking Himalayan views and the descent into Haa Valley is one of the most beautiful drives in Bhutan. Best done in good weather.',
      icon: Compass,
    },
    {
      title: 'By Road from Paro via Chhuzom',
      description: 'The longer but more accessible route, this drive takes approximately 4-5 hours through Chhuzom and along the river valley. The road is more reliable in all weather conditions and passes through diverse landscapes from alpine to subtropical.',
      icon: Compass,
    },
    {
      title: 'From Phuentsholing',
      description: 'The overland route from the Indian border passes through Haa on the way to Paro. The full journey takes approximately 6-8 hours and offers a scenic introduction to western Bhutan\'s diverse landscapes and cultural regions.',
      icon: MapPin,
    },
  ]

  const sampleItinerary = [
    {
      day: 'Day 1',
      title: 'Paro to Haa Valley',
      activities: [
        'Depart Paro after breakfast',
        'Drive over Chele La Pass with panoramic Himalayan views',
        'Stop at the pass for photographs and wildflower meadows',
        'Descend into Haa Valley through forested slopes',
        'Check into your farmstay or local hotel',
        'Visit Lhakhang Karpo and Lhakhang Nagpo',
        'Evening walk through Katsho Village',
        'Overnight in Haa Valley',
      ],
    },
    {
      day: 'Day 2',
      title: 'Haa Valley Exploration & Return',
      activities: [
        'Morning viewpoint stop for valley panorama photographs',
        'Walk along the valley floor and river banks',
        'Visit local farms and observe rural Bhutanese life',
        'Explore the gompa and observe monastic traditions',
        'Enjoy a traditional Bhutanese lunch',
        'Optional: Drive to Chele La Pass for mountain views',
        'Depart for Paro or continue to next destination',
      ],
    },
  ]

  const whoShouldVisit = [
    { title: 'Nature Lovers', description: "Haa Valley is one of Bhutan's most pristine natural landscapes — towering mountains, clear rivers, alpine meadows, and ancient forests offer an untouched Himalayan paradise.", icon: TreePine },
    { title: 'Photography Enthusiasts', description: "From misty valley mornings to golden-hour farmhouses and snow-capped mountain backdrops, Haa Valley offers endless composition opportunities with virtually no crowds.", icon: Camera },
    { title: 'Off-the-beaten-path Travellers', description: "If you're seeking a Bhutan that few tourists ever see, Haa Valley is the answer — quiet trails, empty roads, and temples where you may be the only visitor.", icon: Compass },
    { title: 'Couples', description: "The valley's serene beauty, traditional farmhouses, and intimate atmosphere make it a deeply romantic escape far from the beaten tourist track.", icon: Heart },
    { title: 'Solo Travellers', description: "Haa Valley's solitude, welcoming villages, and peaceful walking trails make it an ideal retreat for solo travellers seeking quiet reflection and authentic cultural encounters.", icon: Users },
    { title: 'Culture Enthusiasts', description: "Ancient temples, living farming traditions, and rural communities that have maintained their way of life for centuries offer deep cultural immersion in a stunning setting.", icon: Landmark },
  ]

  const travelTips = [
    { title: 'Pack Layers', description: "Haa Valley sits at a higher altitude than Paro, and temperatures can drop significantly, especially in the mornings and evenings. Layered clothing is essential for comfort during outdoor activities." },
    { title: 'Carry Sun Protection', description: "The high altitude means strong UV radiation. Bring sunscreen, sunglasses, and a hat to protect yourself during valley walks, viewpoints, and temple visits." },
    { title: 'Respect Sacred Sites', description: "Remove shoes before entering temples and gompas. Walk clockwise around chortens and monasteries. Dress modestly and ask permission before photographing monks or religious ceremonies." },
    { title: 'Check Road Conditions', description: "The Chele La route can be affected by weather, especially in monsoon and winter seasons. Your tour operator will know the best route to take based on current conditions." },
    { title: 'Carry Cash', description: "Haa Valley has limited commercial facilities. Carry enough Bhutanese Ngultrum for small purchases, tips, and local snacks along the way." },
    { title: 'Engage Locals', description: "The villagers of Haa Valley are warm and welcoming. Don't hesitate to greet them, ask about their farms, or accept an invitation for tea — these encounters make the trip truly special." },
  ]

  const accommodation = [
    { category: 'Farmstays & Homestays', description: 'The most authentic way to experience Haa Valley — stay with local families, enjoy traditional Bhutanese meals, and wake up to valley views and farm life. Limited but highly recommended.' },
    { category: 'Guesthouses', description: 'A handful of small guesthouses in Haa town and the surrounding villages offer clean, comfortable rooms with valley views and warm Bhutanese hospitality at reasonable prices.' },
    { category: 'Hotels', description: 'There are a few small hotels in Haa district offering more standard amenities. While limited in number, they provide a comfortable base for exploring the valley and its surroundings.' },
    { category: 'Camping', description: 'For the adventurous, camping in Haa Valley offers an unparalleled experience — sleeping under starlit Himalayan skies surrounded by pristine nature. Arrangements can be made through your tour operator.' },
  ]

  const faqs = [
    {
      question: 'How far is Haa Valley from Paro?',
      answer: 'Haa Valley is approximately 60km from Paro. The scenic route via Chele La Pass takes 3-4 hours, while the longer route via Chhuzom takes about 4-5 hours. The drive itself is one of the most beautiful in Bhutan.',
    },
    {
      question: 'How many days do I need in Haa Valley?',
      answer: 'We recommend spending 1 night in Haa Valley to fully experience its highlights — the twin temples, village walks, valley viewpoints, and the serene atmosphere. A day trip from Paro is also possible but a night stay is highly recommended.',
    },
    {
      question: 'Is Haa Valley worth visiting?',
      answer: 'Absolutely. Haa Valley offers one of the most authentic and unspoiled experiences in Bhutan. It is ideal for travellers seeking quiet beauty, traditional village life, ancient temples, and a destination far from the usual tourist crowds.',
    },
    {
      question: 'What is the best time to visit Haa Valley?',
      answer: 'Autumn (September-November) offers the clearest skies and best mountain views. Spring (March-May) brings wildflowers and rhododendrons. Winter offers solitude and snow-capped peaks. Each season has its own charm.',
    },
    {
      question: 'Is Haa Valley safe for tourists?',
      answer: 'Haa Valley is extremely safe for tourists. Bhutan has very low crime rates, and the people of Haa are known for their warmth and hospitality. The valley is peaceful and welcoming to all visitors.',
    },
    {
      question: 'Can I visit Haa Valley on a day trip from Paro?',
      answer: 'Yes, it is possible to visit Haa Valley on a day trip from Paro, though it requires an early start and a long day. We recommend staying overnight for a more relaxed and rewarding experience.',
    },
  ]

  const relatedDestinations = [
    { name: 'Paro', slug: 'paro', description: "Home to the iconic Tiger's Nest Monastery, ancient dzongs, and Bhutan's only international airport set in a stunning Himalayan valley." },
    { name: 'Thimphu', slug: 'thimphu', description: "Bhutan's vibrant capital blends modern development with ancient tradition, home to the massive Buddha Dordenma statue and lively weekend markets." },
    { name: 'Punakha', slug: 'punakha', description: 'The former capital with the most beautiful dzong in Bhutan, rice terraces, and the warm subtropical valley perfect for romantic getaways.' },
    { name: 'Phuentsholing', slug: 'phuentsholing', description: "Bhutan's gateway town on the Indian border offers a unique blend of cultures and is the starting point for overland journeys into the country." },
    { name: 'Bumthang', slug: 'bumthang', description: "The spiritual heartland of Bhutan with four valleys filled with ancient temples, sacred sites, and the country's oldest Buddhist monasteries." },
  ]

  const whatsappUrl = createWhatsAppUrl(createDestinationMessage('Haa Valley', BUSINESS_CONTACT.companyName))

  return (
    <>
      <SEO
        title={`Haa Valley Bhutan Travel Guide - Things to Do, Places to Visit & Tours | ${BUSINESS_CONTACT.companyName}`}
        description={`Discover Haa Valley Bhutan with our complete travel guide. Explore twin temples, traditional farmhouses, mountain viewpoints, and off-the-beaten-path experiences. Plan your Haa Valley trip with ${BUSINESS_CONTACT.companyName}.`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest/95 to-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/haa-valley-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-24 h-80 lg:h-96 flex flex-col justify-center">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Destinations', path: '/bhutan-tour-packages' }, { label: 'Haa Valley' }]} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Explore Haa Valley, Bhutan</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8">
            Discover one of Bhutan's most pristine and least visited valleys — home to ancient twin temples, traditional farmhouses, towering mountain scenery, and a quiet way of life far from the crowds.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome to Haa Valley</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Tucked away in western Bhutan between the sacred peaks of the Black Mountain and the White Mountain, Haa Valley is one of the country's least visited yet most enchanting districts. This remote valley has remained virtually untouched by tourism, preserving a way of life that has changed little over centuries. Traditional Bhutanese farmhouses dot the valley floor, rice and buckwheat fields stretch across the fertile lowlands, and ancient monasteries perch quietly on the surrounding hillsides.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Unlike the more popular destinations of Paro and Thimphu, Haa Valley offers a rare glimpse into authentic Bhutanese village life. Here, farmers tend their fields with handmade tools, monks perform daily rituals in centuries-old temples, and the rhythm of the seasons dictates the pace of life. The valley is home to the legendary twin temples of Lhakhang Karpo and Lhakhang Nagpo, built in the 7th century by the Tibetan King Songtsen Gampo, and offers some of the most spectacular mountain scenery in the country.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're seeking solitude in a pristine Himalayan landscape, photography opportunities around every bend, or an authentic cultural experience far from the beaten tourist track, Haa Valley delivers all of this and more. It is the Bhutan that existed before tourism — quiet, unspoiled, and deeply spiritual.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Facts About Haa Valley</h2>
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

      {/* Why Visit Haa Valley */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gold rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Visit Haa Valley?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Haa Valley offers a unique blend of quiet mountain beauty, ancient spiritual heritage, and untouched village life that sets it apart from every other destination in Bhutan.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Top Places to Visit in Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            From ancient twin temples and dramatic mountain passes to charming farming villages, Haa Valley's attractions offer a deeply authentic Bhutan experience.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things to Do in Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Quiet discovery, cultural immersion, and natural beauty await you in Haa Valley. Here are the top experiences to add to your itinerary.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Time to Visit Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Haa Valley's high altitude gives it cool, crisp weather year-round. Each season brings its own distinctive beauty to this mountain sanctuary.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How to Reach Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Haa Valley is accessible by road from Paro, with the journey itself being one of the scenic highlights of western Bhutan.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Many Days in Haa Valley?</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                We recommend spending <strong className="text-gray-900">1 night</strong> in Haa Valley to fully experience its highlights — the twin temples, village walks, valley viewpoints, and the serene atmosphere that makes this valley so special. An overnight stay allows you to enjoy the valley's golden-hour light and early morning mist.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                A <strong className="text-gray-900">day trip from Paro</strong> is also possible for travellers on a tight schedule. You can visit both Lhakhang Karpo and Lhakhang Nagpo, stop at the valley viewpoint, and drive over Chele La Pass — all within a single long day.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Haa Valley pairs beautifully with Paro (3-4 hours drive) and Thimphu (6-7 hours), making it an excellent addition to any western Bhutan itinerary. Many travellers combine it with a visit to Chele La Pass for the ultimate mountain experience.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sample Haa Valley Itinerary</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Here's a suggested 2-day plan to make the most of your time in Haa Valley.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Who Should Visit Haa Valley?</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Haa Valley's quiet beauty, pristine nature, and authentic village life make it a perfect destination for travellers who seek something truly special.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Travel Tips for Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Make the most of your Haa Valley trip with these practical tips from our travel experts.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Where to Stay in Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Accommodation in Haa Valley is limited but offers some of the most authentic stays in Bhutan. Farmstays and homestays provide a truly immersive experience.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Haa Valley Tour Packages</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl">
            Explore our curated tour packages that include Haa Valley as a key destination in your Bhutan journey.
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
                We're curating the best Haa Valley tour packages. In the meantime, explore all our Bhutan packages or get in touch for a customized trip.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions About Haa Valley</h2>
          </div>
          <p className="text-gray-600 text-lg mb-10">
            Got questions about visiting Haa Valley? Here are the answers to the most common queries from travellers.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Customize CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-forest/95 to-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Explore Haa Valley Your Way?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft a personalized Haa Valley itinerary based on your interests, pace, and budget. Whether you want a quiet nature retreat or a deep cultural immersion, we'll design the perfect trip for you.
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
            Haa Valley is just the beginning. Discover more incredible destinations across Bhutan.
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
            From seamless visa processing and expert local guides to handpicked farmstays and personalized itineraries, {BUSINESS_CONTACT.companyName} ensures your Haa Valley adventure is effortless and unforgettable. We handle every detail so you can focus on experiencing the magic of Bhutan.
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

export default HaaValley
