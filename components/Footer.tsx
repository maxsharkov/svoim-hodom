export default function Footer() {
  return (
    <footer className="bg-[#0F0A07] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-xl font-light tracking-widest uppercase text-white/80">Своим ходом</span>
        <p className="text-white/30 text-sm tracking-wider">
          © {new Date().getFullYear()} Своим ходом · Персональные путешествия с AI
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-white/40 text-sm tracking-wider hover:text-white/70 transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
