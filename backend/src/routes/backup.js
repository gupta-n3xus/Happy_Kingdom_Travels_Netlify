import { Router } from 'express';
import { exportBackup, importBackup } from '../controllers/backupController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/export', protect, authorize('admin'), exportBackup);
router.post('/import', protect, authorize('admin'), importBackup);

export default router;
