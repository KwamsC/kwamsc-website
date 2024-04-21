import { postSchema, postPutSchema } from '../models/post';
import postController from '../controllers/postController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { FastifyInstance } from 'fastify';

const opts = {
  schema: {
    querystring: {
      count: { type: 'number', maximum: 100 }
    },
    response: {
      200: {
        type: 'array',
      }
    }
  }
} as const;

const getOpt = { 
  schema:{
    querystring: {
      id: { type: 'string'}
    },
    response: {
      200: postPutSchema
    },
  }
} as const;

async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', getOpt, postController.getEntity);
  fastify.get('/', opts, postController.getAllEntities);
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: postSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          }
        },
      },
    },
    preHandler: authenticateJWT,
    handler: postController.addEntity
  });
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      body: postPutSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          }
        },
      },
    },
    preHandler: authenticateJWT,
    handler: postController.updateEntity
  });
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: authenticateJWT,
    handler: postController.deleteEntity
  });
}

export default postRoutes;
