import { prisma } from '../../config/database';
export const getUserTasks = async (userId) => {
    return prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};
export const createTask = async (userId, data) => {
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            userId,
        },
    });
};
export const updateTask = async (id, userId, data) => {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        throw new Error('Task not found');
    return prisma.task.update({
        where: { id },
        data: {
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        },
    });
};
export const deleteTask = async (id, userId) => {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        throw new Error('Task not found');
    return prisma.task.delete({ where: { id } });
};
export const updateTaskStatus = async (id, userId, status) => {
    const task = await prisma.task.findFirst({ where: { id, userId } });
    if (!task)
        throw new Error('Task not found');
    return prisma.task.update({ where: { id }, data: { status } });
};
export const getTaskStats = async (userId) => {
    const [total, completed, pending] = await Promise.all([prisma.task.count({ where: { userId } }), prisma.task.count({ where: { userId, status: 'COMPLETED' } }), prisma.task.count({ where: { userId, status: 'PENDING' } })]);
    return { total, completed, pending };
};
