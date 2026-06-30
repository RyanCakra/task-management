import { Response } from 'express';
import { AuthRequest } from '../../types/index.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import * as taskService from './task.service.js';
import { TaskStatus } from '../../generated/client.js';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getUserTasks(req.user!.id);
    sendSuccess(res, 'Tasks retrieved successfully', tasks);
  } catch {
    sendError(res, 'Failed to retrieve tasks', 500);
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate } = req.body;
    if (!title) {
      sendError(res, 'Title is required');
      return;
    }

    const task = await taskService.createTask(req.user!.id, { title, description, dueDate });
    sendSuccess(res, 'Task created successfully', task, 201);
  } catch {
    sendError(res, 'Failed to create task', 500);
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const task = await taskService.updateTask(id, req.user!.id, req.body);
    sendSuccess(res, 'Task updated successfully', task);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update task';
    sendError(res, message, 404);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await taskService.deleteTask(id, req.user!.id);
    sendSuccess(res, 'Task deleted successfully');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete task';
    sendError(res, message, 404);
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { status } = req.body;

    if (!['PENDING', 'COMPLETED'].includes(status)) {
      sendError(res, 'Invalid status');
      return;
    }

    const task = await taskService.updateTaskStatus(id, req.user!.id, status as TaskStatus);
    sendSuccess(res, 'Task status updated', task);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update status';
    sendError(res, message, 404);
  }
};

export const getStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const stats = await taskService.getTaskStats(req.user!.id);
    sendSuccess(res, 'Stats retrieved successfully', stats);
  } catch {
    sendError(res, 'Failed to retrieve stats', 500);
  }
};
