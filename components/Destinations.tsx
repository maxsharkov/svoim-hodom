"use client";

import { motion } from "framer-motion";

const destinations = [
  {
    name: "Япония",
    tagline: "Сакура, храмы, токийские переулки",
    label: "Культура и медленная жизнь",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1470&auto=format&fit=crop",
    prefill: { destination: "Япония", month: "Апрель" },
  },
  {
    name: "Итальянское побережье",
    tagline: "Амальфи, виноградники, морской воздух",
    label: "Гастрономия и море",
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=1471&auto=format&fit=crop",
    prefill: { destination: "Италия, Амальфийское побережье", month: "Июнь" },
  },
  {
    name: "Перу",
    tagline: "Мачу-Пикчу, Анды, Амазония",
    label: "Природа и приключения",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop",
    prefill: { destination: "Перу", month: "Сентябрь" },
  },
  {
    name: "Марокко",
    tagline: "Медины, пустыня Сахара, горы Атлас",
    label: "Культура и экзотика",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1470&auto=format&fit=crop",
    prefill: { destination: "Марокко", month: "Март" },
  },
];

export default function Destinations() {
  const handleClick = (prefill: { destination: string; month: string }) => {
    window.dispatchEvent(new CustomEvent("prefill-destination", { detail: prefill }));
    const el = document.getElementById("form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="destinations" className="py-24 md:py-32 px-6 bg-[#0F0A07]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">Примеры маршрутов</p>
          <h2 className="font-heading text-4xl font-light text-white">
            Куда отправимся
          </h2>
          <div className="w-12 h-px bg-white/20 mt-6" />
          <p className="text-white/40 text-sm mt-4">Нажмите на карточку — и мы сразу заполним форму для вас</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleClick(d.prefill)}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: i === 0 ? "420px" : "320px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${d.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C4714A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm tracking-[0.2em] uppercase border border-white/60 px-6 py-3">
                  Спланировать →
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-[#C4714A] text-xs tracking-[0.2em] uppercase mb-2">{d.label}</p>
                <h3 className="font-heading text-xl text-white font-light mb-1">{d.name}</h3>
                <p className="text-white/60 text-sm">{d.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
