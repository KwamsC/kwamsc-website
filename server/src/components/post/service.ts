import { addEntityToFirestore, updateEntityInFirestore, getEntityFromFirestore, deleteEntityFromFirestore, getAllEntitiesFromFirestore } from '../../services/firestore-service';
import { Post, CreatePostDTO, UpdatePostDTO } from './model';

class PostService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async addPost(entityData: CreatePostDTO): Promise<void> {
    await addEntityToFirestore(this.collectionName, entityData);
  }

  async updatePost(id: string, entityData: UpdatePostDTO): Promise<void> {
    await updateEntityInFirestore(this.collectionName, id, entityData);
  }

  async getPostById(id: string): Promise<Post | null> {
    return await getEntityFromFirestore<Post>(this.collectionName, id);
  }

  async deletePost(id: string): Promise<void> {
    await deleteEntityFromFirestore(this.collectionName, id);
  }

  async getAllPosts(count: number): Promise<Post[]> {
    return await getAllEntitiesFromFirestore<Post>(this.collectionName, count);
  }
}

export default PostService;