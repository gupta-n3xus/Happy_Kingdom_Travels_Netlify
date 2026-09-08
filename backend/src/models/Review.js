import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: 100
    },
    city: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: 1000
    },
    travelDate: {
      type: Date
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    },
    image: String,
    verified: {
      type: Boolean,
      default: false
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

reviewSchema.index({ approved: 1, rating: -1 });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
