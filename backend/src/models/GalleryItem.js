import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    text: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

const galleryItemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    touristName: {
      type: String,
      required: [true, 'Tourist name is required'],
      trim: true,
      maxlength: 100
    },
    touristCity: {
      type: String,
      trim: true,
      maxlength: 100
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    category: {
      type: String,
      enum: ['Paro', 'Thimphu', 'Punakha', 'Bumthang', 'Other'],
      default: 'Other'
    },
    order: {
      type: Number,
      default: 0
    },
    approved: {
      type: Boolean,
      default: true
    },
    comments: [commentSchema]
  },
  { timestamps: true }
);

galleryItemSchema.index({ approved: 1, category: 1, order: 1 });

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
