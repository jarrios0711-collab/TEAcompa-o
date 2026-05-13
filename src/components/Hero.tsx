"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-brand-100/50 via-aqua-50/20 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-aqua-100/50 via-brand-50/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-brand-50/20 to-aqua-50/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-7 max-w-xl">
            <div className="reveal visible inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-50 border border-aqua-200 text-aqua-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Historias reales de familias como la tuya
            </div>

            <h1 className="reveal reveal-delay-1 text-[2.5rem] md:text-5xl lg:text-6xl font-extrabold text-brand-900 leading-[1.1]">
              Nadie camina solo en{" "}
              <span className="bg-gradient-to-r from-brand-500 to-aqua-500 bg-clip-text text-transparent">
                este viaje
              </span>
            </h1>

            <p className="reveal reveal-delay-2 text-lg md:text-xl text-gray-600 leading-relaxed">
              <strong className="text-brand-700">TEAcompaño</strong> nació de una historia real: un papá desde Argentina
              viajó a República Dominicana con su hijo con TEA buscando tratamientos. Su experiencia
              hoy ayuda a otras familias. Ahora queremos que vos cuentes la tuya.
            </p>

            <div className="reveal reveal-delay-2 bg-brand-50 border-l-4 border-aqua-400 p-5 rounded-r-xl">
              <p className="text-base text-brand-800 font-medium italic leading-relaxed">
                &ldquo;Cada experiencia compartida es una luz para quien hoy busca.&rdquo;
              </p>
            </div>

            <p className="reveal reveal-delay-3 text-base text-gray-500 leading-relaxed">
              Cada familia tiene un camino distinto. Acá no hay guías institucionales ni información
              fría — hay personas que vivieron lo mismo que vos y quieren ayudarte.
            </p>

            <div className="reveal reveal-delay-3 flex flex-wrap gap-3 pt-1">
              <Link href="#rutas" className="btn-primary text-center min-w-[180px]">
                Explorar Rutas
              </Link>
              <Link href="#formulario" className="btn-secondary text-center min-w-[180px]">
                Unirme a la Comunidad
              </Link>
            </div>

            {/* Stats con microanimación */}
            <div className="reveal reveal-delay-4 flex gap-8 pt-3">
              <div className="animate-pulse-soft" style={{ animationDelay: "0s" }}>
                <p className="text-2xl font-bold text-brand-700">+150</p>
                <p className="text-sm text-gray-500">Familias unidas</p>
              </div>
              <div className="animate-pulse-soft" style={{ animationDelay: "0.5s" }}>
                <p className="text-2xl font-bold text-aqua-600">+12</p>
                <p className="text-sm text-gray-500">Rutas documentadas</p>
              </div>
              <div className="animate-pulse-soft" style={{ animationDelay: "1s" }}>
                <p className="text-2xl font-bold text-brand-700">+45</p>
                <p className="text-sm text-gray-500">Recursos disponibles</p>
              </div>
            </div>
          </div>

          {/* Right: Illustration - visible desde md en adelante */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-72 sm:w-80 lg:w-96">
              {/* Soft glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-100/50 via-aqua-50/20 to-transparent" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-aqua-100/20 via-brand-50/10 to-transparent" />

              {/* SVG Illustration */}
              <svg className="relative w-full h-auto" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="180" stroke="#dbeffd" strokeWidth="1" strokeDasharray="6 6" opacity="0.5" />
                <circle cx="200" cy="200" r="140" stroke="#ccfbef" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />

                <g opacity="0.35">
                  <path d="M120 80 Q120 70 128 70 Q136 70 136 80 Q136 92 120 102 Q104 92 104 80 Q104 70 112 70 Q120 70 120 80Z" fill="#60b8f5" />
                  <path d="M290 100 Q290 92 296 92 Q302 92 302 100 Q302 108 290 116 Q278 108 278 100 Q278 92 284 92 Q290 92 290 100Z" fill="#5eebcc" />
                </g>

                {/* Parent */}
                <g>
                  <circle cx="155" cy="145" r="22" stroke="#1d4c87" strokeWidth="2.5" fill="white" />
                  <path d="M133 185 Q133 168 155 168 Q177 168 177 185 L177 200 Q155 210 133 200Z" stroke="#1d4c87" strokeWidth="2.5" fill="white" />
                  <path d="M155 185 Q170 178 190 175" stroke="#1d4c87" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M155 185 Q140 190 130 200" stroke="#1d4c87" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M140 200 L135 230" stroke="#1d4c87" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M170 200 L175 230" stroke="#1d4c87" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Child */}
                <g>
                  <circle cx="218" cy="160" r="16" stroke="#a75a26" strokeWidth="2.5" fill="white" />
                  <path d="M202 195 Q202 178 218 178 Q234 178 234 195 L234 205 Q218 212 202 205Z" stroke="#a75a26" strokeWidth="2.5" fill="white" />
                  <path d="M218 190 Q205 180 193 176" stroke="#a75a26" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M210 205 L208 228" stroke="#a75a26" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M226 205 L228 228" stroke="#a75a26" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Compass */}
                <g transform="translate(310, 280)" opacity="0.5">
                  <circle cx="0" cy="0" r="15" stroke="#14b89b" strokeWidth="1.5" fill="#ccfbef" opacity="0.4" />
                  <path d="M0 -18 L2 -8 L0 -12 L-2 -8Z" fill="#14b89b" />
                  <path d="M0 18 L2 8 L0 12 L-2 8Z" fill="#14b89b" />
                  <path d="M-18 0 L-8 2 L-12 0 L-8 -2Z" fill="#14b89b" />
                  <path d="M18 0 L8 2 L12 0 L8 -2Z" fill="#14b89b" />
                </g>

                {/* Path */}
                <path d="M100 330 Q150 300 200 310 Q250 320 300 300" stroke="#93d2fa" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" fill="none" />
                <circle cx="100" cy="330" r="4" fill="#93d2fa" opacity="0.3" />
                <circle cx="300" cy="300" r="4" fill="#5eebcc" opacity="0.3" />
              </svg>

              {/* Floating heart */}
              <div className="absolute animate-float" style={{ top: "39%", left: "46%", animationDuration: "6s" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#e9be86" opacity="0.6">
                  <path d="M8 14.5L2.5 9.5C0.5 7.5 1 4 3.5 3C5 2.3 6.5 3 8 4.5C9.5 3 11 2.3 12.5 3C15 4 15.5 7.5 13.5 9.5L8 14.5Z" />
                </svg>
              </div>

              <div className="text-center mt-2">
                <p className="text-sm text-brand-400 font-medium tracking-wide">Juntos en el camino</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block animate-float" style={{ animationDuration: "3s" }}>
          <svg className="w-6 h-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
