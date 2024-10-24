import { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";
import { Entity } from "../config/firestore";

export const firestoreConverter: FirestoreDataConverter<Entity> = {
  toFirestore: (entity: Entity) => entity,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Entity,
};