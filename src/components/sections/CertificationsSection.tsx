'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function CertCard({
  cert,
  index,
}: {
  cert: (typeof RESUME_DATA.certifications)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex gap-4 p-5 rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        border: hovered ? `1px solid ${cert.color}40` : '1px solid rgba(0,245,255,0.08)',
        background: hovered ? `${cert.color}06` : 'rgba(5,8,22,0.75)',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.3)` : 'none',
      }}
    >
      {/* Verified badge line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${cert.color}60, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}08)`,
          border: `1px solid ${cert.color}20`,
        }}
      >
        {cert.icon}
      </div>

      <div className="min-w-0">
        <div className="text-[10px] tracking-widest uppercase font-mono mb-0.5" style={{ color: cert.color }}>
          ✓ Verified
        </div>
        <h3 className="text-xs font-semibold text-frost leading-snug mb-0.5">{cert.title}</h3>
        <div className="text-[10px] text-muted">{cert.org}</div>
        <div className="text-[9px] font-mono mt-1" style={{ color: `${cert.color}80` }}>
          {cert.year}
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  return (
    <SectionWrapper
      id="certifications"
      className="py-28 px-6 md:px-16"
      style={{ background: '#050816' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTag>Certifications</SectionTag>
        <SectionTitle>
          Credentials <span className="text-gradient">&amp; Badges</span>
        </SectionTitle>
        <SectionSub>
          Industry-recognized certifications validating my technical skills across Python, IoT,
          frontend development, and scientific computing.
        </SectionSub>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESUME_DATA.certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
