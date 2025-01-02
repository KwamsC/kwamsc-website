import { Router } from "express";
import {
	addPost,
	deletePost,
	getAllPosts,
	getPostById,
	updatePost,
} from "./controller.js";
import { PartialPostSchema, PostSchema } from "./model.js";
import { authenticateJWT } from "#middleware/authenticateJWT.js";
import { validate } from "#middleware/validator.js";

const router: Router = Router();

router.post("/posts", [authenticateJWT, validate(PostSchema)], addPost);
router.put(
	"/posts/:id",
	[authenticateJWT, validate(PartialPostSchema)],
	updatePost,
);
router.get("/posts/:id", getPostById);
router.get("/posts", getAllPosts);
router.delete("/posts/:id", authenticateJWT, deletePost);

export default router;
