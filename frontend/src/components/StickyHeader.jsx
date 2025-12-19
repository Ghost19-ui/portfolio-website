import { useEffect, useState } from "react";

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-md transition-transform duration-200 ${
        isScrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-200">
        <span className="font-semibold tracking-[0.2em] uppercase text-cyan-300">
          Tushar Saini
        </span>
        <nav className="flex items-center gap-5">
          <a href="#home" className="hover:text-cyan-300">
            Home
          </a>
          <a href="#projects" className="hover:text-cyan-300">
            Projects
          </a>
          <a href="#contact" className="hover:text-cyan-300">
            Contact
          </a>
          <a
            href="/admin"
            className="rounded-full border border-cyan-400/50 px-3 py-1 text-[10px] font-medium hover:bg-cyan-400 hover:text-slate-950 transition-all"
          >
            Admin
          </a>
        </nav>
      </div>
    </div>
  );
};

export default StickyHeader;
