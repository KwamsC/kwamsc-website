import type { Entity } from "../config/firestore.ts";
import type { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

export const firestoreConverter: FirestoreDataConverter<Entity> = {
  toFirestore: (entity: Entity) => entity,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Entity,
};
