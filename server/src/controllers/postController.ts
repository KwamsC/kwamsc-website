import Controller from "./controller";
import { Post, CreatePostDTO, UpdatePostDTO } from "../models/post";

const postController = new Controller<Post, CreatePostDTO, UpdatePostDTO>("posts");

export default postController;
