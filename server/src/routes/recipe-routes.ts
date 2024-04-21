import { recipePutSchema, recipeSchema } from '../models/recipe';
import recipeController from '../controllers/recipeController';
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
      200: recipePutSchema
    },
  }
} as const;

async function recipeRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', getOpt, recipeController.getEntity);
  fastify.get('/', opts, recipeController.getAllEntities);
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: recipeSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          }
        },
      },
    },
    // preHandler: authenticateJWT,
    handler: recipeController.addEntity
  });
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      body: recipePutSchema,
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
    handler: recipeController.updateEntity
  });
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    preHandler: authenticateJWT,
    handler: recipeController.deleteEntity
  });
}

export default recipeRoutes;
