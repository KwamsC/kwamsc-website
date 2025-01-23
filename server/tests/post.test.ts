import assert from "assert/strict";
import { describe, mock, afterEach, test, before, after } from "node:test";
import build from "#app.js";
import { CreatePostDTO, Post } from "#api/posts/model.js";
import postController from "#api/posts/controller.js";
import { setupAuthMock } from "../__mock__/firebaseAuth.js";
import { FastifyInstance } from "fastify";

let app: FastifyInstance;

describe("GET /api/v1/posts", () => {
  afterEach(() => {
    mock.reset();
  });

  before(() => {
    app = build();
  });

  after(() => {
    app.close();
  });

  test("should return a list of posts", async (t) => {
    const mockPosts: Post[] = [
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

    const getAllPostsMock = mock.method(postController, "getAllEntities", () =>
      Promise.resolve(mockPosts),
    );

    // const app = build();
    // t.after(() => app.close());

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/posts",
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.body), mockPosts);
    assert.strictEqual(getAllPostsMock.mock.calls.length, 1);
  });

  test("should handle server errors", async (t) => {
    // const app = build();
    // t.after(() => app.close());

    const getAllEntitiesMock = mock.method(
      postController,
      "getAllEntities",
      async (_req, reply) => {
        reply.code(500).send({ error: "Failed to get posts" });
      },
    );

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/posts",
    });

    assert.strictEqual(response.statusCode, 500);
    assert.deepStrictEqual(JSON.parse(response.body), {
      error: "Failed to get posts",
    });
    assert.strictEqual(getAllEntitiesMock.mock.calls.length, 1);
  });
});

describe("POST /api/v1/posts", () => {
  const validToken = "valid-test-token";
  test("should create a new post when authenticated", async (t) => {
    setupAuthMock.success();

    const postData = {
      title: "Test Post",
      content: "Test content",
      author: "Test Author",
      tags: ["test"],
      published: true,
    };

    const addEntityMock = mock.method(postController, "addEntity", async (_req, reply) => {
      reply.code(201).send({ message: "posts saved successfully" });
    });

    // const app = build();
    // t.after(() => app.close());

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/posts",
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: postData,
    });

    assert.strictEqual(response.statusCode, 201);
    assert.deepStrictEqual(JSON.parse(response.body), {
      message: "posts saved successfully",
    });
    assert.strictEqual(addEntityMock.mock.calls.length, 1);
  });

  test("should handle validation errors", async (t) => {
    const postDataWithoutTitle: Omit<CreatePostDTO, "title"> = {
      content: "This is my 11th ID post",
      published: true,
      author: "Emm Carr",
      tags: ["tech", "lifestyle", "coding"],
    };

    // const app = build();
    // t.after(() => app.close());

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/posts",
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: postDataWithoutTitle,
    });

    assert.strictEqual(response.statusCode, 400);
    assert.deepStrictEqual(response.json().message, "body must have required property 'title'");
  });

  test("should handle server errors", async (t) => {
    const postData: CreatePostDTO = {
      title: "11th Post",
      content: "This is my 11th ID post",
      published: true,
      author: "Emm Carr",
      tags: ["tech", "lifestyle", "coding"],
    };

    // const app = build();
    // t.after(() => app.close());

    const addEntityMock = mock.method(postController, "addEntity", async (_req, reply) => {
      reply.code(500).send({ error: "Failed to save post" });
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/posts",
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: postData,
    });

    assert.strictEqual(response.statusCode, 500);
    assert.deepStrictEqual(JSON.parse(response.body), {
      error: "Failed to save post",
    });
    assert.strictEqual(addEntityMock.mock.calls.length, 1);
  });
});

