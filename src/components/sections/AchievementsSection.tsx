'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function AchCard({
  item,
  index,
}: {
  item: (typeof RESUME_DATA.achievements)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        border: hovered ? '1px solid rgba(0,245,255,0.28)' : '1px solid rgba(0,245,255,0.07)',
        background: 'rgba(5,8,22,0.75)',
        backdropFilter: 'blur(14px)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.35), 0 0 30px rgba(0,245,255,0.05)' : 'none',
      }}
    >
      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-400 origin-left"
        style={{
          background: 'linear-gradient(90deg, #00F5FF, #7C4DFF)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />

      <span className="text-2xl block mb-3">{item.icon}</span>
      <h3 className="text-sm font-bold text-frost mb-2 leading-snug">{item.title}</h3>
      <p className="text-[11px] text-muted leading-relaxed">{item.desc}</p>

      {item.year && (
        <div
          className="mt-3 text-[9px] font-mono tracking-widest uppercase"
          style={{ color: 'rgba(0,245,255,0.4)' }}
        >
          {item.year}
        </div>
      )}
    </motion.div>
  );
}

export default function AchievementsSection() {
  return (
    <SectionWrapper
      id="achievements"
      className="py-28 px-6 md:px-16"
      style={{ background: '#020617' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTag>Events &amp; Achievements</SectionTag>
        <SectionTitle>
          Where I've <span className="text-gradient">Competed</span>
        </SectionTitle>
        <SectionSub>
          Workshops, hackathons, and technical events that have sharpened my engineering
          mindset and expanded my professional network.
        </SectionSub>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {RESUME_DATA.achievements.map((item, i) => (
            <AchCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
