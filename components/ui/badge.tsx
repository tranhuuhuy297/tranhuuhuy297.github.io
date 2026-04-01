import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
