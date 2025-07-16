import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import Navbar from "./sections/Navbar.jsx";
import LogoShowcase from "./sections/LogoShowcase.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import TechStack from "./sections/TechStack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import AboutMe from "./sections/Aboutme.jsx";
//import TechStack from "./sections/TechStack.jsx";
//import Experience from "./sections/Experience.jsx";
//import FeatureCards from "./sections/FeatureCards.jsx";
//import Experience from "./sections/Experience.jsx";
const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutMe />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Contact />
      <TechStack />
      <Footer />

      {/* <Experience /> */}
      {/* <FeatureCards /> */}
    </>
  );
};
export default App;
