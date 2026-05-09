'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function ServiceCard({
  service,
  index,
}: {
  service: (typeof RESUME_DATA.services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-7 rounded-2xl border text-center overflow-hidden transition-all duration-300"
      style={{
        border: hovered ? '1px solid rgba(0,245,255,0.28)' : '1px solid rgba(0,245,255,0.07)',
        background: hovered ? 'rgba(0,245,255,0.03)' : 'rgba(5,8,22,0.7)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      {/* Animated corner glow */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-full transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="text-3xl mb-4">{service.icon}</div>
      <h3 className="text-sm font-bold text-frost mb-3">{service.title}</h3>
      <p className="text-xs text-muted leading-relaxed">{service.desc}</p>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] transition-transform duration-400 origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <SectionWrapper
      id="services"
      className="py-28 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #020617 100%)' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <SectionTag>What I Do</SectionTag>
        <SectionTitle>
          Services &amp; <span className="text-gradient">Expertise</span>
        </SectionTitle>
        <SectionSub>
          From writing clean Python code to crafting beautiful design assets — a versatile
          skillset for every project.
        </SectionSub>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESUME_DATA.services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
