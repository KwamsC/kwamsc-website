import { addEntityToFirestore, updateEntityInFirestore, getEntityFromFirestore, deleteEntityFromFirestore, getAllEntitiesFromFirestore } from '../../services/firestore-service';
import { PostDTO, CreatePostDTO, UpdatePostDTO } from './model';

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

  async getPostById(id: string): Promise<PostDTO | null> {
    return await getEntityFromFirestore<PostDTO>(this.collectionName, id);
  }

  async deletePost(id: string): Promise<void> {
    await deleteEntityFromFirestore(this.collectionName, id);
  }

  async getAllPosts(count: number): Promise<PostDTO[]> {
    return await getAllEntitiesFromFirestore<PostDTO>(this.collectionName, count);
  }
}

export default PostService;