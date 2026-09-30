/**
 * Phase 2B — single source of truth for the Selected Work section.
 *
 * Every field is grounded in verified sources: the project READMEs on
 * GitHub, the live deployments, or Phase 1 portfolio copy. Unknown
 * fields are omitted entirely — no placeholder text, no invented
 * metrics, no dead links (`liveUrl` is null when no deployment
 * exists, and the UI omits the CTA).
 *
 * Order is deliberate: flagship first, then JobFlow, MarketPlace,
 * AImage, HomeHunt. Do not reorder.
 */
export const projects = [
  {
    id: "ieltshub",
    number: "01",
    title: "IELTSHUB",
    featured: true,
    category: "IELTS practice platform",
    status: "In development",
    summary:
      "A same-origin IELTS practice platform — a React learner interface paired with a Laravel and Filament administration workspace, covering all four exam skills in one system.",
    problem:
      "Aspiring test-takers need realistic practice across listening, reading, writing and speaking without losing work between sessions. Attempts must survive a refresh, objective marking has to be reproducible, and recordings and feedback must stay private to each learner.",
    contribution:
      "Full-stack build: a React exam workspace with local draft recovery, Laravel services for content publication, attempts, marking and assessment, a Filament console for admins and teachers, and shared TypeScript contracts published as an OpenAPI specification.",
    highlights: [
      "All four IELTS skills with 10 original demonstration tests and immutable published content",
      "Autosaved attempts, timed skill mocks and deterministic objective marking",
      "Private speaking recordings with human writing and speaking assessment",
      "Mistake notebook and progress tracking built into the learner flow",
      "Playwright browser tests and PHPUnit suites run in CI on every push",
    ],
    stack: ["React", "Laravel", "Filament", "PostgreSQL", "TypeScript"],
    image: null,
    mediaNote: {
      title: "No public preview yet",
      detail:
        "IELTSHUB is still in development — there is no deployed build to capture a screenshot from.",
    },
    githubUrl: "https://github.com/HasibulIslam007/IELTSHUB",
    liveUrl: null,
  },
  {
    id: "jobflow",
    number: "02",
    title: "JobFlow AI",
    category: "AI job-search workspace",
    status: "Live",
    summary:
      "An AI-assisted workspace for the job hunt: capture postings from text, PDFs, screenshots or links, move every application through a pipeline, and match a resume against each role.",
    highlights: [
      "Text, PDF, image and URL intake extracted into structured job cards",
      "Pipeline stages from saved to offer, with notes and deadline reminders",
      "Resume intelligence — skill extraction, scoring and gap analysis per role",
      "Contract-first frontend: API types generated from the OpenAPI document, breaking changes fail CI",
      "Feature allow-list keeps unfinished surfaces hidden instead of faked",
    ],
    stack: ["Next.js", "React", "TypeScript", "TanStack Query", "Zustand"],
    image: {
      src: "/images/jobflow.webp",
      width: 1440,
      height: 960,
      alt: "The JobFlow AI home screen — \"Manage every job opportunity with AI doing the busywork\" beside an example opportunity card showing AI extraction, resume match and deadline states.",
    },
    githubUrl: "https://github.com/HasibulIslam007/jobflow_frontend",
    liveUrl: "https://jobflow-frontend-flax.vercel.app/",
  },
  {
    id: "marketplace",
    number: "03",
    title: "MarketPlace",
    category: "Full-stack marketplace",
    summary:
      "A full-stack marketplace — a Next.js storefront over an Express and Prisma API on PostgreSQL — with authentication, catalog management, orders and sandboxed card payments.",
    highlights: [
      "Product and category management with image uploads",
      "Order creation and tracking across the storefront",
      "SSLCommerz sandbox checkout wired end to end",
      "JWT authentication between storefront and API",
      "Deployable shape: Vercel storefront, Render API, managed Postgres",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL"],
    image: null,
    mediaNote: {
      title: "Preview unavailable",
      detail:
        "The public demo deployment is no longer online — the repository and its deployment guide remain available.",
    },
    githubUrl: "https://github.com/HasibulIslam007/MarketPlace",
    liveUrl: null,
  },
  {
    id: "aimage",
    number: "04",
    title: "AImage",
    category: "AI image editing",
    status: "Live",
    summary:
      "A web application that turns everyday image work into AI-assisted workflows — colorization, background removal and restoration — designed around speed, simplicity and a short path to a finished picture.",
    highlights: [
      "Colorization, background removal and restoration tools in one interface",
      "Built for speed and simplicity — high-quality output without a complex editor",
    ],
    stack: ["Next.js", "React", "MongoDB", "Clerk"],
    image: {
      src: "/images/aimage.webp",
      width: 1024,
      height: 1024,
      alt: "The AImage landing screen — \"Transform your imagination into stunning visuals with AImage\" beside a preview of the app's recent-edits gallery.",
    },
    githubUrl: "https://github.com/HasibulIslam007/aimage",
    liveUrl: "https://aimage-eight.vercel.app/",
  },
  {
    id: "homehunt",
    number: "05",
    title: "HomeHunt",
    category: "Rental housing platform",
    status: "Live",
    summary:
      "A modern rental-housing platform for discovering listings with smart filters and broker-free information — a typed Next.js build from search and product pages through to contact forms.",
    highlights: [
      "Smart search filters, broker-free listings and contact forms",
      "Role-based access for landlords, tenants and admins via JWT",
      "Server Actions with cache revalidation drive the listing data layer",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/images/homehunt.webp",
      width: 1536,
      height: 1024,
      alt: "Two HomeHunt screens — the \"Need Home??\" landing hero and a panel of personalised home recommendations.",
    },
    githubUrl: "https://github.com/HasibulIslam007/homehunt_frontend",
    liveUrl: "https://homehunt-frontend.vercel.app/",
  },
];

export default projects;

