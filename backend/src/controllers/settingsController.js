import SiteSettings from '../models/SiteSettings.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.getInstance();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
