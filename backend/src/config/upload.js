import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WebP, and GIF images are allowed'), false);
  }
};

const generateFilename = (file) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  return uniqueSuffix + ext;
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../frontend/public/images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, generateFilename(file));
  }
});

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../frontend/public/gallery');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, generateFilename(file));
  }
});

const upload = multer({
  storage: imageStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const galleryUpload = multer({
  storage: galleryStorage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;
