import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, getArchivedTasks } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.get('/archived', getArchivedTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
