import { Router } from 'express';
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

router.post('/', createEnquiry);
router.post('/geo', updateEnquiryGeo);
router.get('/', protect, authorize('admin', 'sub_admin'), getAllEnquiries);
router.get('/:id', protect, authorize('admin', 'sub_admin'), getEnquiryById);
router.put('/:id', protect, authorize('admin', 'sub_admin'), updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin', 'sub_admin'), deleteEnquiry);

export default router;
