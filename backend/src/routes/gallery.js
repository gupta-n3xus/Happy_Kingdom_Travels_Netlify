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

const router = Router();

router.get('/', getPublishedGallery);
router.post('/', createGalleryItem);
router.get('/all', protect, getAllGallery);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

export default router;
