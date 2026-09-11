import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import https from 'https';
import http from 'http';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

const fileFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
    'image/heic', 'image/heif', 'image/jxl', 'image/svg+xml', 'image/avif'
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WebP, GIF, HEIC, JPEG XL, SVG, and AVIF images are allowed'), false);
  }
};

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'happykingdom/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'jxl', 'svg', 'avif'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});

const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'happykingdom/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'jxl', 'svg', 'avif'],
    transformation: [{ width: 1600, height: 1200, crop: 'limit' }],
  },
});

const packageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'happykingdom/packages',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'jxl', 'svg', 'avif'],
    transformation: [{ width: 1600, height: 1000, crop: 'limit' }],
  },
});

const upload = multer({
  storage: imageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const galleryUpload = multer({
  storage: galleryStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});

export const packageUpload = multer({
  storage: packageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const CLOUDINARY_FOLDER = 'happykingdom/packages';

const isCloudinaryUrl = (url) => {
  return url && typeof url === 'string' && url.includes('res.cloudinary.com');
};

const extractCloudinaryPublicId = (url) => {
  if (!isCloudinaryUrl(url)) return null;
  try {
    const parts = url.split('/');
    const folderIndex = parts.findIndex(p => p === CLOUDINARY_FOLDER);
    if (folderIndex === -1) return null;
    const afterFolder = parts.slice(folderIndex).join('/');
    const publicId = afterFolder.replace(/\.[^.]+$/, '');
    return publicId;
  } catch {
    return null;
  }
};

const fetchImageBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchImageBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch image: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    request.on('error', reject);
    request.on('timeout', () => { request.destroy(); reject(new Error('Image fetch timeout')); });
  });
};

export const importImageToCloudinary = async (url) => {
  if (isCloudinaryUrl(url)) return url;
  try {
    const buffer = await fetchImageBuffer(url);
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: CLOUDINARY_FOLDER, resource_type: 'image', transformation: [{ width: 1600, height: 1000, crop: 'limit' }] },
        (error, result) => { if (error) reject(error); else resolve(result); }
      );
      stream.end(buffer);
    });
    return result.secure_url;
  } catch (error) {
    console.error('importImageToCloudinary failed:', error.message);
    return url;
  }
};

export const deleteCloudinaryImage = async (url) => {
  const publicId = extractCloudinaryPublicId(url);
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('deleteCloudinaryImage failed:', error.message);
  }
};

export const deleteCloudinaryImages = async (urls) => {
  if (!Array.isArray(urls)) return;
  await Promise.allSettled(urls.map(url => deleteCloudinaryImage(url)));
};

export default upload;
