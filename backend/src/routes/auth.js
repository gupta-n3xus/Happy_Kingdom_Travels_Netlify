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
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

router.get('/subadmins', protect, authorize('admin'), getSubAdmins);
router.post('/subadmins', protect, authorize('admin'), createSubAdmin);
router.get('/subadmins/:id', protect, authorize('admin'), getSubAdmin);
router.put('/subadmins/:id', protect, authorize('admin'), updateSubAdmin);
router.delete('/subadmins/:id', protect, authorize('admin'), deleteSubAdmin);

export default router;
