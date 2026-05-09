'use client';

import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper, { SectionTag, SectionTitle } from '@/components/ui/SectionWrapper';
import { RESUME_DATA, SITE_CONFIG } from '@/lib/utils';

type Line = { type: 'input' | 'output' | 'success' | 'accent' | 'error'; text: string };

const COMMANDS = RESUME_DATA.terminalCommands as Record<string, string[]>;

function processCommand(cmd: string): Line[] {
  const trimmed = cmd.trim().toLowerCase();
  const result: Line[] = [{ type: 'input', text: cmd }];

  if (!trimmed) return result;

  if (trimmed === 'clear') return []; // handled separately

  if (trimmed === 'github') {
    COMMANDS.github.forEach(t => result.push({ type: 'output', text: t }));
    setTimeout(() => window.open(SITE_CONFIG.github, '_blank'), 300);
    return result;
  }
  if (trimmed === 'linkedin') {
    COMMANDS.linkedin?.forEach(t => result.push({ type: 'output', text: t }));
    setTimeout(() => window.open(SITE_CONFIG.linkedin, '_blank'), 300);
    return result;
  }

  const output = COMMANDS[trimmed];
  if (output) {
    output.forEach((t, i) => {
      result.push({
        type: i === 0 ? 'success' : t.startsWith('●') ? 'accent' : 'output',
        text: t,
      });
    });
  } else {
    result.push({ type: 'error', text: `Command not found: ${trimmed}. Type 'help' for available commands.` });
  }
  return result;
}

export default function TerminalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<Line[]>([
    { type: 'success', text: '  Welcome to Santhosa Priyan\'s Portfolio Terminal  ' },
    { type: 'output', text: 'System initialized. Type \'help\' for available commands.' },
    { type: 'accent', text: '● Status: Online & Open to Opportunities 🚀' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const submit = () => {
    const cmd = value.trim();
    if (cmd === 'clear') {
      setHistory([{ type: 'success', text: 'Terminal cleared.' }]);
      setValue('');
      return;
    }
    const lines = processCommand(value);
    setHistory(prev => [...prev, ...lines]);
    if (cmd) {
      setCmdHistory(prev => [cmd, ...prev]);
      setHistoryIdx(-1);
    }
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(idx);
      setValue(cmdHistory[idx] ?? '');
    }
    if (e.key === 'ArrowDown') {
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setValue(idx === -1 ? '' : cmdHistory[idx] ?? '');
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = value.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
      if (match) setValue(match);
    }
  };

  const colorMap: Record<string, string> = {
    input: '#F0F9FF',
    output: '#94A3B8',
    success: '#4ade80',
    accent: '#A855F7',
    error: '#f87171',
  };

  return (
    <SectionWrapper
      id="terminal"
      className="py-28 px-6 md:px-16"
      style={{ background: '#050816' } as React.CSSProperties}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <SectionTag>Interactive</SectionTag>
          <SectionTitle>
            AI <span className="text-gradient">Terminal</span>
          </SectionTitle>
          <p className="text-sm text-muted">
            Type a command to explore the portfolio.{' '}
            Try:{' '}
            {['help', 'about', 'skills', 'projects'].map(c => (
              <code
                key={c}
                className="mx-1 px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(0,245,255,0.08)', color: '#00F5FF' }}
              >
                {c}
              </code>
            ))}
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden border"
          style={{
            border: '1px solid rgba(0,245,255,0.18)',
            boxShadow: '0 0 60px rgba(0,245,255,0.06)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center px-4 py-3 gap-2 border-b"
            style={{ background: 'rgba(0,245,255,0.04)', borderColor: 'rgba(0,245,255,0.1)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            <div
              className="flex-1 text-center text-[10px] tracking-widest font-mono"
              style={{ color: '#94A3B8' }}
            >
              santhosa@portfolio:~
            </div>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="p-6 font-mono text-[12px] leading-7 overflow-y-auto"
            style={{ background: 'rgba(2,6,23,0.97)', minHeight: 320, maxHeight: 420 }}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="flex gap-2">
                {line.type === 'input' && (
                  <span style={{ color: '#00F5FF' }}>$</span>
                )}
                <span style={{ color: colorMap[line.type] ?? '#94A3B8' }}>
                  {line.text}
                </span>
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 mt-2">
              <span style={{ color: '#00F5FF' }}>$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-frost font-mono text-[12px]"
                style={{ color: '#F0F9FF', caretColor: '#00F5FF' }}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input"
              />
              <span className="term-cursor" style={{ color: '#00F5FF', fontSize: '14px' }}>▌</span>
            </div>
          </div>

          {/* Quick buttons */}
          <div
            className="px-6 py-3 flex flex-wrap gap-2 border-t"
            style={{ background: 'rgba(0,245,255,0.02)', borderColor: 'rgba(0,245,255,0.08)' }}
          >
            {['help', 'about', 'skills', 'projects', 'certs', 'clear'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  if (cmd === 'clear') {
                    setHistory([{ type: 'success', text: 'Terminal cleared.' }]);
                    return;
                  }
                  const lines = processCommand(cmd);
                  setHistory(prev => [...prev, ...lines]);
                }}
                className="px-3 py-1 text-[9px] tracking-widest uppercase rounded border transition-all duration-200 border-none"
                style={{
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: '#94A3B8',
                  background: 'transparent',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#00F5FF';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.15)';
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
