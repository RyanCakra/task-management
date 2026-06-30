export type TaskStatus = 'PENDING' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
