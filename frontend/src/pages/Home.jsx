// src/pages/Home.jsx
import React from "react";
import GalaxyBackground from "../components/GalaxyBackground";
import ParticlesBackground from "../components/ParticlesBackground";
import StickyHeader from "../components/StickyHeader";

const Home = () => {
  return (
    <main className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Sticky mini-strip appears after scroll */}
      <StickyHeader />

      {/* Background layers */}
      <GalaxyBackground />
      <ParticlesBackground />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-slate-950/95" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12">
        {/* Main top navbar */}
        <header className="flex items-center justify-between mb-10">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-slate-300"
          >
            <span className="text-cyan-400">🚀</span>
            Tushar Saini
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            {["Home", "About", "Projects", "Contact"].map((label) => (
              <a
                key={label}
                href={label === "Home" ? "#home" : `#${label.toLowerCase()}`}
                className="relative transition-all duration-200 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              >
                {label}
                <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-transparent transition-transform duration-200 hover:scale-x-100" />
              </a>
            ))}
            <a
              href="/admin"
              className="rounded-full border border-cyan-400/60 px-3 py-1 text-xs font-medium text-slate-100 bg-cyan-500/10 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_18px_rgba(34,211,238,0.8)] transition-all duration-200"
            >
              Admin
            </a>
          </nav>
        </header>

        {/* Hero + side card grid */}
        <section
          id="home"
          className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] items-start"
        >
          {/* Hero card */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-transparent opacity-60 blur-xl" />
            <div className="relative rounded-3xl border border-slate-700/70 bg-slate-900/70 px-6 py-6 shadow-2xl backdrop-blur-xl lg:px-8 lg:py-8 animate-fade-in">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300 mb-3">
                3rd Year CSE • Cybersecurity &amp; VAPT
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Hi, <span className="text-sky-300">I&apos;m Tushar</span> Saini
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-slate-200 mb-5 max-w-xl">
                Building secure, interactive web applications and offensive
                security tools. Passionate about penetration testing, ethical
                hacking, and web security.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-cyan-400 px-4 py-2 font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition-transform duration-150 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)]"
                >
                  View my work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-cyan-400/70 px-4 py-2 font-medium text-cyan-300 transition-all duration-150 hover:bg-cyan-500/10 hover:scale-[1.02] hover:shadow-[0_0_18px_rgba(56,189,248,0.7)]"
                >
                  Get in touch
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available for internships &amp; freelance
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="ri-shield-keyhole-line text-cyan-300" />
                  Web security • VAPT • MERN
                </span>
              </div>
            </div>
          </div>

          {/* Experience / quick stats card */}
          <div id="experience" className="relative mt-2 lg:mt-0">
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-sky-500/40 via-violet-500/40 to-transparent opacity-60 blur-xl" />
            <div className="relative h-full rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-5 shadow-2xl backdrop-blur-2xl lg:px-6 lg:py-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Recent focus
              </h2>
              <ul className="space-y-4 text-xs md:text-sm text-slate-200">
                <li>
                  <p className="font-semibold text-sky-300">
                    WADE – Web AI Defense Engine
                  </p>
                  <p className="text-slate-300">
                    AI‑assisted intrusion detection for modern web stacks.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-sky-300">
                    AAPE – BadUSB red/blue toolkit
                  </p>
                  <p className="text-slate-300">
                    Offensive payloads plus training modules for defenders.
                  </p>
                </li>
                <li>
                  <p className="font-semibold text-sky-300">
                    Portfolio &amp; admin dashboard
                  </p>
                  <p className="text-slate-300">
                    Full MERN stack with protected admin panel and live project
                    management.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Placeholder id for projects section (so navbar anchors work) */}
        <section id="projects" className="mt-24">
          {/* Project cards will be rendered here */}
        </section>

        {/* Social + footer row */}
        <section
          id="contact"
          className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-slate-300"
        >
          <div className="flex gap-4">
            <a href="https://linkedin.com" className="hover:text-cyan-300">
              LinkedIn
            </a>
            <a href="https://instagram.com" className="hover:text-cyan-300">
              Instagram
            </a>
            <a href="https://github.com" className="hover:text-cyan-300">
              GitHub
            </a>
          </div>
          <p className="text-slate-500">
            © {new Date().getFullYear()} Tushar Saini. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Home;
