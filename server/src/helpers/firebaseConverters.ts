import { QueryDocumentSnapshot } from "firebase/firestore";
import { Post } from "models/postSchema";

export const postConverter = {
  toFirestore: (post: Post) => post,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Post,
};
