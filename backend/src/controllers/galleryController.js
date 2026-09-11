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
    const { images, ...rest } = req.body;
    const imageData = (images && images.length > 0) ? images[0].url || images[0] : rest.image;
    if (!imageData) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    const item = await GalleryItem.create({
      ...rest,
      image: imageData,
      approved: false
    });

    res.status(201).json({
      success: true,
      message: 'Your valuable feedback has been received. It will be reviewed by our team and made public shortly. Thank you for your valuable time with us!',
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

export const addComment = async (req, res, next) => {
  try {
    const { name, text } = req.body;
    if (!name || !text) {
      return res.status(400).json({ success: false, message: 'Name and text are required' });
    }

    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    item.comments.push({ name: name.trim(), text: text.trim() });
    await item.save();

    res.status(201).json({ success: true, data: item.comments[item.comments.length - 1] });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    const comment = item.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    comment.deleteOne();
    await item.save();

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
};
