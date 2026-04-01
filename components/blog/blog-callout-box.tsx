'use client';

import { Info, Lightbulb, AlertTriangle } from 'lucide-react';

const variants = {
  info: { icon: Info, bg: 'bg-info-light', border: 'border-info', iconColor: 'text-info' },
  tip: { icon: Lightbulb, bg: 'bg-success-light', border: 'border-success', iconColor: 'text-success' },
  warning: { icon: AlertTriangle, bg: 'bg-warning-light', border: 'border-warning', iconColor: 'text-warning' },
};

interface CalloutBoxProps {
  variant: keyof typeof variants;
  title: string;
  children: React.ReactNode;
}

/** Styled callout box with icon for tips, info, and warnings in blog posts */
export function CalloutBox({ variant, title, children }: CalloutBoxProps) {
  const { icon: Icon, bg, border, iconColor } = variants[variant];
  return (
    <div className={`${bg} ${border} border-l-4 rounded-r-lg p-4 my-6`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className={iconColor} />
        <span className="font-semibold text-sm text-text">{title}</span>
      </div>
      <div className="text-sm text-text-muted leading-relaxed">{children}</div>
    </div>
  );
}
