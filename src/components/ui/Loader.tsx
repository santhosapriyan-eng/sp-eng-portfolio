'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'INITIALIZING NEURAL CORE...',
  'LOADING AI MODULES...',
  'CALIBRATING 3D ENGINE...',
  'PARSING IDENTITY DATA...',
  'INJECTING MOTION SYSTEM...',
  'DEPLOYING SP.ENG PORTFOLIO...',
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chars, setChars] = useState('');

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('sp_loaded')) { setDone(true); return; }

    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 2.8 + 1.2;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => { setDone(true); sessionStorage.setItem('sp_loaded', '1'); }, 550);
      }
      setProgress(p);
      setLineIdx(Math.min(Math.floor(p / 17), BOOT_LINES.length - 1));
    }, 55);
    return () => clearInterval(iv);
  }, []);

  // Glitch chars effect
  useEffect(() => {
    const glitchChars = '█▓▒░▐▌■□◆◇●○▲△▼▽';
    const iv = setInterval(() => {
      const len = Math.floor(Math.random() * 4);
      setChars(Array.from({ length: len }, () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join(''));
    }, 80);
    return () => clearInterval(iv);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: '#020617' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute rounded-full"
              style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,77,255,0.25) 0%, transparent 70%)', top: '20%', right: '10%' }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
              className="absolute rounded-full"
              style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)', bottom: '15%', left: '5%' }}
            />
          </div>

          {/* Scan line sweep */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.6) 50%, transparent 100%)' }}
            animate={{ y: ['-100vh', '200vh'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="mb-10 text-center"
          >
            {/* Big glowing mark */}
            <div className="relative inline-block">
              <div
                className="text-[72px] font-black tracking-[0.25em] leading-none select-none"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF 0%, #7C4DFF 50%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.5))',
                }}
              >
                SP
              </div>
              <div
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)' }}
              />
            </div>
            <div
              className="mt-2 text-[10px] tracking-[0.6em] uppercase font-mono"
              style={{ color: 'rgba(0,245,255,0.5)' }}
            >
              .ENG{chars}
            </div>
          </motion.div>

          {/* Progress block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="w-[320px]"
          >
            {/* Boot line */}
            <div
              className="flex items-center gap-2 mb-3 font-mono text-[10px] tracking-widest"
              style={{ color: 'rgba(0,245,255,0.55)' }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ▶
              </motion.span>
              {BOOT_LINES[lineIdx]}
            </div>

            {/* Bar */}
            <div
              className="relative w-full overflow-hidden rounded-full"
              style={{ height: 2, background: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00F5FF, #7C4DFF)',
                  boxShadow: '0 0 12px rgba(0,245,255,0.8)',
                  transition: 'width 0.06s linear',
                }}
              />
            </div>

            {/* Percentage + status */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-3">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#00F5FF' }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
              <span
                className="font-mono text-[11px] tabular-nums"
                style={{ color: '#00F5FF' }}
              >
                {Math.floor(progress).toString().padStart(3, '0')}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
