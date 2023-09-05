import { Request, Response, NextFunction } from "express";
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

// Add a new document in collection "posts"
const addPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    await addDoc(collection(db, "posts"), data);

    res.send("Post saved succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update a document by id in collection "posts"
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const post = req.body;
    const postRef = doc(db, "posts", id).withConverter(postConverter);

    await updateDoc(postRef, post);
    res.send("Post updated succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Gets a document by id in collection "posts"
const getPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const postRef = doc(db, "posts", id).withConverter(postConverter);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const post = docSnap.data();
      res.send(post);
    } else {
      res.status(404).send("Post with given ID is not found");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Deletes a document by id in collection "posts"
const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await deleteDoc(doc(db, "posts", id));
    res.send("Record deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Gets all documents in collection "posts"
const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts: Post[] = [];
    const querySnapshot = await getDocs(
      collection(db, "posts").withConverter(postConverter)
    );

    if (querySnapshot.empty) {
      res.status(404).send("No posts found");
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          posts.push({ id: doc.id, ...doc.data() });
        }
      });

      res.send(posts);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { addPost, getPost, getAllPosts, updatePost, deletePost };
