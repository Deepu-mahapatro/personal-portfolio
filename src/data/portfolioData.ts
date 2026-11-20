/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  Deepu Mahapatro – Portfolio Data                            ║
 * ║  Single Source of Truth for Personal Information             ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

/* ───────────── 1. BASIC INFO ───────────── */
export const SITE = {
  name: 'Deepu Mahapatro',
  pageTitle: 'Deepu Mahapatro – Software Developer',
  role: 'Software Developer',
  email: 'deepumahapatro2006@gmail.com',
  phone: '916303976056',
  displayPhone: '+91 6303976056',
  location: 'Visakhapatnam, Andhra Pradesh, India',
  availability: 'Available for opportunities and internships',
  resume: '/assets/FULLSTACKRESUME.pdf',
  whatsappMessage: 'Hi Deepu, I visited your portfolio and would like to get in touch.',
  available: true,
};

/* ───────────── 2. HERO (top of page) ───────────── */
export const HERO = {
  eyebrow: 'SOFTWARE DEVELOPER • FULL-STACK',
  headline: 'DEEPU MAHAPATRO',
  roles: ['SOFTWARE DEVELOPER', 'BACKEND ENGINEER'] as [string, string],
  tagline: 'Turning Ideas into Digital Reality',
  introduction: "I'm a passionate Software Developer who loves turning ideas into practical digital solutions. I enjoy building modern, responsive, and user-friendly applications while continuously learning and exploring new technologies.",
  primaryButton: 'EXPLORE MY WORK',
  secondaryButton: 'Get In Touch',
  image: '/assets/hero-red-bg.jpg',
  imageAlt: 'Portrait of Deepu Mahapatro',
  imagePosition: '69% center',
};

/* ───────────── 3. LOADING SCREEN ───────────── */
export const LOADER = {
  statement: 'TURNING IDEAS INTO DIGITAL REALITY',
  redWords: ['IDEAS', 'DIGITAL', 'REALITY'],
};

/* ───────────── 4. ABOUT ───────────── */
export const ABOUT = {
  eyebrow: 'Software Developer · Full-Stack · Backend',
  portrait: '/media/profile.webp',
  portraitAlt: 'Portrait of Deepu Mahapatro',
  portraitCaption: 'Software Developer',
  paragraphs: [
    "I'm a Computer Science Engineering student and independent developer who builds full-stack and AI-powered software.",
    "I turn ideas into working products, from clean backends and databases to interactive front ends.",
  ],
  technologies: ['Python', 'Django', 'FastAPI', 'Docker', 'PostgreSQL'],
  focus: ['Full-Stack Development', 'Backend Engineering', 'AI-Powered Apps'],
};

/* ───────────── 4b. FOCUS AREAS (WHAT I DO) ───────────── */
export const FOCUS_AREAS = [
  {
    title: 'Backend Development',
    description: 'Building robust and scalable server-side applications with efficient business logic, database management, and API development. Focused on creating secure, reliable, and high-performance backend systems.',
    icon: 'server',
  },
  {
    title: 'Full-Stack Development',
    description: 'Developing complete web applications by combining intuitive frontend interfaces with powerful backend functionality. Focused on delivering responsive, seamless, and user-friendly digital experiences.',
    icon: 'layers',
  },
  {
    title: 'AI & Automation',
    description: 'Creating intelligent applications and automated workflows that simplify tasks and improve efficiency. Exploring AI-powered solutions to solve real-world problems and enhance digital experiences.',
    icon: 'bot',
  },
];

/* ───────────── 5. SOCIAL LINKS ───────────── */
export const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Deepu-mahapatro' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepumahapatro' },
  { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/u/Deepu_mahapatro/' },
] as const;

/* ───────────── 6. TECHNICAL SKILLS (6 specialization cards) ───────────── */
export const SKILL_CARDS: { name: string; category: string; level: string }[] = [
  { name: 'Frontend Development', category: 'HTML · CSS · Responsive Design', level: 'Proficient' },
  { name: 'Backend Development', category: 'Django REST Framework · FastAPI · API Design', level: 'Advanced' },
  { name: 'AI & Workflow Automation', category: 'OpenAI API · Prompt Engineering · n8n', level: 'Proficient' },
  { name: 'DevOps & Deployment', category: 'Docker · Git · GitHub · Deployment', level: 'Intermediate' },
  { name: 'Database Management', category: 'MySQL · PostgreSQL · Redis', level: 'Proficient' },
  { name: 'Software Testing', category: 'Postman · API Testing · Debugging', level: 'Intermediate' },
];

