import { useState } from "react";

import SectionHeader from "../components/shared/SectionHeader.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import Divider from "../components/shared/Divider.jsx";
import { email, resumeUrl, socialLinks } from "../constants/index.js";

const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

const channels = [
  { label: "Email", value: email, href: `mailto:${email}`, external: false },
  ...socialLinks
    .filter(({ icon }) => icon === "github" || icon === "linkedin")
    .map(({ name, href }) => ({
      label: name,
      value: href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href,
      external: true,
    })),
  { label: "Resume", value: "resume.pdf", href: resumeUrl, external: true },
];

const inputClass = "w-full rounded-none border border-hairline bg-ink-2 px-4 py-3.5 text-base text-parchment outline-none transition-colors placeholder:text-fg-dim focus:border-blood focus-visible:ring-1 focus-visible:ring-blood/30 disabled:cursor-not-allowed disabled:opacity-60";

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const updateField = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const statusMessage = {
    idle: "",
    sending: "Sending your message…",
    success: "Message sent successfully. I'll get back to you soon.",
    error: "Something went wrong. Please try again or email me directly.",
  }[status];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-ink text-fg">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.03]" />
      </div>
      <div className="section-shell relative z-10">
        <Divider className="mb-9 md:mb-12" />
        <Reveal delay={0.05}>
          <SectionHeader index="07" label="Contact" headingId="contact-heading" className="max-w-2xl"
            title={<>Let&rsquo;s build something useful<span className="text-blood">.</span></>}
            description={<p>Questions, ideas or opportunities — send me a message or use one of the direct channels below.</p>} />
        </Reveal>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)] lg:gap-20">
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">Name <span className="text-blood">*</span></span>
                  <input className={inputClass} type="text" name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength={100} required disabled={status === "sending"} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">Email <span className="text-blood">*</span></span>
                  <input className={inputClass} type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={254} required disabled={status === "sending"} placeholder="you@example.com" />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">Subject</span>
                <input className={inputClass} type="text" name="subject" value={form.subject} onChange={updateField} maxLength={160} disabled={status === "sending"} placeholder="What would you like to discuss?" />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">Message <span className="text-blood">*</span></span>
                <textarea className={`${inputClass} min-h-48 resize-y`} name="message" value={form.message} onChange={updateField} maxLength={5000} required disabled={status === "sending"} placeholder="Tell me about your project, idea or opportunity." />
              </label>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input id="contact-website" type="text" name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className={`min-h-5 text-sm ${status === "error" ? "text-blood" : status === "success" ? "text-parchment" : "text-fg-muted"}`}
                  role={status === "error" ? "alert" : "status"} aria-live="polite">{statusMessage}</p>
                <button type="submit" disabled={status === "sending"}
                  className="inline-flex min-w-44 items-center justify-center border border-blood-line bg-blood-deep/20 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-parchment transition-colors hover:border-blood hover:bg-blood-deep/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/60 disabled:cursor-not-allowed disabled:opacity-60">
                  {status === "sending" ? "Sending..." : "Send Message ↗"}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">Alternative channels</p>
              <ul className="mt-4 border-b border-hairline">
                {channels.map((channel) => (
                  <li key={channel.label} className="group border-t border-hairline transition-colors duration-300 hover:border-blood-line focus-within:border-blood-line">
                    <a href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noreferrer noopener" : undefined}
                      aria-label={`${channel.label} — ${channel.value}${channel.external ? " (opens in a new tab)" : ""}`} className="block py-5">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted">{channel.label}</span>
                      <span className="mt-1 block min-w-0 break-all text-sm text-fg transition-colors duration-300 group-hover:text-blood">{channel.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
