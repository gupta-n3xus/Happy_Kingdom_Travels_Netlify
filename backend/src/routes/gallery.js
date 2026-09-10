import { Router } from 'express';
import {
  getPublishedGallery,
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  addComment,
  deleteComment
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = Router();

const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many submissions. Please try again later.' }
});

router.get('/', getPublishedGallery);
router.post('/', createLimiter, createGalleryItem);
router.get('/all', protect, getAllGallery);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
