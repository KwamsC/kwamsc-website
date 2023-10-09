import { Router } from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController";
import { authenticateJWT } from "../middleWare/authenticateJWT";

const router = Router();

router.route("/").get(authenticateJWT, getAllPosts).post(addPost)
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)

export default router
