'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200';

  const variants = {
    primary: 'bg-primary text-background hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(212,160,18,0.3)]',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
