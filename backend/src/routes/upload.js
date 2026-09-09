import express from 'express';
import upload, { galleryUpload } from '../config/upload.js';
import { protect, authorize } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const galleryPublicLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many uploads. Please try again later.' }
});

router.post('/image', protect, authorize('admin'), (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const imageUrl = `/images/${req.file.filename}`;
    res.status(200).json({ success: true, url: imageUrl, filename: req.file.filename });
  });
});

router.post('/images', protect, authorize('admin'), (req, res) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }

    const urls = req.files.map(file => ({
      url: `/images/${file.filename}`,
      filename: file.filename
    }));
    res.status(200).json({ success: true, images: urls });
  });
});

router.post('/gallery-image', galleryPublicLimiter, (req, res) => {
  galleryUpload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const imageUrl = `/gallery/${req.file.filename}`;
    res.status(200).json({ success: true, url: imageUrl, filename: req.file.filename });
  });
});

router.post('/gallery-images', protect, authorize('admin'), (req, res) => {
  galleryUpload.array('images', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }

    const urls = req.files.map(file => ({
      url: `/gallery/${file.filename}`,
      filename: file.filename
    }));
    res.status(200).json({ success: true, images: urls });
  });
});

export default router;
