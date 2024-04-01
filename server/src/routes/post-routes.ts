import postController from '../controllers/postController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { validate } from '../middleware/validator';
import { PartialPostSchema, PostSchema } from '../models/postSchema';
import { FastifyInstance } from 'fastify';

async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', postController.getAllEntities);
  // fastify.post('/posts', { preHandler: [authenticateJWT, validate(PostSchema)] }, postController.addEntity);

  // fastify.post<{ Body: typeof PostSchema }>('/posts', { preHandler: [authenticateJWT, validate(PostSchema)] }, postController.addEntity );
  fastify.get('/posts/:id', postController.getEntity);
  // fastify.put('/posts/:id', { preHandler: [authenticateJWT, validate(PartialPostSchema)] }, postController.updateEntity);
  // fastify.delete('/posts/:id', { preHandler: authenticateJWT }, postController.deleteEntity);
}

export default postRoutes;

// const router = Router();

// router
//   .route('/posts')
//   .get(postController.getAllEntities)
//   .post([authenticateJWT, validate(PostSchema)], postController.addEntity);

// router
//   .route('/posts/:id')
//   .get(postController.getEntity)
//   .put([authenticateJWT, validate(PartialPostSchema)], postController.updateEntity)
//   .delete(authenticateJWT, postController.deleteEntity);

// export default router;
