import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export const SITE_CONFIG = {
  name: 'Santhosa Priyan K A',
  title: 'Santhosa Priyan K A — AI/ML Engineer & Python Developer',
  description:
    'First-year B.Tech CSE (AI/ML) student at Karunya Institute of Technology and Sciences. Cisco-certified Python & IoT developer building the future with code.',
  url: 'https://santhosapriyan.eng',
  github: 'https://github.com/santhosapriyan-eng',
  linkedin: 'https://www.linkedin.com/in/santhosa-priyan-k-a-9a83a136a',
  instagram: 'https://www.instagram.com/thesanthoshpriyan',
  email: 'santhoshpriyan.tech@gmail.com',
  location: 'Coimbatore, Tamil Nadu, India',
};

export const RESUME_DATA = {
  name: 'Santhosa Priyan K A',
  role: 'AI/ML Student • Python Developer • IoT Enthusiast',
  summary:
    'First-year B.Tech CSE (AI/ML) student at Karunya Institute of Technology and Sciences with hands-on exposure to IoT systems and Python development through certifications, bootcamps, hackathons, and self-initiated projects. Cisco-certified in Python and IoT with strong interests in Artificial Intelligence, Embedded Systems, and real-world problem solving.',
  stats: [
    { num: 5, label: 'Certifications', suffix: '+' },
    { num: 8, label: 'Tech Events', suffix: '+' },
    { num: 3, label: 'Hackathons', suffix: '' },
    { num: 7, label: 'CGPA', suffix: '.0' },
  ],
  education: [
    {
      degree: 'B.Tech — Computer Science Engineering (AI/ML)',
      institution: 'Karunya Institute of Technology and Sciences',
      location: 'Coimbatore, Tamil Nadu, India',
      period: '2024 – 2029',
      status: 'Currently Pursuing',
      grade: 'CGPA: 7.0 / 10',
      tags: ['Artificial Intelligence', 'Machine Learning', 'CSE'],
    },
    {
      degree: 'Diploma in Computer Applications (DCA)',
      institution: 'Bharathidasan University — IECD',
      location: 'Tamil Nadu, India',
      period: '2024',
      status: 'Completed',
      grade: 'First Class',
      tags: ['Computer Applications', 'Office Automation'],
    },
  ],
  experience: [
    {
      role: 'Freelance Graphic Designer & Digital Creative',
      company: 'Self-Employed',
      type: 'Remote',
      period: '2024 – Present',
      bullets: [
        'Designed posters, social media creatives, and promotional materials using Canva and digital design tools',
        'Delivered multiple creative projects independently while managing client requirements, revisions, and deadlines',
        'Developed practical experience in visual communication, branding, and digital content presentation',
        'Collaborated with peers and student communities for technical event promotions and outreach',
      ],
      tags: ['Canva', 'Brand Design', 'Social Media', 'Client Management', 'Visual Communication'],
    },
  ],
  skills: [
    {
      category: 'Programming Languages',
      icon: '🐍',
      color: '#00F5FF',
      items: ['Python', 'HTML5', 'CSS3', 'C (Basics)'],
    },
    {
      category: 'AI & Emerging Tech',
      icon: '🤖',
      color: '#7C4DFF',
      items: ['Artificial Intelligence', 'Machine Learning', 'Internet of Things', 'Embedded Systems', 'Quantum Computing (Basics)'],
    },
    {
      category: 'Tools & Platforms',
      icon: '🔧',
      color: '#38BDF8',
      items: ['MATLAB', 'Arduino IDE', 'GitHub', 'VS Code', 'Version Control'],
    },
    {
      category: 'Design & Creative',
      icon: '🎨',
      color: '#A855F7',
      items: ['Graphic Design', 'Social Media Creatives', 'Poster Design', 'Brand Visuals', 'Office Automation'],
    },
    {
      category: 'Frontend Development',
      icon: '🌐',
      color: '#0EA5E9',
      items: ['HTML5', 'CSS3', 'Responsive Design', 'Web Fundamentals'],
    },
    {
      category: 'Core Competencies',
      icon: '💡',
      color: '#00F5FF',
      items: ['Problem Solving', 'Data Structures (Learning)', 'Sensor Integration', 'Project Management', 'Client Communication'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Smart Weather Monitoring System',
      description:
        'A real-time environmental monitoring system using DHT11 sensors and Arduino Uno to track temperature and humidity data. Displays live readings through embedded hardware with stable sensor monitoring demonstrated during IoT Boot Camp.',
      longDesc:
        'Built during the IoT Boot Camp at Karunya Institute, this system reads temperature and humidity from DHT11 sensors connected to an Arduino Uno, processes the data in real-time, and outputs live readings to a serial monitor and LCD display. Achieved stable continuous monitoring with sub-second refresh rates.',
      tags: ['Arduino', 'DHT11', 'IoT', 'Embedded C', 'Real-time Data', 'Sensor Systems'],
      icon: '🌡️',
      color: 'rgba(0,245,255,0.1)',
      borderColor: 'rgba(0,245,255,0.25)',
      github: 'https://github.com/santhosapriyan-eng',
      category: 'IoT',
      year: '2025',
    },
    {
      id: 2,
      title: 'Python Utility Application Suite',
      description:
        'A collection of 3+ Python-based mini-applications including file organization utilities, automation scripts, and logic-building programs using functions, loops, and file handling concepts.',
      longDesc:
        'A growing suite of Python utilities built to solve real-world problems: an automated file organizer that sorts downloads by file type, a text-processing automation script that handles batch operations, and a set of logic puzzles implemented as interactive CLI programs.',
      tags: ['Python 3', 'Automation', 'File I/O', 'CLI Applications', 'OOP', 'Scripting'],
      icon: '🐍',
      color: 'rgba(124,77,255,0.1)',
      borderColor: 'rgba(124,77,255,0.25)',
      github: 'https://github.com/santhosapriyan-eng',
      category: 'Python',
      year: '2025',
    },
    {
      id: 3,
      title: 'Digital Brand Creatives Portfolio',
      description:
        'A comprehensive freelance design portfolio delivering social media creatives, event posters, and promotional materials for student communities and technical events across multiple semesters.',
      longDesc:
        'Managing end-to-end creative delivery for clients including student clubs, event organizers, and tech communities. Developed a streamlined workflow for brief intake, design, revision, and delivery. Created visual identities for multiple technical events at Karunya University.',
      tags: ['Canva', 'Brand Design', 'Social Media', 'Event Posters', 'Visual Identity'],
      icon: '🎨',
      color: 'rgba(168,85,247,0.1)',
      borderColor: 'rgba(168,85,247,0.25)',
      github: 'https://www.instagram.com/thesanthoshpriyan',
      category: 'Design',
      year: '2024–Present',
    },
  ],
  certifications: [
    { title: 'Python Essentials One', org: 'Cisco Networking Academy & OpenEDG', year: '2026', icon: '🐍', color: '#00F5FF' },
    { title: 'Introduction to Internet of Things', org: 'Cisco Networking Academy', year: '2026', icon: '🌐', color: '#0EA5E9' },
    { title: 'Complete Front-End Development Journey', org: 'Infosys Springboard', year: '2026', icon: '💻', color: '#7C4DFF' },
    { title: 'MATLAB Onramp', org: 'MathWorks Training Services', year: '2026', icon: '📐', color: '#A855F7' },
    { title: 'Diploma in Computer Applications', org: 'Bharathidasan University', year: '2024', icon: '🎓', color: '#38BDF8' },
    { title: 'Graphic Design & Office Automation', org: 'Bharathidasan University', year: '2019–2020', icon: '🎨', color: '#00F5FF' },
  ],
  achievements: [
    { icon: '⚡', title: 'IoT Boot Camp', desc: 'MATRIX Association at Karunya — hands-on IoT system building and sensor integration.', year: '2025' },
    { icon: '⚛️', title: 'Quantumania Workshop', desc: 'Mathematical Foundations & Basics of Quantum Computing — MATRIX Association, Karunya.', year: '2025' },
    { icon: '🐍', title: 'Logic to Magic Python Boot Camp', desc: 'MATRIX Association & Karunya University — Python programming bootcamp.', year: '2025' },
    { icon: '✈️', title: 'Machyard 2026', desc: 'Aerospace Event at Karunya University — exploration of aerospace engineering.', year: '2026' },
    { icon: '🤖', title: 'Multi Agent Coordination Arena', desc: 'Technical Event during Mindkraft 2026 at Karunya Institute.', year: '2026' },
    { icon: '🔬', title: 'Vortex at NIT Tiruchirappalli', desc: 'Technical Event conducted by IIT Madras at NIT Tiruchirappalli.', year: '2025' },
    { icon: '☁️', title: 'Google Cloud HackSprint', desc: 'Google Cloud Digital Campus 2.0 HackSprint — Karunya University collaboration.', year: '2025' },
    { icon: '💡', title: 'Matrix Ideathon 2026', desc: 'Innovation competition — ideation, team collaboration, and solution pitching.', year: '2026' },
    { icon: '🌐', title: 'Mindkraft 2026 International Fest', desc: 'International Techno-Management Festival — Karunya Institute.', year: '2026' },
  ],
  services: [
    { icon: '🤖', title: 'AI/ML Development', desc: 'Building machine learning models and AI-powered applications using Python and modern ML frameworks.' },
    { icon: '🔌', title: 'IoT Systems', desc: 'Designing sensor-based systems with Arduino, real-time data monitoring, and embedded hardware integration.' },
    { icon: '🐍', title: 'Python Automation', desc: 'Writing automation scripts, file management utilities, and CLI tools that save time and eliminate repetition.' },
    { icon: '🌐', title: 'Frontend Development', desc: 'Building clean, responsive web interfaces with HTML5, CSS3, and modern web standards.' },
    { icon: '🎨', title: 'Graphic Design', desc: 'Creating stunning visual content — social media creatives, event posters, and brand materials.' },
    { icon: '📐', title: 'MATLAB & Scientific Computing', desc: 'Numerical analysis and engineering calculations using MATLAB for technical problem solving.' },
  ],
  funFacts: [
    { emoji: '🌟', text: 'Attended both IIT Madras & NIT Trichy events as a first-year student' },
    { emoji: '⚡', text: 'Built an IoT weather station that worked on the very first try' },
    { emoji: '☁️', text: 'Joined a Google Cloud hackathon before finishing semester one' },
    { emoji: '🎨', text: 'Freelancing designer since 2024 — turning ideas into visual stories' },
    { emoji: '🔬', text: 'Explored quantum computing fundamentals in a university workshop' },
    { emoji: '🏆', text: '5+ certifications in year one — always learning, always shipping' },
  ],
  terminalCommands: {
    help: [
      'Available commands:',
      '  about      → About Santhosa Priyan',
      '  skills     → Tech stack & tools',
      '  projects   → My project showcase',
      '  education  → Academic background',
      '  certs      → Certifications',
      '  experience → Work experience',
      '  github     → Open GitHub profile',
      '  linkedin   → Open LinkedIn profile',
      '  contact    → Contact information',
      '  clear      → Clear terminal',
      '  whoami     → Quick bio',
    ],
    whoami: [
      'Santhosa Priyan K A',
      'B.Tech CSE (AI/ML) Student @ Karunya Institute',
      'Python Dev | IoT Builder | Cisco Certified',
      'Coimbatore, Tamil Nadu, India 🇮🇳',
      'Status: Open to internships & collaborations 🚀',
    ],
    about: [
      'Name:        Santhosa Priyan K A',
      'Role:        AI/ML Student & Python Developer',
      'Institute:   Karunya Institute of Technology & Sciences',
      'Major:       B.Tech CSE — Artificial Intelligence & ML',
      'CGPA:        7.0 / 10',
      'Year:        First Year (Batch 2024–2029)',
      'Location:    Coimbatore, Tamil Nadu, India',
      'Interests:   AI, IoT, Embedded Systems, Problem Solving',
      'Status:      Open to Opportunities ✅',
    ],
    skills: [
      'Languages:   Python, HTML5, CSS3, C (basics)',
      'AI/ML:       Machine Learning, Neural Networks, AI Fundamentals',
      'IoT:         Arduino, DHT11 Sensors, Embedded Systems',
      'Tools:       MATLAB, GitHub, VS Code, Canva, Arduino IDE',
      'Certs:       Cisco Python ✓ | Cisco IoT ✓ | MATLAB ✓',
      '             Infosys Springboard ✓ | DCA First Class ✓',
    ],
    projects: [
      '[01] Smart Weather Monitoring System',
      '     Stack: Arduino, DHT11, Embedded C, IoT',
      '     → Real-time temperature & humidity monitoring',
      '',
      '[02] Python Utility Application Suite',
      '     Stack: Python 3, File I/O, CLI, Automation',
      '     → 3+ automation scripts & utility programs',
      '',
      '[03] Digital Brand Creatives Portfolio',
      '     Stack: Canva, Design Tools, Visual Identity',
      '     → Freelance design for events & communities',
    ],
    education: [
      '● B.Tech CSE (AI/ML) — Karunya Institute, Coimbatore',
      '  Status: Currently Pursuing | Graduation: 2029',
      '  CGPA: 7.0/10',
      '',
      '● Diploma in Computer Applications (DCA)',
      '  Bharathidasan University | Result: First Class | 2024',
    ],
    certs: [
      '✓ Cisco Python Essentials One (2026)',
      '✓ Cisco Introduction to IoT (2026)',
      '✓ Infosys Springboard — Front-End Development (2026)',
      '✓ MATLAB Onramp — MathWorks (2026)',
      '✓ Diploma in Computer Applications — BDU (2024)',
      '✓ Graphic Design & Office Automation — BDU (2019-2020)',
    ],
    experience: [
      'Freelance Graphic Designer & Digital Creative',
      'Type: Self-Employed | Mode: Remote | Since: 2024',
      '',
      '→ Designed posters, social media creatives & brand materials',
      '→ Managed full client lifecycle: brief → design → delivery',
      '→ Collaborated on technical event promotions at Karunya',
      '→ Built practical experience in visual communication & branding',
    ],
    contact: [
      'Email:     santhoshpriyan.tech@gmail.com',
      'LinkedIn:  linkedin.com/in/santhosa-priyan-k-a-9a83a136a',
      'GitHub:    github.com/santhosapriyan-eng',
      'Instagram: instagram.com/thesanthoshpriyan',
      'Location:  Coimbatore, Tamil Nadu, India',
    ],
  },
};
