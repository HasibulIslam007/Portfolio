import { MotionConfig } from "framer-motion";

import Hero from "./sections/Hero.jsx";
import AboutMe from "./sections/AboutMe.jsx";
import SelectedWork from "./components/Projects/SelectedWork.jsx";
import TechStack from "./sections/TechStack.jsx";
import Navbar from "./sections/Navbar.jsx";
import Experience from "./sections/Experience.jsx";
import EngineeringProof from "./sections/EngineeringProof.jsx";
import Credentials from "./sections/Credentials.jsx";

import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

/**
 * Global ambient background — one fixed, pointer-events-none layer behind
 * the whole site (z-index: -1, painted above the html canvas but behind
 * every section; sections paint no opaque fill, see index.css).
 *
 * Three static-ish pieces: a deep crimson light high on the right, a much
 * fainter wash low on the left, and a soft vignette that keeps the frame
 * cinematic. The two glows drift/zoom on 26s/32s transform+opacity-only
 * loops — under half the perceptual threshold of "moving", and disabled
 * entirely under prefers-reduced-motion. No canvas, no blur filters, no
 * new dependency.
 */
const AmbientBackground = () => (
  <div aria-hidden="true" className="ambient-bg">
    <span className="ambient-layer ambient-glow-upper" />
    <span className="ambient-layer ambient-glow-lower" />
    <span className="ambient-layer ambient-vignette" />
  </div>
);

const App = () => {
  return (
    // Honor the OS reduced-motion preference for all Framer Motion
    // animations (shared Reveal, mobile menu, floating cards...).
    <MotionConfig reducedMotion="user">
      <AmbientBackground />
      <Navbar />
      <Hero />
      <AboutMe />
      <SelectedWork />
      <TechStack />
      <Experience />
      <EngineeringProof />
      <Credentials />
      <Contact />
      <Footer />
    </MotionConfig>
  );
};
export default App;
