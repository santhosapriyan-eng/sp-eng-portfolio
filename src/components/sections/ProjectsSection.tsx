'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle, SectionSub } from '@/components/ui/SectionWrapper';
import { RESUME_DATA } from '@/lib/utils';

const CATEGORIES = ['All', 'IoT', 'Python', 'Design'];

function ProjectTag({ text }: { text: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded text-[10px] border font-mono"
      style={{
        border: '1px solid rgba(0,245,255,0.18)',
        color: '#00F5FF',
        background: 'rgba(0,245,255,0.06)',
      }}
    >
      {text}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: (typeof RESUME_DATA.projects)[0];
  index: number;
  onExpand: (p: (typeof RESUME_DATA.projects)[0]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  // Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl border overflow-hidden flex flex-col"
      style={{
        border: hovered ? project.borderColor : '1px solid rgba(0,245,255,0.08)',
        background: 'rgba(5,8,22,0.9)',
        backdropFilter: 'blur(20px)',
        boxShadow: hovered ? `0 30px 70px rgba(0,0,0,0.5), 0 0 40px ${project.color}` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Project header band */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.borderColor}, transparent)` }}
      />

      <div className="p-6 flex-1 flex flex-col">
        {/* Number + icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: project.color }}
          >
            {project.icon}
          </div>
          <span
            className="text-[10px] font-mono opacity-30"
            style={{ color: '#00F5FF' }}
          >
            {String(project.id).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-base font-bold text-frost mb-3 leading-snug">{project.title}</h3>
        <p className="text-[12px] text-muted leading-relaxed flex-1 mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(t => <ProjectTag key={t} text={t} />)}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(0,245,255,0.08)' }}>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-muted transition-colors duration-200 hover:text-cyan-DEFAULT"
              style={{ textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00F5FF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
            >
              <span>⟶</span> View Code
            </a>
          </div>
          <button
            onClick={() => onExpand(project)}
            className="text-[10px] tracking-widest uppercase border-none bg-transparent transition-colors duration-200"
            style={{ color: '#7C4DFF', cursor: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#A855F7')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7C4DFF')}
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof RESUME_DATA.projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[8000] flex items-center justify-center p-6"
      style={{ background: 'rgba(2,6,23,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative max-w-xl w-full rounded-2xl p-8 border overflow-hidden"
        style={{
          border: project.borderColor,
          background: 'rgba(5,8,22,0.97)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-muted hover:text-frost border-none bg-transparent text-lg"
          style={{ cursor: 'none' }}
        >
          ×
        </button>

        <div className="text-3xl mb-4">{project.icon}</div>
        <div className="text-[10px] tracking-widest uppercase text-muted font-mono mb-1">
          {project.category} · {project.year}
        </div>
        <h2 className="text-xl font-bold text-frost mb-4">{project.title}</h2>
        <p className="text-sm text-muted leading-relaxed mb-6">{project.longDesc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(t => <ProjectTag key={t} text={t} />)}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #7C4DFF)',
            color: '#020617',
            textDecoration: 'none',
          }}
        >
          View on GitHub ↗
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<(typeof RESUME_DATA.projects)[0] | null>(null);

  const filtered = filter === 'All'
    ? RESUME_DATA.projects
    : RESUME_DATA.projects.filter(p => p.category === filter);

  return (
    <>
      <SectionWrapper
        id="projects"
        className="py-28 px-6 md:px-16"
        style={{ background: '#020617' } as React.CSSProperties}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTag>Projects</SectionTag>
          <SectionTitle>
            Work That <span className="text-gradient">Speaks</span>
          </SectionTitle>
          <SectionSub>
            Real systems. Real problems. Real solutions — built with curiosity, shipped with confidence.
          </SectionSub>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase border transition-all duration-200 border-none"
                style={{
                  border: '1px solid',
                  borderColor: filter === cat ? '#00F5FF' : 'rgba(0,245,255,0.15)',
                  color: filter === cat ? '#020617' : '#94A3B8',
                  background: filter === cat ? '#00F5FF' : 'transparent',
                  cursor: 'none',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onExpand={setExpanded} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {expanded && (
          <ProjectModal project={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
