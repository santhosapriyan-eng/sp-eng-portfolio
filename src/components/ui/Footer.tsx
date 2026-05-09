'use client';

import { SITE_CONFIG } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 md:px-16 overflow-hidden">
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.12), transparent)' }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-black tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SP
          </span>
          <span className="text-sm font-black tracking-widest" style={{ color: 'rgba(148,163,184,0.4)' }}>.ENG</span>
          <span className="text-xs text-muted ml-3" style={{ color: '#334155' }}>
            © {new Date().getFullYear()} {SITE_CONFIG.name}
          </span>
        </div>

        {/* Center — stack */}
        <p className="text-[10px] tracking-widest uppercase" style={{ color: '#1E293B' }}>
          Next.js · Three.js · Framer Motion · Tailwind
        </p>

        {/* Right — email */}
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="text-[10px] tracking-wider transition-colors duration-200"
          style={{ color: '#334155', textDecoration: 'none' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#00F5FF')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
        >
          {SITE_CONFIG.email}
        </a>
      </div>
    </footer>
  );
}
