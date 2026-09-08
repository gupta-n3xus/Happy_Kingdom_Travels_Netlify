import BlogPost from '../models/BlogPost.js';
import { getPagination } from '../utils/helpers.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const { page, limit, category, search, published } = req.query;
    const filter = {};

    if (published !== undefined) filter.published = published === 'true';
    else filter.published = true;
    if (category) filter.category = category;

    let query = BlogPost.find(filter);

    if (search) {
      query = BlogPost.find({
        ...filter,
        $text: { $search: search }
      });
    }

    const total = await BlogPost.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const posts = await query
      .sort({ publishedAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage)
      .select('-content')
      .lean();

    res.status(200).json({
      success: true,
      data: posts,
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

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
      .populate('relatedPackages', 'title slug duration startingPrice');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
