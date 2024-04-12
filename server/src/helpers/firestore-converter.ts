import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore';
import { FirestoreEntity } from '../models/firestore';

export const firestoreConverter: FirestoreDataConverter<FirestoreEntity> = {
  toFirestore: (entity: FirestoreEntity) => entity,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as FirestoreEntity,
};
  