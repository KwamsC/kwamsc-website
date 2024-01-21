import { Router } from "express";
import postController from "../controllers/postController";
import { authenticateJWT } from "../middleWare/authenticateJWT";
import { validate } from "../middleWare/validator";
import { PartialPostSchema, PostSchema } from "../models/postSchema";

const router = Router();

router.route("/posts")
  .get(postController.getAllPosts)
  .post(validate(PostSchema), postController.addPost)

router.route("/posts/:id")
  .get(postController.getPost)
  .put(validate(PartialPostSchema), postController.updatePost)
  .delete(authenticateJWT, postController.deletePost)

export default router
