import request from 'supertest';
import app from '../src/app';
import sinon from 'sinon';
import { describe, expect, it, afterEach, jest } from '@jest/globals';
import PostService from '../src/components/post/service';
import { FirebaseError } from '../src/services/firestore-error';
import { CreatePostDTO, PostDTO, UpdatePostDTO } from '../src/components/post/model';

// Mock the authenticateJWT middleware
jest.mock('../src/middleware/authenticateJWT', () => ({
  authenticateJWT: (_req: Request, _res: Response, next) => next()
}));

afterEach(() => {
  sinon.restore();
});

describe('POST /api/v1/posts', () => {
  it('should create a new post', async () => {
    const postData: CreatePostDTO = {
      title: '11th Post',
      content: 'This is my 11th ID post',
      published: true,
      author: 'Emm Carr',
      tags: ['tech', 'lifestyle', 'coding'],
    };

    const createPostStub = sinon.stub(PostService.prototype, 'addPost').resolves();

    const response = await request(app)
      .post('/api/v1/posts')
      .send(postData);

    expect(createPostStub.calledOnce).toBe(true);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created successfully');
  });

  it('should handle validation errors', async () => {
    const postDataWithoutTitle: Omit<CreatePostDTO, 'title'> = {
      content: 'This is my 11th ID post',
      published: true,
      author: 'Emm Carr',
      tags: ['tech', 'lifestyle', 'coding']
    };

    const response = await request(app)
      .post('/api/v1/posts')
      .send(postDataWithoutTitle);

    expect(response.status).toBe(409);
    expect(response.body.error[0]).toEqual({message: 'title is required', path: 'title'});
  });

  it('should handle server errors', async () => {
    const postData: CreatePostDTO = {
      title: '11th Post',
      content: 'This is my 11th ID post',
      published: true,
      author: 'Emm Carr',
      tags: ['tech', 'lifestyle', 'coding'],
    };

    const createPostStub = sinon.stub(PostService.prototype, 'addPost').throws(new Error('Database Error'));

    const response = await request(app)
      .post('/api/v1/posts')
      .send(postData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to create post' });
    expect(createPostStub.calledOnce).toBe(true);
  });
});

describe('PUT /api/v1/posts/:id', () => {
  it('should update an existing post', async () => {
    const postId = '1';
    const postData: UpdatePostDTO = {
      title: 'Updated Post Title',
      content: 'Updated post content',
      published: false,
      author: 'Updated Author',
      tags: ['updated', 'tags'],
    };

    const updatePostStub = sinon.stub(PostService.prototype, 'updatePost').resolves();

    const response = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .send(postData);

    expect(updatePostStub.calledOnce).toBe(true);
    expect(updatePostStub.calledWith(postId, postData)).toBe(true);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post updated successfully');
  });

  it('should handle server errors', async () => {
    const postId = '1';
    const postData: UpdatePostDTO = {
      title: 'Updated Post Title',
      content: 'Updated post content',
      published: false,
      author: 'Updated Author',
      tags: ['updated', 'tags'],
    };

    const updatePostStub = sinon.stub(PostService.prototype, 'updatePost').throws(new Error('Database Error'));

    const response = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .send(postData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to update post' });
    expect(updatePostStub.calledOnce).toBe(true);
  });
});

describe('GET /api/v1/posts', () => {
  it('should return a list of posts', async () => {
    const mockPosts: PostDTO[] = [
      { 
        id: '1', 
        title: 'Test Post 1', 
        content: 'This is the first test post.', 
        author: 'Author 1',
        tags: ['tag1'], 
        published: true, 
        updatedAt: Date.now(), 
        createdAt: Date.now(),
      },
      { 
        id: '2', 
        title: 'Test Post 2', 
        content: 'This is the second test post.', 
        author: 'Author 2', 
        tags: ['tag2'], 
        published: true, 
        updatedAt: Date.now(), 
        createdAt: Date.now() },
    ];

    sinon.stub(PostService.prototype, 'getAllPosts').resolves(mockPosts);

    const response = await request(app).get('/api/v1/posts').query({ count: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockPosts);
  });

  it('should handle server errors', async () => {
    sinon.stub(PostService.prototype, 'getAllPosts').throws(new Error('Database Error'));

    const response = await request(app).get('/api/v1/posts');

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: 'Failed to get posts' });
  });
});

describe('GET /api/v1/posts/:id', () => {
  it('should return a post by ID', async () => {
    const mockPost: PostDTO = { 
      id: '1', 
      title: 'Test Post', 
      content: 'Test Content', 
      author: 'Author 1', 
      tags: ['tag1'], 
      published: true, 
      updatedAt: Date.now(), 
      createdAt: Date.now() 
    };
    
    const getPostByIdStub = sinon.stub(PostService.prototype, 'getPostById').resolves(mockPost);

    const response = await request(app).get('/api/v1/posts/1');

    expect(getPostByIdStub.calledOnce).toBe(true);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockPost);
  });

  it('should return 404 if post not found', async () => {
    sinon.stub(PostService.prototype, 'getPostById').resolves(null);

    const response = await request(app).get('/api/v1/posts/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post with given ID not found' });
  });

  it('should handle server errors', async () => {
    sinon.stub(PostService.prototype, 'getPostById').throws(new Error('Failed to get post'));

    const response = await request(app).get('/api/v1/posts/1');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to get post' });
  });
});

describe('DELETE /api/v1/posts/:id', () => {
  it('should delete a post', async () => {
    const postId = '1';

    const deletePostStub = sinon.stub(PostService.prototype, 'deletePost').resolves();

    const response = await request(app)
      .delete(`/api/v1/posts/${postId}`);

    expect(deletePostStub.calledOnce).toBe(true);
    expect(deletePostStub.calledWith(postId)).toBe(true);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted successfully');
  });

  it('should return 404 if post not found', async () => {
    const postId = 'nonexistent-id';

    const deletePostStub = sinon.stub(PostService.prototype, 'deletePost').throws(new FirebaseError('Post does not exist', 404));

    const response = await request(app)
      .delete(`/api/v1/posts/${postId}`);

    expect(deletePostStub.calledOnce).toBe(true);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Post not found' });
  });

  it('should handle server errors', async () => {
    const postId = '1';

    const deletePostStub = sinon.stub(PostService.prototype, 'deletePost').throws(new Error('Database Error'));

    const response = await request(app)
      .delete(`/api/v1/posts/${postId}`);

    expect(deletePostStub.calledOnce).toBe(true);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to delete post' });
  });
});
