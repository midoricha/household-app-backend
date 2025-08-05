import { Router } from 'express';
import { checkIngredients, createPantryItem, deletePantryItem, getPantryItems, updatePantryItem } from '../controllers/pantryController';

const router = Router();

router.get('/', getPantryItems);
router.post('/', createPantryItem);
router.put('/:id', updatePantryItem);
router.delete('/:id', deletePantryItem);
router.post('/check-ingredients', checkIngredients);

export default router;
