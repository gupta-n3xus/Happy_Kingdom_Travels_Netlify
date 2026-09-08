import FAQ from '../models/FAQ.js';
import { getPagination } from '../utils/helpers.js';

export const getAllFaqs = async (req, res, next) => {
  try {
    const { page, limit, category } = req.query;
    const filter = { published: true };

    if (category) filter.category = category;

    const total = await FAQ.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const faqs = await FAQ.find(filter)
      .sort({ order: 1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: faqs,
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

export const createFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    next(error);
  }
};
