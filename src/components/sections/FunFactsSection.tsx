'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function FactCard({ fact, index }: { fact: (typeof RESUME_DATA.funFacts)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      className="p-5 rounded-2xl border text-center transition-all duration-300"
      style={{ border: '1px solid rgba(0,245,255,0.08)', background: 'rgba(5,8,22,0.6)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,77,255,0.35)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className="text-3xl mb-3">{fact.emoji}</div>
      <p className="text-xs text-muted leading-relaxed">{fact.text}</p>
    </motion.div>
  );
}

export default function FunFactsSection() {
  return (
    <SectionWrapper
      id="funfacts"
      className="py-24 px-6 md:px-16"
      style={{ background: '#020617' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTag>Fun Facts</SectionTag>
        <SectionTitle>
          Beyond the <span className="text-gradient">Code</span>
        </SectionTitle>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {RESUME_DATA.funFacts.map((f, i) => (
            <FactCard key={f.text} fact={f} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
