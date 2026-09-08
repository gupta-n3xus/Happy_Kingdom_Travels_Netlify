import Package from '../models/Package.js';
import Destination from '../models/Destination.js';
import BlogPost from '../models/BlogPost.js';
import Enquiry from '../models/Enquiry.js';
import Review from '../models/Review.js';
import FAQ from '../models/FAQ.js';
import SiteSettings from '../models/SiteSettings.js';
import User from '../models/User.js';
import PageView from '../models/PageView.js';

const collections = {
  packages: Package,
  destinations: Destination,
  blogPosts: BlogPost,
  enquiries: Enquiry,
  reviews: Review,
  faqs: FAQ,
  settings: SiteSettings,
};

const skipImport = ['users', 'pageViews'];

export const exportBackup = async (req, res, next) => {
  try {
    const backup = { version: 1, exportedAt: new Date().toISOString(), data: {} };

    const allCollections = { ...collections, users: User, pageViews: PageView };
    for (const [name, Model] of Object.entries(allCollections)) {
      if (name === 'users') {
        backup.data[name] = await Model.find({}).select('-password').lean();
      } else {
        backup.data[name] = await Model.find({}).lean();
      }
    }

    res.setHeader('Content-Disposition', `attachment; filename="backup-${new Date().toISOString().slice(0, 10)}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(backup);
  } catch (error) {
    next(error);
  }
};

export const importBackup = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid backup format' });
    }

    const results = {};

    for (const [name, Model] of Object.entries(collections)) {
      if (skipImport.includes(name)) continue;
      if (data[name] && Array.isArray(data[name])) {
        const count = data[name].length;
        if (count > 0) {
          await Model.deleteMany({});
          for (const doc of data[name]) {
            try {
              const { _id, __v, ...rest } = doc;
              await Model.create(rest);
            } catch (err) {
              console.error(`Failed to import ${name} doc:`, err.message);
            }
          }
        }
        results[name] = count;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Backup imported successfully',
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
