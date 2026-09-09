import GalleryItem from '../models/GalleryItem.js';
import { getPagination } from '../utils/helpers.js';

export const getPublishedGallery = async (req, res, next) => {
  try {
    const { page, limit, category } = req.query;
    const filter = { approved: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    const total = await GalleryItem.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const items = await GalleryItem.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: items,
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

export const getAllGallery = async (req, res, next) => {
  try {
    const { page, limit, category } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    const total = await GalleryItem.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const items = await GalleryItem.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .lean();

    res.status(200).json({
      success: true,
      data: items,
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

export const createGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.create({
      ...req.body,
      approved: true
    });

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
