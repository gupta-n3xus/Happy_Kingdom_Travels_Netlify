import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, authorize('admin'), createPost);
router.put('/:id', protect, authorize('admin'), updatePost);
router.delete('/:id', protect, authorize('admin'), deletePost);

export default router;
