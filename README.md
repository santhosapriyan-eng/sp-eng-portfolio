# 🚀 Santhosa Priyan K A — Cinematic Portfolio

> **Awwwards-level personal portfolio** built with Next.js 14, React Three Fiber, Framer Motion, and GSAP.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r164-black?logo=three.js)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Features

- 🎬 **Cinematic intro loader** — futuristic OS boot sequence
- 🌌 **3D particle field** — React Three Fiber / Three.js background
- 🎭 **Holographic profile card** — 3D tilt, scan lines, glow rings
- ⌨️ **Typing animation** — rotating role titles with TypeAnimation
- 🖱️ **Custom cursor** — with liquid trail effect
- 📜 **Smooth scroll** — Lenis inertia scrolling
- ✨ **Scroll reveal** — Framer Motion stagger animations on every section
- 🖥️ **Interactive terminal** — type commands to explore the portfolio
- 📊 **GitHub analytics** — stats cards and language breakdown bars
- 🃏 **Project modals** — glassmorphism cards with 3D tilt and expand
- 🎯 **Skill orbit galaxy** — animated orbiting tech chips
- 🔗 **Social dock** — fixed magnetic social sidebar
- 📱 **Fully responsive** — mobile-first, premium on all breakpoints
- 🔍 **SEO optimized** — metadata, OpenGraph, sitemap, robots.txt
- 🚀 **Vercel-ready** — zero-config deployment

---

## 🗂️ Folder Structure

```
portfolio/
├── public/
│   ├── photo.jpg           ← Your professional photo
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx      ← Root layout + metadata
│   │   └── page.tsx        ← Main page (composes all sections)
│   ├── components/
│   │   ├── ui/             ← Reusable UI primitives
│   │   │   ├── Loader.tsx
│   │   │   ├── Cursor.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── SectionWrapper.tsx
│   │   │   ├── SocialDock.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/       ← All page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   ├── AchievementsSection.tsx
│   │   │   ├── GitHubSection.tsx
│   │   │   ├── TerminalSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── FunFactsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── three/          ← 3D scenes
│   │       └── HeroScene.tsx
│   ├── hooks/
│   │   └── useAnimations.ts ← Custom hooks (tilt, magnetic, counter...)
│   ├── lib/
│   │   └── utils.ts        ← All portfolio data + utility functions
│   └── styles/
│       └── globals.css     ← Global styles, animations, design tokens
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Smooth Scroll | Lenis |
| Typography | Space Grotesk + JetBrains Mono |
| Typing | react-type-animation |
| Counters | react-countup |
| Icons | Lucide React |
| Deployment | Vercel |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Install dependencies

```bash
npm install
```

### 2. Add your photo

Place your professional photo at:
```
public/photo.jpg
```
(Already included in this build.)

### 3. Update your data

Edit `src/lib/utils.ts`:
- Update `SITE_CONFIG` with your real email and social links
- All resume data is already populated from your PDF

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🚀 Deploy to Vercel

### Option A — Vercel CLI (recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo

3. Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build`
   - **Output Directory**: `.next`

4. Click **Deploy** → Done in ~60 seconds ✅

### Custom Domain

In Vercel dashboard → **Settings → Domains** → Add `santhosapriyan.dev`

---

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --cyan: #00F5FF;    /* Primary accent */
  --violet: #7C4DFF; /* Secondary accent */
  --purple: #A855F7; /* Tertiary accent */
}
```

### Content
All portfolio data lives in `src/lib/utils.ts` → `RESUME_DATA`:
- `stats` — hero stat counters
- `education` — education timeline
- `experience` — work history
- `skills` — skill categories
- `projects` — project cards
- `certifications` — cert cards
- `achievements` — events/hackathons
- `services` — what I do cards
- `funFacts` — fun facts section
- `terminalCommands` — terminal responses

### Add a new project
```ts
// In RESUME_DATA.projects:
{
  id: 4,
  title: 'Your New Project',
  description: 'Short description...',
  longDesc: 'Detailed description...',
  tags: ['React', 'Python', 'etc'],
  icon: '🚀',
  color: 'rgba(0,245,255,0.1)',
  borderColor: 'rgba(0,245,255,0.25)',
  github: 'https://github.com/...',
  category: 'Web',
  year: '2025',
}
```

---

## ⚙️ Environment Variables

No environment variables required for the base portfolio.

Optional (for future contact form):
```env
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📊 Performance

Target Lighthouse scores:
- ✅ Performance: 90+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

Optimizations included:
- Lazy loading of 3D scene (React Suspense)
- Dynamic imports for heavy components
- Image optimization via Next.js Image
- Font preloading
- GPU-accelerated CSS animations
- `will-change` hints on animated elements

---

## 📄 License

MIT — feel free to fork and adapt for your own portfolio.

---

Built with ⚡ by **Santhosa Priyan K A** · Coimbatore, Tamil Nadu, India
