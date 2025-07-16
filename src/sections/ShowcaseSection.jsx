import Tilt from "react-parallax-tilt";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const projects = [
  {
    name: "AImage",
    description:
      "A sleek web application that transforms user inputs into stunning visuals using AI. Features include multiple image transformation tools like colorization, background removal, and restoration. Designed with a focus on speed, simplicity, and user experience, allowing users to create high-quality images effortlessly—no credit card needed.",
    image: "/images/aimage.png",
    source_code_link: "https://github.com/HasibulIslam007/aimage",
    source_code_link_vercel: "https://github.com/HasibulIslam007/aimage",

    tags: [
      { name: "React", color: "text-white" },
      { name: "Next.js", color: "text-white" },
      { name: "MongoDB", color: "text-white" },
      { name: "Clerk", color: "text-white" },
    ],
  },
  {
    name: "BikeShop",
    description:
      "A modern and responsive bike store platform designed for easy browsing and fast checkout. Features include detailed product listings, shopping cart integration, and a contact section for customer support. Built to ensure a smooth, user-friendly shopping experience across all devices.",
    image: "/images/BikeShop.png",
    source_code_link: "https://github.com/Rebakum/Bike-store-B4-A4-frontend",
    source_code_link_vercel:
      "https://bike-store-b4-a4-frontend.vercel.app/contact",
    tags: [
      { name: "React", color: "text-white" },
      { name: "Node.js", color: "text-white" },
      { name: "MongoDB", color: "text-white" },
      { name: "SurjoPay", color: "text-white" },
    ],
  },
  {
    name: "HomeHunt",
    description:
      "A modern real estate web application that helps users discover verified rental listings with ease. Features include smart search filters, broker-free listings, team collaboration, contact forms, and a clean user-friendly UI. Built with a focus on transparency, efficiency, and seamless user experience.",
    image: "/images/homeHnt.png",
    source_code_link: "https://github.com/HasibulIslam007/homehunt_frontend",
    source_code_link_vercel: "https://homehunt-frontend.vercel.app/",
    tags: [
      { name: "React", color: "text-white" },
      { name: "Next.js", color: "text-white" },
      { name: "MongoDB", color: "text-white" },
      { name: "TypeScript", color: "text-white" },
    ],
  },
];

// Motion Variants
const fadeIn = (
  direction = "up",
  type = "spring",
  delay = 0,
  duration = 0.75
) => ({
  initial: {
    y: direction === "up" ? 60 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
    },
  },
});

const textVariant = () => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1 } },
});

const ProjectCard = ({
  index,
  name,
  description,
  image,
  source_code_link,
  source_code_link_vercel,
  tags,
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row ${
        !isEven ? "md:flex-row-reverse" : ""
      } gap-6 items-center mb-12`}
    >
      {/* Image Card */}
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#ffffff"
        className="bg-[#161616] rounded-2xl p-3 shadow-lg w-full md:w-1/2"
      >
        <div className="relative w-full h-[250px] md:h-[300px]">
          <img
            src={image}
            alt={name}
            className="rounded-xl w-full h-full object-cover"
          />
        </div>
      </Tilt>

      {/* Description Card with motion */}
      <motion.div
        whileHover={{
          scale: 1.03,
          rotateX: 1.5,
          rotateY: 1.5,
          transition: { type: "spring", stiffness: 100 },
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gradient-to-b from-[#161616] to-[#111] border border-purple-700/30 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-300 rounded-2xl shadow-lg p-6 w-full md:w-[550px] min-h-[280px] backdrop-blur-sm"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2">{name}</h3>

        <p className="text-gray-300 text-sm mt-1 leading-relaxed max-w-xl mx-auto text-center">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => (
            <span key={index} className={`text-xs ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            className="p-0 bg-transparent hover:opacity-80 transition"
          >
            <img
              src="/public/images/github.png"
              alt="View Code"
              className="w-8 h-8 object-contain"
            />
          </button>

          <button
            onClick={() => window.open(source_code_link_vercel, "_blank")}
            className="p-0 hover:opacity-80 transition"
          >
            <img
              src="/public/images/vercel.svg"
              alt="View Site"
              className="w-10 h-10 object-contain"
            />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AppShowcase = () => {
  return (
    <section
      id="work"
      className="py-16 px-6 md:px-20 bg-black text-white text-center mx-auto"
    >
      <motion.div variants={textVariant()} initial="initial" animate="animate">
        <p className="text-4xl font-bold mt-1 ">My Work</p>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.2, 1)}
        initial="initial"
        animate="animate"
        className="mt-4 text-gray-300 max-w-3xl text-sm leading-6 text-center mx-auto"
      >
        Here are some apps and platforms I have built or contributed to. They
        reflect my skills in frontend, backend, and full-stack development.
      </motion.p>

      <div className="mt-12 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default AppShowcase;
