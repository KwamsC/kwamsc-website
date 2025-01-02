import type {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import type { FirestoreEntity } from "./firestore.js";

export const firestoreConverter: FirestoreDataConverter<FirestoreEntity> = {
	toFirestore: (entity: FirestoreEntity) => entity,
	fromFirestore: (snapshot: QueryDocumentSnapshot) =>
		snapshot.data() as FirestoreEntity,
};
