import { prisma } from '../../config/database';
import { TaskStatus } from '../../generated/client';

export const getUserTasks = async (userId: number) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTask = async (userId: number, data: { title: string; description?: string; dueDate?: string }) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      userId,
    },
  });
};

export const updateTask = async (id: number, userId: number, data: { title?: string; description?: string; dueDate?: string; status?: TaskStatus }) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return prisma.task.update({
    where: { id },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });
};

export const deleteTask = async (id: number, userId: number) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return prisma.task.delete({ where: { id } });
};

export const updateTaskStatus = async (id: number, userId: number, status: TaskStatus) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error('Task not found');

  return prisma.task.update({ where: { id }, data: { status } });
};

export const getTaskStats = async (userId: number) => {
  const [total, completed, pending] = await Promise.all([prisma.task.count({ where: { userId } }), prisma.task.count({ where: { userId, status: 'COMPLETED' } }), prisma.task.count({ where: { userId, status: 'PENDING' } })]);
  return { total, completed, pending };
};
