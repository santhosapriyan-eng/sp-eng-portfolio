'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle } from '@/components/ui/SectionWrapper';
import { SITE_CONFIG } from '@/lib/utils';

const SOCIALS = [
  { label: 'Gmail', icon: '✉', href: `mailto:${SITE_CONFIG.email}`, color: '#00F5FF', border: 'rgba(0,245,255,0.2)', bg: 'rgba(0,245,255,0.05)' },
  { label: 'LinkedIn', icon: 'in', href: SITE_CONFIG.linkedin, color: '#0EA5E9', border: 'rgba(14,165,233,0.2)', bg: 'rgba(14,165,233,0.05)' },
  { label: 'GitHub', icon: '⌥', href: SITE_CONFIG.github, color: '#7C4DFF', border: 'rgba(124,77,255,0.2)', bg: 'rgba(124,77,255,0.05)' },
  { label: 'Instagram', icon: '◎', href: SITE_CONFIG.instagram, color: '#A855F7', border: 'rgba(168,85,247,0.2)', bg: 'rgba(168,85,247,0.05)' },
];

function MagneticBtn({ s }: { s: typeof SOCIALS[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.22;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.22;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };

  return (
    <motion.a
      ref={ref}
      href={s.href}
      target={s.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      whileHover={{ scale: 1.08, boxShadow: `0 16px 40px ${s.color}25` }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl border overflow-hidden text-sm font-semibold"
      style={{
        border: `1px solid ${s.border}`,
        color: s.color,
        background: s.bg,
        textDecoration: 'none',
        transition: 'border-color 0.25s, background 0.25s',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
        (e.currentTarget as HTMLElement).style.background = `${s.color}10`;
      }}
      onMouseLeave={e => {
        handleLeave();
        (e.currentTarget as HTMLElement).style.borderColor = s.border;
        (e.currentTarget as HTMLElement).style.background = s.bg;
      }}
    >
      {/* Shine sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`, backgroundSize: '200%' }}
        animate={{ backgroundPosition: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <span className="text-base">{s.icon}</span>
      {s.label}
    </motion.a>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once: true, margin: '-80px' });

  return (
    <SectionWrapper
      id="contact"
      className="py-32 px-6 md:px-16 relative overflow-hidden"
      style={{ background: '#020617' } as React.CSSProperties}
    >
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,77,255,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.1), transparent)' }} />
      </div>

      <div
        ref={ref}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTag>Get In Touch</SectionTag>
          <SectionTitle>
            Let's Build{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Something Epic
            </span>
          </SectionTitle>

          <p className="text-sm leading-relaxed max-w-md mx-auto mb-10" style={{ color: '#475569' }}>
            Recruiting, collaborating, or just want to geek out about AI and IoT?
            My inbox is open. Let's connect and create something extraordinary.
          </p>

          {/* Primary Gmail CTA */}
          <motion.a
            href={`mailto:${SITE_CONFIG.email}`}
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(0,245,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold mb-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,77,255,0.12))',
              border: '1px solid rgba(0,245,255,0.25)',
              color: '#00F5FF',
              textDecoration: 'none',
              backdropFilter: 'blur(16px)',
              letterSpacing: '0.02em',
            }}
          >
            {/* Animated border glow */}
            <motion.span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: '0 0 0 1px rgba(0,245,255,0.2)' }}
              animate={{ boxShadow: ['0 0 0 1px rgba(0,245,255,0.2)', '0 0 0 3px rgba(0,245,255,0.08)', '0 0 0 1px rgba(0,245,255,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            {/* Shine */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(0,245,255,0.1) 50%, transparent 60%)', backgroundSize: '200%' }}
              animate={{ backgroundPosition: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
            <span className="text-xl">✉</span>
            {SITE_CONFIG.email}
          </motion.a>

          {/* Social buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {SOCIALS.map(s => <MagneticBtn key={s.label} s={s} />)}
          </motion.div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: '#1E293B' }}
          >
            📍 Coimbatore, Tamil Nadu, India
          </motion.p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
