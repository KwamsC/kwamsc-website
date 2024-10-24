import Controller from "../../controllers/controller";
import { CreatePostDTO, Post, UpdatePostDTO } from "./model";

const postController = new Controller<Post, CreatePostDTO, UpdatePostDTO>("posts");

export default postController;
