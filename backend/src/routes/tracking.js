import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { trackEvent, getDashboardAnalytics } from '../controllers/trackingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const trackingLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many requests' },
});

router.post('/event', trackingLimiter, trackEvent);
router.get('/dashboard', protect, getDashboardAnalytics);

export default router;
