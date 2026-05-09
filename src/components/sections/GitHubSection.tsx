'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { SITE_CONFIG } from '@/lib/utils';

const STATS = [
  { num: '3+', label: 'Repositories', icon: '📦' },
  { num: '2026', label: 'Active Since', icon: '⚡' },
  { num: 'Python', label: 'Top Language', icon: '🐍' },
  { num: '100%', label: 'Commitment', icon: '🔥' },
];

const LANGUAGES = [
  { name: 'Python', color: '#00F5FF', pct: 65 },
  { name: 'Arduino C++', color: '#38BDF8', pct: 20 },
  { name: 'HTML / CSS', color: '#A855F7', pct: 10 },
  { name: 'MATLAB', color: '#7C4DFF', pct: 5 },
];

function StatCard({
  num, label, icon, index,
}: { num: string; label: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-2xl border text-center transition-all duration-300"
      style={{ border: '1px solid rgba(0,245,255,0.1)', background: 'rgba(5,8,22,0.7)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold font-mono mb-1" style={{ color: '#00F5FF' }}>{num}</div>
      <div className="text-[10px] tracking-widest uppercase text-muted">{label}</div>
    </motion.div>
  );
}

function LanguageBar({ lang, index }: { lang: (typeof LANGUAGES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-frost font-medium">{lang.name}</span>
        <span className="text-[10px] font-mono" style={{ color: lang.color }}>{lang.pct}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${lang.pct}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${lang.color}, ${lang.color}80)`,
            boxShadow: `0 0 8px ${lang.color}50`,
          }}
        />
      </div>
    </div>
  );
}

export default function GitHubSection() {
  return (
    <SectionWrapper
      id="github"
      className="py-28 px-6 md:px-16"
      style={{ background: 'linear-gradient(135deg, #050816, #0B1120)' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTag>GitHub</SectionTag>
        <SectionTitle>
          Code <span className="text-gradient">Analytics</span>
        </SectionTitle>
        <SectionSub>
          Building in public — one commit at a time. Real contributions, real projects, real growth.
        </SectionSub>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Language breakdown */}
          <div
            className="p-6 rounded-2xl border"
            style={{ border: '1px solid rgba(0,245,255,0.1)', background: 'rgba(5,8,22,0.75)' }}
          >
            <h3 className="text-sm font-bold text-frost mb-5">Language Breakdown</h3>
            {LANGUAGES.map((l, i) => (
              <LanguageBar key={l.name} lang={l} index={i} />
            ))}
          </div>

          {/* Profile card */}
          <div
            className="p-6 rounded-2xl border flex flex-col justify-between"
            style={{ border: '1px solid rgba(0,245,255,0.1)', background: 'rgba(5,8,22,0.75)' }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,77,255,0.15))' }}
                >
                  🐙
                </div>
                <div>
                  <div className="text-sm font-bold text-frost">santhosapriyan-eng</div>
                  <div className="text-[10px] text-muted">github.com</div>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-5">
                Actively building Python utilities, IoT projects, and exploring open-source
                contributions. Every repo is a step toward mastery.
              </p>
            </div>
            <motion.a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold w-full"
              style={{
                background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
                color: '#020617',
                textDecoration: 'none',
              }}
            >
              View GitHub Profile ↗
            </motion.a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
