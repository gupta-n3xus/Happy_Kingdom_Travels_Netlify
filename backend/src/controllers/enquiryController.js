import Enquiry from '../models/Enquiry.js';
import { getPagination } from '../utils/helpers.js';
import { sendEnquiryNotification } from '../services/emailService.js';
import { getClientIP, parseUA, getGeoLocation } from '../utils/geo.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createEnquiry = async (req, res, next) => {
  try {
    const { fullName, phone, email, travelFrom, travelDate, adults, children, preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements } = req.body;

    const ipAddress = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || req.headers['referrer'] || '';
    const language = req.headers['accept-language'] || '';

    let browser = null, os = null, device = null;
    try {
      ({ browser, os, device } = parseUA(userAgent));
    } catch (e) {
      console.error('parseUA error:', e.message);
    }

    console.log('Enquiry data:', { ipAddress, browser, os, device, referrer, language });

    const enquiry = await Enquiry.create({
      fullName, phone, email, travelFrom, travelDate, adults, children,
      preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements,
      ipAddress, userAgent, referrer, language, browser, os, device
    });
    console.log('Enquiry saved:', enquiry._id);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon.',
      data: enquiry
    });

    sendEnquiryNotification(enquiry).catch((err) =>
      console.error('Email notification failed:', err.message)
    );

    getGeoLocation(ipAddress).then(async (geo) => {
      if (geo) {
        await Enquiry.findByIdAndUpdate(enquiry._id, { location: geo });
        console.log('Geo updated:', enquiry._id, geo.city, geo.country);
      }
    }).catch((err) => console.error('Geo lookup failed:', err.message));
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
