// Editorial views of verified project work. Names, URLs and status stay in projects.js.
// No employment history, calendar dates or academic credentials are available locally.
export const experience = [
  {
    projectId: "ieltshub",
    period: "Currently building",
    role: "Full-Stack Developer",
    contributions: [
      "Built the React exam workspace with local draft recovery and timed attempts.",
      "Implemented Laravel services for publication, marking and assessment, with a Filament workspace for admins and teachers.",
    ],
  },
  {
    projectId: "marketplace",
    period: "Project experience",
    role: "Full-Stack Developer",
    contributions: [
      "Connected a Next.js storefront to an Express and Prisma API backed by PostgreSQL.",
      "Integrated JWT authentication, order tracking and SSLCommerz sandbox checkout.",
    ],
  },
];

export const engineeringProof = [
  {
    projectId: "ieltshub",
    focus: "Tests & shared contracts",
    evidence: [
      { label: "Verification", detail: "Playwright browser tests and PHPUnit suites run in CI on every push." },
      { label: "Integration", detail: "Shared TypeScript contracts published as an OpenAPI specification connect the React workspace and Laravel services." },
    ],
  },
  {
    projectId: "jobflow",
    focus: "Contract-first frontend",
    evidence: [
      { label: "API boundary", detail: "Frontend API types are generated from the OpenAPI document; breaking contract changes fail CI." },
      { label: "Release control", detail: "A feature allow-list keeps unfinished application surfaces hidden." },
    ],
  },
  {
    projectId: "marketplace",
    focus: "Connected application layers",
    evidence: [
      { label: "Data & auth", detail: "An Express API uses Prisma with PostgreSQL and JWT authentication for the storefront." },
      { label: "Deployment", detail: "The repository documents a Vercel storefront, Render API and managed PostgreSQL deployment." },
    ],
  },
];
