import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      index: true,
    },
    pageTitle: {
      type: String,
      default: '',
    },
    referrer: {
      type: String,
      default: '',
    },
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      default: '',
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown',
    },
    browser: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    event: {
      type: String,
      enum: ['pageview', 'whatsapp_click', 'quote_submit', 'enquiry_submit', 'phone_click', 'scroll_depth'],
      default: 'pageview',
    },
    eventData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: -1 });
pageViewSchema.index({ event: 1, createdAt: -1 });
pageViewSchema.index({ path: 1, createdAt: -1 });
pageViewSchema.index({ visitorId: 1, createdAt: -1 });

const PageView = mongoose.model('PageView', pageViewSchema);
export default PageView;
