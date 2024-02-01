import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
  RulesTestContext,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const PROJECT_ID = 'kwame-website';
let firebase: RulesTestEnvironment;

// Initialize the Firestore emulator database
const getFireBase: Promise<RulesTestEnvironment> = initializeTestEnvironment({
  projectId: PROJECT_ID,
  firestore: {
    host: 'localhost',
    port: 8081,
  },
});

const getFireStore = (context: RulesTestContext) => {
  return context.firestore();
};

beforeEach(async () => {
  firebase = await getFireBase;
});

afterAll((done) => {
  // Closing the firestore connection allows Jest to exit successfully.
  firebase.cleanup();
  done();
});

describe('posts', () => {
  it('should see post data', async () => {
    const auth = firebase.unauthenticatedContext();
    const db = getFireStore(auth);
    const docRef = doc(db, 'posts', '1');
    const docSnap = getDoc(docRef);

    await assertSucceeds(docSnap);
  });

  it('should not be able to write post data as an unauthenticated user', async () => {
    const auth = firebase.unauthenticatedContext();
    const db = getFireStore(auth);

    await assertFails(setDoc(doc(db, 'posts/postId'), {}));
  });

  it('should be able to write post or update data as an authenticated user', async () => {
    const auth = firebase.authenticatedContext('adminID');
    const db = getFireStore(auth);
    const postRef = 'posts/postId';
    const postData = {
      title: 'title',
      content: 'content',
      author: 'author',
    };

    await assertSucceeds(setDoc(doc(db, postRef), postData));
  });

  it('should not be able to delete post data as an unauthenticated user', async () => {
    const auth = firebase.unauthenticatedContext();
    const db = getFireStore(auth);
    const postRef = 'posts/postId';

    await assertFails(deleteDoc(doc(db, postRef)));
  });

  it('should be able to delete post data as an authenticated user', async () => {
    const auth = firebase.authenticatedContext('adminID');
    const db = getFireStore(auth);
    const postRef = 'posts/postId';

    await assertSucceeds(deleteDoc(doc(db, postRef)));
  });
});
