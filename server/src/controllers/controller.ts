import { FastifyRequest, FastifyReply } from 'fastify';
import { Entity, CreateDto, UpdateDto } from '../models/firestore';
import {
  addEntityToFirestore,
  updateEntityInFirestore,
  getEntityFromFirestore,
  deleteEntityFromFirestore,
  getAllEntitiesFromFirestore,
} from '../services/firestore-service';
import { FirebaseError } from '../services/firestore-error';


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
      if (error instanceof FirebaseError && error.code === 404) {
        reply.code(404).send({ error: `${this.collectionName} not found` });
      } else {
        reply.code(500).send({ error: 'Failed to delete record' });
      }
    }
  };

  public getAllEntities = async (request: FastifyRequest<{ Querystring: { count?: string } }>, reply: FastifyReply) => {
    const count: number = parseInt(request.query.count || '10', 10); // Default to 10 if count is not provided

    try {
      const entities: T[] = await getAllEntitiesFromFirestore(this.collectionName, count);
      reply.code(200).send(entities);
    } catch (error) {
      reply.code(500).send({ error: `Failed to get ${this.collectionName.toLowerCase()}` });
    }
  };
}

export default Controller;