describe("PUT /api/v1/posts/:id", () => {
  const validToken = "valid-test-token";

  afterEach(() => {
    mock.reset();
  });

  test("should update an existing post when authenticated", async (t) => {
    setupAuthMock.success();

    const postId = "1";
    const updateData = {
      title: "Updated Post Title",
      content: "Updated post content",
      published: false,
      author: "Updated Author",
      tags: ["updated", "tags"],
    };

    const updateEntityMock = mock.method(postController, "updateEntity", async (_req, reply) => {
      reply.code(200).send({ message: "Post updated successfully" });
    });

    const response = await app.inject({
      method: "PUT",
      url: `/api/v1/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: updateData,
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.body), {
      message: "Post updated successfully",
    });
    assert.strictEqual(updateEntityMock.mock.calls.length, 1);
  });

  test("should handle validation errors during update", async (t) => {
    setupAuthMock.success();

    const postId = "1";
    const invalidUpdateData = {
      // Missing required title field
      content: "Updated post content",
      published: false,
      author: "Updated Author",
      tags: ["updated", "tags"],
    };

    const response = await app.inject({
      method: "PUT",
      url: `/api/v1/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: invalidUpdateData,
    });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.json().message, "body must have required property 'title'");
  });

  test("should handle not found errors", async (t) => {
    setupAuthMock.success();

    const nonExistentPostId = "999";
    const updateData = {
      title: "Updated Post Title",
      content: "Updated post content",
      published: false,
      author: "Updated Author",
      tags: ["updated", "tags"],
    };

    const updateEntityMock = mock.method(postController, "updateEntity", async (_req, reply) => {
      reply.code(404).send({ error: "Post not found" });
    });

    const response = await app.inject({
      method: "PUT",
      url: `/api/v1/posts/${nonExistentPostId}`,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: updateData,
    });

    assert.strictEqual(response.statusCode, 404);
    assert.deepStrictEqual(JSON.parse(response.body), {
      error: "Post not found",
    });
    assert.strictEqual(updateEntityMock.mock.calls.length, 1);
  });

  test("should handle server errors during update", async (t) => {
    setupAuthMock.success();

    const postId = "1";
    const updateData = {
      title: "Updated Post Title",
      content: "Updated post content",
      published: false,
      author: "Updated Author",
      tags: ["updated", "tags"],
    };

    const updateEntityMock = mock.method(postController, "updateEntity", async (_req, reply) => {
      reply.code(500).send({ error: "Failed to update post" });
    });

    const response = await app.inject({
      method: "PUT",
      url: `/api/v1/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${validToken}`,
      },
      payload: updateData,
    });

    assert.strictEqual(response.statusCode, 500);
    assert.deepStrictEqual(JSON.parse(response.body), {
      error: "Failed to update post",
    });
    assert.strictEqual(updateEntityMock.mock.calls.length, 1);
  });

  test("should require authentication", async (t) => {
    setupAuthMock.failure();

    const postId = "1";
    const updateData = {
      title: "Updated Post Title",
      content: "Updated post content",
      published: false,
      author: "Updated Author",
      tags: ["updated", "tags"],
    };

    const response = await app.inject({
      method: "PUT",
      url: `/api/v1/posts/${postId}`,
      payload: updateData,
    });

    assert.strictEqual(response.statusCode, 401);
  });
});

// import assert from 'node:assert';
// import { mock, afterEach, describe, it } from 'node:test';
// import sinon from "sinon";
// import request from "supertest";
// import app from "#app.js";
// import type {
// 	CreatePostDTO,
// 	PostDTO,
// 	UpdatePostDTO,
// } from "#components/post/model.js";
// import PostService from "#components/post/service.js";
// import { FirebaseError } from '#services/firestore-error.js';
// import { mockSuccessfulAuth } from '../__mock__/firebaseAuth.js';

// describe("Post API Endpoints", () => {
// 	const validToken = 'valid-test-token';

// 	afterEach(() => {
// 		sinon.restore();
// 		mock.reset();
// 	});

// 	describe("POST /api/v1/posts", () => {
// 		mockSuccessfulAuth()

// 		it("should create a new post", async () => {
// 			const postData: CreatePostDTO = {
// 				title: "11th Post",
// 				content: "This is my 11th ID post",
// 				published: true,
// 				author: "Emm Carr",
// 				tags: ["tech", "lifestyle", "coding"],
// 			};

// 			const createPostStub = sinon
// 				.stub(PostService.prototype, "addPost")
// 				.resolves();

// 			const response = await request(app)
// 			.post("/api/v1/posts")
// 			.set('Authorization', `Bearer ${validToken}`)
// 			.send(postData);

