const AboutMe = () => {
  const services = [
    {
      title: "Frontend Development",
      desc: "I craft intuitive, responsive interfaces using React, Tailwind, and Next.js — blending performance with great user experience.",
      icon: "🎨",
    },
    {
      title: "Backend Development",
      desc: "I build secure, scalable backend systems using Node.js, Express, MongoDB, and RESTful APIs to power seamless app experiences.",
      icon: "🛠️",
    },
    {
      title: "AI Agents",
      desc: "I design smart AI agents that solve real-world problems using OpenAI, HuggingFace, and custom LLM pipelines.",
      icon: "🧠",
    },
    {
      title: "Data Analytics",
      desc: "I uncover insights from data through Python, Pandas, and visualization — helping decisions backed by logic, not guesswork.",
      icon: "📊",
    },
  ];

  return (
    <section
      id="about"
      className="bg-black text-white py-16 px-6 md:px-20 text-center"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-2">About Me</h2>
          <p className="text-gray-300 max-w-3xl text-center mx-auto">
            I'm a full stack developer with a passion for building clean, fast,
            and user-focused web apps. I enjoy working across the entire stack —
            from crafting sleek UIs to designing efficient APIs. Always curious,
            always learning, I love turning complex problems into simple,
            elegant solutions. Tech is not just my job — it's what I love doing.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#161616] rounded-2xl p-6 border border-gray-700 shadow-md hover:shadow-lg transition-all leading-relaxed max-w-xl mx-auto text-center"
            >
              <div className="text-yellow-400 text-3xl mb-3 leading-relaxed max-w-xl mx-auto text-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
