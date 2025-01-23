import { FastifyInstance } from "fastify";
import recipeController from "./controller.js";
import { getSchema, getAllSchema, AddSchema, putSchema, deleteSchema } from "./schema.js";
import { authenticateJWT } from "#middleware/authenticateJWT.js";

async function recipeRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", { schema: { tags: ["recipes"], ...getSchema } }, recipeController.getEntity);
  fastify.get(
    "/",
    { schema: { tags: ["recipes"], ...getAllSchema } },
    recipeController.getAllEntities,
  );

  fastify.post("/", {
    schema: { tags: ["recipes"], ...AddSchema },
    preHandler: authenticateJWT,
    handler: recipeController.addEntity,
  });

  fastify.put("/:id", {
    schema: { tags: ["recipes"], ...putSchema },
    preHandler: authenticateJWT,
    handler: recipeController.updateEntity,
  });

  fastify.delete("/:id", {
    schema: { tags: ["recipes"], ...deleteSchema },
    preHandler: authenticateJWT,
    handler: recipeController.deleteEntity,
  });
}

export default recipeRoutes;
