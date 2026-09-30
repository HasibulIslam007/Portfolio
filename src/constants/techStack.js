// Sources: constants/projects.js and this portfolio’s package.json.
// Mobile frameworks and inferred AI/ML techniques are omitted without project evidence.
export const techGroups = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Engineering",
    description:
      "Responsive interfaces — from exam workspaces to storefronts.",
    evidence: "JobFlow AI · MarketPlace · AImage · HomeHunt",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Systems",
    description:
      "APIs, auth and admin workspaces — services that stay maintainable after launch.",
    evidence: "IELTSHUB (Laravel) · MarketPlace API (Express)",
    items: [
      "Node.js",
      "Express",
      "Laravel",
      "Filament",
      "PHP",
      "REST APIs",
      "JWT Auth",
    ],
  },
  {
    id: "data",
    index: "03",
    title: "Databases",
    description:
      "Relational and document stores with typed access layers and migrations.",
    evidence: "IELTSHUB + MarketPlace (PostgreSQL) · AImage (MongoDB)",
    items: ["PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    id: "tools",
    index: "04",
    title: "Tools / Infrastructure",
    description:
      "Version control, automated checks and deployment tooling.",
    evidence: "GitHub repos · CI on IELTSHUB · Vercel / Render deploys",
    items: ["Git", "GitHub", "Playwright", "PHPUnit", "CI", "Vercel", "Render", "OpenAPI", "Clerk"],
  },
];

export default techGroups;
