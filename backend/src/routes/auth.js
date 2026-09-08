import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);

export default router;
