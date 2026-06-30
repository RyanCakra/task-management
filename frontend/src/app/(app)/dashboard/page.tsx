'use client';

import { useEffect, useState, useCallback } from 'react';
import { taskApi } from '@/lib/taskApi';
import { TaskStats } from '@/types/task';
import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/shared/shared.statCard';
import { LoadingSpinner } from '@/components/shared/shared.loadingSpinner';
import { EmptyState } from '@/components/shared/shared.emptyState';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await taskApi.getStats();
      setStats(res.data.data);
    } catch {
      setError('Failed to load dashboard stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    { label: 'Total Tasks', value: stats?.total ?? 0, icon: ListTodo, accent: 'ink' as const },
    { label: 'Completed', value: stats?.completed ?? 0, icon: CheckCircle2, accent: 'sage' as const },
    { label: 'Pending', value: stats?.pending ?? 0, icon: Clock, accent: 'gold' as const },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary mb-1.5">Workspace</p>
        <h2 className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1.5">Overview of your tasks</p>
        <div className="h-px bg-border mt-5" />
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading your stats..." />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="Couldn't load stats"
          description={error}
          action={
            <Button variant="secondary" onClick={fetchStats}>
              Try again
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {cards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} accent={card.accent} />
          ))}
        </div>
      )}
    </div>
  );
}
