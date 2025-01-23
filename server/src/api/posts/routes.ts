import { FastifyInstance } from "fastify";
import { authenticateJWT } from "#middleware/authenticateJWT.js";
import postController from "./controller.js";
import { getSchema, getAllSchema, AddSchema, putSchema, deleteSchema } from "./schema.js";

async function recipeRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", { schema: { tags: ["posts"], ...getSchema } }, postController.getEntity);
  fastify.get("/", { schema: { tags: ["posts"], ...getAllSchema } }, postController.getAllEntities);

  fastify.post("/", {
    schema: { tags: ["posts"], ...AddSchema },
    preHandler: authenticateJWT,
    handler: postController.addEntity,
  });

  fastify.put("/:id", {
    schema: { tags: ["posts"], ...putSchema },
    preHandler: authenticateJWT,
    handler: postController.updateEntity,
  });

  fastify.delete("/:id", {
    schema: { tags: ["posts"], ...deleteSchema },
    preHandler: authenticateJWT,
    handler: postController.deleteEntity,
  });
}

export default recipeRoutes;
