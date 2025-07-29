import Controller from "../../controllers/controller.ts";
import type { CreatePostDTO, PostDTO, UpdatePostDTO } from "./model.ts";

const postController = new Controller<PostDTO, CreatePostDTO, UpdatePostDTO>("posts");

export default postController;
