import type { Metadata } from "next";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "TEAcompaño - Red de Apoyo para Familias con Autismo",
  description:
    "TEAcompaño es una comunidad que comparte experiencias, rutas de tratamiento y recursos para familias con autismo. Nadie camina solo en este viaje.",
  keywords: [
    "autismo",
    "TEA",
    "familias",
    "apoyo",
    "tratamientos",
    "viajes",
    "comunidad",
    "terapia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased bg-white text-gray-800">
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
