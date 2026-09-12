import { Router } from 'express';
import { exportBackup, importBackup } from '../controllers/backupController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/export', protect, checkPermission('backup:export'), exportBackup);
router.post('/import', protect, checkPermission('backup:import'), importBackup);

export default router;
