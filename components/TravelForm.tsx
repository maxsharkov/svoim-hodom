"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MapPin } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  destination: string;
  month: string;
  travelers: string;
  interests: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  destination: "",
  month: "",
  travelers: "",
  interests: "",
};

const months = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  "Гибко",
];

const travelerOptions = [
  { id: "solo", label: "Соло" },
  { id: "couple", label: "Пара" },
  { id: "friends", label: "Группа друзей" },
  { id: "family_kids", label: "Семья с детьми" },
  { id: "family", label: "Семья без детей" },
];

export default function TravelForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    const handler = (e: CustomEvent<{ destination: string; month: string }>) => {
      setData((prev) => ({
        ...prev,
        destination: e.detail.destination,
        month: e.detail.month,
      }));
    };
    window.addEventListener("prefill-destination", handler as EventListener);
    return () => window.removeEventListener("prefill-destination", handler as EventListener);
  }, []);

  const canSubmit = data.name && data.email && data.destination && data.travelers;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          destination: data.destination,
          dates: data.month,
          travelers: data.travelers,
          interests: data.interests,
          country: "",
          duration: "",
          budget: "",
          travelStyle: "",
          wishes: "",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#D6CCB8] py-3 text-[#2C1F14] placeholder-[#B0A090] text-sm focus:outline-none focus:border-[#8B7355] transition-colors";

  const labelClass = "block text-xs tracking-widest uppercase text-[#8B7355] mb-2";

  return (
    <section id="form" className="py-24 md:py-32 px-6 bg-[#F5F0EB]">
      <div className="max-w-2xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">Ваш маршрут</p>
          <h2 className="font-heading text-4xl font-light text-[#2C1F14] mb-4">
            Расскажите о себе
          </h2>
          <p className="text-[#6B5B4E] text-sm">
            AI составит персональный план и отправит на email за несколько минут
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full border-2 border-[#D6CCB8]" />
                <div className="absolute inset-0 rounded-full border-t-2 border-[#C4714A] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={22} className="text-[#C4714A]" />
                </div>
              </div>
              <h3 className="font-heading text-4xl font-light text-[#2C1F14] mb-3">
                Маршрут готовится
              </h3>
              <p className="text-[#6B5B4E] text-sm">
                AI изучает ваши пожелания и составляет персональный план...
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4714A] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[#2C1F14]/5" />
                <CheckCircle2 className="absolute inset-0 m-auto w-10 h-10 text-[#2C1F14]" />
              </div>
              <h3 className="font-heading text-4xl font-light text-[#2C1F14] mb-4">
                Маршрут готов
              </h3>
              <p className="text-[#6B5B4E] text-sm leading-relaxed">
                Ваш персональный план отправлен на
              </p>
              <p className="text-[#2C1F14] text-sm mt-1">{data.email}</p>
              <p className="text-[#B0A090] text-xs mt-6 tracking-widest uppercase">
                Проверьте входящие — письмо уже в пути
              </p>
            </motion.div>
          )}

          {(status === "idle" || status === "error") && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Ваше имя</label>
                  <input
                    className={inputClass}
                    placeholder="Как вас зовут?"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="Куда отправить план"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className={labelClass}>Куда хотите поехать</label>
                <input
                  className={inputClass}
                  placeholder="Страна, регион или город"
                  value={data.destination}
                  onChange={(e) => update("destination", e.target.value)}
                />
              </div>

              {/* Month */}
              <div>
                <label className={labelClass}>Когда планируете</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {months.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => update("month", data.month === m ? "" : m)}
                      className={`px-4 py-2 text-xs tracking-wider border transition-all duration-200 ${
                        data.month === m
                          ? "bg-[#2C1F14] border-[#2C1F14] text-white"
                          : "border-[#D6CCB8] text-[#6B5B4E] hover:border-[#8B7355]"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className={labelClass}>Кто едет</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {travelerOptions.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => update("travelers", data.travelers === t.label ? "" : t.label)}
                      className={`px-5 py-2.5 text-xs tracking-wider border transition-all duration-200 ${
                        data.travelers === t.label
                          ? "bg-[#C4714A] border-[#C4714A] text-white"
                          : "border-[#D6CCB8] text-[#6B5B4E] hover:border-[#8B7355]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className={labelClass}>Что важно для вас</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Природа, гастрономия, архитектура, медленный темп, пляжи..."
                  value={data.interests}
                  onChange={(e) => update("interests", e.target.value)}
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Что-то пошло не так. Попробуйте снова.</p>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#C4714A] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#A85C38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Создать мой маршрут <Send size={15} />
                </button>
                <p className="text-center text-xs text-[#B0A090] mt-3 tracking-widest uppercase">
                  Готовый план придёт на email за несколько минут
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
