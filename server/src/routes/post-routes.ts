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

router.route("/posts").get(getAllPosts).post(authenticateJWT, addPost)
router.route("/posts/:id").get(getPost).put(authenticateJWT, updatePost).delete(authenticateJWT, deletePost)

export default router
