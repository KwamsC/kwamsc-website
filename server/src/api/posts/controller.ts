import Controller from "#controllers/controller.js";
import { CreatePostDTO, Post, UpdatePostDTO } from "./model.js";

const postController = new Controller<Post, CreatePostDTO, UpdatePostDTO>("posts");

export default postController;
