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

const App = () => {
  return (
    // Honor the OS reduced-motion preference for all Framer Motion
    // animations (shared Reveal, mobile menu, floating cards...).
    <MotionConfig reducedMotion="user">
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
