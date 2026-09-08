import { Router } from 'express';
import {
  getAllPackages,
  getPackageBySlug,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/packageController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/admin/:id', protect, authorize('admin'), getPackageById);
router.get('/', getAllPackages);
router.get('/:slug', getPackageBySlug);
router.post('/', protect, authorize('admin'), createPackage);
router.put('/:id', protect, authorize('admin'), updatePackage);
router.delete('/:id', protect, authorize('admin'), deletePackage);

export default router;
