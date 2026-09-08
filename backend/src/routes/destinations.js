import { Router } from 'express';
import {
  getAllDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', protect, authorize('admin'), createDestination);
router.put('/:id', protect, authorize('admin'), updateDestination);
router.delete('/:id', protect, authorize('admin'), deleteDestination);

export default router;
