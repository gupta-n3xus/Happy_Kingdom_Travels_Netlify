import { Router } from 'express';
import { getActivityLogs, getSubAdminLogs, getSessions } from '../controllers/activityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/sessions', protect, authorize('admin'), getSessions);
router.get('/', protect, authorize('admin'), getActivityLogs);
router.get('/subadmin/:id', protect, authorize('admin'), getSubAdminLogs);

export default router;
