// Contact.jsx
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex-center section-padding bg-black text-white"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mt-16">
          {/* Left: Contact Form */}
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10 bg-[#121212] shadow-lg">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    className="mt-1 w-full p-3 rounded-lg bg-[#262626] text-white border border-gray-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    className="mt-1 w-full p-3 rounded-lg bg-[#262626] text-white border border-gray-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    className="mt-1 w-full p-3 rounded-lg bg-[#262626] text-white border border-gray-700 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-100 text-black font-semibold hover:bg-blue-200 transition"
                >
                  {loading ? "Sending..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="xl:col-span-7 min-h-96 ">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full h-full flex justify-center items-center"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl max-w-2xl w-full">
                {/* Left: Contact Details */}
                <div className="flex-1 text-white space-y-3 text-center md:text-left">
                  <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                    📇 Contact Info
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <span>👤</span>
                    <span>MD Hasibul Islam</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <span>📞</span>
                    <span>01719313438</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <span>✉️</span>
                    <a
                      href="mailto:hasibulislam.bracu@gmail.com"
                      className="underline"
                    >
                      hasibulislam.bracu@gmail.com
                    </a>
                  </div>
                </div>

                {/* Right: Memoji Image */}
                <div className="w-24 h-24 shrink-0">
                  <img
                    src="/public/models/image.png"
                    alt="Memoji"
                    className="w-full h-full rounded-full object-cover border-2 border-white/20 shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
