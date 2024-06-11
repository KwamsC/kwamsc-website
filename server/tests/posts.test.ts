import request from 'supertest';
import app from '../src/app';
import sinon from 'sinon';
import PostService from '../src/components/post/service';

// Mock the authenticateJWT middleware
jest.mock('../src/middleware/authenticateJWT', () => ({
  authenticateJWT: (req, res, next) => next()
}));

afterEach(() => {
  sinon.restore();
});

describe('POST /api/v1/posts', () => {
  it('should create a new post', async () => {
    const postData = {
      title: '11th Post',
      content: 'This is my 11th ID post',
      published: true,
      author: 'Emm Carr',
      tags: ['tech', 'lifestyle', 'coding']
    };

    const createPostStub = sinon.stub(PostService.prototype, 'addPost').resolves(postData);

    const response = await request(app)
      .post('/api/v1/posts')
      .send(postData);

    expect(createPostStub.calledOnce).toBe(true);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created successfully');
  });

  it('should handle server errors', async () => {
    const postData = {
      title: '11th Post',
      content: 'This is my 11th ID post',
      published: true,
      author: 'Emm Carr',
      tags: ['tech', 'lifestyle', 'coding']
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

describe('GET /api/v1/posts', () => {
  it('should return a list of posts', async () => {
    const mockPosts = [
      { id: '1', title: 'Test Post 1', content: 'This is the first test post.' },
      { id: '2', title: 'Test Post 2', content: 'This is the second test post.' },
    ];

    sinon.stub(PostService.prototype, 'getAllPosts').resolves(mockPosts);

    const response = await request(app).get('/api/v1/posts').query({ count: 2 }); ;

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockPosts);
  });

  it('should return 500 on server error', async () => {
    sinon.stub(PostService.prototype, 'getAllPosts').throws(new Error('Database Error'));

    const response = await request(app).get('/api/v1/posts');

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ error: 'Failed to get posts' });
  });
});

describe('GET /api/v1/posts/:id', () => {
  it('should return a post by ID', async () => {
    const mockPost = { id: '1', title: 'Test Post', content: 'Test Content' };
    
    sinon.stub(PostService.prototype, 'getPostById').resolves(mockPost);

    const response = await request(app).get('/api/v1/posts/jkhui');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockPost);
  });

  it('should return 404 if post not found', async () => {
    sinon.stub(PostService.prototype, 'getPostById').resolves(null);

    const response = await request(app).get('/api/v1/posts/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Post with given ID not found' });
  });
  

  it('should handle errors gracefully', async () => {
    sinon.stub(PostService.prototype, 'getPostById').throws(new Error('Failed to get post'));

    const response = await request(app).get('/api/v1/posts/1');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to get post' });
  });
});


// import {
//   initializeTestEnvironment,
//   // assertFails,
//   assertSucceeds,
//   RulesTestEnvironment,
//   RulesTestContext,
// } from '@firebase/rules-unit-testing';
// import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

// const PROJECT_ID = 'kwame-website';
// let firebase: RulesTestEnvironment;

// // Initialize the Firestore emulator database
// const getFireBase: Promise<RulesTestEnvironment> = initializeTestEnvironment({
//   projectId: PROJECT_ID,
//   firestore: {
//     host: 'localhost',
//     port: 8081,
//   },
// });

// const getFireStore = (context: RulesTestContext) => {
//   return context.firestore();
// };

// beforeEach(async () => {
//   firebase = await getFireBase;
// });

// afterAll((done) => {
//   // Closing the firestore connection allows Jest to exit successfully.
//   firebase.cleanup();
//   done();
// });

// describe('posts', () => {
//   it('should see post data', async () => {
//     const auth = firebase.unauthenticatedContext();
//     const db = getFireStore(auth);
//     const docRef = doc(db, 'posts', '1');
//     const docSnap = getDoc(docRef);

//     await assertSucceeds(docSnap);
//   });

//   // it('should not be able to write post data as an unauthenticated user', async () => {
//   //   const auth = firebase.unauthenticatedContext();
//   //   const db = getFireStore(auth);

//   //   await assertFails(setDoc(doc(db, 'posts/postId'), {}));
//   // });

//   it('should be able to write post or update data as an authenticated user', async () => {
//     const auth = firebase.authenticatedContext('adminID');
//     const db = getFireStore(auth);
//     const postRef = 'posts/postId';
//     const postData = {
//       title: 'title',
//       content: 'content',
//       author: 'author',
//     };

//     await assertSucceeds(setDoc(doc(db, postRef), postData));
//   });

//   // it('should not be able to delete post data as an unauthenticated user', async () => {
//   //   const auth = firebase.unauthenticatedContext();
//   //   const db = getFireStore(auth);
//   //   const postRef = 'posts/postId';

//   //   await assertFails(deleteDoc(doc(db, postRef)));
//   // });

//   it('should be able to delete post data as an authenticated user', async () => {
//     const auth = firebase.authenticatedContext('adminID');
//     const db = getFireStore(auth);
//     const postRef = 'posts/postId';

//     await assertSucceeds(deleteDoc(doc(db, postRef)));
//   });
// });
