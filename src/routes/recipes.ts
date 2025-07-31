import { Router } from 'express';
import { getRecipes, createRecipe, getRecipeById, deleteRecipe } from '../controllers/recipeController';

const router = Router();

router.get('/', getRecipes);
router.post('/', createRecipe);
router.get('/:id', getRecipeById);
router.delete('/:id', deleteRecipe);

export default router;
