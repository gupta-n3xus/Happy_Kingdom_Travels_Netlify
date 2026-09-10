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
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getPublishedGallery);
router.post('/', protect, authorize('admin', 'sub_admin'), createGalleryItem);
router.get('/all', protect, getAllGallery);
router.put('/:id', protect, authorize('admin', 'sub_admin'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin', 'sub_admin'), deleteGalleryItem);

router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
