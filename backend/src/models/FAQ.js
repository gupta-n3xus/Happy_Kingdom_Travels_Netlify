import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'Answer is required']
    },
    category: {
      type: String,
      default: 'general',
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

faqSchema.index({ category: 1, order: 1 });

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
