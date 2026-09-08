import { Router } from 'express';
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faqController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllFaqs);
router.post('/', protect, authorize('admin'), createFaq);
router.put('/:id', protect, authorize('admin'), updateFaq);
router.delete('/:id', protect, authorize('admin'), deleteFaq);

export default router;
