"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0F0A07]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')`,
          opacity: 0.45,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A07]/60 via-[#0F0A07]/20 to-[#0F0A07]/80" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6"
        >
          Осознанные путешествия
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-7xl md:text-8xl text-white font-light leading-tight mb-4"
        >
          Путешествие,
          <br />
          созданное для вас
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-16 h-px bg-[#C4714A] mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-10"
        >
          Искусственный интеллект анализирует ваши желания и создаёт персональный маршрут — глубокий, осмысленный, только ваш.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#form"
            className="px-8 py-4 bg-[#C4714A] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#A85C38] transition-colors duration-300"
          >
            Создать мой план
          </a>
          <a
            href="#how"
            className="px-8 py-4 border border-white/40 text-white text-sm tracking-[0.2em] uppercase hover:border-white/80 transition-colors duration-300"
          >
            Как это работает
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-sm tracking-[0.2em] uppercase">Прокрутите</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
