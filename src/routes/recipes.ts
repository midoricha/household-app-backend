import { Router } from 'express';
import { getRecipes, createRecipe, getRecipeById, deleteRecipe, addMissingIngredientsToGroceryList } from '../controllers/recipeController';

const router = Router();

router.get('/', getRecipes);
router.post('/', createRecipe);
router.get('/:id', getRecipeById);
router.delete('/:id', deleteRecipe);
router.post('/:id/add-missing-to-grocery-list', addMissingIngredientsToGroceryList);

export default router;
