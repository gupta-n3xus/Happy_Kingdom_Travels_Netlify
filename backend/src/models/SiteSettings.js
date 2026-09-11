import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Bhutan Travel Agency'
    },
    phone: {
      type: String,
      default: '+91 7365004536'
    },
    whatsapp: {
      type: String,
      default: '917365004536'
    },
    email: {
      type: String,
      default: 'happykingdomtravel@gmail.com'
    },
    address: {
      type: String,
      default: 'Chota Mechiya Busty, Jaigaon, Alipurduar, West Bengal 736182'
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' }
    },
    analytics: {
      ga4Id: { type: String, default: '' },
      gtmId: { type: String, default: '' }
    },
    seo: {
      defaultTitle: { type: String, default: 'Bhutan Travel Agency - Your Gateway to the Last Shangri-La' },
      defaultDescription: { type: String, default: 'Explore Bhutan with curated travel packages. Discover ancient monasteries, pristine valleys, and vibrant culture.' }
    },
    heroImage: { type: String, default: '' }
  },
  { timestamps: true }
);

siteSettingsSchema.statics.getInstance = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
