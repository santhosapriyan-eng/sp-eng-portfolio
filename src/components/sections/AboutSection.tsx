'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useIOInView } from 'react-intersection-observer';
import SectionWrapper, { SectionTag, SectionTitle } from '@/components/ui/SectionWrapper';

/* ─────────────────────────────────────────
   HANGING ID CARD
───────────────────────────────────────── */
function HangingIDCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [swinging, setSwinging] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 14 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 60, damping: 14 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };
  const handleClick = () => {
    setSwinging(true);
    setTimeout(() => setSwinging(false), 1200);
  };

  return (
    <div
      className="flex flex-col items-center select-none"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ cursor: 'none' }}
    >
      {/* Clip hole + string */}
      <div className="flex flex-col items-center" style={{ zIndex: 2 }}>
        {/* Badge clip */}
        <div
          className="w-8 h-3 rounded-sm mb-0"
          style={{ background: 'linear-gradient(135deg, #334155, #1E293B)', border: '1px solid rgba(0,245,255,0.15)' }}
        />
        {/* String */}
        <motion.div
          className="w-px"
          style={{
            height: 48,
            background: 'linear-gradient(to bottom, rgba(0,245,255,0.4), rgba(0,245,255,0.15))',
            transformOrigin: 'top center',
          }}
          animate={swinging ? { rotateZ: [0, 8, -6, 4, -2, 0] } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        style={{
          rotateZ: swinging ? 0 : rotateZ,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 800,
          transformOrigin: 'top center',
        }}
        animate={swinging
          ? { rotate: [0, 10, -8, 5, -2, 0] }
          : { y: [0, -6, 0] }
        }
        transition={swinging
          ? { duration: 1.2, ease: 'easeInOut' }
          : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative"
      >
        {/* Card body */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 240,
            height: 340,
            borderRadius: 20,
            border: '1px solid rgba(0,245,255,0.2)',
            background: 'rgba(5,8,22,0.88)',
            backdropFilter: 'blur(24px)',
            boxShadow:
              '0 0 0 1px rgba(124,77,255,0.1), 0 40px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,245,255,0.08)',
          }}
        >
          {/* Header band */}
          <div
            className="w-full h-12 flex items-center justify-between px-4"
            style={{ background: 'linear-gradient(90deg, rgba(0,245,255,0.08), rgba(124,77,255,0.12))' }}
          >
            <span
              className="text-[10px] font-black tracking-[0.3em] uppercase"
              style={{ background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              SP.ENG
            </span>
            <div className="flex gap-1">
              {[0, 1].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? '#00F5FF' : '#7C4DFF', opacity: 0.7 }} />
              ))}
            </div>
          </div>

          {/* Photo area */}
          <div className="flex justify-center pt-4 pb-2">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                width: 80, height: 96,
                border: '1px solid rgba(0,245,255,0.25)',
                boxShadow: '0 0 20px rgba(0,245,255,0.12)',
              }}
            >
              <img
                src="/photo.jpg"
                alt="Santhosa Priyan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(2,6,23,0.5))' }} />
            </div>
          </div>

          {/* Info */}
          <div className="px-4 pb-3 text-center">
            <div className="text-[11px] font-bold text-white mb-0.5 tracking-wide">Santhosa Priyan K A</div>
            <div className="text-[9px] tracking-wider uppercase mb-3" style={{ color: '#00F5FF', opacity: 0.7 }}>AI/ML Engineer · Python Dev</div>

            {/* Stats mini */}
            <div
              className="grid grid-cols-3 gap-1 mb-3 p-2 rounded-xl"
              style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.07)' }}
            >
              {[['7.0', 'CGPA'], ['5+', 'Certs'], ['3', 'Hacks']].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-[11px] font-bold" style={{ color: '#00F5FF' }}>{v}</div>
                  <div className="text-[7px] text-muted tracking-wider uppercase">{l}</div>
                </div>
              ))}
            </div>

            {/* QR-style visual */}
            <div
              className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center text-[18px]"
              style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)' }}
            >
              🔗
            </div>
          </div>

          {/* Barcode strip */}
          <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center px-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="flex gap-[2px] flex-1 h-3 items-center">
              {Array.from({ length: 26 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: i % 3 === 0 ? 3 : 1.5,
                    height: i % 5 === 0 ? 12 : 8,
                    background: 'rgba(0,245,255,0.35)',
                    borderRadius: 0.5,
                  }}
                />
              ))}
            </div>
            <span className="text-[7px] font-mono ml-2" style={{ color: 'rgba(0,245,255,0.3)' }}>SP2024</span>
          </div>

          {/* Holographic sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.04) 0%, transparent 50%, rgba(124,77,255,0.04) 100%)',
              animation: 'holoShift 4s ease-in-out infinite alternate',
            }}
          />

          {/* Scanline */}
          <motion.div
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.25), transparent)' }}
            animate={{ y: [0, 340] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />

          {/* Corner brackets */}
          {[
            { top: 4, left: 4,   borderTop: '1px solid rgba(0,245,255,0.4)', borderLeft:  '1px solid rgba(0,245,255,0.4)' },
            { top: 4, right: 4,  borderTop: '1px solid rgba(0,245,255,0.4)', borderRight: '1px solid rgba(0,245,255,0.4)' },
            { bottom: 4, left: 4,  borderBottom: '1px solid rgba(124,77,255,0.4)', borderLeft:  '1px solid rgba(124,77,255,0.4)' },
            { bottom: 4, right: 4, borderBottom: '1px solid rgba(124,77,255,0.4)', borderRight: '1px solid rgba(124,77,255,0.4)' },
          ].map((s, i) => (
            <div key={i} className="absolute pointer-events-none" style={{ ...s, width: 12, height: 12 }} />
          ))}
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 160, height: 20, background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)', filter: 'blur(8px)' }}
        />
      </motion.div>
      <p className="mt-3 text-[8px] tracking-widest uppercase" style={{ color: '#1E293B' }}>Click to swing</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   ABOUT CARDS
───────────────────────────────────────── */
const CARDS = [
  { icon: '🤖', title: 'AI & Machine Learning', body: 'Neural networks, ML fundamentals, building intelligent systems that learn and adapt from data.', color: '#00F5FF' },
  { icon: '🔌', title: 'IoT & Embedded', body: 'Arduino, DHT11 sensors, real-time monitoring — bridging physical hardware with intelligent software.', color: '#7C4DFF' },
  { icon: '🐍', title: 'Python Development', body: 'Automation scripts, utility apps, and logic-driven programs that solve real engineering problems.', color: '#38BDF8' },
  { icon: '🎨', title: 'Creative Design', body: 'Freelance graphic design — posters, social creatives, and brand visuals with premium visual impact.', color: '#A855F7' },
];

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function AboutSection() {
  const [counterRef, counterInView] = useIOInView({ triggerOnce: true, threshold: 0.5 });
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef as React.RefObject<HTMLElement>, { once: true, margin: '-60px' });

  return (
    <SectionWrapper
      id="about"
      className="py-28 px-6 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #050816 100%)' } as React.CSSProperties}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,77,255,0.05) 0%, transparent 70%)', top: '20%', right: '-10%' }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)', bottom: '10%', left: '-5%' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top layout: text + ID card */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">

          {/* Left — Text */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -40 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <SectionTag>About Me</SectionTag>
            <SectionTitle>
              Building Tomorrow's{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Intelligence
              </span>
            </SectionTitle>

            <p className="text-sm leading-[1.85] mb-5 max-w-lg" style={{ color: '#475569' }}>
              First-year B.Tech CSE (AI/ML) student at{' '}
              <span style={{ color: '#64748B' }}>Karunya Institute of Technology and Sciences</span>,
              Coimbatore — driven by curiosity to bridge the gap between embedded hardware and intelligent software.
            </p>
            <p className="text-sm leading-[1.85] mb-8 max-w-lg" style={{ color: '#475569' }}>
              Cisco-certified in Python and IoT. Hackathon-tested. Building real systems —
              from Arduino weather stations to Python automation suites. Always learning, always shipping.
            </p>

            {/* Counters */}
            <div
              ref={counterRef}
              className="grid grid-cols-4 gap-3 p-5 rounded-2xl mb-6"
              style={{ border: '1px solid rgba(0,245,255,0.08)', background: 'rgba(0,245,255,0.02)' }}
            >
              {[
                { num: 7, suffix: '.0', label: 'CGPA' },
                { num: 5, suffix: '+', label: 'Certs' },
                { num: 9, suffix: '+', label: 'Events' },
                { num: 3, suffix: '', label: 'Hackathons' },
              ].map(c => (
                <div key={c.label} className="text-center">
                  <div className="text-2xl font-black leading-none mb-1" style={{ color: '#00F5FF' }}>
                    {counterInView ? <CountUp end={c.num} duration={2} suffix={c.suffix} /> : `0${c.suffix}`}
                  </div>
                  <div className="text-[8px] tracking-[0.16em] uppercase text-muted">{c.label}</div>
                </div>
              ))}
            </div>

            {/* Vision */}
            <div
              className="p-4 rounded-xl border-l-2 text-xs leading-relaxed"
              style={{ borderColor: '#7C4DFF', background: 'rgba(124,77,255,0.05)', color: '#475569' }}
            >
              <span className="block font-bold mb-1" style={{ color: '#94A3B8' }}>Career Vision</span>
              To build AI systems that solve real human problems — from a DHT11 sensor on an Arduino
              to production-grade intelligent systems deployed at scale.
            </div>
          </motion.div>

          {/* Right — Hanging ID Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center pt-4"
          >
            <HangingIDCard />
          </motion.div>
        </div>

        {/* Bottom — 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-5 rounded-2xl border overflow-hidden group"
              style={{ transition: 'all 0.3s ease', border: '1px solid rgba(0,245,255,0.07)', background: 'rgba(5,8,22,0.7)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${card.color}35`;
                el.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0,245,255,0.07)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="text-xs font-bold mb-2" style={{ color: '#94A3B8' }}>{card.title}</h3>
              <p className="text-[11px] leading-relaxed" style={{ color: '#475569' }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
