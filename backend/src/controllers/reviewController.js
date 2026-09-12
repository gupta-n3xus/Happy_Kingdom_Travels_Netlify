import Review from '../models/Review.js';
import { getPagination } from '../utils/helpers.js';
import { log } from '../utils/activityHelper.js';

export const getApprovedReviews = async (req, res, next) => {
  try {
    const { page, limit, rating, package: packageId } = req.query;
    const filter = { approved: true };

    if (rating) filter.rating = Number(rating);
    if (packageId) filter.package = packageId;

    const total = await Review.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const reviews = await Review.find(filter)
      .populate('package', 'title slug')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: reviews,
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

export const getAllReviews = async (req, res, next) => {
  try {
    const { page, limit, approved, rating } = req.query;
    const filter = {};

    if (approved !== undefined) filter.approved = approved === 'true';
    if (rating) filter.rating = Number(rating);

    const total = await Review.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const reviews = await Review.find(filter)
      .populate('package', 'title slug')
      .sort({ createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: reviews,
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

export const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Review submitted. It will appear after approval.',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    log(req, 'delete', 'review', req.params.id, review.fullName, `Deleted review by "${review.fullName}"`);
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    log(req, 'approve', 'review', req.params.id, review.fullName, `Approved review by "${review.fullName}"`);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};
