import SiteSettings from '../models/SiteSettings.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.getInstance();

    // Migration: if old 'phone' field exists but 'contact' doesn't, migrate it
    if (settings.phone && (!settings.contact || !settings.contact.mobile1)) {
      settings = await SiteSettings.findByIdAndUpdate(
        settings._id,
        {
          $set: {
            'contact.mobile1': settings.phone,
            'contact.mobile2': '',
            'contact.whatsapp': settings.whatsapp || '917365004536'
          }
        },
        { new: true }
      );
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const body = { ...req.body };

    // Migration: if old 'phone' is sent without 'contact', map it
    if (body.phone && !body.contact) {
      body.contact = {
        mobile1: body.phone,
        mobile2: '',
        whatsapp: body.whatsapp || '917365004536'
      };
    }

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, body, {
        new: true,
        runValidators: true
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
