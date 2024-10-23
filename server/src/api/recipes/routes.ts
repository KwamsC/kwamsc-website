import { FastifyInstance } from "fastify";
import { authenticateJWT } from "../../middleware/authenticateJWT";
import recipeController from "./controller";
import {
  getJsonSchema,
  getAllJsonSchema,
  postJsonSchema,
  putJsonSchema,
  deleteJsonSchema,
} from "./schema";

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
