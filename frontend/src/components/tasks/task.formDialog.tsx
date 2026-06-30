'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Task } from '@/types/task';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
  editingTask: Task | null;
}

export function TaskFormDialog({ open, onOpenChange, onSubmit, editingTask }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description || '',
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
      });
    } else {
      reset({ title: '', description: '', dueDate: '' });
    }
  }, [editingTask, open, reset]);

  const submitHandler = async (data: FormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-1">{editingTask ? 'Edit' : 'New'}</p>
          <DialogTitle className="font-display text-xl tracking-wide">{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 pt-1">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Title <span className="text-primary">*</span>
            </Label>
            <Input id="title" {...register('title')} placeholder="e.g., Finish report" />
            {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Description
            </Label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Optional details..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Due Date
            </Label>
            <Input id="dueDate" type="date" {...register('dueDate')} />
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
