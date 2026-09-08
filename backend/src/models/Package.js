import mongoose from 'mongoose';

const itineraryDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  locations: [String],
  activities: [String],
  meals: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  overnightAt: String,
  distance: String,
  travelTime: String,
}, { _id: false });

const accommodationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  hotelName: { type: String, default: 'To be confirmed' },
  category: { type: String, default: '3-star' },
  nights: { type: Number, required: true },
  roomType: String,
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    destination: {
      type: String,
      default: 'Bhutan',
    },
    category: {
      type: String,
      enum: ['standard', 'honeymoon', 'family', 'group', 'adventure', 'luxury', 'budget'],
      default: 'standard',
    },
    duration: {
      nights: { type: Number, required: true },
      days: { type: Number, required: true },
    },
    route: [String],
    startingPoints: [String],
    shortDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
    },
    tripHighlights: [String],
    suitableFor: [String],
    travelStyle: {
      type: String,
      enum: ['budget', 'comfort', 'premium', 'luxury'],
      default: 'comfort',
    },
    images: [String],
    heroImage: String,
    itinerary: [itineraryDaySchema],
    accommodation: [accommodationSchema],
    inclusions: [String],
    exclusions: [String],
    optionalActivities: [String],
    faq: [faqSchema],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    pricing: {
      startingFrom: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
      priceType: { type: String, default: 'on_request' },
      showPrice: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive'],
      default: 'active',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

packageSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    const base = this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
    this.slug = base;
  }
  next();
});

packageSchema.index({ title: 'text', shortDescription: 'text', description: 'text' });
packageSchema.index({ category: 1, status: 1 });
packageSchema.index({ featured: 1 });

const Package = mongoose.model('Package', packageSchema);
export default Package;