// 			assert.strictEqual(createPostStub.calledOnce, true);
// 			assert.strictEqual(response.status, 201);
// 			assert.deepStrictEqual(response.body.message, "Post created successfully");
// 		});

// 		it("should handle validation errors", async () => {
// 			const postDataWithoutTitle: Omit<CreatePostDTO, "title"> = {
// 				content: "This is my 11th ID post",
// 				published: true,
// 				author: "Emm Carr",
// 				tags: ["tech", "lifestyle", "coding"],
// 			};

// 			const response = await request(app)
// 				.post("/api/v1/posts")
// 				.set('Authorization', `Bearer ${validToken}`)
// 				.send(postDataWithoutTitle);

// 			assert.strictEqual(response.status, 409);
// 			assert.deepStrictEqual(response.body.error[0], {
// 				message: "title is required",
// 				path: "title",
// 			});
// 		});

// 		it("should handle server errors", async () => {
// 			const postData: CreatePostDTO = {
// 				title: "11th Post",
// 				content: "This is my 11th ID post",
// 				published: true,
// 				author: "Emm Carr",
// 				tags: ["tech", "lifestyle", "coding"],
// 			};

// 			const createPostStub = sinon
// 				.stub(PostService.prototype, "addPost")
// 				.throws(new Error("Database Error"));

// 			const response = await request(app)
// 			.post("/api/v1/posts")
// 			.set('Authorization', `Bearer ${validToken}`)
// 			.send(postData);

// 			assert.strictEqual(response.status, 500);
// 			assert.deepStrictEqual(response.body, { error: "Failed to create post" });
// 			assert.strictEqual(createPostStub.calledOnce, true);
// 		});
// 	});

// 	describe("PUT /api/v1/posts/:id", () => {
// 		mockSuccessfulAuth()

// 		it("should update an existing post", async () => {
// 			const postId = "1";
// 			const postData: UpdatePostDTO = {
// 				title: "Updated Post Title",
// 				content: "Updated post content",
// 				published: false,
// 				author: "Updated Author",
// 				tags: ["updated", "tags"],
// 			};

// 			const updatePostStub = sinon
// 				.stub(PostService.prototype, "updatePost")
// 				.resolves();

// 			const response = await request(app)
// 				.put(`/api/v1/posts/${postId}`)
// 				.set('Authorization', `Bearer ${validToken}`)
// 				.send(postData);

// 			assert.strictEqual(updatePostStub.calledOnce, true);
// 			assert.strictEqual(updatePostStub.calledWith(postId, postData), true);
// 			assert.strictEqual(response.status, 200);
// 			assert.deepStrictEqual(response.body.message, "Post updated successfully");
// 		});

// 		it("should handle server errors", async () => {
// 			const postId = "1";
// 			const postData: UpdatePostDTO = {
// 				title: "Updated Post Title",
// 				content: "Updated post content",
// 				published: false,
// 				author: "Updated Author",
// 				tags: ["updated", "tags"],
// 			};

// 			const updatePostStub = sinon
// 				.stub(PostService.prototype, "updatePost")
// 				.throws(new Error("Database Error"));

// 			const response = await request(app)
// 				.put(`/api/v1/posts/${postId}`)
// 				.set('Authorization', `Bearer ${validToken}`)
// 				.send(postData);

// 			assert.strictEqual(response.status, 500);
// 			assert.deepStrictEqual(response.body, { error: "Failed to update post" });
// 			assert.strictEqual(updatePostStub.calledOnce, true);
// 		});
// 	});

// 	describe("GET /api/v1/posts", () => {
// 		it("should return a list of posts", async () => {
// 			const mockPosts: PostDTO[] = [
// 				{
// 					id: "1",
// 					title: "Test Post 1",
// 					content: "This is the first test post.",
// 					author: "Author 1",
// 					tags: ["tag1"],
// 					published: true,
// 					updatedAt: Date.now(),
// 					createdAt: Date.now(),
// 				},
// 				{
// 					id: "2",
// 					title: "Test Post 2",
// 					content: "This is the second test post.",
// 					author: "Author 2",
// 					tags: ["tag2"],
// 					published: true,
// 					updatedAt: Date.now(),
// 					createdAt: Date.now(),
// 				},
// 			];

