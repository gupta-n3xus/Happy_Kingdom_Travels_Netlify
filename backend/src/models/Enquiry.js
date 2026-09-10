import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    whatsappNumber: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    travelFrom: {
      type: String,
      trim: true
    },
    travelDate: {
      type: Date
    },
    returnDate: {
      type: Date
    },
    adults: {
      type: Number,
      default: 1,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    },
    preferredDuration: {
      type: String,
      trim: true
    },
    preferredPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    },
    packageType: {
      type: String,
      enum: ['standard', 'honeymoon', 'family', 'group', 'adventure', 'luxury', 'budget'],
      default: 'standard'
    },
    hotelPreference: {
      type: String,
      enum: ['budget', 'standard', 'deluxe', 'premium', 'luxury', 'any'],
      default: 'any'
    },
    budgetRange: {
      type: String,
      trim: true
    },
    travelStyle: {
      type: String,
      enum: ['budget', 'comfort', 'premium', 'luxury'],
      default: 'comfort'
    },
    interests: [String],
    specialRequirements: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quote_sent', 'negotiation', 'confirmed', 'cancelled', 'completed', 'lost'],
      default: 'new'
    },
    source: {
      type: String,
      default: 'website'
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    },
    browser: {
      name: { type: String, trim: true },
      version: { type: String, trim: true }
    },
    os: {
      name: { type: String, trim: true },
      version: { type: String, trim: true }
    },
    device: {
      type: String,
      trim: true,
    },
    location: {
      city: { type: String, trim: true },
      region: { type: String, trim: true },
      country: { type: String, trim: true },
      countryCode: { type: String, trim: true },
      lat: { type: Number },
      lng: { type: Number },
      timezone: { type: String, trim: true },
      isp: { type: String, trim: true }
    },
    referrer: {
      type: String,
      trim: true
    },
    language: {
      type: String,
      trim: true
    }
  },
  { timestamps: true, autoIndex: false }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
