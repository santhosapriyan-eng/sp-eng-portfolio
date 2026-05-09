'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export default function SectionWrapper({ id, children, className, delay = 0, style }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay }}
      className={cn('relative', className)}
      style={style}
    >
      {children}
    </motion.section>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return <div className="section-tag">{children}</div>;
}

export function SectionTitle({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h2 className={cn('text-4xl md:text-5xl font-bold leading-tight mb-4', className)} style={style}>
      {children}
    </h2>
  );
}

export function SectionSub({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm md:text-base text-muted leading-relaxed max-w-2xl mb-12', className)}>
      {children}
    </p>
  );
}
