import { Router } from 'express';
import {
  getPublishedGallery,
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  approveGalleryItem,
  addComment,
  deleteComment
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getPublishedGallery);
router.post('/', createGalleryItem);
router.get('/all', protect, getAllGallery);
router.put('/:id', protect, authorize('admin'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);
router.put('/:id/approve', protect, authorize('admin', 'sub_admin'), approveGalleryItem);

router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', protect, authorize('admin'), deleteComment);

export default router;
