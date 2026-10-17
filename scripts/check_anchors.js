import fs from "node:fs";

const constants = fs.readFileSync("src/constants/index.js", "utf8");
const nav = [...constants.matchAll(/link: "(#[^"]+)"/g)].map((m) => m[1]);

const files = [
  "src/sections/Hero.jsx",
  "src/sections/AboutMe.jsx",
  "src/components/Projects/SelectedWork.jsx",
  "src/sections/TechStack.jsx",
  "src/sections/Experience.jsx",
  "src/sections/EngineeringProof.jsx",
  "src/sections/Credentials.jsx",
  "src/sections/Contact.jsx",
];

const ids = new Map();
files.forEach((f) => {
  const m = fs.readFileSync(f, "utf8").match(/id="([a-z-]+)"/);
  if (m) ids.set(m[1], f.split("/").pop());
});

console.log("nav links:", nav.join(" "));
console.log("section ids:", [...ids.entries()].map(([k, v]) => `${k} (${v})`).join(" "));

const missing = nav.filter((n) => !ids.has(n.slice(1)));
console.log("MISSING TARGETS:", missing.length ? missing.join(" ") : "none");