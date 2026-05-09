'use client';

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { RESUME_DATA, SITE_CONFIG } from '@/lib/utils';

const HeroScene = lazy(() => import('../three/HeroScene'));

/* ─────────────────────────────────────────
   CINEMATIC HOLOGRAPHIC PHOTO SYSTEM
───────────────────────────────────────── */
function HoloPhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 180, damping: 28 });
  const glareX  = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 130]), { stiffness: 100, damping: 20 });
  const glareY  = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 130]), { stiffness: 100, damping: 20 });

  // Derived motion value for glare background — must be declared at component level, not inside JSX
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 80px 80px at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{ width: 360, height: 460 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* ── Orbit rings ── */}
      {[
        { size: 500, color: 'rgba(0,245,255,0.08)',  dur: 22, dash: false },
        { size: 560, color: 'rgba(124,77,255,0.06)', dur: 34, dash: false, rev: true },
        { size: 440, color: 'rgba(0,245,255,0.05)',  dur: 16, dash: true  },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ring.size, height: ring.size,
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            border: `1px ${ring.dash ? 'dashed' : 'solid'} ${ring.color}`,
            animation: `ringOrbit ${ring.dur}s linear infinite ${(ring as any).rev ? 'reverse' : ''}`,
          }}
        />
      ))}

      {/* ── Orbiting energy dot ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 8, height: 8,
          background: '#00F5FF',
          borderRadius: '50%',
          boxShadow: '0 0 16px #00F5FF, 0 0 32px rgba(0,245,255,0.4)',
          top: '50%', left: '50%',
          marginTop: -4, marginLeft: -4,
          animation: 'orbit 9s linear infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 6, height: 6,
          background: '#A855F7',
          borderRadius: '50%',
          boxShadow: '0 0 14px #A855F7',
          top: '50%', left: '50%',
          marginTop: -3, marginLeft: -3,
          animation: 'orbit 14s linear infinite reverse',
        }}
      />

      {/* ── Ambient glow ── */}
      <motion.div
        className="absolute rounded-3xl pointer-events-none"
        style={{
          inset: -30,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(0,245,255,0.18) 0%, rgba(124,77,255,0.1) 45%, transparent 70%)',
          animation: 'glowPulse 3.5s ease-in-out infinite',
        }}
      />

      {/* ── Main card with 3D tilt ── */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 900,
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Card */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 300,
            height: 380,
            borderRadius: 24,
            border: '1px solid rgba(0,245,255,0.22)',
            boxShadow: '0 0 0 1px rgba(124,77,255,0.1), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,245,255,0.1)',
            background: '#050816',
          }}
        >
          {/* Actual photo */}
          <img
            src="/photo.jpg"
            alt="Santhosa Priyan K A"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />

          {/* Gradient fade bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 40%, rgba(2,6,23,0.97) 100%)',
            }}
          />

          {/* Holographic sheen (mouse-reactive glare) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: glareBackground,
              mixBlendMode: 'screen',
            }}
          />

          {/* Holographic rainbow overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.06) 0%, rgba(124,77,255,0.06) 50%, rgba(168,85,247,0.06) 100%)',
              animation: 'holoShift 5s ease-in-out infinite alternate',
            }}
          />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.012) 2px, rgba(0,245,255,0.012) 4px)',
              opacity: 0.6,
            }}
          />

          {/* Animated scan sweep */}
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.35), transparent)' }}
            animate={{ y: [-20, 400] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          />

          {/* Neon edge glow — top */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)', opacity: 0.7 }}
          />
          {/* Neon edge glow — bottom */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #7C4DFF, transparent)', opacity: 0.7 }}
          />

          {/* Bottom name plate */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div
              className="text-[9px] font-mono tracking-[0.3em] uppercase mb-1"
              style={{ color: 'rgba(0,245,255,0.5)' }}
            >
              IDENTITY · AI/ML ENGINEER
            </div>
            <div className="text-sm font-bold text-white">Santhosa Priyan K A</div>
          </div>

          {/* Corner brackets */}
          {[
            { top: 8, left: 8, borderTop: '1px solid #00F5FF', borderLeft: '1px solid #00F5FF' },
            { top: 8, right: 8, borderTop: '1px solid #00F5FF', borderRight: '1px solid #00F5FF' },
            { bottom: 8, left: 8, borderBottom: '1px solid #7C4DFF', borderLeft: '1px solid #7C4DFF' },
            { bottom: 8, right: 8, borderBottom: '1px solid #7C4DFF', borderRight: '1px solid #7C4DFF' },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{ ...s, width: 16, height: 16 }}
            />
          ))}
        </div>

        {/* Floating badge — "Available" */}
        <motion.div
          className="absolute -top-3 -right-6 px-3 py-1.5 text-[9px] tracking-widest uppercase font-mono rounded-full"
          style={{
            background: 'rgba(2,6,23,0.92)',
            border: '1px solid rgba(0,245,255,0.25)',
            color: '#00F5FF',
            boxShadow: '0 0 16px rgba(0,245,255,0.15)',
            backdropFilter: 'blur(10px)',
            whiteSpace: 'nowrap',
            transform: 'translateZ(30px)',
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
            style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80', verticalAlign: 'middle', animation: 'glowPulse 2s ease-in-out infinite' }}
          />
          Open to Work
        </motion.div>

        {/* Floating badge — institution */}
        <motion.div
          className="absolute -bottom-4 -left-6 px-3 py-1.5 text-[9px] tracking-wider font-mono rounded-full"
          style={{
            background: 'rgba(2,6,23,0.92)',
            border: '1px solid rgba(124,77,255,0.25)',
            color: '#A855F7',
            backdropFilter: 'blur(10px)',
            whiteSpace: 'nowrap',
            transform: 'translateZ(30px)',
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          🎓 Karunya Institute
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   AURORA MESH BACKGROUND
───────────────────────────────────────── */
function AuroraMesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridShift 25s linear infinite',
        }}
      />
      {/* Aurora blobs */}
      {[
        { w: 700, h: 500, top: '-15%', right: '-10%', bg: 'rgba(124,77,255,0.09)', dur: 12 },
        { w: 600, h: 400, bottom: '-10%', left: '-5%',  bg: 'rgba(0,245,255,0.07)',  dur: 9, delay: 2 },
        { w: 500, h: 500, top: '30%',   left: '25%',   bg: 'rgba(168,85,247,0.05)', dur: 15, delay: 4 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.w, height: b.h,
            background: `radial-gradient(ellipse at center, ${b.bg} 0%, transparent 70%)`,
            top: (b as any).top, bottom: (b as any).bottom,
            left: (b as any).left, right: (b as any).right,
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: (b as any).delay ?? 0 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────── */
function StatItem({ num, suffix, label, inView }: { num: number; suffix: string; label: string; inView: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-3xl font-black leading-none tabular-nums" style={{ color: '#00F5FF' }}>
        {inView ? <CountUp end={num} duration={2.2} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div className="text-[9px] tracking-[0.18em] uppercase text-muted">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────── */
export default function HeroSection() {
  const [countRef, countInView] = useInView({ triggerOnce: true });
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealStep(1), 600);
    const t2 = setTimeout(() => setRevealStep(2), 1000);
    const t3 = setTimeout(() => setRevealStep(3), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Aurora mesh */}
      <AuroraMesh />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-20">

        {/* ── LEFT ── */}
        <div className="flex flex-col">
          {/* Status pill */}
          <AnimatePresence>
            {revealStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-mono"
                style={{
                  border: '1px solid rgba(0,245,255,0.18)',
                  background: 'rgba(0,245,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  color: '#00F5FF',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'glowPulse 2s ease-in-out infinite' }}
                />
                Available · Coimbatore, India
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name — stagger reveal */}
          <div className="overflow-hidden mb-2">
            <AnimatePresence>
              {revealStep >= 1 && (
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.02]"
                >
                  <span className="block" style={{ color: '#F0F9FF' }}>Santhosa</span>
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(135deg, #00F5FF 0%, #7C4DFF 55%, #A855F7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 24px rgba(0,245,255,0.3))',
                    }}
                  >
                    Priyan K A
                  </span>
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Role typing */}
          <AnimatePresence>
            {revealStep >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-lg mb-5 flex items-center gap-2 min-h-[1.75em]"
                style={{ color: '#475569' }}
              >
                <span style={{ color: '#00F5FF' }}>→</span>
                <TypeAnimation
                  sequence={['AI/ML Engineer', 2200, 'Python Developer', 2200, 'IoT Systems Builder', 2200, 'Problem Solver', 2200, 'Tech Creator', 2200]}
                  wrapper="span"
                  repeat={Infinity}
                  style={{ color: '#94A3B8' }}
                />
                <span className="term-cursor" style={{ color: '#00F5FF' }}>|</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence>
            {revealStep >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm leading-relaxed max-w-[480px] mb-8"
                style={{ color: '#475569', lineHeight: 1.75 }}
              >
                B.Tech CSE (AI/ML) student at{' '}
                <span style={{ color: '#64748B' }}>Karunya Institute of Technology</span>.
                Cisco-certified in Python &amp; IoT. Building the future —
                one algorithm, one circuit, one commit at a time.
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence>
            {revealStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {/* Primary */}
                <motion.button
                  onClick={() => scrollTo('#projects')}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0,245,255,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
                    color: '#020617',
                    border: 'none',
                    cursor: 'none',
                    boxShadow: '0 0 30px rgba(0,245,255,0.35)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {/* Shine sweep */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)', backgroundSize: '200%' }}
                    animate={{ backgroundPosition: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                  ⚡ View Projects
                </motion.button>

                {/* Gmail */}
                <motion.a
                  href={`mailto:${SITE_CONFIG.email}`}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(0,245,255,0.5)', background: 'rgba(0,245,255,0.07)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-200"
                  style={{
                    border: '1px solid rgba(0,245,255,0.2)',
                    color: '#94A3B8',
                    background: 'rgba(255,255,255,0.02)',
                    textDecoration: 'none',
                    cursor: 'none',
                    letterSpacing: '0.04em',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  ✉ santhoshpriyan.tech@gmail.com
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div ref={countRef} className="flex flex-wrap gap-8">
            {RESUME_DATA.stats.map(s => (
              <StatItem key={s.label} {...s} inView={countInView} />
            ))}
          </div>
        </div>

        {/* ── RIGHT — Holographic photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center items-center"
        >
          <HoloPhoto />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color: '#1E293B' }}>SCROLL</span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(0,245,255,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
