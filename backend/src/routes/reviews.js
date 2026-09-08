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

const router = Router();

router.get('/', getApprovedReviews);
router.get('/all', protect, getAllReviews);
router.post('/', createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.put('/:id/approve', protect, approveReview);

export default router;
