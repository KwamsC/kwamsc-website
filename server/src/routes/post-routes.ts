import { getSchema, getAllSchema, putSchema, deleteSchema } from 'schemas/postSchema';
import { postJsonSchema } from 'schemas/recipeSchema';
import postController from '../controllers/postController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { FastifyInstance } from 'fastify';

async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', {schema: getSchema}, postController.getEntity);
  fastify.get('/', {schema: getAllSchema}, postController.getAllEntities);
  fastify.post('/', {
    schema: postJsonSchema,
    preHandler: authenticateJWT,
    handler: postController.addEntity
  });
  fastify.put('/:id',{
    schema: putSchema,
    handler: postController.updateEntity,
    preHandler: authenticateJWT,
  });
  fastify.delete('/:id', {
    schema: deleteSchema,
    preHandler: authenticateJWT,
    handler: postController.deleteEntity
  });
}

export default postRoutes;
