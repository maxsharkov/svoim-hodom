import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Своим ходом — осознанные путешествия с AI",
  description: "Персональный план путешествия, созданный искусственным интеллектом специально для вас. Осознанный туризм нового поколения.",
  openGraph: {
    title: "Своим ходом — осознанные путешествия с AI",
    description: "Персональный план путешествия, созданный AI специально для вас",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${inter.variable} ${cormorant.variable} font-sans min-h-full`}>
        {children}
      </body>
    </html>
  );
}
