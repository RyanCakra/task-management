'use client';

import { Task } from '@/types/task';
import { StatusBadge } from '@/components/shared/shared.statusBadge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {
  const isCompleted = task.status === 'COMPLETED';
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = !!dueDate && !isCompleted && isPast(dueDate) && !isToday(dueDate);

  return (
    <div className={cn('group relative overflow-hidden rounded-lg border border-border bg-card p-4 flex flex-col gap-3', 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30')}>
      <span className={cn('absolute inset-x-0 top-0 h-[3px]', isCompleted ? 'bg-[hsl(95,30%,65%)]' : 'bg-primary')} />

      <div className="flex items-start justify-between gap-2">
        <button onClick={() => onToggleStatus(task)} className="mt-0.5 shrink-0 transition-transform hover:scale-110" aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}>
          {isCompleted ? <CheckCircle2 size={20} className="text-[hsl(95,30%,65%)]" /> : <Circle size={20} className="text-muted-foreground group-hover:text-primary/60 transition-colors" />}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={cn('font-display text-base tracking-wide', isCompleted ? 'line-through text-muted-foreground' : 'text-foreground')}>{task.title}</h3>
          {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={task.status} />
          {dueDate && (
            <span className={cn('text-xs flex items-center gap-1', isOverdue ? 'text-red-400 font-medium' : 'text-muted-foreground')}>
              <Calendar size={12} /> {format(dueDate, 'MMM dd, yyyy')}
              {isOverdue && <span className="text-[10px] uppercase tracking-wide ml-0.5">overdue</span>}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(task)}>
            <Pencil size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-400 hover:bg-red-950/30" onClick={() => onDelete(task.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