/* ───────────── 6b. TECH STACK STRIP (logos under the skills) ───────────── */
export const TECH_STACK: string[] = [
  'Python',
  'Django',
  'FastAPI',
  'Postman',
  'MySQL',
  'PostgreSQL',
  'Redis',
  'Celery',
  'RabbitMQ',
  'GitHub',
  'GitHub Actions',
  'Docker',
];

/* ───────────── 7. PROJECTS ───────────── */
export interface Project {
  id: string;
  number?: string;
  title: string;
  category: string;
  subtitle: string;
  videoUrl?: string;
  embedUrl?: string;
  driveUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  kind?: 'video' | 'software';
  poster?: string;
  description?: string;
  problemSolved?: string;
  whyDeveloped?: string;
  howItWorks?: string;
  primaryTech?: string[];
  fullTech?: string[];
  tags?: string[];
  features?: string[];
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'project-one',
    number: '01',
    kind: 'software',
    title: 'Multi-Agent AI Research Assistant',
    subtitle: 'Intelligent Autonomous Multi-Agent Research System',
    category: 'AI & Backend Development',
    poster: '/assets/thumbnails/multi-agent-research.png',
    primaryTech: ['Python', 'Django REST Framework', 'LangGraph', 'Groq API', 'Tavily Search API', 'JavaScript'],
    fullTech: ['Python', 'Django', 'Django REST Framework', 'LangGraph', 'LangChain', 'Groq LLaMA 3', 'Tavily Search API', 'PostgreSQL (psycopg2)', 'ReportLab PDF', 'HTML5', 'CSS3', 'JavaScript', 'Gunicorn', 'WhiteNoise'],
    tags: ['Python', 'Django REST Framework', 'LangGraph', 'Groq API', 'Tavily Search API', 'PostgreSQL'],
    description: 'An enterprise-grade autonomous research system that automates end-to-end technical research, report generation, and content validation using specialized multi-agent coordination.',
    problemSolved: 'Eliminates hours of manual web research, fragmented synthesis, and hallucination risk by orchestrating specialized AI agents with verifiable citations and automated validation.',
    whyDeveloped: 'Built to solve the problem of unreliable single-prompt LLM outputs by engineering a deterministic multi-agent pipeline with real-time web verification and automated PDF report compilation.',
    howItWorks: 'A user submits a research query. The Search Agent queries real-time web sources via Tavily API. The Writer Agent structures and drafts detailed findings with citations using Groq-accelerated models. The Critic Agent reviews and scores factual accuracy before the final report is compiled and delivered.',
    features: [
      'Coordinated multi-agent architecture (Search, Writer, and Critic agents)',
      'Real-time web research integration powered by Tavily Search API',
      'Sub-second inference and synthesis via Groq-accelerated LLaMA 3',
      'Automated factual review and citation scoring loop by Critic Agent',
      'Real-time streaming research progress tracking with status checkpoints',
      'Exportable professional PDF reports compiled via ReportLab',
    ],
    liveUrl: 'https://frontend-research-agent.onrender.com',
    repoUrl: 'https://github.com/Deepu-mahapatro/MULTI_RESEARCH_AGENT',
  },
  {
    id: 'project-two',
    number: '02',
    kind: 'software',
    title: 'FloraCycle',
    subtitle: 'Sustainable Flower Waste Management Platform',
    category: 'Full-Stack Development',
    poster: '/assets/thumbnails/floracycle.png',
    primaryTech: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'JavaScript'],
    fullTech: ['Python', 'Django 5', 'Django REST Framework', 'SimpleJWT', 'PostgreSQL', 'Docker', 'Docker Compose', 'Gunicorn', 'WhiteNoise', 'HTML5', 'CSS3', 'JavaScript', 'Render'],
    tags: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'JavaScript'],
    description: 'A comprehensive full-stack circular economy platform connecting temples, flower vendors, and recycling partners to divert sacred floral waste into organic eco-products.',
    problemSolved: 'Tackles environmental pollution caused by tons of sacred floral waste discarded into water bodies daily, providing a traceable logistics, scheduling, and collection infrastructure.',
    whyDeveloped: 'Developed to digitize the floral waste collection lifecycle, empower local artisans producing eco-products, and offer an administrative management system with end-to-end transparency.',
    howItWorks: 'Users and temple partners schedule flower-waste pickup requests with quantity and location details. The Django REST backend validates and assigns collection routes, tracks pickup statuses, manages customer enquiries, and presents analytics to platform administrators.',
    features: [
      'End-to-end flower waste pickup scheduling and tracking workflow',
      'Role-based administrative operations dashboard for collection partners',
      'RESTful APIs with SimpleJWT authentication and permission tiers',
      'Customer enquiry and support ticket lifecycle management',
      'Containerized production architecture using Docker and Docker Compose',
      'PostgreSQL relational schema with optimized query filters',
    ],
    liveUrl: 'https://floracycleproject.onrender.com/',
    repoUrl: 'https://github.com/Deepu-mahapatro/FLORACYCLEPROJECT',
  },
  {
    id: 'project-three',
    number: '03',
    kind: 'software',
    title: 'AuthNotify',
    subtitle: 'Google OAuth 2.0 Secure Authentication System',
    category: 'Backend Development',
    poster: '/assets/thumbnails/authnotify.png',
    primaryTech: ['Python', 'Django', 'Google OAuth 2.0', 'google-auth', 'PostgreSQL'],
    fullTech: ['Python', 'Django 6', 'google-auth', 'Google OAuth 2.0 Client', 'Cryptography', 'PostgreSQL (psycopg2)', 'Gunicorn', 'WhiteNoise', 'HTML5', 'CSS3', 'JavaScript'],
    tags: ['Python', 'Django', 'Google OAuth 2.0', 'google-auth', 'PostgreSQL'],
    description: 'A robust, production-ready backend authentication service integrating the Google OAuth 2.0 protocol for streamlined identity verification, state validation, and secure user management.',
    problemSolved: 'Removes user friction associated with manual password registration while eliminating credential storage vulnerabilities through enterprise-grade delegated OAuth authentication.',
    whyDeveloped: 'Designed to demonstrate secure Google OAuth token exchange flows, state parameter verification for CSRF defense, and automated profile provisioning in Django.',
    howItWorks: 'Users initiate authentication via Google Sign-In. The backend securely constructs the OAuth consent URL with a cryptographic state token, handles the Google callback, verifies identity tokens via google-auth, provisions the user profile, and establishes an encrypted session.',
    features: [
      'Full Google OAuth 2.0 authorization code flow implementation',
      'State parameter generation and verification protecting against CSRF attacks',
      'Automated user profile provisioning and session lifecycle management',
      'Encrypted token exchange and validation using google-auth library',
      'Comprehensive error handling for callback timeouts and authorization declines',
      'Production-ready PostgreSQL database integration with Django ORM',
    ],
    repoUrl: 'https://github.com/Deepu-mahapatro/AUTH-EMAIL-NOTIFY',
  },
  {
    id: 'project-four',
    number: '04',
    kind: 'software',
    title: 'SecureAuth',
    subtitle: 'Secure Email OTP Passwordless Authentication System',
    category: 'Backend Development',
    poster: '/assets/thumbnails/secureauth.png',
    primaryTech: ['Python', 'Django', 'Resend API', 'PostgreSQL', 'JavaScript'],
    fullTech: ['Python', 'Django 6', 'Resend API', 'PostgreSQL (psycopg2)', 'dnspython', 'Gunicorn', 'WhiteNoise', 'HTML5', 'CSS3', 'JavaScript'],
    tags: ['Python', 'Django', 'Resend API', 'PostgreSQL', 'JavaScript'],
    description: 'A high-security, passwordless authentication microservice featuring cryptographically generated 6-digit email One-Time Passwords (OTP) with anti-abuse rate limiting.',
    problemSolved: 'Eliminates password fatigue, brute-force vulnerabilities, and credential stuffing attacks by implementing temporary time-sensitive verification codes delivered via email.',
    whyDeveloped: 'Built to provide a secure, low-friction login mechanism for modern web applications with strict cooldowns, expiration enforcement, and delivery tracking.',
    howItWorks: 'When a user enters their email, the Django backend generates a cryptographically random 6-digit OTP, stores its hashed representation with a 5-minute expiry timestamp, and transmits it via the Resend API. The user inputs the code, and the system verifies validity, attempt limits, and session creation.',
    features: [
      'Cryptographically secure 6-digit One-Time Password generation',
      'Strict time-based OTP auto-expiration (5-minute validity window)',
      'Resend cooldown timers preventing spam and API abuse',
      'Maximum attempt rate-limiting with automatic code invalidation',
      'Transactional email delivery powered by Resend API integration',
      'Dynamic frontend verification interface with auto-focus digit inputs',
    ],
    repoUrl: 'https://github.com/Deepu-mahapatro/SECUREAUTH-LOGIN-OTP',
  },
  {
    id: 'project-five',
    number: '05',
    kind: 'software',
    title: 'AI LinkedIn Post Automation',
    subtitle: 'Autonomous Multi-Modal AI Content Generation Workflow',
    category: 'AI & Workflow Automation',
    poster: '/assets/thumbnails/linkedin-automation.png',
    primaryTech: ['n8n', 'Google Gemini AI', 'Pollinations AI', 'Google Drive API', 'Gmail API'],
    fullTech: ['n8n Workflow Automation', 'Google Gemini AI (LangChain Node)', 'Pollinations AI Image API', 'Google Drive API', 'Gmail API', 'JavaScript (Code Nodes)', 'REST HTTP Requests', 'Cron Trigger'],
    tags: ['n8n', 'Google Gemini API', 'Pollinations AI', 'Gmail API', 'Google Drive API'],
    description: 'An autonomous multi-modal workflow built in n8n that schedules, generates, designs, and organizes high-engagement technical LinkedIn posts and supporting visual media.',
    problemSolved: 'Eliminates 10+ hours per week spent researching technical topics, drafting engaging social copy, generating custom banner graphics, and archiving assets manually.',
    whyDeveloped: 'Created to establish a reliable, unattended automated publishing engine leveraging cutting-edge LLMs and multi-modal image synthesis connected via cloud services.',
    howItWorks: 'A scheduled cron trigger initiates the workflow. An n8n code node determines the technical domain and topic. Google Gemini AI drafts a structured LinkedIn post with hooks, takeaways, and hashtags. A prompt is generated for Pollinations AI to synthesize a matching banner, which is uploaded to Google Drive and emailed via Gmail for final approval.',
    features: [
      'Scheduled automated trigger executing recurring content generation',
      'Google Gemini AI integration for contextual LinkedIn post drafting',
      'Dynamic prompt engineering generating optimized technical hashtags',
      'Automated visual banner generation using Pollinations AI HTTP node',
      'Cloud asset archiving with direct Google Drive folder upload',
      'Automated draft delivery notification to Gmail with direct preview links',
    ],
    repoUrl: 'https://github.com/Deepu-mahapatro/AUTOMATION_PROJECTS',
  },
  {
    id: 'project-six',
    number: '06',
    kind: 'software',
    title: 'AI Analytics Analyzer',
    subtitle: 'Automated KPI Intelligence & Executive Reporting Workflow',
    category: 'AI & Data Analytics',
    poster: '/assets/thumbnails/ai-analytics-analyzer.png',
    primaryTech: ['n8n', 'Groq AI API', 'Google Sheets API', 'Slack API', 'Gmail API'],
    fullTech: ['n8n Workflow Automation', 'Groq AI (LLaMA 3)', 'Google Sheets API', 'Slack API', 'Gmail API', 'HTML Report Engine', 'PDF Generation', 'JavaScript Data Parsing', 'Webhook Triggers'],
    tags: ['n8n', 'Groq AI API', 'Google Sheets API', 'Slack API', 'Gmail API'],
    description: 'An end-to-end business intelligence automation pipeline in n8n that ingests raw departmental metrics, runs AI-powered KPI analysis, compiles HTML/PDF executive reports, and distributes alerts.',
    problemSolved: 'Solves the bottleneck of manual metric extraction, spreadsheet aggregation, and time-consuming weekly executive report compilation across distributed teams.',
    whyDeveloped: 'Engineered to provide instant, automated executive visibility into business metrics with AI-driven variance detection, forecasting, and cross-channel distribution.',
    howItWorks: 'Metrics arrive via webhook or Google Sheets trigger. An n8n JavaScript node validates and aggregates figures. Groq AI generates executive summaries, key trends, and risk forecasts. An HTML/PDF generator compiles a branded report, archives it in Google Sheets, dispatches a Slack completion alert, and emails the PDF to executives via Gmail.',
    features: [
      'Automated metric ingestion supporting webhooks and Google Sheets updates',
      'Groq-accelerated AI analysis delivering KPI variance and trend insights',
      'Automated generation of branded HTML and downloadable PDF reports',
      'Input data sanitization, duplicate detection, and schema validation',
      'Comprehensive audit logging and historical metric storage in Google Sheets',
      'Real-time Slack team notification broadcasts with executive summaries',
      'Automated multi-recipient executive email delivery via Gmail API',
    ],
    repoUrl: 'https://github.com/Deepu-mahapatro/AUTOMATION_PROJECTS',
  },
];

/* ───────────── 8. SERVICES & PRICING (INTENTIONALLY EXCLUDED) ───────────── */
export const SERVICES_PRICING: { id: string; title: string; priceLabel: string; price: string; featured: boolean }[] = [];

/* ───────────── 9. HEADLINE NUMBERS (under hero) ───────────── */
export const CLIENT_STATS = [
  { id: 'stat-1', value: 6, suffix: '+', label: 'Featured Projects' },
  { id: 'stat-2', value: 15, suffix: '+', label: 'Technologies & Tools' },
  { id: 'stat-3', value: 3, suffix: '', label: 'Focus Domains' },
] as const;

/* Derived – do not edit */
export const WHATSAPP_URL = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
