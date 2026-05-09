'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const trailX = useSpring(dotX, { stiffness: 180, damping: 22 });
  const trailY = useSpring(dotY, { stiffness: 180, damping: 22 });
  const ringX  = useSpring(dotX, { stiffness: 80,  damping: 18 });
  const ringY  = useSpring(dotY, { stiffness: 80,  damping: 18 });

  const [expanded, setExpanded] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const move = (e: MouseEvent) => { dotX.set(e.clientX); dotY.set(e.clientY); };
    const enter = () => setExpanded(true);
    const leave = () => setExpanded(false);
    const down  = () => setClicking(true);
    const up    = () => setClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    const targets = document.querySelectorAll('a, button, [data-cursor-expand]');
    targets.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      targets.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, [dotX, dotY]);

  return (
    <div className="hidden md:block">
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: dotX,
          top: dotY,
          width: 8,
          height: 8,
          background: '#00F5FF',
          boxShadow: '0 0 10px rgba(0,245,255,0.9)',
          transform: 'translate(-50%, -50%)',
          scale: clicking ? 0.6 : 1,
          mixBlendMode: 'difference',
        }}
        animate={{ scale: clicking ? 0.6 : 1 }}
        transition={{ duration: 0.12 }}
      />

      {/* Trail ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          left: trailX,
          top: trailY,
          width: expanded ? 44 : 28,
          height: expanded ? 44 : 28,
          border: `1px solid rgba(0,245,255,${expanded ? 0.6 : 0.3})`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
          background: expanded ? 'rgba(0,245,255,0.04)' : 'transparent',
        }}
      />

      {/* Outer glow ring — slowest */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        style={{
          left: ringX,
          top: ringY,
          width: 55,
          height: 55,
          border: '1px solid rgba(124,77,255,0.15)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
