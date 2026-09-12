import { Router } from 'express';
import { trackEvent, getDashboardAnalytics } from '../controllers/trackingController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.post('/event', trackEvent);
router.get('/dashboard', protect, checkPermission('dashboard:view'), getDashboardAnalytics);

export default router;
