import { Router } from 'express';
import { getMealSuggestions } from '../controllers/mealPlannerController';

const router = Router();

router.get('/suggestions', getMealSuggestions);

export default router;
