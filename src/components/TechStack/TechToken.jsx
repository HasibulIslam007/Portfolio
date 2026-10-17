import { SiClerk, SiExpress, SiFilament, SiGit, SiGithub, SiJavascript, SiJsonwebtokens, SiLaravel, SiMongodb, SiNextdotjs, SiNodedotjs, SiOpenapiinitiative, SiPhp, SiPostgresql, SiPrisma, SiReact, SiReactquery, SiRender, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const iconMap = {
  React: [SiReact, "#61dafb"],
  "Next.js": [SiNextdotjs, "#f4f4f4"],
  TypeScript: [SiTypescript, "#3178c6"],
  JavaScript: [SiJavascript, "#f7df1e"],
  "Tailwind CSS": [SiTailwindcss, "#06b6d4"],
  "TanStack Query": [SiReactquery, "#ff4154"],
  "Node.js": [SiNodedotjs, "#5fa04e"],
  Express: [SiExpress, "#d7d7d7"],
  Laravel: [SiLaravel, "#ff2d20"],
  Filament: [SiFilament, "#fdae4b"],
  PHP: [SiPhp, "#777bb4"],
  "JWT Auth": [SiJsonwebtokens, "#d8d8d8"],
  PostgreSQL: [SiPostgresql, "#4169e1"],
  MongoDB: [SiMongodb, "#47a248"],
  Prisma: [SiPrisma, "#d9d9df"],
  Git: [SiGit, "#f05032"],
  GitHub: [SiGithub, "#f2f2f2"],
  Vercel: [SiVercel, "#f2f2f2"],
  Render: [SiRender, "#46e3b7"],
  OpenAPI: [SiOpenapiinitiative, "#6ba539"],
  Clerk: [SiClerk, "#6c47ff"],
};

const TechToken = ({ name }) => {
  const iconEntry = iconMap[name];
  const Icon = iconEntry?.[0];
  return (
    <li className="tech-token">
      {Icon && <Icon aria-hidden="true" className="tech-token-icon" style={{ color: iconEntry[1] }} />}
      <span>{name}</span>
    </li>
  );
};

export default TechToken;
