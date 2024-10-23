// import Controller from "./controller";
import Controller from "../../controllers/controller";
import { CreatePostDTO, Post, UpdatePostDTO } from "./model";
// import { Post, CreatePostDTO, UpdatePostDTO } from "";

const postController = new Controller<Post, CreatePostDTO, UpdatePostDTO>("posts");

export default postController;
