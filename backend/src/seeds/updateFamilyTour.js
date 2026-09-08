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
  title: 'Bhutan Family Tour — 5N/6D',
  slug: 'bhutan-family-tour-5n-6d',
  destination: 'Bhutan',
  category: 'family',
  packageCode: 'HKD_0023',
  type: 'International',
  duration: { nights: 5, days: 6 },
  route: ['Phuentsholing', 'Thimphu', 'Paro'],
  startingPoints: ['Bagdogra Airport (India)', 'NJP Station (India)'],
  shortDescription: 'A 6-day family-friendly Bhutan tour covering Phuentsholing, Thimphu, Paro, and Tiger\'s Nest. Designed for families with comfortable sightseeing, cultural experiences, and relaxation.',
  description: 'This 5-night / 6-day family tour is thoughtfully designed for families travelling to Bhutan with children and elderly members. Starting from Bagdogra Airport or NJP Station, the tour covers Phuentsholing, Thimphu, and Paro with a mix of cultural sightseeing, nature walks, and the iconic Tiger\'s Nest hike. The itinerary includes MAP meals (breakfast and dinner), comfortable 3-star accommodation, all transportation, permits, and a dedicated tourist guide from day 2 to day 5. The pace is relaxed, making it ideal for families.',
  tripHighlights: [
    'Hike to Taktsang (Tiger\'s Nest) Monastery',
    'Full day Thimphu sightseeing — Buddha Point, Memorial Chorten, Tashichho Dzong',
    'Paro sightseeing — Rinpung Dzong, National Museum, Kichu Lhakhang',
    'Scenic drive through mountainous landscapes',
    'Hot Stone Bath & Spa experience',
    'Visit Kharbandi Gumba en route',
    'Explore Phuentsholing main market',
  ],
  suitableFor: ['Families', 'First-Time Visitors', 'Elderly Travellers', 'Cultural Travellers'],
  travelStyle: 'comfort',
  images: ['/images/tours/family1-hero.jpg', '/images/tours/family1-thimphu.jpg', '/images/tours/family1-punakha.jpg', '/images/tours/family1-bumthang.jpg', '/images/tours/family1-phobjikha.jpg', '/images/tours/family1-paro.jpg'],
  heroImage: '/images/tours/family1-hero.jpg',
  itinerary: [
    {
      dayNumber: 1,
      title: 'Arrival and Phuentsholing Exploration',
      description: 'Your journey commences as our representative warmly welcomes you upon your arrival at Bagdogra Airport or NJP Station. A scenic drive of approximately 4 hours takes you to Phuentsholing, where you\'ll complete necessary immigration formalities at the Pedestrian Terminal to obtain your inner-line permit. Once settled into your pre-booked hotel, take some time to refresh and relax. Later in the evening, immerse yourself in the vibrant ambiance of Phuentsholing\'s main market, strolling through its charming streets.',
      locations: ['Bagdogra Airport / NJP Station', 'Phuentsholing'],
      activities: ['Airport/Railway pickup', 'Transfer to Phuentsholing', 'Immigration formalities', 'Evening market stroll'],
      meals: { breakfast: false, lunch: false, dinner: true },
      overnightAt: 'Phuentsholing',
      altitude: '293m',
      distance: '~155 km',
      travelTime: '~4 hours',
    },
    {
      dayNumber: 2,
      title: 'Phuentsholing to Thimphu',
      description: 'After a hearty breakfast, clear immigration formalities and embark on a picturesque 6-hour drive towards Thimphu. En route, visit Kharbandi Gumba and revel in the breathtaking mountain vistas. Witness a stunning waterfall that adds to the allure of your journey. Upon reaching Thimphu, check-in at your hotel, unwind, and prepare for an evening filled with exploration. Take delight in strolling through the government-run Handicrafts Emporium and local crafts bazaar, showcasing Bhutan\'s rich traditional arts and crafts.',
      locations: ['Phuentsholing', 'Kharbandi Gumba', 'Thimphu'],
      activities: ['Immigration formalities', 'Kharbandi Gumba visit', 'Scenic drive to Thimphu', 'Handicrafts Emporium'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Thimphu',
      altitude: '2,320m',
      distance: '~163 km',
      travelTime: '6 hours',
    },
    {
      dayNumber: 3,
      title: 'Full Day Exploring Thimphu',
      description: 'Thimphu, the capital city, offers a plethora of cultural treasures. Begin your day with a sumptuous breakfast followed by visits to prominent sites like the National Memorial Chorten, Tashidzong, Folk Heritage Museum, Buddha Point, Thimphu Post Office, Simply Bhutan, National Library, Changangkha Lhakhang, Motithang Takin Preserve, and Handicraft Market. Immerse yourself in the rich cultural tapestry and vibrant history of Bhutan.',
      locations: ['National Memorial Chorten', 'Tashichho Dzong', 'Folk Heritage Museum', 'Buddha Point', 'Thimphu Post Office', 'Simply Bhutan', 'National Library', 'Changangkha Lhakhang', 'Motithang Takin Preserve', 'Handicraft Market'],
      activities: ['Full day Thimphu sightseeing', 'National Memorial Chorten', 'Tashichho Dzong', 'Buddha Point', 'Takin Preserve'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Thimphu',
      altitude: '2,320m',
    },
    {
      dayNumber: 4,
      title: 'Thimphu to Paro, Tiger\'s Nest Trek, and Relaxation',
      description: 'Journey from Thimphu to Paro, a scenic drive taking about 2 hours. Upon arrival, check into your hotel and gear up for the exhilarating trek to Taktsang Monastery (Tiger\'s Nest). The trek, approximately 6 hours round trip, rewards you with mesmerizing views and a spiritual experience. Afterward, indulge in a soothing hot stone bath and spa to relax your body. Spend the evening exploring Paro\'s Main Street and market area on foot.',
      locations: ['Thimphu', 'Paro', 'Taktsang Monastery'],
      activities: ['Transfer to Paro', 'Tiger\'s Nest hike', 'Hot Stone Bath & Spa', 'Main Street exploration'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
      altitude: '2,200m',
      distance: '~65 km',
      travelTime: '2 hours',
    },
    {
      dayNumber: 5,
      title: 'Paro Sightseeing and Return to Phuentsholing',
      description: 'After breakfast, explore Paro\'s local attractions, including the Bhutanese traditional dress center, Rinpung Dzong, Kichu Lhakhang, and the National Museum of Bhutan. Once sightseeing is complete, drive back to Phuentsholing, where you\'ll check into your hotel and have the evening at leisure to explore the town.',
      locations: ['Paro', 'Rinpung Dzong', 'Kichu Lhakhang', 'National Museum of Bhutan', 'Phuentsholing'],
      activities: ['Paro sightseeing', 'Rinpung Dzong', 'Kichu Lhakhang', 'National Museum', 'Drive to Phuentsholing'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Phuentsholing',
      distance: '~155 km',
      travelTime: '5-6 hours',
    },
    {
      dayNumber: 6,
      title: 'Departure from Phuentsholing to Bagdogra Airport',
      description: 'Following breakfast, check out from your hotel and commence your journey back to Bagdogra Airport/NJP Station via Phuentsholing. Carry cherished memories of the majestic Himalayas and the serene kingdom of Bhutan as you head home.',
      locations: ['Phuentsholing', 'Bagdogra Airport'],
      activities: ['Hotel checkout', 'Airport transfer'],
      meals: { breakfast: true, lunch: false, dinner: false },
    },
  ],
  accommodation: [
    { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
    { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
    { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
  ],
  inclusions: [
    'Assistance upon arrival and departure',
    'Accommodation on double occupancy basis',
    'Meals on MAP basis (Breakfast & Dinner)',
    'Transportation as per itinerary',
    'Pick-up and Drop',
    'Permits and SDF Charges',
    'Tourist Guide (Day 2-5)',
    'Bottled water daily',
    'Tourist Sim card',
    'Travel Insurance',
    'Valid for Indian Nationals only',
  ],
  exclusions: [
    'Airfare',
    'Entrance fees',
    'Personal expenses',
    'Unforeseen circumstances',
    'Medical costs',
    'Additional sightseeing charges',
    'GST 5%',
  ],
  optionalActivities: ['White River Rafting', 'Hot Stone Bath & Spa', 'Archery', 'Cooking class'],
  faq: [
    {
      question: 'What is included in the package?',
      answer: 'The package includes 5 nights accommodation, breakfast and dinner daily, all transportation, permits, tourist guide (day 2-5), bottled water, tourist sim card, and travel insurance.',
    },
    {
      question: 'What is not included?',
      answer: 'Airfare, entrance fees, personal expenses, GST 5%, and expenses due to unforeseen circumstances are not included.',
    },
    {
      question: 'Is this tour suitable for families with children?',
      answer: 'Yes, this tour is specifically designed for families. The pace is relaxed, and the itinerary includes family-friendly activities.',
    },
    {
      question: 'Is the Tiger\'s Nest trek difficult?',
      answer: 'The Tiger\'s Nest trek is moderate and takes about 6 hours round trip. It is suitable for most family members with reasonable fitness.',
    },
    {
      question: 'What is the payment policy?',
      answer: '30% advance payment for booking. Remaining 70% before permit confirmation.',
    },
    {
      question: 'Is tourist guide included?',
      answer: 'Yes, 1 tourist guide is included from day 2 to day 5.',
    },
  ],
  seo: {
    metaTitle: 'Bhutan Family Tour — 5N/6D | Happy Kingdom Travels',
    metaDescription: '6-day Bhutan family tour covering Phuentsholing, Thimphu, Paro, and Tiger\'s Nest. Breakfast and dinner, guide, permits included. Ideal for families with children and elderly. Package code HKD_0023.',
    keywords: ['bhutan family tour 5n 6d', 'bhutan tour for families', 'bhutan family holiday', 'paro thimphu family tour'],
  },
  pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
  status: 'active',
  featured: true,
};

const result = await Package.findOneAndUpdate(
  { slug: 'bhutan-family-tour-5n-6d' },
  data,
  { new: true, upsert: true }
);

console.log('Updated:', result.title);
console.log('Slug:', result.slug);
console.log('Itinerary days:', result.itinerary.length);
console.log('Inclusions:', result.inclusions.length);
console.log('Exclusions:', result.exclusions.length);
process.exit(0);
