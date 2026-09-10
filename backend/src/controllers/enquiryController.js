import Enquiry from '../models/Enquiry.js';
import { getPagination } from '../utils/helpers.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createEnquiry = async (req, res, next) => {
  try {
    const {
      fullName, phone, email, travelFrom, travelDate, adults, children,
      preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements,
      ipAddress: clientIP, userAgent: clientUA, browser: clientBrowser, os: clientOS,
      device: clientDevice, location: clientLocation, referrer: clientReferrer,
      language: clientLanguage,
    } = req.body;

    const ipAddress = clientIP || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';
    const userAgent = clientUA || req.headers['user-agent'] || '';
    const referrer = clientReferrer || req.headers['referer'] || '';
    const language = clientLanguage || req.headers['accept-language'] || '';

    const browser = clientBrowser || null;
    const os = clientOS || null;
    const device = clientDevice || null;
    const location = clientLocation || null;

    console.log('Creating enquiry for:', fullName, email);
    const doc = new Enquiry({
      fullName, phone, email, travelFrom, travelDate, adults, children,
      preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements,
      ipAddress, userAgent, referrer, language, browser, os, device, location,
    });
    const enquiry = await doc.save({ maxTimeMS: 10000 });
    console.log('Enquiry saved:', enquiry._id);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon.',
      data: enquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error.message);
    next(error);
  }
};

export const updateEnquiryGeo = async (req, res, next) => {
  try {
    const { id, ipAddress, location } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Enquiry ID required' });

    const update = {};
    if (ipAddress) update.ipAddress = ipAddress;
    if (location) update.location = location;

    const enquiry = await Enquiry.findByIdAndUpdate(id, update, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

export const getAllEnquiries = async (req, res, next) => {
  try {
    const { page, limit, status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;

    let query = Enquiry.find(filter).populate('preferredPackage', 'title slug');

    if (search) {
      const safeSearch = escapeRegex(search);
      query = Enquiry.find({
        ...filter,
        $or: [
          { fullName: { $regex: safeSearch, $options: 'i' } },
          { email: { $regex: safeSearch, $options: 'i' } },
          { phone: { $regex: safeSearch, $options: 'i' } }
        ]
      }).populate('preferredPackage', 'title slug');
    }

    const total = await Enquiry.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const enquiries = await query
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        total: pagination.total,
        perPage: pagination.perPage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('preferredPackage', 'title slug duration startingPrice');

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
