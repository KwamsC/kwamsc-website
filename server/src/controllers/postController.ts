import { RequestHandler, Request, Response } from "express";
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
import { postConverter } from "../helpers/firebaseConverters";
import { handleFirestoreOperation } from "../helpers/handleFirestoreOperation";

/**
 * @desc    Create a new document in the "posts" collection
 * @route   POST /api/posts
 * @access  Private
 * @param   {Request} req - Express request object
 * @param   {Response} res - Express response object
 */
const addPost:RequestHandler = async (req: Request, res: Response) => {
  const data:Post = req.body;

  await handleFirestoreOperation(
    () => addDoc(collection(db, "posts"), data),
    "Post saved successfully",
    "Failed to save post",
    res
  );
};

/**
 * @desc    Update a document by id in the "posts" collection
 * @route   PUT /api/posts/:id
 * @access  Private
 * @param   {Request} req - Express request object
 * @param   {Response} res - Express response object
 */
const updatePost:RequestHandler = async (req: Request, res:Response) => {
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

/**
 * @desc    Get a document by id from the "posts" collection
 * @route   GET /api/posts/:id
 * @access  Public
 * @param   {Request} req - Express request object
 * @param   {Response} res - Express response object
 */
const getPost:RequestHandler = async (req: Request, res: Response) => {
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

/**
 * @desc    Delete a post by id from the "posts" collection
 * @route   DELETE /api/posts/:id
 * @access  Private
 * @param   {Request} req - Express request object
 * @param   {Response} res - Express response object
 */
const deletePost:RequestHandler = async (req: Request, res: Response) => {
  const id = req.params.id;

  await handleFirestoreOperation(
    () => deleteDoc(doc(db, "posts", id)),
    "Record deleted successfully",
    "Failed to delete record",
    res
  );
};

/**
 * @desc    Get all posts from the "posts" collection
 * @route   GET /api/posts
 * @access  Public
 * @param   {Request} req - Express request object
 * @param   {Response} res - Express response object
 */
const getAllPosts:RequestHandler = async (req: Request, res: Response) => {
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
