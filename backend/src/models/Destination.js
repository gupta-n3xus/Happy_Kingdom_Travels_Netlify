import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      maxlength: 300
    },
    image: String,
    gallery: [String],
    howToReach: String,
    bestTime: String,
    thingsToDo: [String],
    packages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    }],
    seo: {
      title: String,
      description: String,
      keywords: [String]
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

destinationSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
  next();
});

destinationSchema.index({ name: 'text', description: 'text' });
destinationSchema.index({ slug: 1 });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
