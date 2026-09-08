import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Package from '../models/Package.js';

await mongoose.connect(process.env.MONGODB_URI);

const data = {
  title: 'Bhutan Grand Discovery — 9N/10D (Group/Solo)',
  slug: 'bhutan-grand-discovery-9n-10d',
  destination: 'Bhutan',
  category: 'group',
  packageCode: 'HKD0022',
  type: 'Domestic',
  duration: { nights: 9, days: 10 },
  route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro'],
  startingPoints: ['Bagdogra Airport (India)', 'NJP Station (India)', 'Jaigaon (India)'],
  shortDescription: 'A 10-day group/solo tour covering Phuentsholing, Thimphu, Punakha, Paro, Tiger\'s Nest, Phobjikha Valley and Chele-La-Pass. Fixed departures with shared accommodation and transport.',
  description: 'This 9-night / 10-day fixed-departure itinerary is the most comprehensive group tour we offer. Starting from Bagdogra Airport or NJP Station, travel through Phuentsholing, Thimphu, Punakha, and Paro covering all major attractions including Tiger\'s Nest Monastery, Phobjikha Valley, Chele-La-Pass, and more. The tour includes 9 breakfasts and dinners, all transportation, permits, tourist guide, and comfortable 3-star hotel accommodation. Designed for solo travellers and small groups who want the complete Bhutan experience.',
  tripHighlights: [
    'Hike to Taktsang (Tiger\'s Nest) Monastery',
    'Excursion to Gangtey/Phobjikha Valley — Black Necked Crane habitat',
    'Excursion to Chele-La-Pass with spectacular mountain views',
    'Visit Punakha Dzong — Palace of Great Happiness',
    'Full day Thimphu sightseeing — Buddha Point, Memorial Chorten, Tashichho Dzong',
    'Hot Stone Bath & Spa experience',
    'Dochula Pass with panoramic Himalayan views',
    'White River rafting option in Punakha',
  ],
  suitableFor: ['Solo Travellers', 'Small Groups', 'First-Time Visitors', 'Budget Travellers', 'Cultural Travellers'],
  travelStyle: 'comfort',
  images: ['/images/tours/discovery2-hero.jpg', '/images/tours/discovery2-thimphu.jpg', '/images/tours/discovery2-punakha.jpg', '/images/tours/discovery2-bumthang.jpg', '/images/tours/discovery2-phobjikha.jpg', '/images/tours/discovery2-paro.jpg'],
  heroImage: '/images/tours/discovery2-hero.jpg',
  itinerary: [
    {
      dayNumber: 1,
      title: 'Arrival at Bagdogra Airport / NJP Station - Transfer to Phuentsholing - Immigration Formalities - Night Stay',
      description: 'Upon arrival at Bagdogra Airport or NJP Station, our representative will warmly welcome you. A transfer to Phuentsholing will follow, a journey of approximately 155 km taking around 4 hours. Upon arrival, clear immigration formalities at the Pedestrian Terminal, obtain the inner-line permit, and check into your pre-booked hotel. Enjoy an evening stroll in the bustling main market of Phuentsholing before resting for the night.',
      locations: ['Bagdogra Airport / NJP Station', 'Phuentsholing'],
      activities: ['Airport/Railway pickup', 'Transfer to Phuentsholing', 'Immigration formalities', 'Evening market stroll'],
      meals: { breakfast: false, lunch: false, dinner: true },
      overnightAt: 'Phuentsholing',
      distance: '155 km',
      travelTime: '4 hours',
    },
    {
      dayNumber: 2,
      title: 'Immigration Formalities - Transfer to Thimphu - Night Stay',
      description: 'Start the day with breakfast and complete immigration formalities. Proceed towards Thimphu, a scenic 6-hour drive covering approximately 163 km. En route, visit Kharbandi Gumba and witness the beautiful mountainous landscape. Arrive in Thimphu, check into your hotel, and unwind. Explore the government-run Handicrafts Emporium and local crafts bazaar in the evening, showcasing Bhutanese traditional arts. Spend the night in Thimphu.',
      locations: ['Phuentsholing', 'Kharbandi Gumba', 'Thimphu'],
      activities: ['Immigration formalities', 'Kharbandi Gumba visit', 'Thimphu arrival', 'Handicrafts Emporium'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Thimphu',
      distance: '163 km',
      travelTime: '6 hours',
    },
    {
      dayNumber: 3,
      title: 'Full Day Thimphu Sightseeing - Night Stay',
      description: 'Discover the capital city\'s treasures with a full day of sightseeing: National Memorial Chorten, Tashichho Dzong, Folk Heritage Museum, Buddha Point, Thimphu Post Office, Simply Bhutan, National Library, Changangkha Lhakhang, Motithang Takin Preserve, and Handicraft Market. Relax for the night at your hotel in Thimphu.',
      locations: ['National Memorial Chorten', 'Tashichho Dzong', 'Folk Heritage Museum', 'Buddha Point', 'Thimphu Post Office', 'Simply Bhutan', 'National Library', 'Changangkha Lhakhang', 'Motithang Takin Preserve', 'Handicraft Market'],
      activities: ['Full day Thimphu sightseeing', 'National Memorial Chorten', 'Tashichho Dzong', 'Buddha Point', 'Takin Preserve'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Thimphu',
    },
    {
      dayNumber: 4,
      title: 'Transfer Thimphu to Punakha Sightseeing - Night Stay',
      description: 'Travel from Thimphu to Punakha (a 3-hour drive covering 74 km) after breakfast. En route, visit Dochula Pass, Chimi Lhakhang, Punakha Dzong, Punakha Suspension Bridge, and enjoy the option for White River rafting. Spend the night at your hotel in Punakha.',
      locations: ['Thimphu', 'Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong', 'Punakha Suspension Bridge'],
      activities: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong', 'Punakha Suspension Bridge', 'White River rafting (optional)'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Punakha',
      distance: '74 km',
      travelTime: '3 hours',
    },
    {
      dayNumber: 5,
      title: 'Excursion to Gangtey/Phobjikha Valley',
      description: 'Embark on a journey to the beautiful Phobjikha Valley (a 5-hour round trip covering 160 km) and visit Gangtey Gompha. Witness the breathtaking landscape and the serene habitat of the Black-necked Cranes. Return to Punakha for overnight stay.',
      locations: ['Punakha', 'Gangtey', 'Phobjikha Valley', 'Gangtey Gompha'],
      activities: ['Phobjikha Valley excursion', 'Gangtey Gompha visit', 'Black-necked Crane habitat'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Punakha',
      distance: '160 km round trip',
      travelTime: '5 hours',
    },
    {
      dayNumber: 6,
      title: 'Transfer Punakha to Paro - Paro Local Sightseeing - Night Stay',
      description: 'Travel from Punakha to Paro (a 4-hour journey covering 115 km). Visit Ta Dzong (National Museum) and Rinpung Dzong (Paro Dzong). Enjoy an evening stroll in Paro\'s local market before retiring for the night.',
      locations: ['Punakha', 'Paro', 'Ta Dzong', 'Rinpung Dzong'],
      activities: ['Transfer to Paro', 'Ta Dzong National Museum', 'Rinpung Dzong', 'Evening market stroll'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
      distance: '115 km',
      travelTime: '4 hours',
    },
    {
      dayNumber: 7,
      title: 'Tiger\'s Nest Monastery Hike',
      description: 'Embark on a memorable trek to Taktsang Monastery (Tiger\'s Nest), a significant religious site. Afterward, relax with a Hot Stone Bath & Spa. Enjoy an exploratory walk around Main Street and the market area in the evening.',
      locations: ['Taktsang Monastery', 'Main Street'],
      activities: ['Tiger\'s Nest hike', 'Hot Stone Bath & Spa', 'Main Street exploration'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
    },
    {
      dayNumber: 8,
      title: 'Excursion to Chele-La-Pass',
      description: 'Take an excursion to Chele-La-Pass, a high mountain pass offering spectacular views. Return to Paro for a leisurely evening.',
      locations: ['Paro', 'Chele-La-Pass'],
      activities: ['Chele-La-Pass excursion', 'Mountain views'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
    },
    {
      dayNumber: 9,
      title: 'Paro Local Sightseeing - Drive to Phuentsholing - Night Stay',
      description: 'Explore Paro\'s local attractions before driving back to Phuentsholing. Enjoy leisure time in the town to explore before retiring for the night.',
      locations: ['Paro', 'Phuentsholing'],
      activities: ['Paro sightseeing', 'Drive to Phuentsholing', 'Evening leisure'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Phuentsholing',
      distance: '155 km',
      travelTime: '5-6 hours',
    },
    {
      dayNumber: 10,
      title: 'Departure from Phuentsholing to Bagdogra Airport',
      description: 'Check out from your hotel and head to Bagdogra Airport for your onward journey, carrying cherished memories of the Himalayas and the serene kingdom of Bhutan.',
      locations: ['Phuentsholing', 'Bagdogra Airport'],
      activities: ['Hotel checkout', 'Airport transfer'],
      meals: { breakfast: true, lunch: false, dinner: false },
    },
  ],
  accommodation: [
    { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
  ],
  inclusions: [
    'Assistance upon arrival and departure',
    'All accommodation on double occupancy basis as per itinerary',
    'Meals on MAP basis (09 Breakfast and Dinner included)',
    'All transportation as per the itinerary',
    'Pick-up and Drop',
    'Protected Area Permits (PAP)',
    'Fuel, driver allowances',
    'SDF Charges 1200/- PER PERSON PER NIGHT',
    '1 Tourist Guide (from day 2-9)',
    '1 bottle water per person per day',
    '1 Tourist Sim card',
    'Travel Insurance',
    'Rates are valid for Indian Nationals only',
  ],
  exclusions: [
    'Air Fare',
    'Entrance fee for monasteries/palaces, etc.',
    'Expenses of personal nature such as River Rafting, laundry, telephone calls, alcoholic beverages, mini bar charges, tips, portage, camera fees, room heater, etc.',
    'Any meals and services not specifically mentioned in the inclusions',
    'Any expense incurred or loss caused by reasons beyond our control such as bad weather, natural calamities (landslides, floods), flight delays/rescheduling/cancellations, any accidents/medical evacuations, riots/strikes/war/road blocks, and force majeure events, etc.',
    'Medical costs/ oxygen cylinder',
    'Additional sightseeing charges or extra usage of vehicle apart from the suggested itinerary',
    'GST 5%',
  ],
  optionalActivities: ['White River Rafting', 'Hot Stone Bath & Spa', 'Archery', 'Cooking class'],
  faq: [
    {
      question: 'What is included in the package?',
      answer: 'The package includes 9 nights accommodation, 9 breakfasts and dinners, all transportation, permits, tourist guide (day 2-9), mineral water, tourist sim card, and travel insurance.',
    },
    {
      question: 'What is not included?',
      answer: 'Air fare, entrance fees, personal expenses, meals not mentioned, GST 5%, and expenses due to unforeseen circumstances are not included.',
    },
    {
      question: 'What is the payment policy?',
      answer: '30% advance payment for booking. Remaining 70% before permit confirmation.',
    },
    {
      question: 'Is tourist guide included?',
      answer: 'Yes, 1 tourist guide is included from day 2 to day 9.',
    },
    {
      question: 'Is this tour valid for non-Indian nationals?',
      answer: 'No, rates are valid for Indian Nationals only.',
    },
    {
      question: 'What is SDF charge?',
      answer: 'SDF (Sustainable Development Fee) is 1200/- per person per night, which is included in the package.',
    },
  ],
  seo: {
    metaTitle: 'Bhutan Group Tour — 9N/10D | Happy Kingdom Travels',
    metaDescription: '10-day Bhutan group tour covering Phuentsholing, Thimphu, Punakha, Paro, Tiger\'s Nest, Phobjikha Valley and Chele-La-Pass. 9 breakfasts and dinners, guide, permits included. Package code HKD0022.',
    keywords: ['bhutan group tour 9n 10d', 'bhutan tour 10 days', 'bhutan tour from bagdogra', 'phuentsholing thimphu punakha paro tour'],
  },
  pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
  status: 'active',
  featured: true,
};

const result = await Package.findOneAndUpdate(
  { slug: 'bhutan-grand-discovery-9n-10d' },
  data,
  { new: true, upsert: true }
);

console.log('Updated:', result.title);
console.log('Slug:', result.slug);
console.log('Itinerary days:', result.itinerary.length);
console.log('Inclusions:', result.inclusions.length);
console.log('Exclusions:', result.exclusions.length);
process.exit(0);
