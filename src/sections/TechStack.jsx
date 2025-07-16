import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <div
      id="skills"
      className="flex min-h-screen items-center justify-center section-padding bg-black"
    >
      <div className="w-full max-w-7xl h-full md:px-10 px-5">
        <TitleHeader
          title="That Drive My Development Workflow"
          sub="🚀 Powered by Codee"
        />

        {/* Outer glass container */}
        <div className="mt-10 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#1e1e1e]/60 to-[#0e0e0e]/70 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-white/10">
          {/* Responsive Grid: 2 cols on small, 4 cols on lg */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {techStackImgs.map((techStackIcon, index) => (
              <div
                key={index}
                className="card-border tech-card group rounded-xl w-[120px] h-[140px] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 flex flex-col justify-center items-center shadow-md border border-white/5"
              >
                <div className="w-12 h-12 mb-2">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs font-medium text-white text-center px-1">
                  {techStackIcon.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
