"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  country: string;
  destination: string;
  dates: string;
  duration: string;
  budget: string;
  travelers: string;
  travelStyle: string;
  interests: string;
  wishes: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  country: "",
  destination: "",
  dates: "",
  duration: "",
  budget: "",
  travelers: "",
  travelStyle: "",
  interests: "",
  wishes: "",
};

const budgetOptions = [
  "до $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $15,000",
  "от $15,000",
];

const styleOptions = [
  "Медленное путешествие",
  "Культура и история",
  "Природа и трекинг",
  "Гастрономия и вино",
  "Духовные практики",
  "Пляжный отдых",
  "Городские исследования",
  "Приключения",
];

export default function TravelForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleStyle = (s: string) => {
    const arr = data.travelStyle ? data.travelStyle.split(",").map((x) => x.trim()) : [];
    const next = arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s];
    update("travelStyle", next.join(", "));
  };

  const selectedStyles = data.travelStyle
    ? data.travelStyle.split(",").map((x) => x.trim()).filter(Boolean)
    : [];

  const canNext1 = data.name && data.email && data.country;
  const canNext2 = data.destination && data.budget && data.travelers;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Что-то пошло не так. Попробуйте снова.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#D6CCB8] py-3 text-[#2C1F14] placeholder-[#B0A090] text-sm focus:outline-none focus:border-[#8B7355] transition-colors";

  return (
    <section id="form" className="py-24 md:py-32 px-6 bg-[#F5F0EB]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">Ваш маршрут</p>
          <h2 className="font-heading text-4xl font-light text-[#2C1F14] mb-4">
            Расскажите о себе
          </h2>
          <p className="text-[#6B5B4E] text-sm">
            AI составит персональный план и отправит на email в течение нескольких минут
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  s < step
                    ? "bg-[#2C1F14] text-white"
                    : s === step
                    ? "bg-[#C4714A] text-white"
                    : "border border-[#D6CCB8] text-[#B0A090]"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && <div className={`w-12 h-px transition-all duration-300 ${s < step ? "bg-[#2C1F14]" : "bg-[#D6CCB8]"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Success state */}
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle2 className="w-16 h-16 text-[#5C5C3A] mx-auto mb-6" />
              <h3 className="font-heading text-4xl text-[#2C1F14] mb-3">Ваш план готовится</h3>
              <p className="text-[#6B5B4E] text-sm">
                AI уже составляет маршрут. Через несколько минут план придёт на{" "}
                {data.email}
              </p>
            </motion.div>
          ) : status === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Loader2 className="w-10 h-10 text-[#C4714A] mx-auto mb-6 animate-spin" />
              <h3 className="font-heading text-4xl text-[#2C1F14] mb-2">Создаём ваш маршрут</h3>
              <p className="text-[#6B5B4E] text-sm">AI анализирует ваши пожелания...</p>
            </motion.div>
          ) : (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Ваше имя</label>
                    <input className={inputClass} placeholder="Как вас зовут?" value={data.name} onChange={(e) => update("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Email</label>
                    <input className={inputClass} type="email" placeholder="На этот адрес придёт план" value={data.email} onChange={(e) => update("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Страна проживания</label>
                    <input className={inputClass} placeholder="Откуда вы?" value={data.country} onChange={(e) => update("country", e.target.value)} />
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Направление</label>
                    <input className={inputClass} placeholder="Куда хотите поехать?" value={data.destination} onChange={(e) => update("destination", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Примерные даты</label>
                      <input className={inputClass} placeholder="Сентябрь 2025" value={data.dates} onChange={(e) => update("dates", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Длительность</label>
                      <input className={inputClass} placeholder="10 дней" value={data.duration} onChange={(e) => update("duration", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-3">Бюджет на человека</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update("budget", b)}
                          className={`px-4 py-2 text-xs tracking-wider border transition-all duration-200 ${
                            data.budget === b
                              ? "bg-[#2C1F14] border-[#2C1F14] text-white"
                              : "border-[#D6CCB8] text-[#6B5B4E] hover:border-[#8B7355]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Количество путешественников</label>
                    <input className={inputClass} placeholder="Соло, пара, семья с детьми..." value={data.travelers} onChange={(e) => update("travelers", e.target.value)} />
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-3">Стиль путешествия</label>
                    <div className="flex flex-wrap gap-2">
                      {styleOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleStyle(s)}
                          className={`px-4 py-2 text-xs tracking-wider border transition-all duration-200 ${
                            selectedStyles.includes(s)
                              ? "bg-[#C4714A] border-[#C4714A] text-white"
                              : "border-[#D6CCB8] text-[#6B5B4E] hover:border-[#8B7355]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Интересы</label>
                    <input className={inputClass} placeholder="Фотография, медитация, местная кухня..." value={data.interests} onChange={(e) => update("interests", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">Особые пожелания</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="Что для вас важно в этом путешествии? Чего хотите избежать?"
                      value={data.wishes}
                      onChange={(e) => update("wishes", e.target.value)}
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-500 text-sm">{errorMsg}</p>
                  )}
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {status === "idle" && (
          <div className="flex items-center justify-between mt-12">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-sm text-[#6B5B4E] hover:text-[#2C1F14] transition-colors tracking-widest uppercase"
              >
                <ChevronLeft size={16} /> Назад
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 ? !canNext1 : !canNext2}
                className="flex items-center gap-2 px-8 py-3 bg-[#2C1F14] text-white text-sm tracking-widest uppercase hover:bg-[#3D2B1C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Далее <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-[#C4714A] text-white text-sm tracking-widest uppercase hover:bg-[#A85C38] transition-colors"
              >
                Создать план <Send size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
