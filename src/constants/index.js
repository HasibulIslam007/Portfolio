// Navbar order is deliberate and matches the page flow:
// Hero → About → Projects → Stack → Experience → Credentials → Contact.
// The Resume CTA lives in the navbar itself, not in this list.
const navLinks = [
  {
    name: "Home",
    link: "#hero",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Stack",
    link: "#stack",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

const resumeUrl = "/resume.pdf";

// Verified public profiles + the one real email address.
const email = "hasibulislam.bracu@gmail.com";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/HasibulIslam007",
    icon: "github",
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-hasibul-islam-ooo7",
    icon: "linkedin",
    external: true,
  },
  {
    name: "Email",
    href: `mailto:${email}`,
    icon: "email",
    external: false,
  },
];

// Technologies supported by the existing project data.
const heroTech = [
  "NEXT.JS",
  "NODE.JS",
  "LARAVEL",
  "REACT",
  "POSTGRESQL",
  "TYPESCRIPT",
];


// Counts derived from the verified project list in constants/projects.js.
// "Years of experience" is deliberately absent — no employment dates are
// verifiable from the repository, so no duration is claimed.
const counterItems = [
  { value: 5, suffix: "", label: "Documented Projects" },

  { value: 3, suffix: "", label: "Live Deployments" },
];





export {
  counterItems,
  email,
  navLinks,
  resumeUrl,
  socialLinks,
  heroTech,
};
