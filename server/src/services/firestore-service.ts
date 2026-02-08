import { db } from "../config/db.ts";
import { firestoreConverter } from "../helpers/firestore-converter.ts";
import type {
  FirestoreCreateDto,
  FirestoreUpdateDto,
  FirestoreEntity,
} from "../helpers/firestore.ts";
import { FirebaseError } from "./firestore-error.ts";
import type { Timestamp } from "firebase-admin/firestore";

export const addEntityToFirestore = async (
  collectionName: string,
  entityData: FirestoreCreateDto,
): Promise<void> => {
  const timestamp = Date.now();
  const entityRef = db.collection(collectionName).doc();

  await entityRef.set({
    id: entityRef.id,
    ...entityData,
    createdAt: timestamp,
    updatedAt: null,
  });
};

export const updateEntityInFirestore = async (
  collectionName: string,
  id: string,
  entityData: FirestoreUpdateDto,
): Promise<void> => {
  const timestamp = Date.now();
  const entityRef = db.collection(collectionName).doc(id);

  await entityRef.update({
    ...entityData,
    updatedAt: timestamp,
  });
};

export const getEntityFromFirestore = async <T extends FirestoreEntity>(
  collectionName: string,
  id: string,
): Promise<T | null> => {
  const entityRef = db
    .collection(collectionName)
    .doc(id)
    .withConverter(firestoreConverter);
  const docSnap = await entityRef.get();

  return docSnap.exists ? (docSnap.data() as T) : null;
};

export const deleteEntityFromFirestore = async (
  collectionName: string,
  id: string,
): Promise<void> => {
  const docRef = db.collection(collectionName).doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists)
    throw new FirebaseError(`${collectionName} does not exist`, 404);

  await docRef.delete();
};

export const getAllEntitiesFromFirestore = async <T extends FirestoreEntity>(
  collectionName: string,
  count: number,
): Promise<T[]> => {
  const entities: T[] = [];
  const querySnapshot = await db
    .collection(collectionName)
    .withConverter(firestoreConverter)
    .orderBy("createdAt", "asc")
    .limit(count)
    .get();

  if (querySnapshot.empty) {
    throw new Error(`No ${collectionName.toLowerCase()}s found`);
  }

  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      console.log(doc.data());
      entities.push(doc.data() as T);
    }
  });

  return entities;
};
