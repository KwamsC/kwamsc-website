import { addEntityToFirestore, updateEntityInFirestore, getEntityFromFirestore, deleteEntityFromFirestore, getAllEntitiesFromFirestore } from '../../services/firestore-service';
import { Recipe, CreateRecipeDTO, UpdateRecipeDTO } from './model';

class RecipeService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async addRecipe(entityData: CreateRecipeDTO): Promise<void> {
    await addEntityToFirestore(this.collectionName, entityData);
  }

  async updateRecipe(id: string, entityData: UpdateRecipeDTO): Promise<void> {
    await updateEntityInFirestore(this.collectionName, id, entityData);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return await getEntityFromFirestore<Recipe>(this.collectionName, id);
  }

  async deleteRecipe(id: string): Promise<void> {
    await deleteEntityFromFirestore(this.collectionName, id);
  }

  async getAllRecipes(count: number): Promise<Recipe[]> {
    return await getAllEntitiesFromFirestore<Recipe>(this.collectionName, count);
  }
}

export default RecipeService;