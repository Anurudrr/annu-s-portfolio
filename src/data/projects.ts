export interface Project {
  id: string;
  slug: string;
  pNo: string;
  title: string;
  description: string;
  year: string;
  category: string;
  technologies: string[];
  image: string;
  githubUrl: string; // TODO: Replace with actual repo URL (e.g., https://github.com/Anurudrr/evento)
  demoUrl?: string; // TODO: Add live demo URL when deployed (e.g., https://evento.vercel.app)
  role: string;
  tools: string[];
  deliverables: string[];
  problem: string;
  process: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  lessons: string[];
  nextProject: { slug: string; title: string };
  accent: string;
  visualTitle: string;
  visualMeta: string;
}

export interface ProjectSticker {
  label: string;
  accentIndex: number;
}

export const projects: Project[] = [
  {
    id: 'evento',
    slug: 'evento',
    pNo: '01',
    title: 'Evento',
    description:
      'A full-stack web application connecting users with top-rated event organizers and service providers. Implemented booking functionality, service discovery features, and a responsive UI for seamless event planning and reservations.',
    year: '2025–2026',
    category: 'Full-Stack Product',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Motion', 'Node.js', 'Express'],
    image: '/projects/evento.svg',
    githubUrl: 'https://github.com/Anurudrr/EVENTO-EVENT-MANAGER',
    demoUrl: 'https://evento-six-livid.vercel.app/',
    role: 'Frontend Developer & UI Designer',
    tools: ['Figma', 'React', 'TypeScript', 'Tailwind', 'Motion', 'Node.js'],
    deliverables: [
      'Service Discovery',
      'Booking Flow',
      'Responsive UI',
      'Design System',
      'API Integration',
    ],
    problem:
      'Event planning involves fragmented tools — discovery, vendor communication, booking, and scheduling happen across disconnected platforms. Users needed a unified experience that feels cohesive from browse to book.',
    process:
      'Built by a 4-member team under mentor Ms. Gayatri Naidu between Nov 2025 and Apr 2026. Owned the frontend and UI design: Figma design system, responsive React components, service discovery screens, and booking flows wired to the backend APIs.',
    solution:
      'A full-stack web application connecting users with top-rated event organizers and service providers — booking functionality, service discovery features, and a responsive UI for seamless event planning and reservations.',
    outcome:
      'Shipped and deployed live at evento-six-livid.vercel.app. Delivered on a 6-month cycle as Frontend Developer & UI Designer within a 4-person team.',
    metrics: [
      { label: 'Team Size', value: '4' },
      { label: 'Timeline', value: '6 Months' },
      { label: 'Role', value: 'Frontend + UI' },
      { label: 'Mentor', value: 'G. Naidu' },
    ],
    lessons: [
      'Treat the booking flow as a state machine (DRAFT to CONFIRMED) before writing UI, so frontend and backend agree on transitions.',
      'A design token scale (4, 8, 16, 24, 32, 48) is an API contract — components and Tailwind config consume the same source.',
      'Narrow the ownership boundary early; a clean subset I could finish deeply beat a sprawling half-done scope.',
    ],
    nextProject: { slug: 'hopin', title: 'Hopin' },
    accent: '#3CBAAE',
    visualTitle: 'Event planning flow',
    visualMeta: 'Vendor booking / responsive UI',
  },
  {
    id: 'hopin',
    slug: 'hopin',
    pNo: '02',
    title: 'Hopin',
    description:
      'A full-stack ride-sharing platform enabling users to find and match with commuters on similar routes. Engineered route matching algorithms, fare calculation and splitting, real-time location tracking, and user authentication. Deployed on Vercel with optimized performance for high user volume.',
    year: '2026',
    category: 'Full-Stack Product',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Vercel'],
    image: '/projects/hopin.svg',
    githubUrl: 'https://github.com/Anurudrr/HOPIN--CAB-SERVICES',
    demoUrl: 'https://hopin-five.vercel.app/',
    role: 'Full-Stack Developer (Solo)',
    tools: ['TypeScript', 'Node.js', 'PostgreSQL', 'Git', 'Vercel', 'REST APIs'],
    deliverables: [
      'Route Matching',
      'Fare Calculation & Split',
      'Real-Time Location',
      'User Authentication',
      'Vercel Deployment',
    ],
    problem:
      'Daily commuters traveling similar routes rarely find each other — no easy way to match rides, split fares, or share live location during a trip.',
    process:
      'Solo full-stack build between May and Aug 2026. Designed the route matching algorithm and fare calculation/splitting logic, implemented real-time location tracking and user authentication, then deployed to Vercel with performance tuning for high user volume.',
    solution:
      'A full-stack ride-sharing platform where users find and match with commuters on similar routes — route matching algorithms, fare calculation and splitting, real-time location tracking, and user authentication, deployed on Vercel.',
    outcome:
      'Deployed live at hopin-five.vercel.app as a solo build (repo: HOPIN--CAB-SERVICES). Built on a TypeScript + PostgreSQL stack tuned for high user volume.',
    metrics: [
      { label: 'Build', value: 'Solo' },
      { label: 'Timeline', value: '3 Months' },
      { label: 'Database', value: 'PostgreSQL' },
      { label: 'Deploy', value: 'Vercel' },
    ],
    lessons: [
      'Route matching is an algorithm problem first and a UI problem second — model the matching logic on its own before touching the interface.',
      'A thin vertical slice (one matching route end-to-end) validates the architecture sooner than building all screens in parallel.',
      'Schema decisions (indexes, fare splits as rows not strings) bounded real-world latency more than any client-side optimization did.',
    ],
    nextProject: { slug: 'evento', title: 'Evento' },
    accent: '#EF7B3C',
    visualTitle: 'Route matching flow',
    visualMeta: 'Ride match / fare split',
  }
];

export const projectStickers: Record<string, ProjectSticker[]> = {
  evento: [
    { label: 'REACT', accentIndex: 0 },
    { label: 'UI/UX', accentIndex: 1 },
    { label: 'FULL-STACK', accentIndex: 3 },
    { label: 'TYPESCRIPT', accentIndex: 0 },
  ],
  hopin: [
    { label: 'TYPESCRIPT', accentIndex: 0 },
    { label: 'POSTGRESQL', accentIndex: 3 },
    { label: 'FULL-STACK', accentIndex: 1 },
    { label: 'VERCEL', accentIndex: 2 },
  ],
};

export const caseStudyStickers: Record<string, ProjectSticker[]> = {
  evento: [
    { label: 'UI DESIGN', accentIndex: 1 },
    { label: 'SYSTEM DESIGN', accentIndex: 0 },
    { label: 'REACT', accentIndex: 0 },
    { label: 'FULL-STACK', accentIndex: 3 },
  ],
  hopin: [
    { label: 'FULL-STACK', accentIndex: 0 },
    { label: 'TYPESCRIPT', accentIndex: 2 },
    { label: 'POSTGRESQL', accentIndex: 3 },
    { label: 'VERCEL', accentIndex: 1 },
  ],
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
