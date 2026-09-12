import { Router } from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  updateEnquiryGeo
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.post('/', createEnquiry);
router.post('/geo', updateEnquiryGeo);
router.get('/', protect, checkPermission('enquiries:view'), getAllEnquiries);
router.get('/:id', protect, checkPermission('enquiries:view'), getEnquiryById);
router.put('/:id', protect, checkPermission('enquiries:edit'), updateEnquiryStatus);
router.delete('/:id', protect, checkPermission('enquiries:delete'), deleteEnquiry);

export default router;
