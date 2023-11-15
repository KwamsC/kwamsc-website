import { QueryDocumentSnapshot } from "firebase/firestore";
import { Post } from "../models/post";

export const postConverter = {
  toFirestore: (post: Post) => post,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Post,
};
