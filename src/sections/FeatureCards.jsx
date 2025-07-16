import { abilities } from "../constants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const FeatureCards = () => (
  <div className="w-full px-6 md:px-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {abilities.map(({ imgPath, title, desc }, index) => (
        <motion.div
          key={title}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
          className="bg-gradient-to-b from-[#1f1f2e] to-[#141421] border border-purple-700/30 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-300 rounded-xl p-8 flex flex-col gap-4 hover:border-purple-500"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-purple-600/20">
            <img src={imgPath} alt={title} className="w-8 h-8" />
          </div>
          <h3 className="text-white text-xl font-semibold tracking-wide">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
