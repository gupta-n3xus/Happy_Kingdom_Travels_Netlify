import { Router } from 'express';
import {
  login,
  getMe,
  updateProfile,
  logout,
  getSubAdmins,
  getSubAdmin,
  createSubAdmin,
  updateSubAdmin,
  deleteSubAdmin
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

router.get('/subadmins', protect, checkPermission('subadmins:view'), getSubAdmins);
router.post('/subadmins', protect, checkPermission('subadmins:create'), createSubAdmin);
router.get('/subadmins/:id', protect, checkPermission('subadmins:view'), getSubAdmin);
router.put('/subadmins/:id', protect, checkPermission('subadmins:edit'), updateSubAdmin);
router.delete('/subadmins/:id', protect, checkPermission('subadmins:delete'), deleteSubAdmin);

export default router;
