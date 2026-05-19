"use client";

const steps = [
  {
    number: "01",
    title: "Расскажите о себе",
    description: "Заполните короткую форму: куда мечтаете попасть, когда, с кем, какой бюджет и что важно для вашей души.",
  },
  {
    number: "02",
    title: "AI создаёт маршрут",
    description: "Наш ИИ анализирует тысячи вариантов и составляет персональный план — с местами, временем, логикой и смыслом.",
  },
  {
    number: "03",
    title: "Получите на email",
    description: "Готовый маршрут приходит на вашу почту в течение нескольких минут. Подробно, красиво, сразу можно использовать.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 px-6 bg-[#F5F0EB]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">Процесс</p>
          <h2 className="font-heading text-4xl font-light text-[#2C1F14]">
            Как это работает
          </h2>
          <div className="w-12 h-px bg-[#D6CCB8] mt-6" />
        </div>

        <div className="flex flex-col gap-14 md:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <span className="font-heading text-4xl font-light text-[#D6CCB8]">{step.number}</span>
              </div>
              <div className="pt-1">
                <h3 className="font-heading text-xl font-light text-[#2C1F14] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6B5B4E] text-sm leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
