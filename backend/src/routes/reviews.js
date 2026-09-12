import { Router } from 'express';
import {
  getApprovedReviews,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  approveReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/', getApprovedReviews);
router.get('/all', protect, checkPermission('reviews:view'), getAllReviews);
router.post('/', createReview);
router.put('/:id', protect, checkPermission('reviews:edit'), updateReview);
router.delete('/:id', protect, checkPermission('reviews:delete'), deleteReview);
router.put('/:id/approve', protect, checkPermission('reviews:approve'), approveReview);

export default router;
