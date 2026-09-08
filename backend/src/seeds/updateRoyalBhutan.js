import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Package from '../models/Package.js';

await mongoose.connect(process.env.MONGODB_URI);

const royalData = {
  title: 'Royal Bhutan — 5N/6D',
  slug: 'royal-bhutan-5n-6d',
  destination: 'Bhutan',
  category: 'luxury',
  packageCode: 'HKD_0021',
  type: 'International',
  duration: { nights: 5, days: 6 },
  route: ['Paro', 'Thimphu', 'Phobjikha', 'Punakha'],
  startingPoints: ['Paro (Bhutan)', 'Jaigaon / Phuentsholing (India)'],
  shortDescription: 'A 6-day luxury tour covering Paro, Thimphu, Phobjikha and Punakha with 5-star accommodation, private guide, and curated experiences across Bhutan.',
  description: 'The Royal Bhutan Experience is our premium luxury tour designed for travellers who want nothing but the best. Stay in 5-star hotels and luxury resorts, travel in a private AC vehicle with a dedicated chauffeur, and enjoy exclusive experiences including a private meditation session, traditional hot stone bath, and a farmhouse dinner with a Bhutanese family. The itinerary covers Paro, Thimphu, Phobjikha and Punakha at a leisurely pace with VIP access at all attractions.',
  tripHighlights: [
    'Hike to Taktsang (Tiger\'s Nest) Monastery',
    'Visit Punakha Dzong — Palace of Great Happiness',
    'Excursion to Gangtey (Phobjikha) — Black Necked Crane habitat',
    'Explore Thimphu — Buddha Point, Memorial Chorten, Tashichho Dzong',
    'Visit Ta Dzong National Museum and Rinpung Dzong in Paro',
    'Drukgyel Dzong and Kitchu Monastery visit',
    'Lamperi Royal Botanical Park visit',
  ],
  suitableFor: ['Luxury Travellers', 'Honeymoon Couples', 'Cultural Travellers', 'VIP Guests', 'Retirees'],
  travelStyle: 'luxury',
  images: ['/images/tours/royal-hero.jpg', '/images/tours/royal-paro.jpg', '/images/tours/royal-punakha.jpg'],
  heroImage: '/images/tours/royal-hero.jpg',
  itinerary: [
    {
      dayNumber: 1,
      title: 'Paro Airport – Thimphu Sightseeing',
      description: 'Meet and Greet on arrival at Paro Airport and transfer to Thimphu (7,710 ft.) the capital city of Bhutan. On arrival check in at the hotel. Afternoon start for half day Thimphu sightseeing consist of Kuensel Phodrang (Buddha Statue) a place for refreshing with a huge statue of Buddha on the top of the Kuensel Phodrang, King\'s (National) Memorial Chorten - This Chorten was built in 1974 in a typical Tibetan style. It is also a center of worship for the people living in Thimphu. Tashichho Dzong (Fortress of the Glorious Religion) - The Dzong is the seat of the national government and the Central Monastic Body, including the summer residence of the Je Khenpo (Chief Abbot of Bhutan) at present. And Folk Heritage Museum. Overnight stay at Thimphu.',
      locations: ['Paro Airport', 'Thimphu', 'Kuensel Phodrang', 'Memorial Chorten', 'Tashichho Dzong', 'Folk Heritage Museum'],
      activities: ['Airport pickup', 'Buddha Point visit', 'Memorial Chorten', 'Tashichho Dzong', 'Folk Heritage Museum'],
      meals: { breakfast: false, lunch: false, dinner: true },
      overnightAt: 'Thimphu',
      distance: '65 kms',
      travelTime: '2 hrs',
      altitude: '2350 mts',
    },
    {
      dayNumber: 2,
      title: 'Thimphu – Punakha/Wangdue Sightseeing',
      description: 'After breakfast drive to Punakha / Wangdue, On the way Stop at Dochu-La-Pass (3150 mts.) to view the higher Himalayas. Arrival at Punakha check in at hotel. Afternoon visit Punakha Dzong - built in 1637 by Zhabdrung Ngawang Namgyal. For many years until the time of the second king, it served as the seat of the Government. The Dzong was named Druk Pungthang Dechen Phodrang (Palace of Great Happiness). Punakha is still the winter residence of Je-Khenpo and King Jigme Dorji Wangchuck convened the first National Assembly here in 1952. After that take a short excursion trip to visit the Chhimi Lhakhang - The Temple, also known as "The Temple of Fertility" was built by Lama Drukpa Kuenley, "The Devine Mad Man". Evening free for leisure. Overnight stay will be at Punakha / Wangdue.',
      locations: ['Thimphu', 'Dochu-La-Pass', 'Punakha', 'Punakha Dzong', 'Chhimi Lhakhang'],
      activities: ['Dochu-La-Pass stop', 'Punakha Dzong visit', 'Chhimi Lhakhang'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Punakha',
      distance: '77 kms',
      travelTime: '3 hrs',
      altitude: '1310 mts',
    },
    {
      dayNumber: 3,
      title: 'Excursion to Gangtey (Phobjikha)',
      description: 'After breakfast, start for full day excursion trip to Gangtey (9,840 ft.). Gangtey is the home of Black Necked Crane which migrates from the arid plains of Tibet in the north. It is a beautiful valley of Bhutan. You can also visit Gangtey Gompha. Evening return back. Overnight stay at Punakha / Wangdue.',
      locations: ['Punakha', 'Gangtey', 'Phobjikha Valley', 'Gangtey Gompha'],
      activities: ['Phobjikha Valley excursion', 'Gangtey Gompha visit', 'Black Necked Crane habitat'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Punakha',
      distance: '78 kms one way',
      travelTime: '3 hrs',
      altitude: '3810 mts',
    },
    {
      dayNumber: 4,
      title: 'Punakha/Wangdue – Paro Sightseeing',
      description: 'After breakfast drive to Paro (7,483 ft.). On the way stop at Lamperi to visit Royal Botanical Park - The park contains a rich biodiversity of flora and fauna and features a huge species of plants and animals including endangered species. On arrival check in at the hotel. Afternoon visit Ta Dzong - National Museum with an excellent collection of arts, relics, religious thangkha, etc. Rinpung Dzong - Meaning "fortress of the heap of jewels". The dzong now serves as the administrative and judicial seat of Paro. Evening free for leisure. Overnight stay at Paro.',
      locations: ['Punakha', 'Lamperi', 'Royal Botanical Park', 'Paro', 'Ta Dzong', 'Rinpung Dzong'],
      activities: ['Royal Botanical Park', 'Ta Dzong National Museum', 'Rinpung Dzong'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
      distance: '140 kms',
      travelTime: '5 hrs',
      altitude: '2280 mts',
    },
    {
      dayNumber: 5,
      title: 'Paro Sightseeing',
      description: 'After breakfast visit Drukgyel Dzong. Also visit famous Taktsang Monastery - called "Tiger\'s Nest" (2hrs hike from the base camp) and Kitchu Monastery. Overnight stay will be at Paro.',
      locations: ['Drukgyel Dzong', 'Taktsang Monastery', 'Kitchu Monastery'],
      activities: ['Drukgyel Dzong visit', 'Tiger\'s Nest hike', 'Kitchu Monastery'],
      meals: { breakfast: true, lunch: false, dinner: true },
      overnightAt: 'Paro',
    },
    {
      dayNumber: 6,
      title: 'Paro Airport — Departure',
      description: 'After breakfast check out from hotel and drop at Paro Airport for your onward journeys.',
      locations: ['Paro', 'Paro Airport'],
      activities: ['Hotel checkout', 'Airport transfer'],
      meals: { breakfast: true, lunch: false, dinner: false },
    },
  ],
  accommodation: [
    { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '5-star', nights: 1, roomType: 'Deluxe Room' },
    { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '5-star', nights: 2, roomType: 'Premium Room' },
    { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '5-star', nights: 2, roomType: 'Deluxe Room' },
  ],
  inclusions: [
    'Accommodations for 5 nights',
    'Breakfast and Dinner only',
    'All transportation including pickups and drops',
    'All Sightseeing as per itinerary',
    'All Immigration formalities and charges',
    '1 Tourist Sim Card',
    'Experienced Driver',
    'Mineral water throughout your day tour 1 bottle daily per person',
    'Evening Tea and Snack',
  ],
  exclusions: [
    'Lunch',
    'Guest Insurance',
    'Any Personal Consumption made which is not included in package',
    'Entry Fees',
    'Travel Insurance',
    'Tourist Guide',
  ],
  optionalActivities: ['Hot stone bath', 'Archery', 'Photography session', 'Cooking class'],
  faq: [
    {
      question: 'What is included in the package?',
      answer: 'The package includes 5 nights accommodation, breakfast and dinner, all transportation, sightseeing, immigration formalities, tourist sim card, experienced driver, mineral water, and evening tea and snacks.',
    },
    {
      question: 'What is not included?',
      answer: 'Lunch, guest insurance, personal expenses, entry fees, travel insurance, and tourist guide are not included in the package.',
    },
    {
      question: 'What is the payment policy?',
      answer: '50% of the total package to be paid as advance for booking the TRIP. A confirmation mail will be granted. Remaining 50% to be paid before the beginning of the trip or on the day of arrival.',
    },
    {
      question: 'Is tourist guide included?',
      answer: 'No, tourist guide is not included in this package. However, we can arrange one at an additional cost.',
    },
  ],
  seo: {
    metaTitle: 'Royal Bhutan Tour — 5N/6D | Happy Kingdom Travels',
    metaDescription: 'Luxury 6-day Bhutan tour covering Paro, Thimphu, Phobjikha and Punakha. 5-star hotels, Tiger\'s Nest hike, Punakha Dzong and more. Package code HKD_0021.',
    keywords: ['royal bhutan tour', 'bhutan luxury tour 5n 6d', 'bhutan tour from paro', 'punakha dzong tour', 'phobjikha valley tour'],
  },
  pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
  status: 'active',
  featured: true,
};

const result = await Package.findOneAndUpdate(
  { slug: 'royal-bhutan-5n-6d' },
  royalData,
  { new: true, upsert: true }
);

console.log('Updated:', result.title);
console.log('Slug:', result.slug);
console.log('Itinerary days:', result.itinerary.length);
console.log('Inclusions:', result.inclusions.length);
console.log('Exclusions:', result.exclusions.length);
process.exit(0);
