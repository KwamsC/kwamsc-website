import { RequestHandler, Request, Response } from 'express';
import { Entity, CreateDto, UpdateDto } from '../models/common';
import {
  addEntityToFirestore,
  updateEntityInFirestore,
  getEntityFromFirestore,
  deleteEntityFromFirestore,
  getAllEntitiesFromFirestore,
  FirebaseError,
} from '../services/firestore-service';

class Controller<T extends Entity, C extends CreateDto, U extends UpdateDto> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public addEntity: RequestHandler = async (req: Request, res: Response) => {
    const entityData: C = req.body;

    try {
      await addEntityToFirestore(this.collectionName, entityData);
      res.status(201).json({ message: `${this.collectionName} saved successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Failed to save ${this.collectionName}` });
    }
  };

  public updateEntity: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const entity: U = req.body;

    try {
      await updateEntityInFirestore(this.collectionName, id, entity);
      res.status(200).json({ message: `${this.collectionName} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: `Failed to update ${this.collectionName}` });
    }
  };

  public getEntity: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const result = await getEntityFromFirestore(this.collectionName, id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: `${this.collectionName} with given ID not found` });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed to get ${this.collectionName}` });
    }
  };

  public deleteEntity: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      await deleteEntityFromFirestore(this.collectionName, id);
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 404) {
        res.status(404).json({ error: `${this.collectionName} not found` });
      } else {
        res.status(500).json({ error: 'Failed to delete record' });
      }
    }
  };

  public getAllEntities: RequestHandler = async (req: Request, res: Response) => {
    const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if count is not provided

    try {
      const entities: T[] = await getAllEntitiesFromFirestore(this.collectionName, count);
      res.status(200).json(entities);
    } catch (error) {
      res.status(500).json({ error: `Failed to get ${this.collectionName}` });
    }
  };
}

export default Controller;
