import type { RequestHandler } from "express";
import { FirebaseError } from "../../services/firestore-error.ts";
import type { CreatePostDTO, PostDTO, UpdatePostDTO } from "./model.ts";
import PostService from "./service.ts";

const postService = new PostService("posts");

const addPost: RequestHandler = async (req, res) => {
  const postData: CreatePostDTO = req.body;

  try {
    await postService.addPost(postData);
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const updatePost: RequestHandler = async (req, res) => {
  const postId = req.params.id;
  const postData: UpdatePostDTO = req.body;

  try {
    await postService.updatePost(postId, postData);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

const getPostById: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await postService.getPostById(postId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Post with given ID not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get post" });
  }
};

const getAllPosts: RequestHandler = async (req, res) => {
  const count: number = Number.parseInt(req.query.count as string, 10) || 10; // Default to 10 if count is not provided

  try {
    const entities: PostDTO[] = await postService.getAllPosts(count);
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts" });
  }
};

const deletePost: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  try {
    await postService.deletePost(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 404) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.status(500).json({ error: "Failed to delete post" });
    }
  }
};

export { addPost, updatePost, getPostById, getAllPosts, deletePost };
