import { Router } from 'express';
import {
  getApprovedReviews,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  approveReview
} from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getApprovedReviews);
router.get('/all', protect, getAllReviews);
router.post('/', createReview);
router.put('/:id', protect, authorize('admin', 'sub_admin'), updateReview);
router.delete('/:id', protect, authorize('admin', 'sub_admin'), deleteReview);
router.put('/:id/approve', protect, authorize('admin', 'sub_admin'), approveReview);

export default router;
