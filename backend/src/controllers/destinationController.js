import Destination from '../models/Destination.js';
import { getPagination } from '../utils/helpers.js';

export const getAllDestinations = async (req, res, next) => {
  try {
    const { page, limit, search, published } = req.query;
    const filter = {};

    if (published !== undefined) filter.published = published === 'true';
    else filter.published = true;

    let query = Destination.find(filter);

    if (search) {
      query = Destination.find({
        ...filter,
        $text: { $search: search }
      });
    }

    const total = await Destination.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const destinations = await query
      .sort({ name: 1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: destinations,
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

export const getDestinationBySlug = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug, published: true })
      .populate('packages', 'title slug duration startingPrice heroImage shortDescription');

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    next(error);
  }
};

export const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    next(error);
  }
};

export const updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    next(error);
  }
};

export const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    next(error);
  }
};
