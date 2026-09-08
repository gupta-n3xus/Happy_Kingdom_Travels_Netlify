import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Package from '../models/Package.js';


const packages = [
  {
    title: 'Bhutan Highlights — 4N/5D',
    slug: 'bhutan-highlights-4n-5d',
    destination: 'Bhutan',
    category: 'standard',
    duration: { nights: 4, days: 5 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 5-day introduction to Bhutan covering Thimphu and Paro — the kingdom\'s two most iconic valleys. Perfect for first-time visitors who want to experience Bhutan\'s culture, monasteries, and mountain scenery in a short trip.',
    description:
      'This 4-night / 5-day package is designed for travellers who want a quick but meaningful taste of Bhutan. Starting from Phuentsholing, drive to Thimphu and explore the capital\'s highlights — Buddha Point, Memorial Chorten, Folk Heritage Museum, and the vibrant local markets. Then transfer to Paro for the iconic Tiger\'s Nest hike and a visit to the National Museum. The itinerary is compact but covers Bhutan\'s essential cultural and natural attractions.',
    tripHighlights: [
      'Hike to Taktsang (Tiger\'s Nest) Monastery',
      'Explore Thimphu\'s Buddha Point and Memorial Chorten',
      'Visit Paro Dzong and National Museum',
      'Scenic drive through Bhutanese countryside',
      'Experience authentic Bhutanese culture and cuisine',
    ],
    suitableFor: ['First-Time Visitors', 'Short Break Travellers', 'Couples', 'Solo Travellers'],
    travelStyle: 'comfort',
    images: ['/images/tours/highlights-thimphu.jpg', '/images/tours/highlights-paro.jpg'],
    heroImage: '/images/tours/highlights-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Orientation walk along the commercial strip. Evening at leisure. Overnight stay in Phuentsholing.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu via the scenic Chukha highway. Lunch en route at a local restaurant. Arrive in Thimphu by evening. Visit Tashichho Dzong (exterior) if time permits. Overnight stay in Thimphu.',
        locations: ['Phuentsholing', 'Chukha', 'Thimphu'],
        activities: ['Scenic drive', 'Tashichho Dzong exterior visit'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '176 km',
        travelTime: '6-7 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing',
        description:
          'Full day Thimphu sightseeing — Buddha Point, Memorial Chorten, Folk Heritage Museum, Takin Preserve, and the vibrant Weekend Market (if applicable). Visit National Library and Changangkha Lhakhang. Evening free to explore Thimphu\'s cafés and shops.',
        locations: ['Buddha Point', 'Memorial Chorten', 'Folk Heritage Museum', 'Takin Preserve'],
        activities: ['Buddha Point visit', 'Memorial Chorten', 'Folk Heritage Museum', 'Takin Preserve', 'Weekend Market'],
        meals: { breakfast: true, lunch: true, dinner: false },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Paro — Tiger\'s Nest Hike',
        description:
          'Morning drive to Paro. Afternoon hike to Taktsang (Tiger\'s Nest) Monastery — Bhutan\'s most iconic landmark (5-6 hours round trip). Evening at leisure. Overnight stay in Paro.',
        locations: ['Thimphu', 'Paro', 'Tiger\'s Nest'],
        activities: ['Scenic drive to Paro', 'Tiger\'s Nest hike'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '55 km',
        travelTime: '1.5 hours',
      },
      {
        dayNumber: 5,
        title: 'Paro Sightseeing — Departure',
        description:
          'Morning visit to Paro Dzong (Rinpung Dzong), National Museum (Ta Dzong), and Kichu Lhakhang. Transfer to Paro airport or drive to Phuentsholing for onward journey. Tour concludes.',
        locations: ['Paro Dzong', 'National Museum', 'Kichu Lhakhang'],
        activities: ['Paro Dzong visit', 'National Museum', 'Kichu Lhakhang', 'Departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    ],
    inclusions: [
      'Accommodation on double sharing basis',
      'All meals (breakfast, lunch, dinner) as per itinerary',
      'All ground transfers by private vehicle',
      'English-speaking local guide',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Immigration formalities assistance',
      'Tourist SIM',
      'Drinking water throughout',
    ],
    exclusions: [
      'Train/flight fare to and from Jaigaon/Phuentsholing',
      'Travel insurance',
      'Personal expenses (shopping, tips, laundry)',
      'Meals not mentioned in the itinerary',
      'Optional activities',
      'GST 5%',
    ],
    optionalActivities: ['Hot stone bath', 'Archery experience', 'River rafting', 'Cooking class'],
    faq: [
      {
        question: 'Is this suitable for first-time visitors to Bhutan?',
        answer: 'Yes, this is an ideal introduction to Bhutan covering the two most popular valleys — Thimphu and Paro — with all essential highlights.',
      },
      {
        question: 'Can we upgrade the hotels?',
        answer: 'Yes, we can upgrade to 4-star or 5-star hotels based on your preference. Contact us for pricing.',
      },
      {
        question: 'Do I need a visa for Bhutan?',
        answer: 'Yes, Indian nationals need a visa. We handle the entire visa process for you — just provide your documents in advance.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Highlights Tour — 4N/5D | Happy Kingdom Travels',
      metaDescription: 'Explore Bhutan in 4 nights/5 days covering Thimphu & Paro. Tiger\'s Nest hike, cultural sightseeing, local guide included. Starting from Jaigaon.',
      keywords: ['bhutan tour 4 nights 5 days', 'bhutan highlights', 'short bhutan tour from india', 'bhutan tour package 4n 5d'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
  {
    title: 'Bhutan Family Escape — 5N/6D',
    slug: 'bhutan-family-escape-5n-6d',
    destination: 'Bhutan',
    category: 'family',
    duration: { nights: 5, days: 6 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 6-day family-friendly Bhutan tour covering Thimphu and Paro with kid-friendly activities, comfortable stays, and a relaxed pace. Designed for families with children of all ages.',
    description:
      'This 5-night / 6-day family package is designed for families travelling with children. The itinerary covers Thimphu and Paro at a relaxed pace with kid-friendly activities including an archery session, a visit to the Takin Preserve, and the famous Tiger\'s Nest hike (with a shorter option for younger children). Accommodation is in family-friendly 3-star hotels with spacious rooms. All ground transfers are in a private vehicle with a professional driver, ensuring a hassle-free and memorable Bhutan experience for the entire family.',
    tripHighlights: [
      'Archery session — Bhutan\'s national sport',
      'Kid-friendly visit to Takin Preserve',
      'Family hike to Tiger\'s Nest (shorter route option)',
      'Explore Thimphu\'s cultural highlights',
      'Paro Dzong and National Museum visit',
      'Relaxed pace with rest stops for children',
    ],
    suitableFor: ['Families with Children', 'Multigenerational Travel', 'School Groups', 'Senior Citizens'],
    travelStyle: 'comfort',
    images: ['/images/tours/family-thimphu.jpg', '/images/tours/family-paro.jpg'],
    heroImage: '/images/tours/family-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Orientation walk. Evening welcome dinner with traditional Bhutanese cuisine.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu via Chukha highway. Lunch en route. Arrive in Thimphu by evening. Visit Tashichho Dzong (exterior). Overnight stay in Thimphu.',
        locations: ['Phuentsholing', 'Chukha', 'Thimphu'],
        activities: ['Scenic drive', 'Tashichho Dzong exterior'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '176 km',
        travelTime: '6-7 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Family Fun Day',
        description:
          'Full day family sightseeing — Buddha Point, Memorial Chorten, Takin Preserve (kids love it!), Folk Heritage Museum, National Library, and Changangkha Lhakhang. Afternoon archery session at the national archery ground.',
        locations: ['Buddha Point', 'Memorial Chorten', 'Takin Preserve', 'Folk Heritage Museum'],
        activities: ['Buddha Point', 'Takin Preserve', 'Folk Heritage Museum', 'Archery session'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Paro — Tiger\'s Nest',
        description:
          'Morning drive to Paro. Afternoon hike to Tiger\'s Nest Monastery (Taktsang). Evening at leisure. Overnight in Paro.',
        locations: ['Thimphu', 'Paro', 'Tiger\'s Nest'],
        activities: ['Scenic drive to Paro', 'Tiger\'s Nest hike'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '55 km',
        travelTime: '1.5 hours',
      },
      {
        dayNumber: 5,
        title: 'Paro Sightseeing',
        description:
          'Morning visit to Paro Dzong (Rinpung Dzong), National Museum (Ta Dzong), and Kichu Lhakhang. Afternoon free for shopping. Farewell dinner.',
        locations: ['Paro Dzong', 'National Museum', 'Kichu Lhakhang'],
        activities: ['Paro Dzong', 'National Museum', 'Kichu Lhakhang', 'Farewell dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
      },
      {
        dayNumber: 6,
        title: 'Departure',
        description:
          'Transfer to Paro airport or drive to Phuentsholing for onward journey. Tour concludes.',
        locations: ['Paro'],
        activities: ['Departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Family Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Family Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Family Room' },
    ],
    inclusions: [
      'Accommodation on family sharing basis',
      'All meals (breakfast, lunch, dinner) as per itinerary',
      'Private vehicle for all transfers',
      'English-speaking local guide (Day 2–5)',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Archery session',
      'Drinking water throughout',
      'Tourist SIM',
      'Travel insurance',
    ],
    exclusions: [
      'Train/flight fare to and from Jaigaon/Phuentsholing',
      'Personal expenses',
      'Meals not mentioned in the itinerary',
      'Optional activities',
      'GST 5%',
    ],
    optionalActivities: ['Hot stone bath', 'River rafting', 'Bicycle tour', 'Farmhouse dinner'],
    faq: [
      {
        question: 'Is this package suitable for young children?',
        answer: 'Yes, the itinerary is designed with a relaxed pace, kid-friendly activities, and comfortable rest stops. The Tiger\'s Nest hike has a shorter option for younger children.',
      },
      {
        question: 'Can we bring elderly family members?',
        answer: 'Absolutely. The itinerary is paced for comfort, and we can arrange a vehicle with extra legroom and a slower schedule if needed.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Family Tour Package — 5N/6D | Happy Kingdom Travels',
      metaDescription: 'Family-friendly 6-day Bhutan holiday with kids activities, archery, Tiger\'s Nest hike. Private vehicle, family rooms & all meals included.',
      keywords: ['bhutan family tour', 'bhutan with kids', 'family holiday bhutan', 'bhutan tour for families from india'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
  {
    title: 'Bhutan Classic — 6N/7D',
    slug: 'bhutan-classic-6n-7d',
    destination: 'Bhutan',
    category: 'group',
    duration: { nights: 6, days: 7 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Punakha',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 7-day group/solo tour covering Thimphu, Punakha, and Paro — Bhutan\'s three most popular valleys. Perfect for first-time visitors who want the essential Bhutan experience in a well-paced itinerary.',
    description:
      'This 6-night / 7-day fixed-departure itinerary covers Bhutan\'s three most popular valleys — Thimphu, Punakha, and Paro. Starting from Phuentsholing, travel north to Thimphu for full-day sightseeing, then cross the spectacular Dochula Pass to Punakha for its iconic Dzong and suspension bridge. The journey continues to Paro for the legendary Tiger\'s Nest hike. Accommodation is in comfortable 3-star hotels with all meals included. This package offers the best value for first-time visitors looking for a comprehensive Bhutan experience.',
    tripHighlights: [
      'Hike to Taktsang (Tiger\'s Nest) Monastery',
      'Crossing the spectacular Dochula Pass (3,100 m)',
      'Visit the iconic Punakha Dzong',
      'Explore Thimphu\'s Buddha Point and Memorial Chorten',
      'Traditional Bhutanese dinner experience',
      'Punakha Suspension Bridge',
    ],
    suitableFor: ['Solo Travellers', 'Small Groups', 'First-Time Visitors', 'Budget Travellers'],
    travelStyle: 'budget',
    images: ['/images/tours/classic-thimphu.jpg', '/images/tours/classic-punakha.jpg'],
    heroImage: '/images/tours/classic-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Visit Zangtho Pelri Lhakhang. Orientation walk. Welcome dinner.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Zangtho Pelri Lhakhang', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu. Complete immigration formalities. Visit Kharbandi Gumba en route. Arrive Thimphu. Visit Handicrafts Emporium and local crafts bazaar. Overnight stay in Thimphu.',
        locations: ['Phuentsholing', 'Thimphu'],
        activities: ['Immigration formalities', 'Kharbandi Gumba', 'Handicrafts Emporium', 'Crafts bazaar'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '180 km',
        travelTime: '6 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing',
        description:
          'Full day Thimphu sightseeing — National Library, Memorial Chorten, Takin Preserve, Folk Heritage Museum, Simply Bhutan Museum, Changangkha Lhakhang, Tashichho Dzong, and Buddha Point. Evening at leisure.',
        locations: ['National Library', 'Memorial Chorten', 'Takin Preserve', 'Buddha Point'],
        activities: ['National Library', 'Memorial Chorten', 'Takin Preserve', 'Folk Heritage Museum', 'Tashichho Dzong', 'Buddha Point'],
        meals: { breakfast: true, lunch: true, dinner: false },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Punakha',
        description:
          'Morning drive to Punakha over the Dochula Pass (3,100 m). Visit Chimi Lhakhang (Temple of the Divine Madman). Afternoon visit to Punakha Dzong and the Punakha Suspension Bridge. Evening at leisure.',
        locations: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong'],
        activities: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong', 'Suspension Bridge'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
        distance: '120 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 5,
        title: 'Punakha to Paro',
        description:
          'Morning drive to Paro. En route visit Simtokha Dzong. Afternoon hike to Tiger\'s Nest viewpoint (view from below). Visit Kichu Lhakhang. Overnight stay in Paro.',
        locations: ['Punakha', 'Paro', 'Tiger\'s Nest', 'Kichu Lhakhang'],
        activities: ['Scenic drive', 'Simtokha Dzong', 'Tiger\'s Nest view', 'Kichu Lhakhang'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '130 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 6,
        title: 'Paro Sightseeing',
        description:
          'Morning visit to Ta Dzong (National Museum), Rinpung Dzong, Nye Mye Bridge, and Bhutanese Traditional Dress Centre. Afternoon visit to Airport View Point. Farewell dinner.',
        locations: ['Ta Dzong', 'Rinpung Dzong', 'Airport View Point'],
        activities: ['National Museum', 'Rinpung Dzong', 'Traditional Dress Centre', 'Airport View Point', 'Farewell dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
      },
      {
        dayNumber: 7,
        title: 'Departure',
        description:
          'Transfer to Paro airport or drive to Phuentsholing for onward journey. Tour concludes.',
        locations: ['Paro'],
        activities: ['Departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
      { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    ],
    inclusions: [
      'Accommodation on double/triple sharing basis',
      'All meals (breakfast, lunch, dinner) as per itinerary',
      'All ground transfers by shared vehicle',
      'English-speaking local guide throughout',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Immigration formalities assistance',
      'Tourist SIM',
      'Experienced driver',
      'Drinking water throughout',
      'Evening tea/snack',
      'Guest insurance',
    ],
    exclusions: [
      'Personal consumption',
      'Entry fees (where not included)',
      'Travel insurance',
      'Tourist guide (if not included)',
      'Meals not mentioned in the itinerary',
      'Optional activities',
    ],
    optionalActivities: ['Hot stone bath', 'River rafting in Punakha', 'Archery experience'],
    faq: [
      {
        question: 'Is this suitable for solo travellers?',
        answer: 'Yes, this is designed for solo travellers sharing accommodation and transport with other travellers on fixed departures.',
      },
      {
        question: 'What is the group size?',
        answer: 'We operate with a minimum of 2 and maximum of 12 travellers per departure.',
      },
      {
        question: 'Is the flight included?',
        answer: 'No, airfare is not included in this package. The package starts from Phuentsholing/Jaigaon.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Classic Tour — 6N/7D | Happy Kingdom Travels',
      metaDescription: 'Explore Bhutan in 6 nights/7 days covering Thimphu, Punakha & Paro. Group tour with guide, meals & visa included. Starting from Jaigaon.',
      keywords: ['bhutan group tour 6n 7d', 'bhutan tour 7 days', 'bhutan classic tour from india'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
  {
    title: 'Bhutan Explorer — 7N/8D',
    slug: 'bhutan-explorer-7n-8d',
    destination: 'Bhutan',
    category: 'group',
    duration: { nights: 7, days: 8 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Punakha',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'An 8-day guided tour covering Thimphu, Punakha, and Paro with an extra day for deeper exploration. Includes the iconic Tiger\'s Nest hike, Dochula Pass, and Punakha Dzong. Ideal for travellers who want more time in each destination.',
    description:
      'This 7-night / 8-day itinerary is designed for travellers who want a thorough exploration of Bhutan\'s three most popular valleys. Starting from Phuentsholing, spend two full days in Thimphu, cross the spectacular Dochula Pass to Punakha for an immersive day, then continue to Paro for the Tiger\'s Nest hike and sightseeing. The extra day allows for a more relaxed pace with time to absorb the culture and scenery. Accommodation is in comfortable 3-star hotels with breakfast and dinner included.',
    tripHighlights: [
      'Hike to Taktsang (Tiger\'s Nest) Monastery',
      'Crossing the spectacular Dochula Pass (3,100 m)',
      'Visit the iconic Punakha Dzong',
      'Full day Thimphu sightseeing',
      'Punakha Suspension Bridge',
      'Paro Dzong and National Museum',
    ],
    suitableFor: ['Solo Travellers', 'Small Groups', 'First-Time Visitors', 'Cultural Travellers'],
    travelStyle: 'budget',
    images: ['/images/tours/explorer-thimphu.jpg', '/images/tours/explorer-punakha.jpg'],
    heroImage: '/images/tours/explorer-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Orientation walk. Welcome dinner.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu. Complete immigration formalities. Visit Kharbandi Gumba. Arrive Thimphu. Visit Handicrafts Emporium and local crafts bazaar. Overnight stay in Thimphu.',
        locations: ['Phuentsholing', 'Thimphu'],
        activities: ['Immigration', 'Kharbandi Gumba', 'Handicrafts Emporium', 'Crafts bazaar'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '180 km',
        travelTime: '6 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing',
        description:
          'Full day Thimphu sightseeing — National Library, Memorial Chorten, Takin Preserve, Folk Heritage Museum, Simply Bhutan Museum, Changangkha Lhakhang, Tashichho Dzong, Buddha Point, and Handicraft Market.',
        locations: ['National Library', 'Memorial Chorten', 'Takin Preserve', 'Buddha Point'],
        activities: ['National Library', 'Memorial Chorten', 'Takin Preserve', 'Folk Heritage Museum', 'Buddha Point', 'Handicraft Market'],
        meals: { breakfast: true, lunch: true, dinner: false },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu Sightseeing — Day 2',
        description:
          'Additional Thimphu sightseeing — Tashichho Dzong (interior if open), Royal Textile Academy, weekend market (if applicable). Evening free to explore cafés and shops.',
        locations: ['Tashichho Dzong', 'Royal Textile Academy'],
        activities: ['Tashichho Dzong interior', 'Textile Academy', 'Weekend market'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 5,
        title: 'Thimphu to Punakha',
        description:
          'Morning drive to Punakha over the Dochula Pass (3,100 m). Visit Chimi Lhakhang. Afternoon visit to Punakha Dzong and Punakha Suspension Bridge. Evening at leisure.',
        locations: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong'],
        activities: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong', 'Suspension Bridge'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
        distance: '120 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 6,
        title: 'Punakha to Paro',
        description:
          'Morning drive to Paro. Afternoon visit to Ta Dzong (National Museum) and Rinpung Dzong. Evening free for shopping. Overnight stay in Paro.',
        locations: ['Punakha', 'Paro'],
        activities: ['Scenic drive', 'National Museum', 'Rinpung Dzong'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '130 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 7,
        title: 'Tiger\'s Nest Hike',
        description:
          'Full day hike to Taktsang (Tiger\'s Nest) Monastery — Bhutan\'s most iconic landmark (5-6 hours round trip). Optional hot stone bath in the evening. Farewell dinner.',
        locations: ['Tiger\'s Nest'],
        activities: ['Tiger\'s Nest hike', 'Hot stone bath (optional)', 'Farewell dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
      },
      {
        dayNumber: 8,
        title: 'Departure',
        description:
          'Transfer to Paro airport or drive to Phuentsholing for onward journey. Tour concludes.',
        locations: ['Paro'],
        activities: ['Departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 3, roomType: 'Standard Room' },
      { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
    ],
    inclusions: [
      'Accommodation on double/triple sharing basis',
      'Breakfast and dinner as per itinerary',
      'All ground transfers by shared vehicle',
      'English-speaking local guide throughout',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Immigration formalities assistance',
      'Tourist SIM',
      'Experienced driver',
      'Drinking water throughout',
      'Evening tea/snack',
      'Lunch',
      'Guest insurance',
    ],
    exclusions: [
      'Personal consumption',
      'Entry fees (where not included)',
      'Travel insurance',
      'Tourist guide (if not included)',
      'Meals not mentioned in the itinerary',
      'Optional activities',
    ],
    optionalActivities: ['Hot stone bath', 'River rafting', 'Archery experience'],
    faq: [
      {
        question: 'Is this package suitable for solo travellers?',
        answer: 'Yes, this is designed for solo travellers sharing accommodation and transport with other travellers on fixed departures.',
      },
      {
        question: 'What is the minimum group size?',
        answer: 'We operate fixed departures with a minimum of 2 and maximum of 12 travellers.',
      },
      {
        question: 'Is lunch included every day?',
        answer: 'Yes, lunch is included throughout the trip as listed in the inclusions.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Explorer Tour — 7N/8D | Happy Kingdom Travels',
      metaDescription: 'Explore Bhutan in 7 nights/8 days covering Thimphu, Punakha & Paro. Group tour with guide, meals & visa included. Tiger\'s Nest hike included.',
      keywords: ['bhutan tour 7 nights 8 days', 'bhutan explorer tour', 'bhutan group tour from india 8 days'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: false,
  },
  {
    title: 'Bhutan Grand Explorer — 8N/9D',
    slug: 'bhutan-grand-explorer-8n-9d',
    destination: 'Bhutan',
    category: 'standard',
    duration: { nights: 8, days: 9 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Punakha',
      'Gangtey / Phobjikha',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 9-day comprehensive Bhutan tour covering Thimphu, Punakha, the stunning Phobjikha Valley, and Paro. The ultimate Bhutan experience with cultural immersion, scenic drives, and wildlife viewing.',
    description:
      'This 8-night / 9-day comprehensive itinerary covers Bhutan from west to the glacial Phobjikha Valley. Starting from Phuentsholing, explore Thimphu and Punakha before venturing to the Phobjikha Valley — home to the endangered black-necked crane. The journey concludes in Paro with the iconic Tiger\'s Nest hike. This package includes premium accommodation, private vehicle, expert guide, and all internal logistics. Designed for travellers who want the complete Bhutan experience — culture, nature, history, and adventure — in one seamless journey.',
    tripHighlights: [
      'Hike to Taktsang (Tiger\'s Nest) Monastery',
      'Phobjikha Valley — black-necked crane habitat',
      'Gangtey Gompha monastery visit',
      'Dochula Pass panoramic Himalayan views',
      'Punakha Dzong — the "Palace of Great Bliss"',
      'Full day Thimphu sightseeing',
      'White-water rafting in Punakha (optional)',
    ],
    suitableFor: ['Cultural Travellers', 'Nature Lovers', 'Photographers', 'Repeat Visitors', 'Retirees'],
    travelStyle: 'premium',
    images: ['/images/tours/grand-paro.jpg', '/images/tours/grand-phobjikha.jpg'],
    heroImage: '/images/tours/grand-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Orientation walk. Welcome dinner.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu. Complete immigration formalities. Visit Kharbandi Gumba. Arrive Thimphu. Visit Handicrafts Emporium and local crafts bazaar.',
        locations: ['Phuentsholing', 'Thimphu'],
        activities: ['Immigration', 'Kharbandi Gumba', 'Handicrafts Emporium'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '180 km',
        travelTime: '6 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing',
        description:
          'Full day Thimphu sightseeing — Memorial Chorten, Tashichho Dzong, Folk Heritage Museum, Buddha Point, Simply Bhutan, National Library, Changangkha Lhakhang, Motithang Takin Preserve, and Handicraft Market.',
        locations: ['Memorial Chorten', 'Tashichho Dzong', 'Buddha Point', 'Takin Preserve'],
        activities: ['Memorial Chorten', 'Tashichho Dzong', 'Folk Heritage Museum', 'Buddha Point', 'Takin Preserve', 'Handicraft Market'],
        meals: { breakfast: true, lunch: true, dinner: false },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Punakha',
        description:
          'Morning drive to Punakha over the Dochula Pass (3,100 m). Visit Chimi Lhakhang. Afternoon visit to Punakha Dzong and Punakha Suspension Bridge. Optional white-water rafting.',
        locations: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong'],
        activities: ['Dochula Pass', 'Chimi Lhakhang', 'Punakha Dzong', 'Suspension Bridge', 'Rafting (optional)'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
        distance: '120 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 5,
        title: 'Gangtey / Phobjikha Valley',
        description:
          'Morning drive to Phobjikha Valley. Visit Gangtey Gompha (monastery). Explore the valley and look for black-necked cranes (seasonal). Return to Punakha by evening.',
        locations: ['Phobjikha Valley', 'Gangtey Gompha'],
        activities: ['Phobjikha Valley exploration', 'Gangtey Gompha visit', 'Black-necked crane viewing'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
        distance: '70 km',
        travelTime: '2-3 hours',
      },
      {
        dayNumber: 6,
        title: 'Punakha to Paro',
        description:
          'Morning drive to Paro. Afternoon visit to Ta Dzong (National Museum) and Rinpung Dzong. Evening free for shopping.',
        locations: ['Punakha', 'Paro'],
        activities: ['Scenic drive', 'National Museum', 'Rinpung Dzong'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '130 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 7,
        title: 'Tiger\'s Nest Hike',
        description:
          'Full day hike to Taktsang (Tiger\'s Nest) Monastery — Bhutan\'s most iconic landmark (5-6 hours round trip). Optional hot stone bath. Farewell dinner.',
        locations: ['Tiger\'s Nest'],
        activities: ['Tiger\'s Nest hike', 'Hot stone bath (optional)', 'Farewell dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
      },
      {
        dayNumber: 8,
        title: 'Paro Sightseeing',
        description:
          'Morning visit to Paro Dzong, Ta Dzong, and Kichu Lhakhang. Afternoon visit to Drukgyal Dzong ruins and Airport View Point. Evening at leisure.',
        locations: ['Paro Dzong', 'Kichu Lhakhang', 'Drukgyal Dzong'],
        activities: ['Paro Dzong', 'Kichu Lhakhang', 'Drukgyal Dzong', 'Airport View Point'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
      },
      {
        dayNumber: 9,
        title: 'Departure',
        description:
          'Transfer to Paro airport or drive to Phuentsholing for onward journey. Tour concludes.',
        locations: ['Paro'],
        activities: ['Departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '4-star', nights: 2, roomType: 'Deluxe Room' },
      { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '4-star', nights: 3, roomType: 'Premium Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '4-star', nights: 2, roomType: 'Deluxe Room' },
    ],
    inclusions: [
      'Accommodation on double occupancy',
      'All meals (breakfast, lunch, dinner) as per itinerary',
      'Private AC vehicle for all transfers and sightseeing',
      'English-speaking expert guide throughout',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Immigration formalities assistance',
      'Tourist SIM',
      'Drinking water throughout',
      'Guest insurance',
    ],
    exclusions: [
      'Train/flight fare to and from Jaigaon/Phuentsholing',
      'Travel insurance',
      'Personal expenses (shopping, tips, laundry)',
      'Meals not mentioned in the itinerary',
      'Optional activities',
      'GST 5%',
    ],
    optionalActivities: ['Hot stone bath', 'White-water rafting', 'Archery experience', 'Cooking class'],
    faq: [
      {
        question: 'Is this a private or group tour?',
        answer: 'This is a private tour. You get your own guide and vehicle. We can also arrange it as a small group tour on fixed dates.',
      },
      {
        question: 'When can we see black-necked cranes in Phobjikha?',
        answer: 'Black-necked cranes are typically visible from late October to mid-February. During other months, the valley itself is still stunning.',
      },
      {
        question: 'Can I shorten this tour?',
        answer: 'Yes, we can create a custom version. Contact us for a personalised itinerary.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Grand Explorer Tour — 8N/9D | Happy Kingdom Travels',
      metaDescription: 'Comprehensive 9-day Bhutan tour covering Thimphu, Punakha, Phobjikha Valley & Paro. Private vehicle, expert guide, all meals included.',
      keywords: ['bhutan complete tour 9 days', 'bhutan grand explorer', 'bhutan tour all valleys', 'bhutan tour from india 8n 9d'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
  {
    title: 'Bhutan Extended Journey — 9N/10D',
    slug: 'bhutan-extended-journey-9n-10d',
    destination: 'Bhutan',
    category: 'group',
    duration: { nights: 9, days: 10 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Punakha',
      'Wangdue Phodrang',
      'Trongsa',
      'Bumthang (Jakar)',
      'Phobjikha Valley',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 10-day comprehensive group/solo tour covering all major valleys of Bhutan — Thimphu, Punakha, Trongsa, Bumthang, Phobjikha, and Paro. The ultimate Bhutan experience for travellers who want to explore the entire kingdom.',
    description:
      'This 9-night / 10-day fixed-departure itinerary is the most comprehensive tour we offer. Starting from Phuentsholing, travel through all of Bhutan\'s major valleys including the remote Bumthang and Phobjikha regions. Highlights include Tiger\'s Nest Monastery, Punakha Dzong, Trongsa Dzong, the spiritual Bumthang valley, and the glacial Phobjikha Valley famous for black-necked cranes. The tour includes comfortable 3-star accommodation, all meals, expert local guide, and private shared transport. Perfect for travellers who want the complete Bhutan experience.',
    tripHighlights: [
      'Hike to Tiger\'s Nest Monastery',
      'Explore all major Bhutan valleys',
      'Visit Trongsa Dzong — seat of Bhutan\'s monarchy',
      'Phobjikha Valley — black-necked crane habitat',
      'Bumthang spiritual valley exploration',
      'Dochula Pass panoramic Himalayan views',
      'Traditional farmhouse experience',
    ],
    suitableFor: ['Cultural Travellers', 'Small Groups', 'Repeat Visitors', 'Photographers', 'Retirees'],
    travelStyle: 'comfort',
    images: ['/images/tours/extended-thimphu.jpg', '/images/tours/extended-bumthang.jpg', '/images/tours/extended-phobjikha.jpg'],
    heroImage: '/images/tours/extended-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing',
        description:
          'Meet our representative at Jaigaon border. Transfer to hotel in Phuentsholing. Orientation walk. Welcome dinner.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['Border pickup', 'Orientation walk', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu',
        description:
          'Depart after breakfast for Thimphu. Complete immigration formalities. Visit Kharbandi Gumba. Arrive Thimphu. Evening at leisure.',
        locations: ['Phuentsholing', 'Thimphu'],
        activities: ['Immigration', 'Kharbandi Gumba'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu',
        distance: '180 km',
        travelTime: '6-7 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing',
        description:
          'Full day sightseeing — Buddha Point, Memorial Chorten, Takin Preserve, National Textile Museum, Folk Heritage Museum, and Weekend Market.',
        locations: ['Buddha Point', 'Memorial Chorten', 'Takin Preserve'],
        activities: ['Buddha Point', 'Memorial Chorten', 'Takin Preserve', 'Textile Museum', 'Weekend Market'],
        meals: { breakfast: true, lunch: true, dinner: false },
        overnightAt: 'Thimphu',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Punakha',
        description:
          'Drive to Punakha via Dochula Pass. Visit Punakha Dzong and Punakha Suspension Bridge. Evening river walk.',
        locations: ['Dochula Pass', 'Punakha Dzong'],
        activities: ['Dochula Pass', 'Punakha Dzong', 'Suspension Bridge', 'River walk'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
        distance: '120 km',
        travelTime: '4-5 hours',
      },
      {
        dayNumber: 5,
        title: 'Punakha Exploration',
        description:
          'Morning hike to Khamsum Yulley Namgyal Chorten. Visit Chimi Lhakhang (Temple of the Divine Madman). Optional hot stone bath. Evening at leisure.',
        locations: ['Khamsum Yulley Namgyal Chorten', 'Chimi Lhakhang'],
        activities: ['Khamsum Yulley hike', 'Chimi Lhakhang', 'Hot stone bath (optional)'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Punakha',
      },
      {
        dayNumber: 6,
        title: 'Punakha to Trongsa via Phobjikha',
        description:
          'Early departure for Trongsa via Phobjikha Valley. Short walk in Phobjikha. Continue to Trongsa. Visit Trongsa Dzong and Ta Dzong museum.',
        locations: ['Phobjikha Valley', 'Trongsa', 'Trongsa Dzong'],
        activities: ['Phobjikha walk', 'Trongsa Dzong', 'Ta Dzong museum'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Trongsa',
        distance: '180 km',
        travelTime: '6-7 hours',
      },
      {
        dayNumber: 7,
        title: 'Trongsa to Bumthang',
        description:
          'Drive to Bumthang (68 km). Full day sightseeing — Jambay Lhakhang, Kurjey Lhakhang, Tamshing Monastery. Evening local cheese tasting.',
        locations: ['Bumthang', 'Jambay Lhakhang', 'Kurjey Lhakhang'],
        activities: ['Bumthang sightseeing', 'Cheese tasting'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Bumthang (Jakar)',
        distance: '68 km',
        travelTime: '2-3 hours',
      },
      {
        dayNumber: 8,
        title: 'Bumthang Sightseeing',
        description:
          'Full day Bumthang exploration — local cheese farm, weaving center, burning lake. Evening at leisure.',
        locations: ['Bumthang'],
        activities: ['Cheese farm', 'Weaving center', 'Burning lake'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Bumthang (Jakar)',
      },
      {
        dayNumber: 9,
        title: 'Bumthang to Paro',
        description:
          'Fly from Bumthang to Paro (1-hour flight with stunning mountain views). Afternoon leisure. Farewell dinner with cultural show.',
        locations: ['Bumthang', 'Paro'],
        activities: ['Flight to Paro', 'Farewell dinner', 'Cultural show'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro',
        distance: '300 km',
        travelTime: '1 hour flight',
      },
      {
        dayNumber: 10,
        title: 'Departure',
        description:
          'Transfer to Paro airport for your onward journey. Tour concludes.',
        locations: ['Paro'],
        activities: ['Airport transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Thimphu', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
      { location: 'Punakha', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
      { location: 'Trongsa', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
      { location: 'Bumthang (Jakar)', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 2, roomType: 'Standard Room' },
      { location: 'Paro', hotelName: 'Hotel — To be confirmed', category: '3-star', nights: 1, roomType: 'Standard Room' },
    ],
    inclusions: [
      'Accommodation on double/triple sharing basis',
      'All meals (breakfast, lunch, dinner) as per itinerary',
      'All ground transfers by shared vehicle',
      'English-speaking local guide throughout',
      'Bumthang to Paro internal flight',
      'All sightseeing and entry fees',
      'Bhutan visa fees and permits',
      'Immigration formalities assistance',
      'Tourist SIM',
      'Drinking water throughout',
      'Guest insurance',
    ],
    exclusions: [
      'Train/flight fare to and from Jaigaon/Phuentsholing',
      'Travel insurance',
      'Personal expenses',
      'Meals not mentioned in the itinerary',
      'Optional activities',
    ],
    optionalActivities: ['Hot stone bath', 'River rafting', 'Archery', 'Cooking class'],
    faq: [
      {
        question: 'Is this the most comprehensive Bhutan tour?',
        answer: 'Yes, this 10-day itinerary covers all major valleys including remote Bumthang and Phobjikha.',
      },
      {
        question: 'Is the internal flight included?',
        answer: 'Yes, the Bumthang to Paro flight is included, saving you a 12-hour drive.',
      },
      {
        question: 'What is the group size?',
        answer: 'We operate with a minimum of 2 and maximum of 12 travellers per departure.',
      },
    ],
    seo: {
      metaTitle: 'Bhutan Extended Journey — 9N/10D | Happy Kingdom Travels',
      metaDescription: 'Comprehensive 10-day Bhutan tour covering Thimphu, Punakha, Bumthang, Phobjikha & Paro. All valleys, internal flight, meals included.',
      keywords: ['bhutan 10 day tour', 'bhutan grand tour', 'bhutan all valleys tour', 'bhutan group tour 10 days'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
  {
    title: 'Royal Bhutan — 5N/6D',
    slug: 'royal-bhutan-5n-6d',
    destination: 'Bhutan',
    category: 'luxury',
    duration: { nights: 5, days: 6 },
    route: [
      'Phuentsholing',
      'Thimphu',
      'Paro',
      'Departure',
    ],
    startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
    shortDescription:
      'A 6-day luxury tour through Bhutan\'s finest destinations with premium accommodation, private guide, and exclusive experiences. The Royal Bhutan is crafted for discerning travellers who want the best of Bhutan without compromise.',
    description:
      'The Royal Bhutan is our premium luxury tour designed for travellers who want nothing but the best. Stay in premium hotels and luxury resorts, travel in a private AC vehicle with a dedicated chauffeur, and enjoy exclusive experiences including a traditional hot stone bath and a farmhouse dinner with a Bhutanese family. The itinerary covers Phuentsholing, Thimphu, and Paro at a leisurely pace with VIP access at all attractions. Every detail is curated — from gourmet meals to personalised service. This is Bhutan at its most luxurious.',
    tripHighlights: [
      'Premium luxury accommodation throughout',
      'Private guided Tiger\'s Nest hike',
      'Exclusive hot stone bath at a luxury spa',
      'Private meditation session with a Buddhist monk',
      'Gourmet Bhutanese dining experiences',
      'Private farmhouse dinner with cultural performance',
      'VIP access at all attractions',
      'Dedicated personal chauffeur and guide',
    ],
    suitableFor: ['Luxury Travellers', 'Honeymoon Couples', 'Anniversary Trips', 'VIP Guests', 'Retirees'],
    travelStyle: 'luxury',
    images: ['/images/tours/royal-thimphu.jpg', '/images/tours/royal-paro.jpg'],
    heroImage: '/images/tours/royal-hero.jpg',
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Phuentsholing — Luxury Welcome',
        description:
          'VIP meet and greet at Jaigaon border. Transfer in a luxury vehicle to your premium hotel in Phuentsholing. Champagne welcome. Evening gourmet welcome dinner.',
        locations: ['Jaigaon', 'Phuentsholing'],
        activities: ['VIP border pickup', 'Luxury hotel check-in', 'Welcome dinner'],
        meals: { breakfast: false, lunch: false, dinner: true },
        overnightAt: 'Phuentsholing (premium hotel)',
      },
      {
        dayNumber: 2,
        title: 'Phuentsholing to Thimphu — Capital in Style',
        description:
          'Private drive to Thimphu in luxury vehicle. Visit Buddha Point, Memorial Chorten with private guide. Afternoon exclusive textile museum tour. Evening rooftop dinner.',
        locations: ['Buddha Point', 'Memorial Chorten'],
        activities: ['Private drive', 'Buddha Point', 'Textile museum', 'Rooftop dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu (premium hotel)',
        distance: '180 km',
        travelTime: '6 hours',
      },
      {
        dayNumber: 3,
        title: 'Thimphu Sightseeing — VIP Access',
        description:
          'Full day Thimphu with private guide — National Library, Takin Preserve, Folk Heritage Museum, Tashichho Dzong, Changangkha Lhakhang, and Buddha Point. Exclusive access at all sites. Evening spa treatment.',
        locations: ['National Library', 'Takin Preserve', 'Tashichho Dzong', 'Buddha Point'],
        activities: ['Private guided tour', 'VIP access', 'Spa treatment'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Thimphu (premium hotel)',
      },
      {
        dayNumber: 4,
        title: 'Thimphu to Paro — Tiger\'s Nest in Style',
        description:
          'Private drive to Paro. Afternoon private guided hike to Tiger\'s Nest with gourmet packed lunch. Evening luxury hot stone bath at a premium spa. Farewell dinner with cultural show.',
        locations: ['Thimphu', 'Paro', 'Tiger\'s Nest'],
        activities: ['Private drive', 'Private Tiger\'s Nest hike', 'Gourmet picnic', 'Luxury hot stone bath', 'Farewell dinner'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro (premium hotel)',
        distance: '55 km',
        travelTime: '1.5 hours',
      },
      {
        dayNumber: 5,
        title: 'Paro Sightseeing — Heritage & Culture',
        description:
          'Morning private visit to Paro Dzong and National Museum with expert guide. Visit Kichu Lhakhang. Afternoon private farmhouse dinner with a Bhutanese family. Cultural performance.',
        locations: ['Paro Dzong', 'National Museum', 'Kichu Lhakhang'],
        activities: ['Private Dzong tour', 'National Museum', 'Farmhouse dinner', 'Cultural performance'],
        meals: { breakfast: true, lunch: true, dinner: true },
        overnightAt: 'Paro (premium hotel)',
      },
      {
        dayNumber: 6,
        title: 'Luxury Departure',
        description:
          'Private transfer to Paro airport or drive to Phuentsholing for onward journey. VIP departure assistance. Tour concludes.',
        locations: ['Paro'],
        activities: ['VIP departure transfer'],
        meals: { breakfast: true, lunch: false, dinner: false },
      },
    ],
    accommodation: [
      { location: 'Phuentsholing', hotelName: 'Premium Hotel — To be confirmed', category: '4-star', nights: 1, roomType: 'Deluxe Room' },
      { location: 'Thimphu', hotelName: 'Premium Hotel — To be confirmed', category: '5-star', nights: 2, roomType: 'Premium Room' },
      { location: 'Paro', hotelName: 'Premium Hotel — To be confirmed', category: '5-star', nights: 2, roomType: 'Deluxe Suite' },
    ],
    inclusions: [
      'Premium/5-star luxury accommodation throughout',
      'All gourmet meals as per itinerary',
      'Private luxury AC vehicle with dedicated chauffeur',
      'English-speaking expert private guide',
      'Private meditation session with Buddhist monk',
      'Luxury hot stone bath at premium spa',
      'Private farmhouse dinner with cultural show',
      'Bhutan visa fees and VIP processing',
      'All sightseeing with VIP access',
      'Gourmet picnic hampers',
      'Tourist SIM',
      'Dedicated concierge service',
    ],
    exclusions: [
      'Airfare (domestic/international)',
      'Travel insurance',
      'Personal expenses',
      'Meals not mentioned in the itinerary',
      'Optional activities',
    ],
    optionalActivities: ['Helicopter tour', 'Private archery lesson', 'Photography session', 'Spa extensions'],
    faq: [
      {
        question: 'What makes this a luxury tour?',
        answer: 'This tour includes premium/5-star accommodation, private guide and vehicle, exclusive experiences like private meditation and luxury spa, and gourmet dining throughout.',
      },
      {
        question: 'Can we customise this tour?',
        answer: 'Absolutely. We can modify the itinerary, add extra nights, or include specific experiences based on your preferences.',
      },
      {
        question: 'Is this suitable for honeymoon couples?',
        answer: 'Yes, this is perfect for honeymoon couples and anniversary celebrations. We can add couple-specific experiences.',
      },
    ],
    seo: {
      metaTitle: 'Royal Bhutan Luxury Tour — 5N/6D | Happy Kingdom Travels',
      metaDescription: 'Luxury 6-day Bhutan tour with 5-star hotels, private guide, exclusive experiences. Tiger\'s Nest, meditation, spa & gourmet dining.',
      keywords: ['bhutan luxury tour', 'luxury bhutan holiday', 'royal bhutan experience', '5 star bhutan tour from india'],
    },
    pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request' },
    status: 'active',
    featured: true,
  },
];


async function seedPackages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    console.log('Connected to MongoDB. Seeding packages...');

    let created = 0;
    let updated = 0;

    for (const pkg of packages) {
      const existing = await Package.findOne({ slug: pkg.slug });

      if (existing) {
        Object.assign(existing, pkg);
        await existing.save();
        updated++;
        console.log(`Updated: ${pkg.title}`);
      } else {
        await Package.create(pkg);
        created++;
        console.log(`Created: ${pkg.title}`);
      }
    }

    console.log(`\nSeed complete — ${created} created, ${updated} updated`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedPackages();
