import Enquiry from '../models/Enquiry.js';
import { getPagination } from '../utils/helpers.js';
import { sendEnquiryNotification } from '../services/emailService.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createEnquiry = async (req, res, next) => {
  try {
    const { fullName, phone, email, travelFrom, travelDate, adults, children, preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements } = req.body;
    const enquiry = await Enquiry.create({
      fullName, phone, email, travelFrom, travelDate, adults, children,
      preferredDuration, travelStyle, preferredPackage, message, source, specialRequirements
    });
    console.log('Enquiry saved:', enquiry._id);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you soon.',
      data: enquiry
    });

    sendEnquiryNotification(enquiry)
      .then((result) => console.log('Email result:', result))
      .catch((err) => console.error('Email notification failed for enquiry:', enquiry._id, err));
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
