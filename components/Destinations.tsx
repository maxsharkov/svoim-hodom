"use client";

import { motion } from "framer-motion";

const destinations = [
  {
    name: "Юго-Восточная Азия",
    tagline: "Тишина храмов, ароматы джунглей",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Южная Европа",
    tagline: "Медленная жизнь у моря",
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?q=80&w=1471&auto=format&fit=crop",
  },
  {
    name: "Латинская Америка",
    tagline: "Древние цивилизации, живая природа",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Центральная Азия",
    tagline: "Великий шёлковый путь",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1470&auto=format&fit=crop",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 md:py-32 px-6 bg-[#0F0A07]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">Направления</p>
          <h2 className="font-heading text-4xl font-light text-white">
            Куда отправимся
          </h2>
          <div className="w-12 h-px bg-white/20 mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: i === 0 ? "420px" : "320px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${d.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="font-heading text-xl text-white font-light mb-1">
                  {d.name}
                </h3>
                <p className="text-white/60 text-sm">{d.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
