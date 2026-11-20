export interface TechIconItem {
  label: string;
  color: string;
  logoUrl: string; // Official SVG logo URL / local asset
  fallbackUrl?: string;
}

/**
 * Authentic official brand logos for the approved technology stack.
 * EXACTLY 12 approved technologies — no duplicates, no unapproved extras.
 * Order matches TECH_STACK in portfolioData.ts:
 * Python, Django, FastAPI, Postman, MySQL, PostgreSQL, Redis, Celery, RabbitMQ, GitHub, GitHub Actions, Docker
 */
export const TECH_ICONS: TechIconItem[] = [
  // ── 1. Python (Authentic two-tone blue & yellow logo) ──────────────────────
  {
    label: "Python",
    color: "#3776AB",
    logoUrl: "/assets/tech/python.svg",
    fallbackUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  },

  // ── 2. Django ─────────────────────────────────────────────────────────────
  {
    label: "Django",
    color: "#44B78B",
    logoUrl: "https://cdn.simpleicons.org/django",
  },

  // ── 3. FastAPI ────────────────────────────────────────────────────────────
  {
    label: "FastAPI",
    color: "#009688",
    logoUrl: "https://cdn.simpleicons.org/fastapi",
  },

  // ── 4. Postman ────────────────────────────────────────────────────────────
  {
    label: "Postman",
    color: "#FF6C37",
    logoUrl: "https://cdn.simpleicons.org/postman",
  },

  // ── 5. MySQL ──────────────────────────────────────────────────────────────
  {
    label: "MySQL",
    color: "#4479A1",
    logoUrl: "https://cdn.simpleicons.org/mysql",
  },

  // ── 6. PostgreSQL ─────────────────────────────────────────────────────────
  {
    label: "PostgreSQL",
    color: "#336791",
    logoUrl: "https://cdn.simpleicons.org/postgresql",
  },

  // ── 7. Redis ──────────────────────────────────────────────────────────────
  {
    label: "Redis",
    color: "#DC382D",
    logoUrl: "https://cdn.simpleicons.org/redis",
  },

  // ── 8. Celery ─────────────────────────────────────────────────────────────
  {
    label: "Celery",
    color: "#37814A",
    logoUrl: "https://cdn.simpleicons.org/celery",
  },

  // ── 9. RabbitMQ ───────────────────────────────────────────────────────────
  {
    label: "RabbitMQ",
    color: "#FF6600",
    logoUrl: "https://cdn.simpleicons.org/rabbitmq",
  },

  // ── 10. GitHub ────────────────────────────────────────────────────────────
  {
    label: "GitHub",
    color: "#FFFFFF",
    logoUrl: "https://cdn.simpleicons.org/github/white",
  },

  // ── 11. GitHub Actions ────────────────────────────────────────────────────
  {
    label: "GitHub Actions",
    color: "#2088FF",
    logoUrl: "https://cdn.simpleicons.org/githubactions",
  },

  // ── 12. Docker ────────────────────────────────────────────────────────────
  {
    label: "Docker",
    color: "#2496ED",
    logoUrl: "https://cdn.simpleicons.org/docker",
  },
];
