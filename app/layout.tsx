import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pausa — Muebles que invitan a quedarse",
  description:
    "Muebles artesanales diseñados para hacer de tu casa un lugar donde quieras quedarte. Colecciones únicas, hechas con materiales naturales.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
