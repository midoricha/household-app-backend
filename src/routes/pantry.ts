import { Router } from 'express';
import { getPantryItems, createPantryItem, updatePantryItem, deletePantryItem } from '../controllers/pantryController';

const router = Router();

router.get('/', getPantryItems);
router.post('/', createPantryItem);
router.put('/:id', updatePantryItem);
router.delete('/:id', deletePantryItem);

export default router;
