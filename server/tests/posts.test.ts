import assert from 'node:assert';
import { mock, afterEach, describe, it } from 'node:test';
import sinon from "sinon";
import request from "supertest";
import app from "#app.js";
import type {
	CreatePostDTO,
	PostDTO,
	UpdatePostDTO,
} from "#components/post/model.js";
import PostService from "#components/post/service.js";
import { FirebaseError } from '#services/firestore-error.js';
import { mockSuccessfulAuth } from '../__mock__/firebaseAuth.js';

describe("Post API Endpoints", () => {
	const validToken = 'valid-test-token';

	afterEach(() => {
		sinon.restore();
		mock.reset();
	});

	describe("POST /api/v1/posts", () => {
		mockSuccessfulAuth()

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

			const response = await request(app)
			.post("/api/v1/posts")
			.set('Authorization', `Bearer ${validToken}`)
			.send(postData);

			assert.strictEqual(createPostStub.calledOnce, true);
			assert.strictEqual(response.status, 201);
			assert.deepStrictEqual(response.body.message, "Post created successfully");
		});

		it("should handle validation errors", async () => {
			const postDataWithoutTitle: Omit<CreatePostDTO, "title"> = {
				content: "This is my 11th ID post",
				published: true,
				author: "Emm Carr",
				tags: ["tech", "lifestyle", "coding"],
			};

			const response = await request(app)
				.post("/api/v1/posts")
				.set('Authorization', `Bearer ${validToken}`)
				.send(postDataWithoutTitle);

			assert.strictEqual(response.status, 409);
			assert.deepStrictEqual(response.body.error[0], {
				message: "title is required",
				path: "title",
			});
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

			const response = await request(app)
			.post("/api/v1/posts")
			.set('Authorization', `Bearer ${validToken}`)
			.send(postData);

			assert.strictEqual(response.status, 500);
			assert.deepStrictEqual(response.body, { error: "Failed to create post" });
			assert.strictEqual(createPostStub.calledOnce, true);
		});
	});

	describe("PUT /api/v1/posts/:id", () => {
		mockSuccessfulAuth()

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

			const response = await request(app)
				.put(`/api/v1/posts/${postId}`)
				.set('Authorization', `Bearer ${validToken}`)
				.send(postData);

			assert.strictEqual(updatePostStub.calledOnce, true);
			assert.strictEqual(updatePostStub.calledWith(postId, postData), true);
			assert.strictEqual(response.status, 200);
			assert.deepStrictEqual(response.body.message, "Post updated successfully");
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

			const response = await request(app)
				.put(`/api/v1/posts/${postId}`)
				.set('Authorization', `Bearer ${validToken}`)
				.send(postData);

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

			const response = await request(app)
				.get("/api/v1/posts")
				.query({ count: 2 });

			assert.strictEqual(response.status, 200);
			assert.deepStrictEqual(response.body, mockPosts);
		});

		it("should handle server errors", async () => {
			sinon
				.stub(PostService.prototype, "getAllPosts")
				.throws(new Error("Database Error"));

			const response = await request(app).get("/api/v1/posts");

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

			const response = await request(app).get("/api/v1/posts/1");

			assert.strictEqual(getPostByIdStub.calledOnce, true);
			assert.strictEqual(response.status, 200);
			assert.deepStrictEqual(response.body, mockPost);
		});

		it("should return 404 if post not found", async () => {
			sinon.stub(PostService.prototype, "getPostById").resolves(null);

			const response = await request(app).get("/api/v1/posts/1");

			assert.strictEqual(response.status, 404);
			assert.deepStrictEqual(response.body, { message: "Post with given ID not found" });
		});

		it("should handle server errors", async () => {
			sinon
				.stub(PostService.prototype, "getPostById")
				.throws(new Error("Failed to get post"));

			const response = await request(app).get("/api/v1/posts/1");

			assert.strictEqual(response.status, 500);
			assert.deepStrictEqual(response.body, { error: "Failed to get post" });
		});
	});

	describe("DELETE /api/v1/posts/:id", () => {
		it("should delete a post", async () => {
			const postId = "1";

			const deletePostStub = sinon
				.stub(PostService.prototype, "deletePost")
				.resolves();

			const response = await request(app)
			.delete(`/api/v1/posts/${postId}`)
			.set('Authorization', `Bearer ${validToken}`);
			
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

			const response = await request(app)
			.delete(`/api/v1/posts/${postId}`)
			.set('Authorization', `Bearer ${validToken}`);

			assert.strictEqual(deletePostStub.calledOnce, true);
			assert.strictEqual(response.status, 404);
			assert.deepStrictEqual(response.body, { error: "Post not found" });
		});

		it("should handle server errors", async () => {
			const postId = "1";

			const deletePostStub = sinon
				.stub(PostService.prototype, "deletePost")
				.throws(new Error("Database Error"));

			const response = await request(app)
			.delete(`/api/v1/posts/${postId}`)
			.set('Authorization', `Bearer ${validToken}`);

			assert.strictEqual(deletePostStub.calledOnce, true);
			assert.strictEqual(response.status, 500);
			assert.deepStrictEqual(response.body, { error: "Failed to delete post" });
		});
	});
});