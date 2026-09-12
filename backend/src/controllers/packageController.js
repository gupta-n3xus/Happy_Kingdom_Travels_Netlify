import Package from '../models/Package.js';
import { formatResponse, formatError, getPagination } from '../utils/helpers.js';
import { importImageToCloudinary, deleteCloudinaryImage, deleteCloudinaryImages } from '../config/upload.js';
import { log } from '../utils/activityHelper.js';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const importImages = async (data) => {
  const tasks = [];
  if (data.heroImage) {
    tasks.push(importImageToCloudinary(data.heroImage).then(url => { data.heroImage = url; }));
  }
  if (Array.isArray(data.images)) {
    tasks.push(
      Promise.all(data.images.map(url => importImageToCloudinary(url))).then(urls => { data.images = urls; })
    );
  }
  if (tasks.length > 0) await Promise.all(tasks);
};

const deletePackageImages = async (pkg) => {
  const urls = [];
  if (pkg.heroImage) urls.push(pkg.heroImage);
  if (Array.isArray(pkg.images)) urls.push(...pkg.images);
  if (urls.length > 0) await deleteCloudinaryImages(urls);
};

export const getAllPackages = async (req, res) => {
  try {
    const { category, duration, travelStyle, startingPoint, search, page = 1, limit = 12 } = req.query;

    const filter = { status: 'active' };

    if (category) filter.category = category;

    if (duration) {
      const rangeMatch = duration.match(/^(\d+)-(\d+)$/);
      if (rangeMatch) {
        filter['duration.nights'] = { $gte: parseInt(rangeMatch[1], 10), $lte: parseInt(rangeMatch[2], 10) };
      } else {
        const match = duration.match(/^(\d+)[nN](\d+)[dD]?$/);
        if (match) {
          filter['duration.nights'] = parseInt(match[1], 10);
        } else if (duration.endsWith('+')) {
          const num = parseInt(duration, 10);
          if (!isNaN(num)) {
            filter['duration.nights'] = { $gte: num };
          }
        } else {
          const num = parseInt(duration, 10);
          if (!isNaN(num)) {
            filter['duration.nights'] = num;
          }
        }
      }
    }

    if (travelStyle) filter.travelStyle = travelStyle;

    if (startingPoint) {
      filter.startingPoints = { $regex: escapeRegex(startingPoint), $options: 'i' };
    }

    if (search) {
      const safeSearch = escapeRegex(search);
      filter.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { shortDescription: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } },
        { tripHighlights: { $regex: safeSearch, $options: 'i' } },
        { suitableFor: { $regex: safeSearch, $options: 'i' } },
      ];
    }

    const total = await Package.countDocuments(filter);
    const pagination = getPagination(page, limit, total);

    const packages = await Package.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.perPage);

    return formatResponse(res, 200, { data: packages, pagination });
  } catch (error) {
    console.error('getAllPackages error:', error);
    return formatError(res, 500, 'Failed to fetch packages');
  }
};

export const getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug, status: 'active' });
    if (!pkg) {
      return formatError(res, 404, 'Package not found');
    }
    return formatResponse(res, 200, pkg);
  } catch (error) {
    console.error('getPackageBySlug error:', error);
    return formatError(res, 500, 'Failed to fetch package');
  }
};

export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return formatError(res, 404, 'Package not found');
    }
    return formatResponse(res, 200, pkg);
  } catch (error) {
    console.error('getPackageById error:', error);
    return formatError(res, 500, 'Failed to fetch package');
  }
};

export const getFeaturedPackages = async (_req, res) => {
  try {
    const packages = await Package.find({ status: 'active', featured: true })
      .sort({ createdAt: -1 })
      .limit(4);
    return formatResponse(res, 200, packages);
  } catch (error) {
    console.error('getFeaturedPackages error:', error);
    return formatError(res, 500, 'Failed to fetch featured packages');
  }
};

export const createPackage = async (req, res) => {
  try {
    await importImages(req.body);
    const pkg = await Package.create(req.body);
    log(req, 'create', 'package', pkg._id?.toString(), pkg.title, `Created package "${pkg.title}"`);
    return formatResponse(res, 201, pkg);
  } catch (error) {
    console.error('createPackage error:', error);
    return formatError(res, 400, error.message || 'Failed to create package');
  }
};

export const updatePackage = async (req, res) => {
  try {
    await importImages(req.body);
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return formatError(res, 404, 'Package not found');
    }
    log(req, 'update', 'package', pkg._id?.toString(), pkg.title, `Updated package "${pkg.title}"`);
    return formatResponse(res, 200, pkg);
  } catch (error) {
    console.error('updatePackage error:', error);
    return formatError(res, 400, error.message || 'Failed to update package');
  }
};

export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return formatError(res, 404, 'Package not found');
    }
    log(req, 'delete', 'package', pkg._id?.toString(), pkg.title, `Deleted package "${pkg.title}"`);
    await pkg.deleteOne();
    deletePackageImages(pkg).catch(err => console.error('Image cleanup warning:', err.message));
    return formatResponse(res, 200, null, 'Package deleted successfully');
  } catch (error) {
    console.error('deletePackage error:', error);
    return formatError(res, 500, 'Failed to delete package');
  }
};
