import { RequestHandler } from "express";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../db";
import { Post } from "../models/post";
import { postConverter } from "../utils/firebaseConverters";
import { handleFirestoreOperation } from "../utils/handleFirestoreOperation";

// Add a new document in collection "posts"
// @desc    Create a new document in collection "posts"
// @route   POST /api/post/:id
// @access  Private
const addPost:RequestHandler = async (req, res) => {
  const data:Post = req.body;

  await handleFirestoreOperation(
    () => addDoc(collection(db, "posts"), data),
    "Post saved successfully",
    "Failed to save post",
    res
  );
};

// @desc    Update a document by id in collection "posts"
// @route   PUT /api/post/:id
// @access  Private
const updatePost:RequestHandler = async (req, res) => {
  const id = req.params.id;
  const post = req.body;
  const postRef = doc(db, "posts", id).withConverter(postConverter);

  await handleFirestoreOperation(
    () => updateDoc(postRef, post),
    'Post updated succesfully',
    'Failed to update post',
    res
  )
};

// @desc    Gets a document by id in collection "posts"
// @route   GET /api/post/:id
// @access  Public
const getPost:RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const ref = doc(db, "posts", id).withConverter(postConverter);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const post = docSnap.data();
      res.send(post);
    } else {
      res.status(404).send("Post with given ID is not found");
    }
  } catch (err ) {
    if (err instanceof Error){
      res.status(400).send(err.message);
    }
  }
};

// @desc    Delete post by id from collection "posts"
// @route   DELETE /api/post/:id
// @access  Private
const deletePost:RequestHandler = async (req, res) => {
  const id = req.params.id;

  await handleFirestoreOperation(
    () => deleteDoc(doc(db, "posts", id)),
    "Record deleted successfully",
    "Failed to delete record",
    res
  );
};

// @desc    Get posts from collection "posts"
// @route   GET /api/posts
// @access  Public
const getAllPosts:RequestHandler = async (req, res) => {
  try {
    const posts: Post[] = [];
    const querySnapshot = await getDocs(
      collection(db, "posts").withConverter(postConverter)
    );

    if (querySnapshot.empty) {
      res.status(404).send("No posts found");
      return;
    }
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        posts.push({ ...doc.data(), id: doc.id, });
      }
    });

    res.send(posts);
  } catch (err) {
    if (err instanceof Error){
      res.status(400).send(err.message);
    }
  }
};

export { addPost, getPost, getAllPosts, updatePost, deletePost };
