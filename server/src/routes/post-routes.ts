import express from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

router.post("/post", addPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default {
  routes: router,
};
