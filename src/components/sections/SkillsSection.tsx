'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function SkillChip({ name, index }: { name: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block px-3 py-1 text-[11px] rounded-full border transition-all duration-200 cursor-default"
      style={{
        border: hovered ? '1px solid rgba(0,245,255,0.5)' : '1px solid rgba(0,245,255,0.12)',
        color: hovered ? '#00F5FF' : '#94A3B8',
        background: hovered ? 'rgba(0,245,255,0.06)' : 'transparent',
        boxShadow: hovered ? '0 0 12px rgba(0,245,255,0.15)' : 'none',
      }}
    >
      {name}
    </motion.span>
  );
}

function CategoryCard({
  category, icon, color, items, index,
}: {
  category: string; icon: string; color: string; items: string[]; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        border: hovered ? `1px solid ${color}40` : '1px solid rgba(0,245,255,0.08)',
        background: 'rgba(5,8,22,0.85)',
        backdropFilter: 'blur(20px)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.4), 0 0 30px ${color}08` : 'none',
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 transition-opacity duration-300"
        style={{ background: color, opacity: hovered ? 0.15 : 0.06 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
          style={{ background: `${color}18` }}
        >
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-frost">{category}</h3>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <SkillChip key={item} name={item} index={i} />
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

// Mini orbit visualizer
function SkillOrbit() {
  const ORBIT_SKILLS = ['Python', 'AI/ML', 'IoT', 'Arduino', 'MATLAB', 'GitHub', 'HTML', 'CSS'];
  const radii = [70, 100, 130];

  return (
    <div className="relative w-64 h-64 hidden lg:flex items-center justify-center mx-auto">
      {/* Center */}
      <div
        className="absolute w-14 h-14 rounded-full flex items-center justify-center text-lg z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,77,255,0.2))',
          border: '1px solid rgba(0,245,255,0.3)',
          boxShadow: '0 0 30px rgba(0,245,255,0.2)',
        }}
      >
        💡
      </div>

      {/* Rings */}
      {radii.map((r, i) => (
        <div
          key={r}
          className="absolute rounded-full border"
          style={{
            width: r * 2,
            height: r * 2,
            border: `1px solid rgba(0,245,255,${0.06 + i * 0.03})`,
            animation: `ringOrbit ${18 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`,
          }}
        />
      ))}

      {/* Orbiting chips */}
      {ORBIT_SKILLS.map((skill, i) => {
        const angle = (i / ORBIT_SKILLS.length) * 360;
        const radius = radii[i % radii.length];
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <motion.div
            key={skill}
            className="absolute px-2 py-1 rounded-full text-[9px] border whitespace-nowrap"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00F5FF',
              background: 'rgba(2,6,23,0.9)',
              animation: `float ${3 + (i % 3)}s ease-in-out infinite ${i * 0.5}s`,
            }}
            whileHover={{ scale: 1.2 }}
          >
            {skill}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      className="py-28 px-6 md:px-16"
      style={{ background: '#050816' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div>
            <SectionTag>Tech Stack</SectionTag>
            <SectionTitle>
              Skills <span className="text-gradient">Universe</span>
            </SectionTitle>
            <SectionSub className="mb-0">
              A growing arsenal of technologies — each category a domain I'm actively mastering.
            </SectionSub>
          </div>
          <SkillOrbit />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESUME_DATA.skills.map((cat, i) => (
            <CategoryCard key={cat.category} {...cat} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
