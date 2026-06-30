'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import api from '@/lib/axios';
import { Task, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/tasks/task.card';
import { TaskFormDialog } from '@/components/tasks/task.formDialog';
import { LoadingSpinner } from '@/components/shared/shared.loadingSpinner';
import { EmptyState } from '@/components/shared/shared.emptyState';

interface TaskFormValues {
  title: string;
  description?: string;
  dueDate?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'ALL' | TaskStatus>('ALL');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get('/api/tasks');
      setTasks(res.data.data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      await fetchTasks();
    };

    initFetch();
  }, [fetchTasks]);

  const handleCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: TaskFormValues) => {
    if (editingTask) {
      await api.put(`/api/tasks/${editingTask.id}`, data);
    } else {
      await api.post('/api/tasks', data);
    }
    await fetchTasks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this task? This cannot be undone.')) return;
    await api.delete(`/api/tasks/${id}`);
    await fetchTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: TaskStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    await api.patch(`/api/tasks/${task.id}/status`, { status: newStatus });
    await fetchTasks();
  };

  const filteredTasks = tasks.filter((t) => filter === 'ALL' || t.status === filter);

  const filterCounts = {
    ALL: tasks.length,
    PENDING: tasks.filter((t) => t.status === 'PENDING').length,
    COMPLETED: tasks.filter((t) => t.status === 'COMPLETED').length,
  };

  if (isLoading) return <LoadingSpinner label="Gathering your tasks..." />;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-1.5">Workspace</p>
            <h1 className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">Tasks</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1.5">Manage everything on your plate.</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus size={16} /> New Task
          </Button>
        </div>
        <div className="h-px bg-border mt-5" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['ALL', 'PENDING', 'COMPLETED'] as const).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                active ? 'bg-primary/10 text-primary border-primary/40 font-medium' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {f === 'ALL' ? 'All' : f === 'PENDING' ? 'Pending' : 'Completed'}
              <span className={`text-xs tabular-nums ${active ? 'text-primary/70' : 'text-muted-foreground/70'}`}>{filterCounts[f]}</span>
            </button>
          );
        })}
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={tasks.length === 0 ? 'No tasks yet' : 'Nothing here'}
          description={tasks.length === 0 ? 'Create your first task to start organizing your work.' : 'No tasks match this filter right now.'}
          action={
            tasks.length === 0 && (
              <Button onClick={handleCreate} className="gap-2">
                <Plus size={16} /> Create your first task
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
          ))}
        </div>
      )}

      <TaskFormDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} editingTask={editingTask} />
    </div>
  );
}
