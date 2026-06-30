import api from './axios';
import { Task, TaskStats } from '@/types/task';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const taskApi = {
  getStats: () => api.get<ApiResponse<TaskStats>>('/api/tasks/stats'),
  getAll: () => api.get<ApiResponse<Task[]>>('/api/tasks'),
  create: (data: { title: string; description?: string; dueDate?: string }) => api.post<ApiResponse<Task>>('/api/tasks', data),
  update: (id: number, data: Partial<{ title: string; description: string; dueDate: string }>) => api.put<ApiResponse<Task>>(`/api/tasks/${id}`, data),
  remove: (id: number) => api.delete<ApiResponse<null>>(`/api/tasks/${id}`),
  toggleStatus: (id: number, status: 'PENDING' | 'COMPLETED') => api.patch<ApiResponse<Task>>(`/api/tasks/${id}/status`, { status }),
};
