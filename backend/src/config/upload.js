import multer from 'multer';

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WebP, and GIF images are allowed'), false);
  }
};

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const galleryUpload = multer({
  storage: memoryStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
