'use client';

import { useScrollProgress } from '@/hooks/useAnimations';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed top-0 left-0 z-[8000] h-[2px] transition-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #00F5FF, #7C4DFF)',
        boxShadow: '0 0 8px rgba(0,245,255,0.6)',
      }}
    />
  );
}
