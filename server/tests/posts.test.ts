import assert from "node:assert";
import { mock, afterEach, describe, it } from "node:test";
import sinon from "sinon";
import app from "../src/app.ts";
import type {
  CreatePostDTO,
  PostDTO,
  UpdatePostDTO,
} from "../src/components/post/model.ts";
import PostService from "../src/components/post/service.ts";
import { FirebaseError } from "../src/services/firestore-error.ts";
import { mockSuccessfulAuth } from "../__mock__/firebaseAuth.ts";

describe("Post API Endpoints", () => {
  const validToken = "valid-test-token";

  afterEach(() => {
    sinon.restore();
    mock.reset();
  });

  // Helper function to make requests to Hono app
  const makeRequest = async (method: string, path: string, options: {
    headers?: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
  } = {}) => {
    const url = new URL(path, "http://localhost:3000");
    
    // Add query parameters
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const request = new Request(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const response = await app.fetch(request);
    const responseBody = await response.text();
    
    let jsonBody;
    try {
      jsonBody = JSON.parse(responseBody);
    } catch {
      jsonBody = responseBody;
    }

    return {
      status: response.status,
      body: jsonBody,
      headers: Object.fromEntries(response.headers.entries()),
    };
  };

  describe("POST /api/v1/posts", () => {
    mockSuccessfulAuth();

    it("should create a new post", async () => {
      const postData: CreatePostDTO = {
        title: "11th Post",
        content: "This is my 11th ID post",
        published: true,
        author: "Emm Carr",
        tags: ["tech", "lifestyle", "coding"],
      };

      const createPostStub = sinon
        .stub(PostService.prototype, "addPost")
        .resolves();

      const response = await makeRequest("POST", "/api/v1/posts", {
        headers: { Authorization: `Bearer ${validToken}` },
        body: postData,
      });

      assert.strictEqual(createPostStub.calledOnce, true);
      assert.strictEqual(response.status, 201);
      assert.deepStrictEqual(
        response.body.message,
        "Post created successfully"
      );
    });

    it("should handle validation errors", async () => {
      const postDataWithoutTitle: Omit<CreatePostDTO, "title"> = {
        content: "This is my 11th ID post",
        published: true,
        author: "Emm Carr",
        tags: ["tech", "lifestyle", "coding"],
      };

      const response = await makeRequest("POST", "/api/v1/posts", {
        headers: { Authorization: `Bearer ${validToken}` },
        body: postDataWithoutTitle,
      });

      assert.strictEqual(response.status, 400);
      // assert.deepStrictEqual(response.body.error[0], {
      //   message: "title is required",
      //   path: "title",
      // });
    });

    it("should handle server errors", async () => {
      const postData: CreatePostDTO = {
        title: "11th Post",
        content: "This is my 11th ID post",
        published: true,
        author: "Emm Carr",
        tags: ["tech", "lifestyle", "coding"],
      };

      const createPostStub = sinon
        .stub(PostService.prototype, "addPost")
        .throws(new Error("Database Error"));

      const response = await makeRequest("POST", "/api/v1/posts", {
        headers: { Authorization: `Bearer ${validToken}` },
        body: postData,
      });

      assert.strictEqual(response.status, 500);
      assert.deepStrictEqual(response.body, { error: "Failed to create post" });
      assert.strictEqual(createPostStub.calledOnce, true);
    });
  });

  describe("PUT /api/v1/posts/:id", () => {
    mockSuccessfulAuth();

    it("should update an existing post", async () => {
      const postId = "1";
      const postData: UpdatePostDTO = {
        title: "Updated Post Title",
        content: "Updated post content",
        published: false,
        author: "Updated Author",
        tags: ["updated", "tags"],
      };

      const updatePostStub = sinon
        .stub(PostService.prototype, "updatePost")
        .resolves();

      const response = await makeRequest("PUT", `/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${validToken}` },
        body: postData,
      });

      assert.strictEqual(updatePostStub.calledOnce, true);
      assert.strictEqual(updatePostStub.calledWith(postId, postData), true);
      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(
        response.body.message,
        "Post updated successfully"
      );
    });

    it("should handle server errors", async () => {
      const postId = "1";
      const postData: UpdatePostDTO = {
        title: "Updated Post Title",
        content: "Updated post content",
        published: false,
        author: "Updated Author",
        tags: ["updated", "tags"],
      };

      const updatePostStub = sinon
        .stub(PostService.prototype, "updatePost")
        .throws(new Error("Database Error"));

      const response = await makeRequest("PUT", `/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${validToken}` },
        body: postData,
      });

      assert.strictEqual(response.status, 500);
      assert.deepStrictEqual(response.body, { error: "Failed to update post" });
      assert.strictEqual(updatePostStub.calledOnce, true);
    });
  });

  describe("GET /api/v1/posts", () => {
    it("should return a list of posts", async () => {
      const mockPosts: PostDTO[] = [
        {
          id: "1",
          title: "Test Post 1",
          content: "This is the first test post.",
          author: "Author 1",
          tags: ["tag1"],
          published: true,
          updatedAt: Date.now(),
          createdAt: Date.now(),
        },
        {
          id: "2",
          title: "Test Post 2",
          content: "This is the second test post.",
          author: "Author 2",
          tags: ["tag2"],
          published: true,
          updatedAt: Date.now(),
          createdAt: Date.now(),
        },
      ];

      sinon.stub(PostService.prototype, "getAllPosts").resolves(mockPosts);

      const response = await makeRequest("GET", "/api/v1/posts", {
        query: { count: "2" },
      });

      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(response.body, mockPosts);
    });

    it("should handle server errors", async () => {
      sinon
        .stub(PostService.prototype, "getAllPosts")
        .throws(new Error("Database Error"));

      const response = await makeRequest("GET", "/api/v1/posts");

      assert.strictEqual(response.status, 500);
      assert.deepStrictEqual(response.body, { error: "Failed to get posts" });
    });
  });

  describe("GET /api/v1/posts/:id", () => {
    it("should return a post by ID", async () => {
      const mockPost: PostDTO = {
        id: "1",
        title: "Test Post",
        content: "Test Content",
        author: "Author 1",
        tags: ["tag1"],
        published: true,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      };

      const getPostByIdStub = sinon
        .stub(PostService.prototype, "getPostById")
        .resolves(mockPost);

      const response = await makeRequest("GET", "/api/v1/posts/1");

      assert.strictEqual(getPostByIdStub.calledOnce, true);
      assert.strictEqual(response.status, 200);
      assert.deepStrictEqual(response.body, mockPost);
    });

    it("should return 404 if post not found", async () => {
      sinon.stub(PostService.prototype, "getPostById").resolves(null);

      const response = await makeRequest("GET", "/api/v1/posts/1");

      assert.strictEqual(response.status, 404);
      assert.deepStrictEqual(response.body, {
        message: "Post with given ID not found",
      });
    });

    it("should handle server errors", async () => {
      sinon
        .stub(PostService.prototype, "getPostById")
        .throws(new Error("Failed to get post"));

      const response = await makeRequest("GET", "/api/v1/posts/1");

      assert.strictEqual(response.status, 500);
      assert.deepStrictEqual(response.body, { error: "Failed to get post" });
    });
  });

  describe("DELETE /api/v1/posts/:id", () => {
    mockSuccessfulAuth();

    it("should delete a post", async () => {
      const postId = "1";

      const deletePostStub = sinon
        .stub(PostService.prototype, "deletePost")
        .resolves();

      const response = await makeRequest("DELETE", `/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });

      assert.strictEqual(deletePostStub.calledOnce, true);
      assert.strictEqual(deletePostStub.calledWith(postId), true);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Post deleted successfully");
    });

    it("should return 404 if post not found", async () => {
      const postId = "nonexistent-id";

      const deletePostStub = sinon
        .stub(PostService.prototype, "deletePost")
        .throws(new FirebaseError("Post does not exist", 404));

      const response = await makeRequest("DELETE", `/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });

      assert.strictEqual(deletePostStub.calledOnce, true);
      assert.strictEqual(response.status, 404);
      assert.deepStrictEqual(response.body, { error: "Post not found" });
    });

    it("should handle server errors", async () => {
      const postId = "1";

      const deletePostStub = sinon
        .stub(PostService.prototype, "deletePost")
        .throws(new Error("Database Error"));

      const response = await makeRequest("DELETE", `/api/v1/posts/${postId}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });

      assert.strictEqual(deletePostStub.calledOnce, true);
      assert.strictEqual(response.status, 500);
      assert.deepStrictEqual(response.body, { error: "Failed to delete post" });
    });
  });
});