import { Response } from "express";
import { DocumentReference, DocumentData } from "firebase/firestore";

export const handleFirestoreOperation = async (
  operation: () => Promise<void | DocumentReference<DocumentData, DocumentData>>,
  successMessage: string,
  errorMessage: string,
  res: Response
) => {
  try {
    await operation();
    res.send(successMessage);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message || errorMessage);
    }
  }
};