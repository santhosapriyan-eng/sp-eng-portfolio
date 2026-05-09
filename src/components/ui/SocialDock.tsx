'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/utils';

const SOCIALS = [
  { label: 'Gmail', icon: '✉', href: `mailto:${SITE_CONFIG.email}`, color: '#00F5FF', title: 'santhoshpriyan.tech@gmail.com' },
  { label: 'LI', icon: 'in', href: SITE_CONFIG.linkedin, color: '#0EA5E9', title: 'LinkedIn' },
  { label: 'GH', icon: 'gh', href: SITE_CONFIG.github, color: '#7C4DFF', title: 'GitHub' },
  { label: 'IG', icon: 'ig', href: SITE_CONFIG.instagram, color: '#A855F7', title: 'Instagram' },
];

function MagneticDock({ s, i }: { s: typeof SOCIALS[0]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <motion.a
      ref={ref}
      key={s.label}
      href={s.href}
      target={s.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      title={s.title}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 + i * 0.1 }}
      onMouseMove={handleMove}
      className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[11px] font-bold uppercase tracking-wider border"
      style={{
        border: `1px solid rgba(255,255,255,0.07)`,
        color: '#475569',
        background: 'rgba(5,8,22,0.7)',
        backdropFilter: 'blur(12px)',
        textDecoration: 'none',
        transition: 'border-color 0.25s, color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${s.color}50`;
        el.style.color = s.color;
        el.style.boxShadow = `0 0 20px ${s.color}25, inset 0 0 12px ${s.color}08`;
        el.style.background = `${s.color}08`;
      }}
      onMouseLeave={e => {
        handleLeave();
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.color = '#475569';
        el.style.boxShadow = 'none';
        el.style.background = 'rgba(5,8,22,0.7)';
      }}
    >
      {s.icon}
    </motion.a>
  );
}

export default function SocialDock() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-[6000] hidden lg:flex flex-col gap-3 items-center"
    >
      {SOCIALS.map((s, i) => <MagneticDock key={s.label} s={s} i={i} />)}
      <div
        className="w-px mt-1"
        style={{
          height: 48,
          background: 'linear-gradient(to bottom, rgba(0,245,255,0.25), transparent)',
        }}
      />
    </motion.div>
  );
}
