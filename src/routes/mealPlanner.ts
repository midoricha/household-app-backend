import { Router } from 'express';
import { getMealPlan, addRecipeToMealPlan, removeMealFromPlan } from '../controllers/mealPlannerController';

const router = Router();

router.get('/', getMealPlan);
router.post('/', addRecipeToMealPlan);
router.delete('/:id', removeMealFromPlan);

export default router;
