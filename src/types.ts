export interface SkillItem {
  name: string;
  rating: number; // percentage out of 100
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  pNo: string;
  slug?: string;
  year: string;
  category: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  tags?: string[]; // Backward compatibility
  image?: string;
  challenges?: string;
  learnings?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  imageUrl: string;
  date: string;
  description: string;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  summary: string;
  content: string;
}

export interface HobbyItem {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  funFact: string;
}

export interface SiteSettings {
  socialLinks: {
    github?: string;
    leetcode?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
  seo?: {
    title: string;
    description: string;
  };
  welcomeMessage?: string;
}

export interface DBShape {
  projects: ProjectItem[];
  gallery: GalleryItem[];
  blog: BlogItem[];
  hobbies: HobbyItem[];
  siteSettings: SiteSettings;
}

export interface TimelineEvent {
  year: string;
  month: string;
  title: string;
  detail: string;
  dotOpen?: boolean;
}

export interface AchievementItem {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  issuer?: string;
  year?: string;
  link?: string;
}

// Full comprehensive static datasets for Anurudh's portfolio

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: '⚛️',
    skills: [
      { name: 'React.js', rating: 85 },
      { name: 'TypeScript', rating: 80 },
      { name: 'Next.js', rating: 70 },
      { name: 'JavaScript', rating: 80 },
      { name: 'Tailwind CSS', rating: 90 },
      { name: 'Figma (Designer)', rating: 88 },
    ],
  },
  {
    title: 'Backend Development',
    icon: '☕',
    skills: [
      { name: 'Node.js / Express', rating: 68 },
      { name: 'Python', rating: 65 },
      { name: 'Java Core', rating: 75 },
      { name: 'Spring Boot', rating: 60 },
      { name: 'REST APIs', rating: 72 },
    ],
  },
  {
    title: 'Creative Design',
    icon: '🎨',
    skills: [
      { name: 'Adobe XD', rating: 85 },
      { name: 'Illustrator', rating: 80 },
      { name: 'Photoshop', rating: 75 },
      { name: 'UI/UX & Handoff', rating: 82 },
    ],
  },
  {
    title: 'Data & Tools',
    icon: '📊',
    skills: [
      { name: 'MySQL / SQL', rating: 65 },
      { name: 'PostgreSQL', rating: 60 },
      { name: 'MongoDB', rating: 58 },
      { name: 'Git & GitHub', rating: 78 },
      { name: 'VS Code Core', rating: 90 },
      { name: 'Postman API Development', rating: 70 },
    ],
  },
  {
    title: 'Computer Concepts',
    icon: '🧠',
    skills: [
      { name: 'Data Structures (DSA)', rating: 70 },
      { name: 'OOP (Java)', rating: 80 },
      { name: 'Operating Systems', rating: 62 },
      { name: 'Computer Networks', rating: 60 },
    ],
  },
  {
    title: 'Cross-Platform & Frameworks',
    icon: '📱',
    skills: [
      { name: 'Kotlin / Compose', rating: 62 },
      { name: 'Electron', rating: 55 },
      { name: 'AngularJS', rating: 58 },
    ],
  },
  {
    title: 'Professional Attributes',
    icon: '🏆',
    skills: [
      { name: 'Problem Solving', rating: 90 },
      { name: 'Technical Communication', rating: 85 },
      { name: 'Leadership Edge', rating: 75 },
      { name: 'Self-Learning Loop', rating: 92 },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'p1',
    pNo: '01',
    year: '2025-2026',
    category: 'Full Stack Design',
    title: 'Evento',
    description:
      'A full-stack web application connecting users with top-rated event organizers and service providers. Implemented booking functionality, service discovery features, and a responsive UI for seamless event planning and reservations.',
    technologies: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
    tags: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/Anurudrr/EVENTO-EVENT-MANAGER',
    demoUrl: 'https://evento-six-livid.vercel.app/',
  },
  {
    id: 'p2',
    pNo: '02',
    year: '2026',
    category: 'Full-Stack Product',
    title: 'Hopin',
    description:
      'A full-stack ride-sharing platform enabling users to find and match with commuters on similar routes. Engineered route matching algorithms, fare calculation and splitting, real-time location tracking, and user authentication. Deployed on Vercel with optimized performance for high user volume.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Vercel'],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Vercel'],
    githubUrl: 'https://github.com/Anurudrr/HOPIN--CAB-SERVICES',
    demoUrl: 'https://hopin-five.vercel.app/',
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2023',
    month: 'Chapter 1',
    title: 'Beginning at Parul',
    detail:
      'Started B.Tech Computer Science & Engineering at Parul Institute of Technology, Vadodara (2023–2027). Currently maintaining a CGPA of 7.07/10 while building core programming and engineering skills.',
  },
  {
    year: '2024',
    month: 'Chapter 2',
    title: 'Discovering Design',
    detail:
      'Spent the year on UI/UX design practice — Figma, Adobe XD, Canva, vector illustration and graphic design — establishing a strong geometric and visual layout instinct.',
  },
  {
    year: '2025',
    month: 'Chapter 3',
    title: 'Evento — First Full-Stack Ship',
    detail:
      'Nov 2025 – Apr 2026: shipped Evento, a full-stack event management platform, as Frontend Developer & UI Designer in a 4-person team under mentor Ms. Gayatri Naidu — booking flows, service discovery, and a responsive UI.',
  },
  {
    year: '2026',
    month: 'Chapter 4',
    title: 'Hopin — Solo Ride-Sharing Platform',
    detail:
      'May – Aug 2026: built Hopin, a full-stack ride-sharing platform, solo — route matching algorithms, fare calculation and splitting, real-time location tracking, and authentication. Deployed to Vercel.',
    dotOpen: true,
  },
  {
    year: 'Future',
    month: 'Chapter 5',
    title: 'Campus Placements & Full-Stack Growth',
    detail:
      'Preparing for campus placements, sharpening DSA on LeetCode, and shipping scalable full-stack products across web, desktop, and mobile.',
    dotOpen: true,
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    icon: '🏦',
    title: 'Software Engineering Job Simulation',
    tag: 'ELITE · FORAGE',
    issuer: 'JPMorgan Chase & Co.',
    description:
      'Built a Spring Boot microservice end to end — Kafka consumer, H2/JPA persistence, and REST controller — in a structured job simulation.',
    link: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
  },
  {
    icon: '🌐',
    title: 'Computer Networks — Elite Certificate',
    tag: 'NPTEL ELITE · 56/100',
    issuer: 'NPTEL · IIT Kharagpur',
    description:
      'Elite certification covering TCP/IP architecture, routing protocols, and network fundamentals through rigorous proctored assessment.',
    link: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
  },
  {
    icon: '🎯',
    title: 'Branding and Design',
    tag: 'FORAGE',
    issuer: 'Forage',
    description:
      'Job simulation across brand strategy, visual identity, and frontend design — applying design thinking to real client briefs.',
    link: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
  },
  {
    icon: '💻',
    title: 'Continuous Algorithm Practice',
    tag: 'LEETCODE',
    description:
      'Daily DSA practice in Java and JavaScript with a focus on algorithmic thinking and computational optimization.',
  },
  {
    icon: '🎨',
    title: 'Graphic Design Professional Root',
    tag: '3+ YEARS',
    description:
      'Professional editing, structural framing, vector illustration, and creative direction before migrating to code.',
  },
];

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: 'h1',
    icon: '🖋️',
    title: 'Vector & Lettering Illustration',
    category: 'Design Craft',
    description:
      'Designing quirky brand logos, bespoke geometric vector iconography, and bold typographic layouts. Maintaining a continuous visual practice that informs front-end component structures.',
    accent: 'bg-[#F5C800]',
    funFact:
      'Enjoys using halftone filters and retro ink bleed effects to give digital art a physical printed vibe.',
  },
  {
    id: 'h2',
    icon: '🧩',
    title: 'Algorithmic Speed Puzzles',
    category: 'Logic Engine',
    description:
      "Engaging in algorithmic strategy card games and solving complex multi-dimensional mathematical puzzles. Practicing speed-solving Rubik's cubes as a cognitive warmup.",
    accent: 'bg-[#C0392B] text-white',
    funFact: "Best solving time for a standard 3x3 Rubik's Cube is 17.4 seconds!",
  },
  {
    id: 'h3',
    icon: '⛰️',
    title: 'Travel & Landscape Photography',
    category: 'Visual Archive',
    description:
      'Exploring historical architectures of Gujarat, identifying geometric proportions in heritage sites, and documenting cityscapes under low-light high-contrast compositions.',
    accent: 'bg-[#1a3a5c] text-white',
    funFact:
      'Keeps a growing analog journal filled with architectural sketch drafts and high-contrast street photos.',
  },
  {
    id: 'h4',
    icon: '💿',
    title: 'Generative Audio & Synth',
    category: 'Soundscapes',
    description:
      'Modulating analog synthesizers and programming mathematical sound loops. Exploring how audio waves oscillate under distinct web audio API sound canvases.',
    accent: 'bg-[#f0ece0]',
    funFact:
      'Actually coded a custom Web Audio synthesizer that converts mouse movement coordinates into low-fi minor-pentatonic melody scales.',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Brutalist Grid Typography Study',
    tag: 'Graphic Design',
    imageUrl:
      'https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=600&auto=format&fit=crop',
    date: 'Feb 2025',
    description:
      'An interactive graphic study researching vintage print media, coarse Swiss grid structures, and dense layouts. Features custom high-contrast palettes and hand-drawn vectors.',
  },
  {
    id: 'g2',
    title: 'Full-Stack System Architecture Schema',
    tag: 'Software Engineering',
    imageUrl:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
    date: 'May 2025',
    description:
      'Data-flow diagrams mapping out spring security filters, CORS configs, and database connection queries designed for low latency high throughput dashboard feeds.',
  },
  {
    id: 'g3',
    title: 'Industrial Aesthetics on Canvas',
    tag: 'Illustration Art',
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    date: 'Oct 2024',
    description:
      'Abstract vector shapes designed to replicate traditional printing press overlays, utilizing ink splatters, line misalignments, and vivid primary halftone shades.',
  },
  {
    id: 'g4',
    title: 'Vadodara Heritage Architectural Capture',
    tag: 'Photography',
    imageUrl:
      'https://images.unsplash.com/photo-1548013146-72479768b906?q=80&w=600&auto=format&fit=crop',
    date: 'Dec 2024',
    description:
      'High contrast shadow experiment highlighting symmetry and geometric structures across historic domes, framing design patterns from the physical world.',
  },
  {
    id: 'g5',
    title: 'Ergonomic Code Station Vibe',
    tag: 'Dev Environment',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    date: 'Jan 2026',
    description:
      'A dark theme vertical monitor config aligned perfectly for scanning compiler logs, practicing daily competitive algorithms, and checking UI margin offsets.',
  },
  {
    id: 'g6',
    title: 'HAL 9000 Vector Redesign',
    tag: 'UI/UX Prototype',
    imageUrl:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop',
    date: 'Apr 2025',
    description:
      'An experimental futuristic interface built with neon indicators, flat grids, telemetry parameters, and smooth animations reflecting clean, non-standard user journeys.',
  },
];
