// components/Footer.jsx
import { FaGithub, FaLinkedin, FaFacebook, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20">
      <div className="bg-gradient-to-br from-[#1e1e1e]/60 to-[#0e0e0e]/70 backdrop-blur-lg border-t border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white text-sm">
          {/* Left Side */}
          <div className="text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} MD Hasibul Islam All rights
              reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com/HasibulIslam007"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              <FaFacebook />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white hover:text-cyan-400 transition text-xl"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
