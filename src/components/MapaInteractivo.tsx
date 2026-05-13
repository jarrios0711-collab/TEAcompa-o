"use client";

import dynamic from "next/dynamic";

const MapaContent = dynamic(() => import("./MapaContent"), { ssr: false });

export default function MapaInteractivo() {
  return (
    <section id="mapa" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mapa de experiencias
          </div>
          <h2 className="section-title">Explorá países con recursos</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Hacé clic en cada marcador para ver qué recursos y experiencias hay disponibles en cada país.
          </p>
        </div>

        <div className="max-w-5xl mx-auto reveal">
          <MapaContent />
          <p className="text-xs text-gray-400 text-center mt-3">
            Mapa interactivo con OpenStreetMap. Las ubicaciones son referenciales.
          </p>
        </div>
      </div>
    </section>
  );
}
