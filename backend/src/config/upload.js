import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WebP, and GIF images are allowed'), false);
  }
};

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'happykingdom/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});

const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'happykingdom/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1600, height: 1200, crop: 'limit' }],
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

export default upload;
