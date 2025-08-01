import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import Navbar from "./sections/Navbar.jsx";

import FeatureCards from "./sections/FeatureCards.jsx";
import TechStack from "./sections/TechStack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import AboutMe from "./sections/AboutMe.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      <ShowcaseSection />

      <FeatureCards />

      <Contact />
      <TechStack />
      <Footer />
    </>
  );
};
export default App;
