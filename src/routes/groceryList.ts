import { Router } from 'express';
import { getGroceryListItems, createGroceryListItem, updateGroceryListItem, deleteGroceryListItem, moveCheckedItemsToPantry, batchAddGroceryListItems } from '../controllers/groceryListController';

const router = Router();

router.get('/', getGroceryListItems);
router.post('/', createGroceryListItem);
router.put('/:id', updateGroceryListItem);
router.delete('/:id', deleteGroceryListItem);
router.post('/move-to-pantry', moveCheckedItemsToPantry);
router.post('/batch-add', batchAddGroceryListItems);

export default router;
