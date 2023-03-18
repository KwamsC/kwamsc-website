import { Request, Response, NextFunction } from "express";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../db";
import { Post } from "../models/post";

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

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const post = req.body;

    await setDoc(doc(db, "posts", id), post, { merge: true });
    res.send("Post updated succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await getDoc(doc(db, "posts", id));

    if (post.exists()) {
      res.send(post.data());
    } else {
      res.status(404).send("Post with given ID is not found");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "posts", id));
    res.send("Record deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts: Post[] = [];

    const converter = {
      toFirestore: (data: Post) => data,
      fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Post,
    };

    const querySnapshot = await getDocs(
      collection(db, "posts").withConverter(converter)
    );

    if (querySnapshot.empty) {
      res.status(404).send("No posts found");
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          posts.push({ id: doc.id, ...doc.data() });
        }
        console.log(`${doc.id} => ${doc.data()}`);
      });

      res.send(posts);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { addPost, getPost, getAllPosts, updatePost, deletePost };
