import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/', getSettings);
router.put('/', protect, checkPermission('settings:edit'), updateSettings);

export default router;
