import express, { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', (req, res) => {
  res.send('Hello from tasks');
});
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;