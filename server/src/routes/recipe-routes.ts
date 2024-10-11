import {
  deleteJsonSchema,
  getAllJsonSchema,
  getJsonSchema,
  postJsonSchema,
  putJsonSchema,
} from "../schemas/recipeSchema";
import recipeController from "../controllers/recipeController";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { FastifyInstance } from "fastify";

async function recipeRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", { schema: getJsonSchema }, recipeController.getEntity);
  fastify.get("/", { schema: getAllJsonSchema }, recipeController.getAllEntities);

  fastify.post("/", {
    schema: postJsonSchema,
    preHandler: authenticateJWT,
    handler: recipeController.addEntity,
  });

  fastify.put("/:id", {
    schema: putJsonSchema,
    preHandler: authenticateJWT,
    handler: recipeController.updateEntity,
  });

  fastify.delete("/:id", {
    schema: deleteJsonSchema,
    preHandler: authenticateJWT,
    handler: recipeController.deleteEntity,
  });
}

export default recipeRoutes;
