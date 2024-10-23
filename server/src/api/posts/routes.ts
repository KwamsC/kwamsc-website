import { getSchema, getAllSchema, postJsonSchema, putSchema, deleteSchema } from "./schema";
import recipeController from "./controller";
import { FastifyInstance } from "fastify";
import { authenticateJWT } from "../../middleware/authenticateJWT";

async function recipeRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", { schema: getSchema }, recipeController.getEntity);
  fastify.get("/", { schema: getAllSchema }, recipeController.getAllEntities);

  fastify.post("/", {
    schema: postJsonSchema,
    preHandler: authenticateJWT,
    handler: recipeController.addEntity,
  });

  fastify.put("/:id", {
    schema: putSchema,
    preHandler: authenticateJWT,
    handler: recipeController.updateEntity,
  });

  fastify.delete("/:id", {
    schema: deleteSchema,
    preHandler: authenticateJWT,
    handler: recipeController.deleteEntity,
  });
}

export default recipeRoutes;
