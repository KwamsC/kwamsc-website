import { RequestHandler, Request, Response } from 'express';
import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import { Entity, CreateDto, UpdateDto } from '../models/common';
import {
  addEntityToFirestore,
  updateEntityInFirestore,
  getEntityFromFirestore,
  deleteEntityFromFirestore,
  getAllEntitiesFromFirestore,
} from '../services/firestore-service';


class Controller<T extends Entity, C extends CreateDto, U extends UpdateDto> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public addEntity = async (request: FastifyRequest<{ Body: C }>, reply: FastifyReply) => {
    const entityData = request.body as C;

    try {
      await addEntityToFirestore(this.collectionName, entityData);
      reply.code(201).send({ message: `${this.collectionName} saved successfully` });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: `Failed to save ${this.collectionName.toLowerCase()}` });
    }
  };

  // public addEntity: RequestHandler = async (req: Request, res: Response) => {
  //   const entityData: C = req.body;

  //   try {
  //     await addEntityToFirestore(this.collectionName, entityData);
  //     res.status(201).json({ message: `${this.collectionName} saved successfully` });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: `Failed to save ${this.collectionName.toLowerCase()}` });
  //   }
  // };

  public updateEntity = async (req: FastifyRequest<{ Params: { id: string }, Body: U }>, reply: FastifyReply) => {
    const id = req.params.id;
    const entity = req.body as U;

    try {
      await updateEntityInFirestore(this.collectionName, id, entity);
      reply.code(200).send({ message: `${this.collectionName} updated successfully` });
    } catch (error) {
      reply.code(500).send({ error: `Failed to update ${this.collectionName.toLowerCase()}` });
    }
  };

  // public updateEntity: RequestHandler = async (req: Request, res: Response) => {
  //   const id = req.params.id;
  //   const entity: U = req.body;

  //   try {
  //     await updateEntityInFirestore(this.collectionName, id, entity);
  //     res.status(200).json({ message: `${this.collectionName} updated successfully` });
  //   } catch (error) {
  //     res.status(500).json({ error: `Failed to update ${this.collectionName.toLowerCase()}` });
  //   }
  // };

  // public getEntity: RequestHandler = async (req: Request, res: Response) => {
  //   const id = req.params.id;

  //   try {
  //     const result = await getEntityFromFirestore(this.collectionName, id);
  //     if (result) {
  //       res.status(200).json(result);
  //     } else {
  //       res.status(404).json({ message: `${this.collectionName} with given ID not found` });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: `Failed to get ${this.collectionName}` });
  //   }
  // };

  public getEntity = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = req.params.id;

    try {
      const result = await getEntityFromFirestore(this.collectionName, id);
      if (result) {
        reply.code(200).send(result);
      } else {
        reply.code(404).send({ message: `${this.collectionName} with given ID not found` });
      }
    } catch (error) {
      reply.code(500).send({ error: `Failed to get ${this.collectionName}` });
    }
  };

  public deleteEntity = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = req.params.id;

    try {
      await deleteEntityFromFirestore(this.collectionName, id);
      reply.code(200).send({ message: 'Record deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete record' });
    }
  };

  // public deleteEntity: RequestHandler = async (req: Request, res: Response) => {
  //   const id = req.params.id;

  //   try {
  //     await deleteEntityFromFirestore(this.collectionName, id);
  //     res.status(200).json({ message: 'Record deleted successfully' });
  //   } catch (error) {
  //     res.status(500).json({ error: 'Failed to delete record' });
  //   }
  // };

  // public getAllEntities: RequestHandler = async (req: Request, res: Response) => {
  //   const count: number = parseInt(req.query.count as string, 10) || 10; // Default to 10 if count is not provided

  //   try {
  //     const entities: T[] = await getAllEntitiesFromFirestore(this.collectionName, count);
  //     res.status(200).json(entities);
  //   } catch (error) {
  //     res.status(500).json({ error: `Failed to get ${this.collectionName}` });
  //   }
  // };

  public getAllEntities = async (request: FastifyRequest<{ Querystring: { count?: string } }>, reply: FastifyReply) => {
    // const { count } = request.query as IQuery;
    // console.log('j');

    const count: number = parseInt(request.query.count || '10', 10); // Default to 10 if count is not provided


    // const countValue: number = count ? parseInt(count.toString(), 10) : 10;

    try {
      const entities: T[] = await getAllEntitiesFromFirestore(this.collectionName, count);
      reply.code(200).send(entities);
    } catch (error) {
      reply.code(500).send({ error: `Failed to get ${this.collectionName.toLowerCase()}` });
    }
  };
}

export default Controller;
