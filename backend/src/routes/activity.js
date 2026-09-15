import { Router } from 'express';
import { getActivityLogs, getSubAdminLogs, getSessions, bulkDeleteActivityLogs } from '../controllers/activityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/sessions', protect, authorize('admin'), getSessions);
router.get('/', protect, authorize('admin'), getActivityLogs);
router.get('/subadmin/:id', protect, authorize('admin'), getSubAdminLogs);
router.post('/bulk-delete', protect, authorize('admin'), bulkDeleteActivityLogs);

export default router;
