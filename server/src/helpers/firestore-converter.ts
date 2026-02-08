import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { FirestoreEntity } from "./firestore.ts";

export const firestoreConverter: FirestoreDataConverter<FirestoreEntity> = {
  toFirestore: (entity: FirestoreEntity) => entity,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    snapshot.data() as FirestoreEntity,
};
