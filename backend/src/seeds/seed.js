import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import BlogPost from '../models/BlogPost.js';
import Review from '../models/Review.js';
import SiteSettings from '../models/SiteSettings.js';
import FAQ from '../models/FAQ.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Data already exists. Skipping seed.');
      process.exit(0);
    }

    console.log('Seeding admin user...');
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@bhutantravel.com',
      password: 'Admin@123',
      role: 'admin'
    });

    console.log('Seeding destinations...');
    const destinations = await Destination.insertMany([
      {
        name: 'Paro',
        slug: 'paro',
        image: '/images/paro-hero.jpg',
        description: 'Paro is one of the most beautiful valleys in Bhutan and home to the country\'s only international airport. The valley is dotted with ancient fortresses, monasteries, and traditional farmhouses set against a backdrop of snow-capped mountains. The iconic Tiger\'s Nest Monastery (Taktsang), perched on a cliff 900 meters above the Paro valley floor, is Bhutan\'s most recognized landmark and a must-visit for every traveler. The Paro Dzong, a massive fortress-monastery overlooking the valley, houses government offices and monastic bodies. The National Museum of Bhutan, housed in a former watchtower, showcases the country\'s rich cultural heritage through artifacts dating back centuries.',
        shortDescription: 'Home to the iconic Tiger\'s Nest Monastery and Bhutan\'s only international airport, Paro Valley is a breathtaking destination filled with ancient fortresses and monasteries.',
        howToReach: 'Paro International Airport receives flights from Delhi, Kolkata, Kathmandu, Bangkok, and Singapore. By road, Paro is about 55 km from Thimphu (approximately 1.5 hours drive). Shared taxis and buses are available from Thimphu.',
        bestTime: 'March to May and September to November are the best months to visit Paro. The spring months bring blooming rhododendrons, while autumn offers clear skies and stunning mountain views.',
        thingsToDo: ['Visit Taktsang (Tiger\'s Nest) Monastery', 'Explore Paro Dzong', 'Tour the National Museum', 'Hike to Drugyel Dzong ruins', 'Walk through traditional farmhouses', 'Experience a traditional hot stone bath', 'Attend local festivals (Tshechus)'],
        published: true,
        seo: {
          title: 'Paro Valley Travel Guide - Bhutan Travel Agency',
          description: 'Discover Paro Valley, home to Tiger\'s Nest Monastery. Plan your trip with our comprehensive travel guide.',
          keywords: ['Paro', 'Tiger\'s Nest', 'Bhutan travel', 'Paro Valley', 'Taktsang']
        }
      },
      {
        name: 'Thimphu',
        slug: 'thimphu',
        image: '/images/thimphu-hero.jpg',
        description: 'Thimphu is the capital city of Bhutan and one of the few capital cities in the world without a single traffic light. Nestled in a deep valley on the banks of the Wang Chhu River, Thimphu blends traditional Bhutanese architecture with modern development. The city is home to the Tashichho Dzong, the seat of Bhutan\'s government and the summer residence of the central monastic body. The Giant Buddha Dordenma statue, standing 51.5 meters tall overlooking the valley, is one of the largest Buddha statues in the world. Thimphu offers vibrant markets, authentic Bhutanese cuisine, traditional arts and crafts centers, and a lively cultural scene that gives visitors a deep insight into Bhutanese life.',
        shortDescription: 'Bhutan\'s vibrant capital city where traditional meets modern, featuring the Tashichho Dzong and the giant Buddha Dordenma statue.',
        howToReach: 'Thimphu is about 55 km from Paro International Airport (1.5 hours drive). Regular bus services connect Thimphu with Paro, Phuentsholing, and other towns. Taxis are readily available.',
        bestTime: 'Year-round destination, though spring (March-May) and autumn (September-November) offer the most pleasant weather.',
        thingsToDo: ['Visit Tashichho Dzong', 'See the Giant Buddha Dordenma', 'Explore Centenary Farmers Market', 'Visit the Folk Heritage Museum', 'Watch archery (national sport)', 'Experience traditional hot stone bath', 'Shop for handicrafts at the weekend market'],
        published: true,
        seo: {
          title: 'Thimphu Travel Guide - Bhutan Travel Agency',
          description: 'Explore Thimphu, Bhutan\'s fascinating capital. Discover attractions, culture, and things to do.',
          keywords: ['Thimphu', 'Bhutan capital', 'Tashichho Dzong', 'Bhutan travel']
        }
      },
      {
        name: 'Punakha',
        slug: 'punakha',
        image: '/images/punakha-hero.jpg',
        description: 'Punakha is the ancient capital of Bhutan and home to the magnificent Punakha Dzong, often called the Palace of Great Happiness. Situated at the confluence of the Pho Chhu (Father River) and Mo Chhu (Mother River), the dzong is considered one of the most beautiful fortresses in the country. Punakha enjoys a warm, subtropical climate and is known for its lush rice paddies, orange orchards, and dense forests. The valley is famous for the Chimi Lhakhang temple, dedicated to the Divine Madman, and the suspension bridge over the Pho Chhu River. Adventure activities like river rafting on the Mo Chhu and the breathtaking Khamsum Yulley Namgyal Chorten hike make Punakha a must-visit destination.',
        shortDescription: 'The ancient capital featuring the stunning Punakha Dzong at the confluence of two rivers, with lush valleys and adventure activities.',
        howToReach: 'Punakha is about 72 km from Thimphu (approximately 3 hours drive) via the scenic Dochula Pass. The road crosses the pass at 3,100 meters, offering panoramic views of the Himalayas.',
        bestTime: 'September to November and March to May. The Punakha Tshechu festival in February/March is a major attraction.',
        thingsToDo: ['Explore Punakha Dzong', 'Visit Chimi Lhakhang (Temple of Fertility)', 'Hike to Khamsum Yulley Namgyal Chorten', 'River rafting on Mo Chhu', 'Cross the Punakha Suspension Bridge', 'Walk through rice paddies', 'Visit the Royal Botanical Garden'],
        published: true,
        seo: {
          title: 'Punakha Travel Guide - Bhutan Travel Agency',
          description: 'Discover Punakha, the ancient capital of Bhutan with its stunning dzong and adventure activities.',
          keywords: ['Punakha', 'Punakha Dzong', 'Bhutan ancient capital', 'Punakha travel']
        }
      },
      {
        name: 'Phuentsholing',
        slug: 'phuentsholing',
        image: '/images/phuentsholing-hero.jpg',
        description: 'Phuentsholing is Bhutan\'s commercial hub and the main gateway to the country from India. Located at the border with the Indian state of West Bengal, it serves as the primary entry point for overland travelers. The town has a unique blend of Bhutanese and Indian cultures. The Zangto Pelri Lhakhang, a small temple modeled after the Tashichho Dzong, is a prominent landmark. The Karbandhi Monastery offers panoramic views of the surrounding plains. Phuentsholing is also home to the Bhutan Gate, an ornamental gateway marking the border between Bhutan and India. While not a typical tourist destination, it serves as an important transit point and offers visitors a glimpse into the country\'s commercial life.',
        shortDescription: 'Bhutan\'s commercial hub and primary overland entry point from India, featuring a unique blend of cultures.',
        howToReach: 'Phuentsholing is connected to Jaigaon, India. From Siliguri, it is about 155 km (4-5 hours drive). Bhutanese buses and shared taxis operate between Phuentsholing and Thimphu.',
        bestTime: 'October to December and March to May. Monsoon season (June-August) brings heavy rainfall.',
        thingsToDo: ['Visit the Bhutan Gate', 'Explore Zangto Pelri Lhakhang', 'Visit Karbandhi Monastery', 'Shop at local markets', 'Experience the India-Bhutan border', 'Visit Amo Chhu Crocodile Farm'],
        published: true,
        seo: {
          title: 'Phuentsholing Travel Guide - Bhutan Travel Agency',
          description: 'Plan your transit through Phuentsholing, Bhutan\'s gateway town from India.',
          keywords: ['Phuentsholing', 'Bhutan India border', 'Bhutan gateway', 'Phuentsholing travel']
        }
      },
      {
        name: 'Haa Valley',
        slug: 'haa-valley',
        image: '/images/haa-valley-hero.jpg',
        description: 'Haa Valley is one of the most picturesque and least explored valleys in Bhutan. Tucked away in the western part of the country, it was only opened to tourists in 2002. The valley is surrounded by lush green mountains and is home to two important temples: Lhakhang Karpo (White Temple) and Lhakhang Nagpo (Black Temple), which according to legend were built in the 7th century by the Tibetan King Songtsen Gampo. Haa offers an authentic, off-the-beaten-path Bhutanese experience with traditional farmhouses, pristine forests, and a peaceful atmosphere. The valley is perfect for trekking, cycling, and experiencing rural Bhutanese life away from the tourist crowds.',
        shortDescription: 'A pristine, off-the-beaten-path valley with ancient temples and authentic Bhutanese rural life.',
        howToReach: 'Haa Valley is about 65 km from Paro (2.5 hours drive) via the Chele La Pass at 3,988 meters, one of the highest motorable passes in Bhutan.',
        bestTime: 'March to May and September to November. The valley is accessible year-round but winter months can be quite cold.',
        thingsToDo: ['Visit Lhakhang Karpo and Lhakhang Nagpo', 'Drive over Chele La Pass', 'Trek to Dragon Mountain', 'Cycle through the valley', 'Visit traditional farmhouses', 'Experience rural Bhutanese life', 'Hike to Bja Pakha Nunnery'],
        published: true,
        seo: {
          title: 'Haa Valley Travel Guide - Bhutan Travel Agency',
          description: 'Explore the hidden gem of Haa Valley. Discover ancient temples and untouched Bhutanese beauty.',
          keywords: ['Haa Valley', 'Haa Bhutan', 'hidden valley Bhutan', 'Haa Valley travel']
        }
      },
      {
        name: 'Bumthang',
        slug: 'bumthang',
        image: '/images/bumthang-hero.jpg',
        description: 'Bumthang is a district in central Bhutan comprising four valleys: Choekhor, Tang, Ura, and Chumey. Known as the spiritual heartland of Bhutan, it is home to some of the oldest and most sacred temples in the country. The Jambay Lhakhang, built in the 7th century, and Kurjey Lhakhang, where Guru Rinpoche left his body imprint on a rock, are among the most important pilgrimage sites. Bumthang is also famous for its honey production, cheese, and the distinctive Bumthang beer. The region offers beautiful trekking routes through blue pine forests, traditional textile weaving, and a chance to experience the quieter, more spiritual side of Bhutan.',
        shortDescription: 'The spiritual heartland of Bhutan with ancient temples, beautiful valleys, and rich cultural heritage.',
        howToReach: 'Bumthang is about 268 km from Thimphu (approximately 8-10 hours drive) or a short domestic flight to Bathpalathang Airport. The road journey passes through stunning mountain landscapes.',
        bestTime: 'March to May and September to November. The Jambay Lhakhang Drup festival in October/November is a major attraction.',
        thingsToDo: ['Visit Jambay Lhakhang', 'Explore Kurjey Lhakhang complex', 'Trek to Burning Lake (Mebar Tsho)', 'Visit the Red Panda Brewery', 'Explore Ura Valley', 'Learn traditional textile weaving', 'Trek through Bumthang Cultural Trek'],
        published: true,
        seo: {
          title: 'Bumthang Travel Guide - Bhutan Travel Agency',
          description: 'Discover Bumthang, the spiritual heartland of Bhutan. Explore ancient temples and beautiful valleys.',
          keywords: ['Bumthang', 'Bumthang valley', 'spiritual Bhutan', 'Bumthang travel']
        }
      }
    ]);

    const destMap = {};
    destinations.forEach(d => { destMap[d.name] = d._id; });

    console.log('Seeding packages...');
    const rawPackages = [
      {
        title: 'Bhutan Highlights',
        slug: 'bhutan-highlights-4n-5d',
        duration: { nights: 4, days: 5 },
        category: 'standard',
        shortDescription: 'A 5-day introduction to Bhutan covering Thimphu and Paro — the kingdom\'s two most iconic valleys. Perfect for first-time visitors.',
        description: 'A 5-day introduction to Bhutan covering Thimphu and Paro — the kingdom\'s two most iconic valleys. Perfect for first-time visitors who want to experience Bhutan\'s culture, monasteries, and mountain scenery in a short trip.',
        heroImage: '/images/pkg-highlights.jpg',
        images: ['/images/pkg-highlights.jpg', '/images/paro-hero.jpg', '/images/thimphu-hero.jpg', '/images/phuentsholing-hero.jpg'],
        suitableFor: ['First-Time Visitors', 'Short Break Travellers', 'Couples', 'Solo Travellers'],
        travelStyle: 'comfort',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Paro', 'Departure'],
        tripHighlights: ['Hike to Taktsang (Tiger\'s Nest) Monastery', 'Explore Thimphu\'s Buddha Point and Memorial Chorten', 'Visit Paro Dzong and National Museum', 'Scenic drive through Bhutanese countryside', 'Experience authentic Bhutanese culture and cuisine'],
        inclusions: ['Accommodation in 3-star hotels', 'All meals', 'Private vehicle', 'English-speaking guide', 'Sightseeing & entry fees', 'Visa & permits', 'Immigration assistance', 'Tourist SIM', 'Drinking water'],
        exclusions: ['Train/flight to Jaigaon', 'Travel insurance', 'Personal expenses', 'Meals not in itinerary', 'Optional activities', 'GST 5%'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing, the gateway town to Bhutan from India.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive from Phuentsholing to Thimphu (176 km, 6-7 hrs) through scenic Bhutanese countryside.', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive', 'Countryside views'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '176 km', travelTime: '6-7 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing', description: 'Full day exploring Thimphu — Buddha Point, Memorial Chorten, and local culture.', locations: ['Buddha Point', 'Memorial Chorten', 'Thimphu'], activities: ['Sightseeing', 'Cultural exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu to Paro — Tiger\'s Nest Hike', description: 'Drive to Paro (55 km, 1.5 hrs) and hike to the iconic Tiger\'s Nest Monastery.', locations: ['Paro', 'Taktsang Monastery'], activities: ['Scenic drive', 'Tiger\'s Nest hike'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro', distance: '55 km', travelTime: '1.5 hrs' },
          { dayNumber: 5, title: 'Paro Sightseeing — Departure', description: 'Visit Paro Dzong and National Museum. Departure.', locations: ['Paro Dzong', 'National Museum'], activities: ['Sightseeing', 'Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Thimphu', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Paro', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
        ],
        faq: [
          { question: 'Is the SDF included?', answer: 'Yes, the Sustainable Development Fee is included in the package price.' },
          { question: 'How difficult is the Tiger\'s Nest hike?', answer: 'The hike is moderate with well-maintained trails. Takes about 2-3 hours.' },
        ],
        optionalActivities: ['Hot stone bath', 'Archery', 'River rafting', 'Cooking class'],
        seo: { metaTitle: 'Bhutan Highlights 4N/5D Tour Package', metaDescription: 'Experience Bhutan in 5 days covering Thimphu and Paro with Tiger\'s Nest hike.', keywords: ['Bhutan tour package', '4 nights 5 days Bhutan', 'Tiger\'s Nest'] },
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
      {
        title: 'Bhutan Family Escape',
        slug: 'bhutan-family-escape-5n-6d',
        duration: { nights: 5, days: 6 },
        category: 'family',
        shortDescription: 'A 6-day family-friendly Bhutan tour with kid-friendly activities, comfortable stays, and a relaxed pace.',
        description: 'A 6-day family-friendly Bhutan tour covering Thimphu and Paro with kid-friendly activities, comfortable stays, and a relaxed pace. Designed for families with children of all ages.',
        heroImage: '/images/pkg-family-escape.jpg',
        images: ['/images/pkg-family-escape.jpg', '/images/thimphu-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Families with Children', 'Multigenerational Travel', 'School Groups', 'Senior Citizens'],
        travelStyle: 'comfort',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Paro', 'Departure'],
        tripHighlights: ['Archery session — Bhutan\'s national sport', 'Kid-friendly visit to Takin Preserve', 'Family hike to Tiger\'s Nest (shorter route option)', 'Explore Thimphu\'s cultural highlights', 'Paro Dzong and National Museum visit', 'Relaxed pace with rest stops for children'],
        inclusions: ['Accommodation in 3-star hotels (Family Room)', 'All meals', 'Private vehicle', 'Guide (Day 2–5)', 'Sightseeing & entry fees', 'Visa & permits', 'Archery session', 'Drinking water', 'Tourist SIM', 'Travel insurance'],
        exclusions: ['Train/flight to Jaigaon', 'Personal expenses', 'Meals not in itinerary', 'Optional activities', 'GST 5%'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing and check in to hotel.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive to Thimphu (176 km, 6-7 hrs). Family-friendly welcome.', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive', 'City orientation'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '176 km', travelTime: '6-7 hrs' },
          { dayNumber: 3, title: 'Thimphu Family Fun Day', description: 'Visit Takin Preserve, Giant Buddha, Centenary Market, and enjoy family archery session.', locations: ['Takin Preserve', 'Buddha Point', 'Centenary Market'], activities: ['Wildlife visit', 'Sightseeing', 'Archery', 'Craft workshop'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu to Paro — Tiger\'s Nest', description: 'Drive to Paro (55 km, 1.5 hrs). Family hike to Tiger\'s Nest (shorter route option).', locations: ['Paro', 'Taktsang Monastery'], activities: ['Scenic drive', 'Family hike'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro', distance: '55 km', travelTime: '1.5 hrs' },
          { dayNumber: 5, title: 'Paro Sightseeing', description: 'Visit Paro Dzong and National Museum. Relaxed family day.', locations: ['Paro Dzong', 'National Museum'], activities: ['Sightseeing', 'Free time'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 6, title: 'Departure', description: 'Transfer for departure.', locations: ['Paro'], activities: ['Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Family Room', nights: 1 },
          { location: 'Thimphu', hotelName: '3-star Hotel', category: '3-star', roomType: 'Family Room', nights: 2 },
          { location: 'Paro', hotelName: '3-star Hotel', category: '3-star', roomType: 'Family Room', nights: 2 },
        ],
        faq: [
          { question: 'What age group is this suitable for?', answer: 'Designed for families with children of all ages. We can modify for toddlers.' },
          { question: 'Are the hikes suitable for kids?', answer: 'Yes, we choose easier trails and provide porters. Tiger\'s Nest has a shorter route for families.' },
        ],
        seo: { metaTitle: 'Bhutan Family Escape 5N/6D - Family Tour Package', metaDescription: 'Family-friendly Bhutan tour with archery, Takin Preserve, and Tiger\'s Nest.', keywords: ['Bhutan family tour', 'family vacation Bhutan', 'Bhutan with kids'] },
        optionalActivities: ['Hot stone bath', 'River rafting', 'Bicycle tour', 'Farmhouse dinner'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
      {
        title: 'Bhutan Classic',
        slug: 'bhutan-classic-6n-7d',
        duration: { nights: 6, days: 7 },
        category: 'group',
        shortDescription: 'A 7-day group/solo tour covering Thimphu, Punakha, and Paro — Bhutan\'s three most popular valleys.',
        description: 'A 7-day group/solo tour covering Thimphu, Punakha, and Paro — Bhutan\'s three most popular valleys. Perfect for first-time visitors who want the essential Bhutan experience in a well-paced itinerary.',
        heroImage: '/images/pkg-classic.jpg',
        images: ['/images/pkg-classic.jpg', '/images/thimphu-hero.jpg', '/images/punakha-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Solo Travellers', 'Small Groups', 'First-Time Visitors', 'Budget Travellers'],
        travelStyle: 'budget',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro', 'Departure'],
        tripHighlights: ['Hike to Taktsang (Tiger\'s Nest) Monastery', 'Crossing the spectacular Dochula Pass (3,100 m)', 'Visit the iconic Punakha Dzong', 'Explore Thimphu\'s Buddha Point and Memorial Chorten', 'Traditional Bhutanese dinner experience', 'Punakha Suspension Bridge'],
        inclusions: ['Accommodation in 3-star hotels', 'All meals', 'Shared vehicle', 'Guide', 'Sightseeing & entry fees', 'Visa & permits', 'Immigration assistance', 'Tourist SIM', 'Evening tea/snack', 'Guest insurance'],
        exclusions: ['Personal consumption', 'Entry fees (where not included)', 'Travel insurance', 'Meals not in itinerary', 'Optional activities'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing and check in.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive to Thimphu (180 km, 6 hrs).', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '180 km', travelTime: '6 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing', description: 'Explore Thimphu — Buddha Point, Memorial Chorten, and local culture.', locations: ['Buddha Point', 'Memorial Chorten'], activities: ['Sightseeing', 'Cultural exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu to Punakha', description: 'Drive to Punakha (120 km, 4-5 hrs) via Dochula Pass with Himalayan views.', locations: ['Dochula Pass', 'Punakha'], activities: ['Mountain pass', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha', distance: '120 km', travelTime: '4-5 hrs' },
          { dayNumber: 5, title: 'Punakha to Paro', description: 'Visit Punakha Dzong and Suspension Bridge. Drive to Paro (130 km, 4-5 hrs).', locations: ['Punakha Dzong', 'Suspension Bridge', 'Paro'], activities: ['Dzong visit', 'Bridge walk', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro', distance: '130 km', travelTime: '4-5 hrs' },
          { dayNumber: 6, title: 'Paro Sightseeing', description: 'Hike to Tiger\'s Nest Monastery. Visit Paro Dzong and National Museum.', locations: ['Taktsang Monastery', 'Paro Dzong', 'National Museum'], activities: ['Tiger\'s Nest hike', 'Sightseeing'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 7, title: 'Departure', description: 'Transfer for departure.', locations: ['Paro'], activities: ['Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Thimphu', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
          { location: 'Punakha', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Paro', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
        ],
        faq: [
          { question: 'Is the SDF included?', answer: 'Yes, the Sustainable Development Fee is included.' },
          { question: 'What is the group size?', answer: 'Small groups of 8-15 travelers. Guaranteed departure with minimum 4.' },
        ],
        seo: { metaTitle: 'Bhutan Classic 6N/7D Group Tour Package', metaDescription: 'Essential Bhutan tour covering Thimphu, Punakha, and Paro in 7 days.', keywords: ['Bhutan group tour', '7 days Bhutan', 'Bhutan classic tour'] },
        optionalActivities: ['Hot stone bath', 'River rafting in Punakha', 'Archery experience'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
      {
        title: 'Bhutan Explorer',
        slug: 'bhutan-explorer-7n-8d',
        duration: { nights: 7, days: 8 },
        category: 'group',
        shortDescription: 'An 8-day guided tour covering Thimphu, Punakha, and Paro with an extra day for deeper exploration.',
        description: 'An 8-day guided tour covering Thimphu, Punakha, and Paro with an extra day for deeper exploration. Includes the iconic Tiger\'s Nest hike, Dochula Pass, and Punakha Dzong. Ideal for travellers who want more time in each destination.',
        heroImage: '/images/pkg-explorer.jpg',
        images: ['/images/pkg-explorer.jpg', '/images/thimphu-hero.jpg', '/images/punakha-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Solo Travellers', 'Small Groups', 'First-Time Visitors', 'Cultural Travellers'],
        travelStyle: 'budget',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Paro', 'Departure'],
        tripHighlights: ['Hike to Taktsang (Tiger\'s Nest) Monastery', 'Crossing the spectacular Dochula Pass (3,100 m)', 'Visit the iconic Punakha Dzong', 'Full day Thimphu sightseeing', 'Punakha Suspension Bridge', 'Paro Dzong and National Museum'],
        inclusions: ['Accommodation in 3-star hotels', 'Breakfast & dinner', 'Shared vehicle', 'Guide', 'Sightseeing & entry fees', 'Visa & permits', 'Immigration assistance', 'Tourist SIM', 'Lunch', 'Evening tea/snack', 'Guest insurance'],
        exclusions: ['Personal consumption', 'Entry fees (where not included)', 'Travel insurance', 'Meals not in itinerary', 'Optional activities'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing and check in.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive to Thimphu (180 km, 6 hrs).', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '180 km', travelTime: '6 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing', description: 'Full day exploring Thimphu.', locations: ['Thimphu'], activities: ['Sightseeing'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu Sightseeing — Day 2', description: 'Second day of Thimphu exploration for deeper cultural immersion.', locations: ['Thimphu'], activities: ['Sightseeing', 'Cultural exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 5, title: 'Thimphu to Punakha', description: 'Drive to Punakha (120 km, 4-5 hrs) via Dochula Pass.', locations: ['Dochula Pass', 'Punakha'], activities: ['Mountain pass', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha', distance: '120 km', travelTime: '4-5 hrs' },
          { dayNumber: 6, title: 'Punakha to Paro', description: 'Visit Punakha Dzong and Suspension Bridge. Drive to Paro.', locations: ['Punakha Dzong', 'Suspension Bridge', 'Paro'], activities: ['Dzong visit', 'Bridge walk', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro', distance: '130 km', travelTime: '4-5 hrs' },
          { dayNumber: 7, title: 'Tiger\'s Nest Hike', description: 'Full day hike to Tiger\'s Nest Monastery.', locations: ['Taktsang Monastery'], activities: ['Tiger\'s Nest hike'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 8, title: 'Departure', description: 'Transfer for departure.', locations: ['Paro'], activities: ['Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Thimphu', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 3 },
          { location: 'Punakha', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Paro', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
        ],
        faq: [
          { question: 'Is the SDF included?', answer: 'Yes, the SDF is included.' },
          { question: 'Can I customize the itinerary?', answer: 'Yes, we can modify the itinerary to suit your preferences.' },
        ],
        seo: { metaTitle: 'Bhutan Explorer 7N/8D Tour Package', metaDescription: 'Comprehensive 8-day Bhutan tour covering Thimphu, Punakha, and Paro.', keywords: ['Bhutan 8 days', 'Bhutan explorer tour', 'extended Bhutan tour'] },
        optionalActivities: ['Hot stone bath', 'River rafting', 'Archery experience'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: false,
      },
      {
        title: 'Bhutan Grand Explorer',
        slug: 'bhutan-grand-explorer-8n-9d',
        duration: { nights: 8, days: 9 },
        category: 'standard',
        shortDescription: 'A 9-day comprehensive Bhutan tour covering Thimphu, Punakha, the stunning Phobjikha Valley, and Paro.',
        description: 'A 9-day comprehensive Bhutan tour covering Thimphu, Punakha, the stunning Phobjikha Valley, and Paro. The ultimate Bhutan experience with cultural immersion, scenic drives, and wildlife viewing.',
        heroImage: '/images/pkg-grand-explorer.jpg',
        images: ['/images/pkg-grand-explorer.jpg', '/images/thimphu-hero.jpg', '/images/punakha-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Cultural Travellers', 'Nature Lovers', 'Photographers', 'Repeat Visitors', 'Retirees'],
        travelStyle: 'premium',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Gangtey/Phobjikha', 'Paro', 'Departure'],
        tripHighlights: ['Hike to Taktsang (Tiger\'s Nest) Monastery', 'Phobjikha Valley — black-necked crane habitat', 'Gangtey Gompha monastery visit', 'Dochula Pass panoramic Himalayan views', 'Punakha Dzong — the "Palace of Great Bliss"', 'Full day Thimphu sightseeing', 'White-water rafting in Punakha (optional)'],
        inclusions: ['Accommodation (3-star Phuentsholing, 4-star Thimphu/Punakha/Paro)', 'All meals', 'Private AC vehicle', 'Expert guide', 'Sightseeing & entry fees', 'Visa & permits', 'Immigration assistance', 'Tourist SIM', 'Drinking water', 'Guest insurance'],
        exclusions: ['Train/flight to Jaigaon', 'Travel insurance', 'Personal expenses', 'Meals not in itinerary', 'Optional activities', 'GST 5%'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing and check in.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive to Thimphu (180 km, 6 hrs).', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '180 km', travelTime: '6 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing', description: 'Full day exploring Thimphu.', locations: ['Thimphu'], activities: ['Sightseeing'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu to Punakha', description: 'Drive to Punakha (120 km, 4-5 hrs) via Dochula Pass.', locations: ['Dochula Pass', 'Punakha'], activities: ['Mountain pass', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha', distance: '120 km', travelTime: '4-5 hrs' },
          { dayNumber: 5, title: 'Gangtey / Phobjikha Valley', description: 'Excursion to Phobjikha Valley (70 km, 2-3 hrs) — black-necked crane habitat.', locations: ['Phobjikha Valley', 'Gangtey Monastery'], activities: ['Valley excursion', 'Monastery visit', 'Wildlife viewing'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha', distance: '70 km', travelTime: '2-3 hrs' },
          { dayNumber: 6, title: 'Punakha to Paro', description: 'Drive to Paro (130 km, 4-5 hrs).', locations: ['Paro'], activities: ['Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro', distance: '130 km', travelTime: '4-5 hrs' },
          { dayNumber: 7, title: 'Tiger\'s Nest Hike', description: 'Full day hike to Tiger\'s Nest Monastery.', locations: ['Taktsang Monastery'], activities: ['Tiger\'s Nest hike'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 8, title: 'Paro Sightseeing', description: 'Visit Paro Dzong, National Museum, and explore the valley.', locations: ['Paro Dzong', 'National Museum'], activities: ['Sightseeing', 'Cultural exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 9, title: 'Departure', description: 'Transfer for departure.', locations: ['Paro'], activities: ['Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard', nights: 1 },
          { location: 'Thimphu', hotelName: '4-star Hotel', category: '4-star', roomType: 'Deluxe', nights: 2 },
          { location: 'Punakha', hotelName: '4-star Hotel', category: '4-star', roomType: 'Premium', nights: 3 },
          { location: 'Paro', hotelName: '4-star Hotel', category: '4-star', roomType: 'Deluxe', nights: 2 },
        ],
        faq: [
          { question: 'Is Phobjikha Valley worth the detour?', answer: 'Absolutely! The valley is home to endangered black-necked cranes and offers stunning landscapes.' },
          { question: 'Can the itinerary be customized?', answer: 'Yes, we can modify the itinerary to suit your preferences.' },
        ],
        seo: { metaTitle: 'Bhutan Grand Explorer 8N/9D Tour Package', metaDescription: 'Comprehensive 9-day Bhutan tour including Phobjikha Valley and Gangtey Monastery.', keywords: ['Bhutan 9 days', 'Phobjikha Valley tour', 'Bhutan grand tour'] },
        optionalActivities: ['Hot stone bath', 'White-water rafting', 'Archery', 'Cooking class'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
      {
        title: 'Bhutan Extended Journey',
        slug: 'bhutan-extended-journey-9n-10d',
        duration: { nights: 9, days: 10 },
        category: 'group',
        shortDescription: 'A 10-day comprehensive tour covering all major valleys of Bhutan — the ultimate Bhutan experience.',
        description: 'A 10-day comprehensive group/solo tour covering all major valleys of Bhutan — Thimphu, Punakha, Trongsa, Bumthang, Phobjikha, and Paro. The ultimate Bhutan experience for travellers who want to explore the entire kingdom.',
        heroImage: '/images/pkg-extended.jpg',
        images: ['/images/pkg-extended.jpg', '/images/bumthang-hero.jpg', '/images/punakha-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Cultural Travellers', 'Small Groups', 'Repeat Visitors', 'Photographers', 'Retirees'],
        travelStyle: 'comfort',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Punakha', 'Wangdue Phodrang', 'Trongsa', 'Bumthang', 'Phobjikha', 'Paro', 'Departure'],
        tripHighlights: ['Hike to Tiger\'s Nest Monastery', 'Explore all major Bhutan valleys', 'Visit Trongsa Dzong — seat of Bhutan\'s monarchy', 'Phobjikha Valley — black-necked crane habitat', 'Bumthang spiritual valley exploration', 'Dochula Pass panoramic Himalayan views', 'Traditional farmhouse experience'],
        inclusions: ['Accommodation in 3-star hotels', 'All meals', 'Shared vehicle', 'Guide', 'Bumthang→Paro internal flight', 'Sightseeing & entry fees', 'Visa & permits', 'Immigration assistance', 'Tourist SIM', 'Drinking water', 'Guest insurance'],
        exclusions: ['Train/flight to Jaigaon', 'Travel insurance', 'Personal expenses', 'Meals not in itinerary', 'Optional activities'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing', description: 'Arrive at Phuentsholing and check in.', locations: ['Phuentsholing'], activities: ['Arrival', 'Border crossing'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu', description: 'Drive to Thimphu (180 km, 6-7 hrs).', locations: ['Phuentsholing', 'Thimphu'], activities: ['Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu', distance: '180 km', travelTime: '6-7 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing', description: 'Full day exploring Thimphu.', locations: ['Thimphu'], activities: ['Sightseeing'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu' },
          { dayNumber: 4, title: 'Thimphu to Punakha', description: 'Drive to Punakha (120 km, 4-5 hrs) via Dochula Pass.', locations: ['Dochula Pass', 'Punakha'], activities: ['Mountain pass', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha', distance: '120 km', travelTime: '4-5 hrs' },
          { dayNumber: 5, title: 'Punakha Exploration', description: 'Full day exploring Punakha — Dzong, Suspension Bridge, and surroundings.', locations: ['Punakha Dzong', 'Suspension Bridge'], activities: ['Dzong visit', 'Bridge walk', 'Cultural exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Punakha' },
          { dayNumber: 6, title: 'Punakha to Trongsa via Phobjikha', description: 'Drive to Trongsa (180 km, 6-7 hrs) via Phobjikha Valley.', locations: ['Phobjikha Valley', 'Trongsa'], activities: ['Valley excursion', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Trongsa', distance: '180 km', travelTime: '6-7 hrs' },
          { dayNumber: 7, title: 'Trongsa to Bumthang', description: 'Drive to Bumthang (68 km, 2-3 hrs). Visit Trongsa Dzong.', locations: ['Trongsa Dzong', 'Bumthang'], activities: ['Dzong visit', 'Scenic drive'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Bumthang (Jakar)', distance: '68 km', travelTime: '2-3 hrs' },
          { dayNumber: 8, title: 'Bumthang Sightseeing', description: 'Full day exploring Bumthang — Jambay Lhakhang, Kurjey Lhakhang, and spiritual sites.', locations: ['Jambay Lhakhang', 'Kurjey Lhakhang', 'Bumthang'], activities: ['Temple visits', 'Spiritual exploration'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Bumthang (Jakar)' },
          { dayNumber: 9, title: 'Bumthang to Paro', description: 'Fly from Bumthang to Paro (1 hr flight). Afternoon free.', locations: ['Bumthang', 'Paro'], activities: ['Domestic flight', 'Free time'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro' },
          { dayNumber: 10, title: 'Departure', description: 'Transfer for departure.', locations: ['Paro'], activities: ['Departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Thimphu', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
          { location: 'Punakha', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
          { location: 'Trongsa', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
          { location: 'Bumthang', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 2 },
          { location: 'Paro', hotelName: '3-star Hotel', category: '3-star', roomType: 'Standard Room', nights: 1 },
        ],
        faq: [
          { question: 'Is the internal flight included?', answer: 'Yes, the Bumthang to Paro domestic flight is included in the package.' },
          { question: 'How is the road journey to Bumthang?', answer: 'The road is well-maintained and passes through stunning mountain scenery.' },
        ],
        seo: { metaTitle: 'Bhutan Extended Journey 9N/10D - Complete Bhutan Tour', metaDescription: '10-day comprehensive Bhutan tour covering Thimphu, Punakha, Trongsa, Bumthang, and Paro.', keywords: ['Bhutan 10 days', 'complete Bhutan tour', 'Bumthang tour'] },
        optionalActivities: ['Hot stone bath', 'River rafting', 'Archery', 'Cooking class'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
      {
        title: 'Royal Bhutan',
        slug: 'royal-bhutan-5n-6d',
        duration: { nights: 5, days: 6 },
        category: 'luxury',
        shortDescription: 'A 6-day luxury tour through Bhutan\'s finest destinations with premium accommodation, private guide, and exclusive experiences.',
        description: 'A 6-day luxury tour through Bhutan\'s finest destinations with premium accommodation, private guide, and exclusive experiences. Crafted for discerning travellers who want the best of Bhutan without compromise.',
        heroImage: '/images/pkg-royal.jpg',
        images: ['/images/pkg-royal.jpg', '/images/thimphu-hero.jpg', '/images/paro-hero.jpg'],
        suitableFor: ['Luxury Travellers', 'Honeymoon Couples', 'Anniversary Trips', 'VIP Guests', 'Retirees'],
        travelStyle: 'luxury',
        startingPoints: ['Jaigaon (India)', 'Phuentsholing (Bhutan)'],
        route: ['Phuentsholing', 'Thimphu', 'Paro', 'Departure'],
        tripHighlights: ['Premium luxury accommodation throughout', 'Private guided Tiger\'s Nest hike', 'Exclusive hot stone bath at a luxury spa', 'Private meditation session with a Buddhist monk', 'Gourmet Bhutanese dining experiences', 'Private farmhouse dinner with cultural performance', 'VIP access at all attractions', 'Dedicated personal chauffeur and guide'],
        inclusions: ['Premium/5-star accommodation', 'All gourmet meals', 'Private luxury AC vehicle with chauffeur', 'Private expert guide', 'Private meditation session', 'Luxury hot stone bath', 'Private farmhouse dinner with cultural show', 'Visa & VIP processing', 'VIP access', 'Gourmet picnic hampers', 'Tourist SIM', 'Dedicated concierge'],
        exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Meals not in itinerary', 'Optional activities'],
        itinerary: [
          { dayNumber: 1, title: 'Arrival at Phuentsholing — Luxury Welcome', description: 'Arrive at Phuentsholing with VIP processing and luxury hotel check-in.', locations: ['Phuentsholing'], activities: ['VIP arrival', 'Luxury check-in'], meals: { breakfast: false, lunch: false, dinner: true }, overnightAt: 'Phuentsholing (premium hotel)' },
          { dayNumber: 2, title: 'Phuentsholing to Thimphu — Capital in Style', description: 'Drive to Thimphu (180 km, 6 hrs) in luxury AC vehicle.', locations: ['Phuentsholing', 'Thimphu'], activities: ['Luxury drive', 'Scenic journey'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu (premium hotel)', distance: '180 km', travelTime: '6 hrs' },
          { dayNumber: 3, title: 'Thimphu Sightseeing — VIP Access', description: 'VIP access to Thimphu\'s landmarks. Private meditation session.', locations: ['Thimphu'], activities: ['VIP sightseeing', 'Private meditation'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Thimphu (premium hotel)' },
          { dayNumber: 4, title: 'Thimphu to Paro — Tiger\'s Nest in Style', description: 'Drive to Paro (55 km, 1.5 hrs). Private guided Tiger\'s Nest hike with gourmet picnic.', locations: ['Paro', 'Taktsang Monastery'], activities: ['Private hike', 'Gourmet picnic'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro (premium hotel)', distance: '55 km', travelTime: '1.5 hrs' },
          { dayNumber: 5, title: 'Paro Sightseeing — Heritage & Culture', description: 'VIP tour of Paro Dzong, National Museum. Luxury hot stone bath. Private farmhouse dinner.', locations: ['Paro Dzong', 'National Museum'], activities: ['VIP sightseeing', 'Luxury spa', 'Private dinner'], meals: { breakfast: true, lunch: true, dinner: true }, overnightAt: 'Paro (premium hotel)' },
          { dayNumber: 6, title: 'Luxury Departure', description: 'VIP departure with concierge service.', locations: ['Paro'], activities: ['VIP departure'], meals: { breakfast: true, lunch: false, dinner: false } },
        ],
        accommodation: [
          { location: 'Phuentsholing', hotelName: '4-star Hotel', category: '4-star', roomType: 'Deluxe Room', nights: 1 },
          { location: 'Thimphu', hotelName: '5-star Hotel', category: '5-star', roomType: 'Premium Room', nights: 2 },
          { location: 'Paro', hotelName: '5-star Hotel', category: '5-star', roomType: 'Deluxe Suite', nights: 2 },
        ],
        faq: [
          { question: 'Can the luxury experiences be customized?', answer: 'Absolutely! We can tailor every aspect to match your preferences.' },
          { question: 'Is the private meditation session included?', answer: 'Yes, a private meditation session with a Buddhist monk is included on Day 3.' },
        ],
        seo: { metaTitle: 'Royal Bhutan 5N/6D - Luxury Tour Package', metaDescription: 'Luxury Bhutan tour with 5-star accommodation, private guide, and exclusive experiences.', keywords: ['Bhutan luxury tour', 'Royal Bhutan', 'premium Bhutan experience'] },
        optionalActivities: ['Helicopter tour', 'Private archery lesson', 'Photography session', 'Spa extensions'],
        pricing: { startingFrom: 0, currency: 'INR', priceType: 'on_request', showPrice: false },
        status: 'active',
        featured: true,
      },
    ];

    const transformPackage = (pkg) => ({
      ...pkg,
      inclusions: (pkg.inclusions || []).map(i => typeof i === 'string' ? i : i.text),
      exclusions: (pkg.exclusions || []).map(e => typeof e === 'string' ? e : e.text),
      faq: pkg.faq || pkg.faqs || [],
    });

    const packages = await Package.insertMany(rawPackages.map(transformPackage));

    const pkgMap = {};
    packages.forEach(p => { pkgMap[p.title] = p._id; });

    console.log('Seeding blog posts...');
    await BlogPost.insertMany([
      {
        title: 'Ultimate Guide to Tiger\'s Nest Monastery Trek',
        slug: 'ultimate-guide-tigers-nest-trek',
        metaTitle: 'Tiger\'s Nest Trek Guide - Bhutan Travel Agency',
        metaDescription: 'Everything you need to know about hiking to Tiger\'s Nest Monastery in Bhutan. Trail details, tips, and what to expect.',
        excerpt: 'The Tiger\'s Nest Monastery is Bhutan\'s most iconic landmark. Here is your complete guide to planning this unforgettable hike.',
        content: '<h2>The Legend of Tiger\'s Nest</h2><p>Taktsang Palphug Monastery, more commonly known as Tiger\'s Nest, clings precariously to a cliff face 900 meters above the Paro Valley floor. According to legend, Guru Rinpoche flew to this location on the back of a tigress in the 8th century and meditated in a cave here for three years, three months, three weeks, three days, and three hours. The monastery was later built around the cave in 1692.</p><h2>Planning Your Hike</h2><p>The hike to Tiger\'s Nest typically takes 2-3 hours to climb and 1.5-2 hours to descend. The trail starts at an altitude of 2,600 meters and climbs to 3,120 meters. The path is well-maintained with stone steps and rest stops along the way. A cafeteria halfway up offers refreshments and stunning views of the monastery.</p><h2>Best Time to Visit</h2><p>The best months for the Tiger\'s Nest trek are March to May and September to November. These months offer clear skies and comfortable temperatures. The morning hours are ideal as the afternoon can bring clouds that obscure the views.</p><h2>What to Bring</h2><p>Wear comfortable walking shoes with good grip. Bring sunscreen, a hat, sunglasses, and plenty of water. A light jacket is recommended as it can be cooler at the top. Photography is allowed outside the monastery but not inside the prayer halls.</p><h2>Tips for the Trek</h2><p>Start early in the morning to avoid crowds and heat. Take your time and rest at the cafeteria halfway. Hire a local guide for a richer experience with cultural insights. Respect the monastery rules and dress modestly.</p>',
        author: 'Bhutan Travel Team',
        category: 'Travel Guide',
        tags: ['Tiger\'s Nest', 'Trekking', 'Paro', 'Monastery', 'Bhutan landmarks'],
        published: true,
        publishedAt: new Date('2024-01-15'),
        relatedPackages: [pkgMap['Bhutan Highlights'], pkgMap['Bhutan Classic']]
      },
      {
        title: 'Best Time to Visit Bhutan: Month-by-Month Guide',
        slug: 'best-time-to-visit-bhutan',
        metaTitle: 'Best Time to Visit Bhutan - Seasonal Travel Guide',
        metaDescription: 'Discover the best time to visit Bhutan with our month-by-month guide covering weather, festivals, and activities.',
        excerpt: 'Bhutan offers unique experiences in every season. Learn when to plan your trip based on weather, festivals, and interests.',
        content: '<h2>Spring (March to May)</h2><p>Spring is one of the most beautiful times to visit Bhutan. The valleys come alive with blooming rhododendrons, and the weather is warm and pleasant. Temperatures range from 10°C to 20°C. This is an excellent time for trekking and outdoor activities. The Paro Tshechu festival usually falls in March or April, offering a spectacular cultural experience.</p><h2>Summer (June to August)</h2><p>Summer brings the monsoon season with heavy rainfall, especially in the southern regions. While the lush green landscapes are stunning, outdoor activities can be limited. This is the least popular tourist season, which means fewer crowds and potentially lower prices. Central and eastern Bhutan are relatively drier during this period.</p><h2>Autumn (September to November)</h2><p>Autumn is the peak tourist season in Bhutan, and for good reason. The weather is clear and dry with stunning mountain views. Temperatures are comfortable, ranging from 10°C to 18°C. The Thimphu Tshechu and Punakha Drubchen are major festivals during this time. This is the best season for trekking and photography.</p><h2>Winter (December to February)</h2><p>Winter brings cold weather with temperatures dropping below freezing at night. However, the days are usually clear and sunny. This is a great time for budget travelers as prices are lower. The Punakha Tshechu, held in February or March, is a highlight of the winter season. Southern Bhutan remains warmer during winter.</p>',
        author: 'Bhutan Travel Team',
        category: 'Travel Tips',
        tags: ['weather', 'seasons', 'festivals', 'planning', 'Bhutan travel'],
        published: true,
        publishedAt: new Date('2024-02-10'),
        relatedPackages: []
      },
      {
        title: 'Complete Guide to Bhutan Visa and Entry Requirements',
        slug: 'bhutan-visa-entry-requirements',
        metaTitle: 'Bhutan Visa Guide 2024 - Entry Requirements & Process',
        metaDescription: 'Step-by-step guide to obtaining a Bhutan visa, entry requirements, and Sustainable Development Fee information.',
        excerpt: 'Planning a trip to Bhutan? Everything you need to know about visas, entry permits, and the Sustainable Development Fee.',
        content: '<h2>Visa Requirements</h2><p>All international tourists (except citizens of India, Bangladesh, and the Maldives) must obtain a visa to enter Bhutan. The visa process is handled online through licensed Bhutanese tour operators or their international partners. Tourists cannot apply for visas independently.</p><h2>The Visa Process</h2><p>Contact a licensed Bhutanese tour operator who will process your visa application. You need to provide a clear passport scan, travel dates, and confirmed flight details. The visa approval usually takes 5-7 working days. Once approved, you receive a visa clearance letter that you present at the airport.</p><h2>Sustainable Development Fee (SDF)</h2><p>As of 2023, all international tourists must pay a Sustainable Development Fee of $100 per night. This fee is included in most tour packages. The SDF contributes to Bhutan\'s free healthcare, education, environmental conservation, and poverty alleviation programs.</p><h2>Indian Nationals</h2><p>Indian citizens do not need a visa but must carry a valid passport or voter ID card. They are required to obtain an entry permit at the border or airport. Indian nationals are exempt from the SDF payment.</p><h2>Entry Points</h2><p>The main entry points to Bhutan are Paro International Airport (the only international airport) and three land border crossings at Phuentsholing, Gelephu, and Samdrup Jongkhar. Most tourists arrive by air through Paro.</p>',
        author: 'Bhutan Travel Team',
        category: 'Travel Tips',
        tags: ['visa', 'SDF', 'entry requirements', 'travel documents', 'Bhutan travel'],
        published: true,
        publishedAt: new Date('2024-02-25'),
        relatedPackages: []
      },
      {
        title: 'Top 10 Must-Visit Temples and Monasteries in Bhutan',
        slug: 'top-10-temples-monasteries-bhutan',
        metaTitle: 'Top 10 Temples & Monasteries in Bhutan - Sacred Sites',
        metaDescription: 'Discover the most sacred and beautiful temples and monasteries in Bhutan. A spiritual journey through the Land of Thunder Dragon.',
        excerpt: 'Bhutan is home to some of the most spectacular Buddhist temples and monasteries in the world. Here are the top 10 you must visit.',
        content: '<h2>1. Taktsang (Tiger\'s Nest) Monastery, Paro</h2><p>The most iconic monastery in Bhutan, clinging to a cliff 900 meters above the Paro Valley. Built in 1692 around a cave where Guru Rinpoche meditated.</p><h2>2. Tashichho Dzong, Thimphu</h2><p>The seat of Bhutan\'s government and the summer residence of the central monastic body. This massive fortress-monastery is a stunning example of Bhutanese architecture.</p><h2>3. Punakha Dzong</h2><p>Called the Palace of Great Happiness, this dzong sits at the confluence of the Pho Chhu and Mo Chhu rivers. It is the second oldest and second largest dzong in Bhutan.</p><h2>4. Kurjey Lhakhang, Bumthang</h2><p>A complex of three temples marking the body print of Guru Rinpoche on a rock. This is one of the most sacred pilgrimage sites in Bhutan.</p><h2>5. Jambay Lhakhang, Bumthang</h2><p>One of the 108 temples built by the Tibetan King Songtsen Gampo in the 7th century. It hosts the famous Jambay Lhakhang Drup festival.</p><h2>6. Chimi Lhakhang, Punakha</h2><p>The Temple of Fertility, dedicated to the Divine Madman Drukpa Kunley. Couples seeking fertility blessings flock to this temple.</p><h2>7. Kyichu Lhakhang, Paro</h2><p>One of the oldest temples in Bhutan, dating back to the 7th century. It houses a sacred orange tree that bears fruit year-round.</p><h2>8. Gangtey Monastery, Phobjikha</h2><p>A stunning 17th-century monastery overlooking the beautiful Phobjikha Valley, famous for wintering black-necked cranes.</p><h2>9. Bumthang Brewery & Swiss Farm</h2><p>While not a temple, this unique attraction combines Bhutanese and Swiss cultures, producing Bhutan\'s popular Red Panda beer and authentic Swiss cheese.</p><h2>10. National Memorial Chorten, Thimphu</h2><p>A prominent landmark in Thimphu, this chorten was built in memory of the Third King and is a center of daily worship for locals.</p>',
        author: 'Bhutan Travel Team',
        category: 'Destinations',
        tags: ['temples', 'monasteries', 'sacred sites', 'cultural heritage', 'Bhutan'],
        published: true,
        publishedAt: new Date('2024-03-05'),
        relatedPackages: [pkgMap['Bhutan Grand Explorer']]
      },
      {
        title: 'Bhutanese Cuisine: A Food Lover\'s Guide',
        slug: 'bhutanese-cuisine-food-guide',
        metaTitle: 'Bhutanese Food Guide - Traditional Cuisine & Where to Eat',
        metaDescription: 'Explore the flavors of Bhutan. From fiery ema datshi to red rice, discover traditional Bhutanese cuisine.',
        excerpt: 'Bhutanese food is a delightful blend of flavors, with chili peppers playing a starring role. Here is what to eat in Bhutan.',
        content: '<h2>The Heart of Bhutanese Cuisine</h2><p>Bhutanese cuisine is characterized by the generous use of chili peppers, which are treated as a vegetable rather than a spice. The national dish, ema datshi, is a simple yet delicious combination of chili peppers cooked in a cheese sauce. Rice, particularly red rice, is the staple food served with most meals.</p><h2>Must-Try Dishes</h2><p>Ema datshi (chili and cheese) is the most iconic Bhutanese dish. Variations include kewa datshi (potato and cheese) and shamu datshi (mushroom and cheese). Jasha maru is a spicy chicken dish, while phaksha paa features pork with red chili. Momos (dumplings) are popular throughout the country.</p><h2>Where to Eat</h2><p>In Thimphu, Babesa Village Restaurant and The Zone offer authentic Bhutanese cuisine. In Paro, Damchoe\'s is popular with both locals and tourists. Most hotels also serve excellent Bhutanese food. Do not miss the experience of eating at a local farmhouse.</p><h2>Food Etiquette</h2><p>Bhutanese meals are traditionally eaten with the right hand. It is polite to try a little of everything offered. When visiting a Bhutanese home, your host will serve you food and it is customary to accept at least a small portion.</p><h2>Drinks</h2><p>Butter tea (suja) is the traditional drink, made with tea, butter, and salt. Ara is a traditional alcoholic beverage distilled from rice or maize. Bhutan also produces excellent red and white wines from the valleys of Bumthang.</p>',
        author: 'Bhutan Travel Team',
        category: 'Culture',
        tags: ['food', 'cuisine', 'restaurants', 'Bhutanese culture', 'dining'],
        published: true,
        publishedAt: new Date('2024-03-20'),
        relatedPackages: []
      },
      {
        title: 'Bhutan Festivals: A Guide to Tshechus and Celebrations',
        slug: 'bhutan-festivals-tshechus-guide',
        metaTitle: 'Bhutan Festivals Guide - Tshechus & Cultural Celebrations',
        metaDescription: 'Plan your trip around Bhutan\'s vibrant festivals. Complete guide to tshechus, dates, and what to expect.',
        excerpt: 'Bhutan\'s festivals are vibrant celebrations of culture and religion. Plan your trip to coincide with these spectacular events.',
        content: '<h2>What is a Tshechu?</h2><p>Tshechus are annual religious festivals held in dzongs and monasteries throughout Bhutan. They are held on the 10th day of a month in the lunar calendar, honoring Guru Rinpoche. The festivals feature elaborate mask dances, music, and cultural performances that depict stories from Buddhist mythology.</p><h2>Major Tshechus</h2><p>The Paro Tshechu (March/April) and Thimphu Tshechu (September/October) are the largest and most popular. The Punakha Drubchen (February/March) reenacts a historic battle. The Jambay Lhakhang Drup in Bumthang features the unique fire dance (Mewang) and naked dance (Tercham).</p><h2>What to Expect</h2><p>Festivals begin early morning with monks performing sacred rituals in the dzong courtyard. Throughout the day, masked dancers perform elaborate dances representing different deities and Buddhist teachings. The atmosphere is festive with locals in their finest traditional attire. The festivals end with the unveiling of a giant thangka painting (thongdrol).</p><h2>Tips for Festival Visits</h2><p>Arrive early to get a good viewing spot. Wear modest clothing covering shoulders and knees. Ask permission before photographing performers. Stay for the full day to experience the complete festival. Book accommodations well in advance as festivals attract many visitors.</p>',
        author: 'Bhutan Travel Team',
        category: 'Culture',
        tags: ['festivals', 'tshechus', 'mask dances', 'cultural events', 'Bhutan'],
        published: true,
        publishedAt: new Date('2024-04-01'),
        relatedPackages: [pkgMap['Bhutan Highlights']]
      },
      {
        title: 'Trekking in Bhutan: Best Trails and Routes',
        slug: 'trekking-bhutan-best-trails',
        metaTitle: 'Bhutan Trekking Guide - Best Hiking Trails & Routes',
        metaDescription: 'Discover the best trekking routes in Bhutan. From easy day hikes to challenging multi-day treks through the Himalayas.',
        excerpt: 'Bhutan offers incredible trekking opportunities from gentle valley walks to challenging high-altitude adventures.',
        content: '<h2>Why Trek in Bhutan?</h2><p>Bhutan is one of the world\'s last great trekking frontiers. With pristine forests, alpine meadows, and dramatic mountain landscapes, the country offers everything from gentle day hikes to challenging multi-day expeditions. All trekking in Bhutan must be arranged through a licensed tour operator.</p><h2>Popular Treks</h2><p>The Druk Path Trek (6 days) between Paro and Thimphu is the most popular, passing through beautiful lakes and forests. The Jomolhari Trek (7 days) offers stunning views of the 7,326m Jomolhari peak. The Snowman Trek (25 days) is one of the most challenging treks in the world, crossing several high passes above 5,000m.</p><h2>Easier Options</h2><p>For those seeking less strenuous options, the Bumthang Cultural Trek (3 days) passes through villages and temples. Day hikes to Tiger\'s Nest in Paro and Khamsum Chorten in Punakha are accessible to most fitness levels. The Phobjikha Valley nature walks are perfect for bird watching.</p><h2>Best Time for Trekking</h2><p>The best trekking seasons are spring (March-May) and autumn (September-November). Spring brings blooming rhododendrons, while autumn offers clear mountain views. Winter treks are possible at lower elevations but can be very cold. Monsoon season (June-August) is not recommended due to leeches and limited visibility.</p><h2>What to Pack</h2><p>Layered clothing is essential for Bhutan\'s variable weather. Bring good quality trekking boots, a down jacket, rain gear, sun protection, and a sleeping bag for multi-day treks. Your tour operator will provide detailed packing lists.</p>',
        author: 'Bhutan Travel Team',
        category: 'Adventure',
        tags: ['trekking', 'hiking', 'adventure', 'Druk Path', 'Jomolhari'],
        published: true,
        publishedAt: new Date('2024-04-15'),
        relatedPackages: [pkgMap['Bhutan Grand Explorer']]
      },
      {
        title: 'Photography Tips for Capturing Bhutan',
        slug: 'photography-tips-bhutan',
        metaTitle: 'Bhutan Photography Guide - Tips for Stunning Photos',
        metaDescription: 'Master the art of photographing Bhutan. Best locations, techniques, and tips for capturing this beautiful country.',
        excerpt: 'Bhutan is a photographer\'s paradise. Learn how to capture the best shots of this stunning Himalayan kingdom.',
        content: '<h2>Best Locations for Photography</h2><p>Tiger\'s Nest Monastery offers the most iconic shot in Bhutan, best photographed in morning light. Punakha Dzong at sunset with the river reflections is magical. Dochula Pass provides panoramic Himalayan views. The Phobjikha Valley is perfect for landscape and wildlife photography.</p><h2>Portrait Photography</h2><p>Bhutanese people are generally friendly and willing to be photographed. Always ask permission first, especially for close-up portraits. Markets, festivals, and festivals are excellent opportunities for candid shots of people in traditional dress.</p><h2>Golden Hours</h2><p>Early morning and late afternoon provide the best light for landscape photography. The clear mountain air in autumn creates stunning golden-hour conditions. Midnight photography of star-filled skies is possible at higher elevations.</p><h2>Festival Photography</h2><p>Festivals offer incredible opportunities but require sensitivity. Use a telephoto lens for masked dancers. Be mindful of sacred ceremonies where photography may be restricted. Capture the colorful traditional costumes and the festive atmosphere.</p><h2>Technical Tips</h2><p>Bring a wide-angle lens for landscapes and architecture. A telephoto lens is essential for wildlife and distant subjects. UV filters protect against dust and enhance colors at high altitude. Carry extra batteries as cold weather drains them quickly.',
        author: 'Bhutan Travel Team',
        category: 'Travel Tips',
        tags: ['photography', 'camera tips', 'landscapes', 'cultural photography'],
        published: true,
        publishedAt: new Date('2024-05-01'),
        relatedPackages: []
      },
      {
        title: 'Bhutan for Budget Travelers: How to Save Money',
        slug: 'bhutan-budget-travel-guide',
        metaTitle: 'Bhutan on a Budget - Money-Saving Tips for Travelers',
        metaDescription: 'Explore Bhutan without breaking the bank. Budget tips, affordable packages, and money-saving strategies.',
        excerpt: 'Bhutan can be expensive, but with smart planning, you can experience this magical kingdom on a budget.',
        content: '<h2>Understanding Bhutan\'s Pricing</h2><p>Bhutan operates on a policy of High Value, Low Volume tourism. The Sustainable Development Fee (SDF) of $100 per night applies to all international tourists. This fee contributes to Bhutan\'s free healthcare, education, and environmental programs.</p><h2>Best Ways to Save</h2><p>Travel during the low season (June-August) when tour operators may offer discounts. Join group tours to share costs. Choose budget hotels instead of luxury resorts. Opt for shorter itineraries focusing on fewer destinations. Book well in advance for better rates.</p><h2>Budget-Friendly Destinations</h2><p>Phuentsholing, Bhutan\'s border town, offers lower accommodation costs. Day trips to border towns from India are possible without the full SDF. Eastern Bhutan is less touristy and can be more affordable.</p><h2>Food and Transport</h2><p>Eat at local restaurants instead of hotel dining. Shared taxis are cheaper than private vehicles. Domestic flights between cities are more expensive but save time compared to long drives.</p><h2>The Reality</h2><p>While Bhutan is not a budget destination by Southeast Asian standards, the SDF ensures a high-quality, uncrowded experience. The investment contributes directly to preserving Bhutan\'s culture and environment, making your visit meaningful.</p>',
        author: 'Bhutan Travel Team',
        category: 'Travel Tips',
        tags: ['budget travel', 'money saving', 'affordable Bhutan', 'travel tips'],
        published: true,
        publishedAt: new Date('2024-05-15'),
        relatedPackages: [pkgMap['Bhutan Classic']]
      },
      {
        title: 'Sustainable Tourism in Bhutan: How Your Visit Makes a Difference',
        slug: 'sustainable-tourism-bhutan',
        metaTitle: 'Sustainable Tourism in Bhutan - Responsible Travel Guide',
        metaDescription: 'Learn how Bhutan\'s sustainable tourism model protects its culture and environment. Responsible travel tips for visitors.',
        excerpt: 'Bhutan leads the world in sustainable tourism. Discover how your visit contributes to preserving this unique kingdom.',
        content: '<h2>Bhutan\'s Tourism Philosophy</h2><p>Bhutan is the world\'s only carbon-negative country, absorbing more carbon dioxide than it produces. The nation has chosen to prioritize Gross National Happiness over GDP, and its tourism policy reflects this philosophy. The Sustainable Development Fee ensures that tourism benefits all Bhutanese citizens.</p><h2>Where Your Money Goes</h2><p>The SDF directly funds free healthcare, free education, environmental conservation, and poverty alleviation programs. Tourism revenue also supports local employment, cultural preservation, and infrastructure development in rural communities.</p><h2>Environmental Conservation</h2><p>Bhutan has committed to maintaining at least 60% forest cover for all time. Currently, over 70% of the country is forested. Plastic bags have been banned since 1999, and the country is working toward becoming the world\'s first 100% organic nation.</p><h2>How to Be a Responsible Tourist</h2><p>Respect local customs and dress modestly. Support local businesses and buy handicrafts directly from artisans. Minimize plastic waste and carry a reusable water bottle. Stay on designated trails during treks. Ask permission before photographing people or religious sites.</p><h2>The Future of Bhutan Tourism</h2><p>Bhutan continues to refine its tourism policies to balance economic benefits with cultural and environmental protection. Visitors play a crucial role in this model by respecting guidelines and contributing through the SDF.</p>',
        author: 'Bhutan Travel Team',
        category: 'Culture',
        tags: ['sustainability', 'responsible travel', 'environment', 'carbon negative', 'Bhutan'],
        published: true,
        publishedAt: new Date('2024-06-01'),
        relatedPackages: []
      }
    ]);

    console.log('Seeding reviews...');
    await Review.insertMany([
      {
        customerName: 'Priya Sharma',
        city: 'Mumbai',
        rating: 5,
        review: 'Our Bhutan trip was absolutely magical! The Tiger\'s Nest hike was the highlight. Our guide was knowledgeable and friendly. The hotels were comfortable and the food was delicious. Will definitely come back!',
        travelDate: new Date('2024-03-15'),
        package: pkgMap['Bhutan Highlights'],
        verified: true,
        approved: true
      },
      {
        customerName: 'Rajesh Gupta',
        city: 'Delhi',
        rating: 5,
        review: 'We visited Bhutan for our honeymoon and it was the best decision ever. The romantic dinner in Punakha with the dzong illuminated at night was unforgettable. The couples\' hot stone bath was so relaxing. Highly recommend this agency!',
        travelDate: new Date('2024-02-10'),
        package: pkgMap['Royal Bhutan'],
        verified: true,
        approved: true
      },
      {
        customerName: 'Anita Desai',
        city: 'Bangalore',
        rating: 4,
        review: 'Great family trip to Bhutan. Our kids loved the archery session and the farmhouse visit. The only suggestion would be to include more kid-friendly activities. Otherwise, a wonderful experience.',
        travelDate: new Date('2024-04-20'),
        package: pkgMap['Bhutan Family Escape'],
        verified: true,
        approved: true
      },
      {
        customerName: 'Suresh Patel',
        city: 'Ahmedabad',
        rating: 5,
        review: 'The group tour was amazing value for money. Made so many friends from different cities. The guide was excellent and the itinerary was well-planned. Bhutan is truly a hidden gem.',
        travelDate: new Date('2024-05-05'),
        package: pkgMap['Bhutan Classic'],
        verified: true,
        approved: true
      },
      {
        customerName: 'Meera Iyer',
        city: 'Chennai',
        rating: 5,
        review: 'Bhutan exceeded all expectations. The pristine beauty, the warm people, the ancient monasteries - everything was perfect. The 8-day package covering Bumthang was worth every penny. A life-changing experience!',
        travelDate: new Date('2024-04-01'),
        package: pkgMap['Bhutan Extended Journey'],
        verified: true,
        approved: true
      }
    ]);

    console.log('Seeding site settings...');
    await SiteSettings.create({
      companyName: 'Happy Kingdom Travels',
      phone: '+91 7365004536',
      whatsapp: '917365004536',
      email: 'happykingdomtravel@gmail.com',
      address: 'Chota Mechiya Busty, Jaigaon, Alipurduar, West Bengal 736182',
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: ''
      },
      analytics: {
        ga4Id: '',
        gtmId: ''
      },
      seo: {
        defaultTitle: 'Bhutan Travel Agency - Your Gateway to the Last Shangri-La',
        defaultDescription: 'Explore Bhutan with curated travel packages. Discover ancient monasteries, pristine valleys, and vibrant culture.'
      }
    });

    console.log('Seeding FAQs...');
    await FAQ.insertMany([
      {
        question: 'Do I need a visa to visit Bhutan?',
        answer: 'Yes, all international tourists except citizens of India, Bangladesh, and the Maldives need a visa. The visa is processed online through a licensed Bhutanese tour operator.',
        category: 'visa',
        order: 1,
        published: true
      },
      {
        question: 'What is the Sustainable Development Fee (SDF)?',
        answer: 'The SDF is $100 per night for all international tourists. It contributes to Bhutan\'s free healthcare, education, environmental conservation, and poverty alleviation programs.',
        category: 'visa',
        order: 2,
        published: true
      },
      {
        question: 'When is the best time to visit Bhutan?',
        answer: 'The best months are March to May (spring) and September to November (autumn). Spring brings blooming rhododendrons, while autumn offers clear mountain views.',
        category: 'planning',
        order: 3,
        published: true
      },
      {
        question: 'How do I get to Bhutan?',
        answer: 'Bhutan has one international airport at Paro, with flights from Delhi, Kolkata, Kathmandu, Bangkok, and Singapore. Overland entry is possible through Phuentsholing from India.',
        category: 'planning',
        order: 4,
        published: true
      },
      {
        question: 'What should I pack for a Bhutan trip?',
        answer: 'Pack layered clothing for variable weather, comfortable walking shoes, sunscreen, hat, sunglasses, and a light jacket. For treks, bring proper hiking boots and a sleeping bag.',
        category: 'planning',
        order: 5,
        published: true
      },
      {
        question: 'Is Bhutan expensive?',
        answer: 'Bhutan operates a High Value, Low Volume tourism policy. The SDF ensures a high-quality, uncrowded experience. Budget options are available through group tours and budget accommodations.',
        category: 'general',
        order: 6,
        published: true
      },
      {
        question: 'What is the currency in Bhutan?',
        answer: 'The Bhutanese Ngultrum (BTN) is the local currency, pegged to the Indian Rupee. Indian Rupees are widely accepted. Credit cards are accepted in major hotels and shops.',
        category: 'general',
        order: 7,
        published: true
      },
      {
        question: 'Is Bhutan safe for tourists?',
        answer: 'Bhutan is one of the safest countries in the world for tourists. Crime is extremely rare and the locals are known for their warmth and hospitality.',
        category: 'general',
        order: 8,
        published: true
      },
      {
        question: 'Can I trek in Bhutan?',
        answer: 'Yes, Bhutan offers excellent trekking from easy day hikes to multi-day expeditions. The Druk Path Trek and Jomolhari Trek are among the most popular routes.',
        category: 'activities',
        order: 9,
        published: true
      },
      {
        question: 'What food is available in Bhutan?',
        answer: 'Bhutanese cuisine features ema datshi (chili and cheese), red rice, and momos. Most hotels offer both local and international cuisine. Vegetarian options are widely available.',
        category: 'general',
        order: 10,
        published: true
      }
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
