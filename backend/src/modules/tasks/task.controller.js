import { sendSuccess, sendError } from '../../utils/response';
import * as taskService from './task.service';
export const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getUserTasks(req.user.id);
        sendSuccess(res, 'Tasks retrieved successfully', tasks);
    }
    catch {
        sendError(res, 'Failed to retrieve tasks', 500);
    }
};
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        if (!title) {
            sendError(res, 'Title is required');
            return;
        }
        const task = await taskService.createTask(req.user.id, { title, description, dueDate });
        sendSuccess(res, 'Task created successfully', task, 201);
    }
    catch {
        sendError(res, 'Failed to create task', 500);
    }
};
export const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const task = await taskService.updateTask(id, req.user.id, req.body);
        sendSuccess(res, 'Task updated successfully', task);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update task';
        sendError(res, message, 404);
    }
};
export const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await taskService.deleteTask(id, req.user.id);
        sendSuccess(res, 'Task deleted successfully');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete task';
        sendError(res, message, 404);
    }
};
export const updateTaskStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { status } = req.body;
        if (!['PENDING', 'COMPLETED'].includes(status)) {
            sendError(res, 'Invalid status');
            return;
        }
        const task = await taskService.updateTaskStatus(id, req.user.id, status);
        sendSuccess(res, 'Task status updated', task);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update status';
        sendError(res, message, 404);
    }
};
export const getStats = async (req, res) => {
    try {
        const stats = await taskService.getTaskStats(req.user.id);
        sendSuccess(res, 'Stats retrieved successfully', stats);
    }
    catch {
        sendError(res, 'Failed to retrieve stats', 500);
    }
};