// 			sinon.stub(PostService.prototype, "getAllPosts").resolves(mockPosts);

// 			const response = await request(app)
// 				.get("/api/v1/posts")
// 				.query({ count: 2 });

// 			assert.strictEqual(response.status, 200);
// 			assert.deepStrictEqual(response.body, mockPosts);
// 		});

// 		it("should handle server errors", async () => {
// 			sinon
// 				.stub(PostService.prototype, "getAllPosts")
// 				.throws(new Error("Database Error"));

// 			const response = await request(app).get("/api/v1/posts");

// 			assert.strictEqual(response.status, 500);
// 			assert.deepStrictEqual(response.body, { error: "Failed to get posts" });
// 		});
// 	});

// 	describe("GET /api/v1/posts/:id", () => {
// 		it("should return a post by ID", async () => {
// 			const mockPost: PostDTO = {
// 				id: "1",
// 				title: "Test Post",
// 				content: "Test Content",
// 				author: "Author 1",
// 				tags: ["tag1"],
// 				published: true,
// 				updatedAt: Date.now(),
// 				createdAt: Date.now(),
// 			};

// 			const getPostByIdStub = sinon
// 				.stub(PostService.prototype, "getPostById")
// 				.resolves(mockPost);

// 			const response = await request(app).get("/api/v1/posts/1");

// 			assert.strictEqual(getPostByIdStub.calledOnce, true);
// 			assert.strictEqual(response.status, 200);
// 			assert.deepStrictEqual(response.body, mockPost);
// 		});

// 		it("should return 404 if post not found", async () => {
// 			sinon.stub(PostService.prototype, "getPostById").resolves(null);

// 			const response = await request(app).get("/api/v1/posts/1");

// 			assert.strictEqual(response.status, 404);
// 			assert.deepStrictEqual(response.body, { message: "Post with given ID not found" });
// 		});

// 		it("should handle server errors", async () => {
// 			sinon
// 				.stub(PostService.prototype, "getPostById")
// 				.throws(new Error("Failed to get post"));

// 			const response = await request(app).get("/api/v1/posts/1");

// 			assert.strictEqual(response.status, 500);
// 			assert.deepStrictEqual(response.body, { error: "Failed to get post" });
// 		});
// 	});

// 	describe("DELETE /api/v1/posts/:id", () => {
// 		it("should delete a post", async () => {
// 			const postId = "1";

// 			const deletePostStub = sinon
// 				.stub(PostService.prototype, "deletePost")
// 				.resolves();

// 			const response = await request(app)
// 			.delete(`/api/v1/posts/${postId}`)
// 			.set('Authorization', `Bearer ${validToken}`);

// 			assert.strictEqual(deletePostStub.calledOnce, true);
// 			assert.strictEqual(deletePostStub.calledWith(postId), true);
// 			assert.strictEqual(response.status, 200);
// 			assert.strictEqual(response.body.message, "Post deleted successfully");
// 		});

// 		it("should return 404 if post not found", async () => {
// 			const postId = "nonexistent-id";

// 			const deletePostStub = sinon
// 				.stub(PostService.prototype, "deletePost")
// 				.throws(new FirebaseError("Post does not exist", 404));

// 			const response = await request(app)
// 			.delete(`/api/v1/posts/${postId}`)
// 			.set('Authorization', `Bearer ${validToken}`);

// 			assert.strictEqual(deletePostStub.calledOnce, true);
// 			assert.strictEqual(response.status, 404);
// 			assert.deepStrictEqual(response.body, { error: "Post not found" });
// 		});

// 		it("should handle server errors", async () => {
// 			const postId = "1";

// 			const deletePostStub = sinon
// 				.stub(PostService.prototype, "deletePost")
// 				.throws(new Error("Database Error"));

// 			const response = await request(app)
// 			.delete(`/api/v1/posts/${postId}`)
// 			.set('Authorization', `Bearer ${validToken}`);

// 			assert.strictEqual(deletePostStub.calledOnce, true);
// 			assert.strictEqual(response.status, 500);
// 			assert.deepStrictEqual(response.body, { error: "Failed to delete post" });
// 		});
// 	});
// });
