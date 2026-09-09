import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  updateEnquiryGeo
} from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many enquiries, please try again after 15 minutes' }
});

router.post('/', enquiryLimiter, createEnquiry);
router.post('/geo', updateEnquiryGeo);
router.get('/', protect, authorize('admin'), getAllEnquiries);
router.get('/:id', protect, authorize('admin'), getEnquiryById);
router.put('/:id', protect, authorize('admin'), updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

export default router;
