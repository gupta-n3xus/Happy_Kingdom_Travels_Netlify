import express from 'express';
import upload, { galleryUpload } from '../config/upload.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

const bufferToDataUrl = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

router.post('/image', protect, authorize('admin'), (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const dataUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
    res.status(200).json({ success: true, url: dataUrl });
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
      url: bufferToDataUrl(file.buffer, file.mimetype)
    }));
    res.status(200).json({ success: true, images: urls });
  });
});

router.post('/gallery-image', (req, res) => {
  galleryUpload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const dataUrl = bufferToDataUrl(req.file.buffer, req.file.mimetype);
    res.status(200).json({ success: true, url: dataUrl });
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
      url: bufferToDataUrl(file.buffer, file.mimetype)
    }));
    res.status(200).json({ success: true, images: urls });
  });
});

export default router;
