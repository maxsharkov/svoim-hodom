"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Как это работает", href: "#how" },
    { label: "Направления", href: "#destinations" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5F0EB]/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className={`font-heading text-xl font-light tracking-widest uppercase transition-colors ${scrolled ? "text-[#2C1F14]" : "text-white"}`}>
          Своим ходом
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm tracking-[0.15em] uppercase transition-colors hover:text-[#C4714A] ${
                scrolled ? "text-[#2C1F14]" : "text-white/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#form"
          className="hidden md:inline-flex items-center px-5 py-2.5 border text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#C4714A] hover:border-[#C4714A] hover:text-white"
          style={{
            borderColor: scrolled ? "#2C1F14" : "rgba(255,255,255,0.6)",
            color: scrolled ? "#2C1F14" : "white",
          }}
        >
          Моё путешествие
        </a>

        <button
          className={`md:hidden transition-colors ${scrolled ? "text-[#2C1F14]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#F5F0EB] border-t border-[#D6CCB8] px-6 py-4 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-[#2C1F14] hover:text-[#C4714A]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#form"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-widest uppercase text-[#C4714A] border border-[#C4714A] px-4 py-2 text-center"
          >
            Моё путешествие
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
