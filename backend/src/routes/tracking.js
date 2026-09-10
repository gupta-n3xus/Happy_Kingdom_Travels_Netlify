import { Router } from 'express';
import { trackEvent, getDashboardAnalytics } from '../controllers/trackingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/event', trackEvent);
router.get('/dashboard', protect, getDashboardAnalytics);

export default router;
