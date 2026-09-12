import { Router } from 'express';
import {
  getAllPackages,
  getPackageBySlug,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/packageController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/admin/:id', protect, checkPermission('packages:view'), getPackageById);
router.get('/', getAllPackages);
router.get('/:slug', getPackageBySlug);
router.post('/', protect, checkPermission('packages:create'), createPackage);
router.put('/:id', protect, checkPermission('packages:edit'), updatePackage);
router.delete('/:id', protect, checkPermission('packages:delete'), deletePackage);

export default router;
