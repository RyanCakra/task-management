export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin" />
      <p className="text-sm text-muted-foreground font-display tracking-wide">{label}</p>
    </div>
  );
}
