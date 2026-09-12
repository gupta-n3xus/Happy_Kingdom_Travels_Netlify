import { Router } from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, checkPermission('blog:create'), createPost);
router.put('/:id', protect, checkPermission('blog:edit'), updatePost);
router.delete('/:id', protect, checkPermission('blog:delete'), deletePost);

export default router;
