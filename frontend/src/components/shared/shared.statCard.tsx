import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: 'ink' | 'sage' | 'gold';
  caption?: string;
}

const accentMap = {
  ink: {
    rule: 'bg-foreground/60',
    ring: 'border-border text-foreground/70',
    wash: 'from-foreground/[0.035]',
  },
  sage: {
    rule: 'bg-[hsl(95,30%,65%)]',
    ring: 'border-[hsl(95,17%,51%,0.35)] text-[hsl(95,30%,65%)]',
    wash: 'from-[hsl(95,17%,51%,0.07)]',
  },
  gold: {
    rule: 'bg-primary',
    ring: 'border-primary/30 text-primary',
    wash: 'from-[hsl(45,65%,47%,0.07)]',
  },
} as const;

export function StatCard({ label, value, icon: Icon, accent = 'ink', caption }: StatCardProps) {
  const a = accentMap[accent];

  return (
    <div className={cn('group relative overflow-hidden rounded-lg border border-border bg-card', 'bg-gradient-to-br to-transparent', a.wash, 'p-5 sm:p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5')}>
      <span className={cn('absolute inset-x-0 top-0 h-[3px]', a.rule)} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-3">{label}</p>
          <p className="font-display text-4xl sm:text-[2.75rem] leading-none text-foreground tabular-nums">{value}</p>
          {caption && <p className="text-xs text-muted-foreground mt-2">{caption}</p>}
        </div>

        <div className={cn('shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full border flex items-center justify-center', a.ring)}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
