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
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/', getPublishedGallery);
router.post('/', createGalleryItem);
router.get('/all', protect, checkPermission('gallery:view'), getAllGallery);
router.put('/:id', protect, checkPermission('gallery:edit'), updateGalleryItem);
router.delete('/:id', protect, checkPermission('gallery:delete'), deleteGalleryItem);
router.put('/:id/approve', protect, checkPermission('gallery:approve'), approveGalleryItem);

router.post('/:id/comments', addComment);
router.delete('/:id/comments/:commentId', protect, checkPermission('gallery:delete'), deleteComment);

export default router;
