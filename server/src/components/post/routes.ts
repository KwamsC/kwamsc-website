import { Router } from 'express';
import { addPost, deletePost, getAllPosts, getPostById, updatePost } from './controller';
import { authenticateJWT } from '../../middleware/authenticateJWT';
import { PartialPostSchema, PostSchema } from './schema';
import { validate } from '../../middleware/validator';

const router: Router = Router();

router.post('/posts', [authenticateJWT, validate(PostSchema)], addPost);
router.put('/posts/:id', [authenticateJWT, validate(PartialPostSchema)], updatePost);
router.get('/posts/:id', getPostById);
router.get('/posts', getAllPosts);
router.delete('/posts/:id', authenticateJWT, deletePost);

export default router;