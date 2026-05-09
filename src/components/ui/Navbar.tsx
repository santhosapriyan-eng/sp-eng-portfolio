'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[7000] px-6 md:px-14 py-4 flex items-center justify-between"
      style={{
        backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : 'none',
        background: scrolled
          ? 'rgba(2,6,23,0.82)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <motion.button
        onClick={() => scrollTo('#hero')}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="relative flex items-center gap-0 border-none bg-transparent p-0"
        style={{ cursor: 'none' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Glow behind logo */}
        <motion.div
          className="absolute -inset-3 rounded-xl pointer-events-none"
          animate={{ opacity: logoHovered ? 1 : 0 }}
          style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.12) 0%, transparent 70%)' }}
        />
        <span
          className="text-sm font-black tracking-[0.18em] uppercase relative"
          style={{
            background: logoHovered
              ? 'linear-gradient(135deg, #00F5FF, #7C4DFF, #A855F7)'
              : 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: logoHovered ? 'drop-shadow(0 0 14px rgba(0,245,255,0.7))' : 'drop-shadow(0 0 6px rgba(0,245,255,0.3))',
            transition: 'all 0.3s ease',
          }}
        >
          SP
        </span>
        <span
          className="text-sm font-black tracking-[0.18em] uppercase"
          style={{ color: 'rgba(148,163,184,0.6)', marginLeft: 1 }}
        >
          .ENG
        </span>
      </motion.button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-7 list-none">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <button
              onClick={() => scrollTo(link.href)}
              className="relative text-[11px] tracking-[0.16em] uppercase border-none bg-transparent p-0 transition-colors duration-200"
              style={{
                color: active === link.href.slice(1) ? '#00F5FF' : '#64748B',
                cursor: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94A3B8')}
              onMouseLeave={e => (e.currentTarget.style.color = active === link.href.slice(1) ? '#00F5FF' : '#64748B')}
            >
              {link.label}
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        {/* Gmail button */}
        <motion.a
          href={`mailto:${SITE_CONFIG.email}`}
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,245,255,0.3)' }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.14em] uppercase rounded-lg border"
          style={{
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#00F5FF',
            background: 'rgba(0,245,255,0.04)',
            textDecoration: 'none',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <span className="text-[11px]">✉</span>
          Hire Me
        </motion.a>
        <motion.a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, borderColor: 'rgba(0,245,255,0.5)', color: '#00F5FF', background: 'rgba(0,245,255,0.06)' }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.14em] uppercase rounded-lg border transition-all duration-200"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#64748B',
            textDecoration: 'none',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          GitHub ↗
        </motion.a>
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none"
        onClick={() => setMobileOpen(v => !v)}
        style={{ cursor: 'pointer' }}
        aria-label="Menu"
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="block h-px rounded-full"
            style={{ background: '#00F5FF', width: i === 1 ? 16 : 22 }}
            animate={mobileOpen ? {
              rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
              y: i === 0 ? 6 : i === 2 ? -6 : 0,
              scaleX: i === 1 ? 0 : 1,
            } : { rotate: 0, y: 0, scaleX: 1 }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </button>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            className="absolute top-full left-0 right-0 overflow-hidden"
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(0,245,255,0.08)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left py-3 text-sm tracking-widest uppercase border-none bg-transparent border-b"
                  style={{
                    color: active === link.href.slice(1) ? '#00F5FF' : '#64748B',
                    borderColor: 'rgba(0,245,255,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-3 py-3 text-center text-sm rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,77,255,0.12))',
                  border: '1px solid rgba(0,245,255,0.2)',
                  color: '#00F5FF',
                  textDecoration: 'none',
                }}
              >
                ✉ Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
