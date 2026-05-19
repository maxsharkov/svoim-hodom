"use client";

const values = [
  { label: "Осознанность", text: "Каждое путешествие — это не галочка в списке, а встреча с собой." },
  { label: "Персональность", text: "Никаких шаблонных туров. Только то, что подходит именно вам." },
  { label: "Глубина", text: "Места, которые не найти в обычных путеводителях." },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#E8E0D6]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#C4714A] text-sm tracking-[0.3em] uppercase mb-4">О нас</p>
            <h2 className="font-heading text-4xl font-light text-[#2C1F14] mb-6 leading-tight">
              Путешествие как
              <br />
              практика
            </h2>
            <div className="w-12 h-px bg-[#D6CCB8] mb-8" />
            <p className="text-[#6B5B4E] text-sm leading-relaxed mb-5">
              Мы верим, что осознанное путешествие меняет не только маршрут, но и восприятие мира. Наш AI изучает ваши ценности, ритм жизни и мечты — и создаёт план, который резонирует с вашей душой.
            </p>
            <p className="text-[#6B5B4E] text-sm leading-relaxed">
              Не просто список мест. А живой маршрут с контекстом, смыслом и пространством для неожиданных открытий.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {values.map((v) => (
              <div key={v.label} className="border-l-2 border-[#D6CCB8] pl-6">
                <h3 className="font-heading text-xl font-light text-[#2C1F14] mb-2">{v.label}</h3>
                <p className="text-[#6B5B4E] text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
