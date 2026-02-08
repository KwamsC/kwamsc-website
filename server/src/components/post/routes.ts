import { Hono } from "hono";
import { PartialPostSchema, PostSchema } from "./model.ts";
import { authenticateJWT } from "../../middleware/authenticateJWT.ts";
import { FirebaseError } from "../../services/firestore-error.ts";
import { zValidator } from "@hono/zod-validator";
import type { CreatePostDTO, PostDTO, UpdatePostDTO } from "./model.ts";
import PostService from "./service.ts";
// import purgeCloudflareCache from "../cache/utils.ts";

const router = new Hono();
const postService = new PostService("posts");

router.post(
  "/posts",
  authenticateJWT,
  zValidator("json", PostSchema),
  async (c) => {
    // c.header("Cache-Control", "no-store");
    const postData: CreatePostDTO = c.req.valid("json");

    try {
      await postService.addPost(postData);
      // await purgeCloudflareCache();
      return c.json({ message: "Post created successfully" }, 201);
    } catch (error) {
      return c.json({ error: "Failed to create post" }, 500);
    }
  },
);
router.put(
  "/posts/:id",
  authenticateJWT,
  zValidator("json", PartialPostSchema),
  async (c) => {
    // c.header("Cache-Control", "no-store");
    const postId = c.req.param("id");
    const postData: UpdatePostDTO = c.req.valid("json");

    try {
      await postService.updatePost(postId, postData);
      // await purgeCloudflareCache();
      return c.json({ message: "Post updated successfully" }, 200);
    } catch (error) {
      return c.json({ error: "Failed to update post" }, 500);
    }
  },
);
router.get("/posts/:id", async (c) => {
  // c.header(
  //   "Cache-Control",
  //   "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
  // );
  const postId = c.req.param("id");

  try {
    const result = await postService.getPostById(postId);
    if (result) {
      return c.json(result, 200);
    } else {
      return c.json({ message: "Post with given ID not found" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Failed to get post" }, 500);
  }
});
router.get("/posts", async (c) => {
  // c.header(
  //   "Cache-Control",
  //   "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
  // );
  const count: number = Number.parseInt(c.req.query("count") || "10", 10); // Default to 10 if count is not provided

  try {
    const entities: PostDTO[] = await postService.getAllPosts(count);
    return c.json(entities, 200);
  } catch (error) {
    return c.json({ error: "Failed to get posts" }, 500);
  }
});

router.delete("/posts/:id", authenticateJWT, async (c) => {
  // c.header("Cache-Control", "no-store");
  const postId = c.req.param("id");

  try {
    await postService.deletePost(postId);
    // await purgeCloudflareCache();
    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (error) {
    if (error instanceof FirebaseError && error.code === 404) {
      return c.json({ error: "Post not found" }, 404);
    } else {
      return c.json({ error: "Failed to delete post" }, 500);
    }
  }
});

export default router;
