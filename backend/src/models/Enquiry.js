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
    }
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
