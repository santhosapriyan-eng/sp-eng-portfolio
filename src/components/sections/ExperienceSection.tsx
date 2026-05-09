'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

function TimelineItem({
  date, title, org, desc, tags, index, accentColor = '#00F5FF',
}: {
  date: string; title: string; org: string; desc?: string; tags: string[];
  bullets?: string[]; index: number; accentColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(180deg, ${accentColor}60, ${accentColor}10, transparent)` }}
      />
      {/* Dot */}
      <div
        className="timeline-dot absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
        style={{
          borderColor: accentColor,
          background: '#020617',
          boxShadow: `0 0 8px ${accentColor}60`,
        }}
      />

      <div
        className="font-mono text-[10px] tracking-widest uppercase mb-1"
        style={{ color: accentColor }}
      >
        {date}
      </div>
      <h3 className="text-sm font-bold text-frost mb-0.5">{title}</h3>
      <div className="text-xs text-muted mb-3">{org}</div>
      {desc && <p className="text-xs text-muted leading-relaxed mb-3">{desc}</p>}

      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] rounded border"
            style={{
              border: `1px solid ${accentColor}25`,
              color: accentColor,
              background: `${accentColor}08`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceCard() {
  const exp = RESUME_DATA.experience[0];
  return (
    <div>
      <SectionTag>Experience</SectionTag>
      <SectionTitle style={{ fontSize: '1.8rem' } as React.CSSProperties}>
        Work <span className="text-gradient">History</span>
      </SectionTitle>

      <div className="mt-8">
        <TimelineItem
          date={exp.period}
          title={exp.role}
          org={`${exp.company} · ${exp.type}`}
          desc={exp.bullets.join(' · ')}
          tags={exp.tags}
          index={0}
          accentColor="#00F5FF"
        />

        {/* Placeholder future entry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative pl-8 pt-2"
        >
          <div
            className="absolute left-0 top-0 w-px h-12 opacity-20"
            style={{ background: '#00F5FF' }}
          />
          <div
            className="absolute left-[-4px] top-2 w-2 h-2 rounded-full border border-dashed"
            style={{ borderColor: '#00F5FF44', background: 'transparent' }}
          />
          <div className="text-[10px] font-mono tracking-widest uppercase text-muted opacity-40">
            Next Chapter — Coming Soon
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function EducationCard() {
  return (
    <div>
      <SectionTag>Education</SectionTag>
      <SectionTitle style={{ fontSize: '1.8rem' } as React.CSSProperties}>
        Academic <span className="text-gradient-purple">Journey</span>
      </SectionTitle>

      <div className="mt-8">
        {RESUME_DATA.education.map((edu, i) => (
          <TimelineItem
            key={edu.degree}
            date={edu.period}
            title={edu.degree}
            org={`${edu.institution} · ${edu.location}`}
            desc={`${edu.status} · ${edu.grade}`}
            tags={edu.tags}
            index={i}
            accentColor="#7C4DFF"
          />
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper
      id="experience"
      className="py-28 px-6 md:px-16"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #0B1120 100%)' } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <ExperienceCard />
        <EducationCard />
      </div>
    </SectionWrapper>
  );
}
