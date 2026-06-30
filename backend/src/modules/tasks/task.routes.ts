import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import * as taskController from './task.controller.js';

const router = Router();

router.use(authenticate);

router.get('/stats', taskController.getStats);
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/status', taskController.updateTaskStatus);

export default router;
