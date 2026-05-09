import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#020617',
          2: '#050816',
          3: '#0B1120',
          4: '#000814',
        },
        cyan: {
          DEFAULT: '#00F5FF',
          dim: 'rgba(0,245,255,0.15)',
          glow: 'rgba(0,245,255,0.3)',
        },
        violet: {
          DEFAULT: '#7C4DFF',
        },
        purple: {
          DEFAULT: '#A855F7',
          glow: 'rgba(168,85,247,0.3)',
        },
        sky: {
          DEFAULT: '#38BDF8',
        },
        accent: '#0EA5E9',
        muted: '#94A3B8',
        frost: '#F0F9FF',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        satoshi: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,77,255,0.15), transparent)',
        'glow-cyan': 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
        'glow-purple': 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,245,255,0.05) 0%, rgba(124,77,255,0.05) 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 30s linear infinite reverse',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'grid-shift': 'gridShift 20s linear infinite',
        'reveal-up': 'revealUp 0.8s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'orbit': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbit 12s linear infinite reverse',
        'holo': 'holoShift 4s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '200%' },
        },
        gridShift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        holoShift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,245,255,0.2)' },
          '50%': { boxShadow: '0 0 50px rgba(0,245,255,0.5), 0 0 80px rgba(124,77,255,0.2)' },
        },
      },
      boxShadow: {
        'cyan': '0 0 30px rgba(0,245,255,0.3)',
        'cyan-lg': '0 0 60px rgba(0,245,255,0.4)',
        'purple': '0 0 30px rgba(168,85,247,0.3)',
        'card': '0 20px 60px rgba(0,0,0,0.5)',
        'glow': '0 0 40px rgba(0,245,255,0.15), 0 0 80px rgba(124,77,255,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
