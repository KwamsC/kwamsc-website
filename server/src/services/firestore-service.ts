import { collection, setDoc, getDocs, getDoc, doc, deleteDoc, updateDoc, query, orderBy, limit, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../config/db';
import { Entity, CreateDto, UpdateDto } from '../models/common';

export class FirebaseError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

const firestoreConverter: FirestoreDataConverter<Entity> = {
  toFirestore: (entity: Entity) => entity,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Entity,
};

export const addEntityToFirestore = async (
  collectionName: string,
  entityData: CreateDto
): Promise<void> => {
  const timestamp = Date.now();
  const entityRef = doc(collection(db, collectionName));

  await setDoc(entityRef, {
    id: entityRef.id,
    ...entityData,
    createdAt: timestamp,
    updatedAt: null,
  });
};

export const updateEntityInFirestore = async (
  collectionName: string,
  id: string,
  entityData: UpdateDto
): Promise<void> => {
  const timestamp = Date.now();
  const entityRef = doc(db, collectionName, id);

  await updateDoc(entityRef, {
    ...entityData,
    updatedAt: timestamp,
  });
};

export const getEntityFromFirestore = async <T extends Entity>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const entityRef = doc(db, collectionName, id).withConverter(firestoreConverter);
  const docSnap = await getDoc(entityRef);

  return docSnap.exists() ? (docSnap.data() as T) : null;
};

export const deleteEntityFromFirestore = async (
  collectionName: string,
  id: string
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  const docDoc = await getDoc(docRef);

  if (!docDoc.exists()) throw new FirebaseError(`${collectionName} does not exist`, 404);
  
  await deleteDoc(doc(db, collectionName, id));
};

export const getAllEntitiesFromFirestore = async <T extends Entity>(
  collectionName: string,
  count: number
): Promise<T[]> => {
  const entities: T[] = [];
  const first = query(
    collection(db, collectionName).withConverter(firestoreConverter),
    orderBy('createdAt', 'asc'),
    limit(count)
  );

  const querySnapshot = await getDocs(first);

  if (querySnapshot.empty) {
    throw new Error(`No ${collectionName.toLowerCase()}s found`);
  }

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      console.log(doc.data());
      entities.push(doc.data() as T);
    }
  });

  return entities;
};
