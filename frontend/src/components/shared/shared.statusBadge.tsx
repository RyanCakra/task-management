import { TaskStatus } from '@/types/task';
import { cn } from '@/lib/utils';

export function StatusBadge({ status }: { status: TaskStatus }) {
  const isCompleted = status === 'COMPLETED';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide border',
        isCompleted ? 'bg-[hsl(95,17%,51%,0.12)] text-[hsl(95,30%,65%)] border-[hsl(95,17%,51%,0.3)]' : 'bg-[hsl(45,65%,47%,0.1)] text-primary border-[hsl(45,65%,47%,0.3)]',
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', isCompleted ? 'bg-[hsl(95,30%,65%)]' : 'bg-primary')} />
      {isCompleted ? 'Completed' : 'Pending'}
    </span>
  );
}
