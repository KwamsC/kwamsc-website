import { Router } from "express";
import postController from "../controllers/postController";
import { authenticateJWT } from "../middleWare/authenticateJWT";
import { validate } from "../middleWare/validator";
import { PartialPostSchema, PostSchema } from "../models/postSchema";

const router = Router();

router.route("/posts")
  .get(postController.getAllEntities)
  .post([authenticateJWT, validate(PostSchema)], postController.addEntity)

router.route("/posts/:id")
  .get(postController.getEntity)
  .put([authenticateJWT, validate(PartialPostSchema)], postController.updateEntity)
  .delete(authenticateJWT, postController.deleteEntity)

export default router
