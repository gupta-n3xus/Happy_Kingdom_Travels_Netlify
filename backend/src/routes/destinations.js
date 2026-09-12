import { Router } from 'express';
import {
  getAllDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/', getAllDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, checkPermission('destinations:create'), createDestination);
router.put('/:id', protect, checkPermission('destinations:edit'), updateDestination);
router.delete('/:id', protect, checkPermission('destinations:delete'), deleteDestination);

export default router;
