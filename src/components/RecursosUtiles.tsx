"use client";

import { useState } from "react";

type ChecklistItem = {
  id: string;
  texto: string;
};

type Checklist = {
  titulo: string;
  items: ChecklistItem[];
};

type TipSensorial = {
  titulo: string;
  descripcion: string;
  emoji: string;
};

const checklists: Checklist[] = [
  {
    titulo: "Documentación para viajar",
    items: [
      { id: "doc1", texto: "Pasaporte vigente de todos los viajeros" },
      { id: "doc2", texto: "Visados si aplica (según nacionalidad)" },
      { id: "doc3", texto: "Historial médico y diagnóstico actualizado" },
      { id: "doc4", texto: "Recetas de medicamentos con nombre genérico" },
      { id: "doc5", texto: "Carta del médico tratante (en español e inglés)" },
      { id: "doc6", texto: "Seguro médico de viaje con cobertura internacional" },
      { id: "doc7", texto: "Contactos de emergencia en el destino" },
    ],
  },
  {
    titulo: "Maleta sensorial del niño",
    items: [
      { id: "mal1", texto: "Auriculares con cancelación de ruido" },
      { id: "mal2", texto: "Manta o peluche favorito" },
      { id: "mal3", texto: "Tablet con contenido conocido y descargado" },
      { id: "mal4", texto: "Snacks familiares y agua" },
      { id: "mal5", texto: "Ropa cómoda y muda extra" },
      { id: "mal6", texto: "Tarjetas de comunicación visual (PECS propio)" },
      { id: "mal7", texto: "Juguetes sensoriales pequeños (fidgets)" },
    ],
  },
  {
    titulo: "En el aeropuerto / avión",
    items: [
      { id: "aer1", texto: "Llegar con 3 horas de anticipación" },
      { id: "aer2", texto: "Solicitar embarque prioritario en el check-in" },
      { id: "aer3", texto: "Informar a la aerolínea sobre necesidades especiales" },
      { id: "aer4", texto: "Llevar certificado médico por si preguntan" },
      { id: "aer5", texto: "Elegir asiento de ventanilla (menos movimiento)" },
      { id: "aer6", texto: "Explicar al niño el proceso con anticipación (social story)" },
    ],
  },
  {
    titulo: "En el destino",
    items: [
      { id: "des1", texto: "Verificar centros de salud cercanos al alojamiento" },
      { id: "des2", texto: "Mantener rutinas de sueño y alimentación similares" },
      { id: "des3", texto: "Identificar zonas tranquilas cerca (parques, plazas)" },
      { id: "des4", texto: "Tener un plan B por si el niño no tolera la sesión" },
      { id: "des5", texto: "Llevar tarjeta con datos de contacto y diagnóstico en el idioma local" },
    ],
  },
];

const tipsSensoriales: TipSensorial[] = [
  {
    emoji: "🎧",
    titulo: "Cancelación de ruido",
    descripcion: "Llevá auriculares con cancelación activa para el avión y lugares con mucho ruido. Probálos antes del viaje para que el niño se familiarice.",
  },
  {
    emoji: "⏰",
    titulo: "Rutina visual",
    descripcion: "Armá un calendario visual con los días del viaje. Usá pictogramas para cada actividad. Ayuda a reducir la ansiedad por lo desconocido.",
  },
  {
    emoji: "🧸",
    titulo: "Objeto de confort",
    descripcion: "No olvides su peluche, manta o juguete favorito. Tener algo familiar en un entorno nuevo es ancla emocional.",
  },
  {
    emoji: "🥤",
    titulo: "Hidratación y snacks",
    descripcion: "Llevá agua y alimentos conocidos. Los cambios de rutina ya son mucho estímulo; la comida familiar da seguridad.",
  },
  {
    emoji: "📱",
    titulo: "Contenido conocido",
    descripcion: "Descargá videos, música o apps que al niño le gusten. Tener algo predecible a mano ayuda en momentos de sobrecarga sensorial.",
  },
  {
    emoji: "🫂",
    titulo: "Tiempos de pausa",
    descripcion: "Programá tiempos de descanso entre actividades. Un día con terapias y viajes puede ser agotador. El tiempo libre no es pérdida, es necesidad.",
  },
];

export default function RecursosUtiles() {
  const [checklistAbierta, setChecklistAbierta] = useState<string | null>(null);
  const [checklistCompletado, setChecklistCompletado] = useState<Record<string, boolean>>({});

  const toggleChecklist = (id: string) => {
    setChecklistAbierta(checklistAbierta === id ? null : id);
  };

  const toggleItem = (itemId: string) => {
    setChecklistCompletado((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const completados = (items: ChecklistItem[]) =>
    items.filter((i) => checklistCompletado[i.id]).length;

  return (
    <section id="recursos-utiles" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-50 text-aqua-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
            </svg>
            Recursos Útiles
          </div>
          <h2 className="section-title">Checklists y tips para tu viaje</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Preparación, adaptación sensorial y documentación. Todo lo que otras familias
            aprendieron en el camino, organizado para vos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Checklists */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-900 flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-aqua-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
              </svg>
              Checklists descargables
            </h3>

            {checklists.map((cl) => {
              const isOpen = checklistAbierta === cl.titulo;
              const doneCount = completados(cl.items);
              return (
                <div key={cl.titulo} className="card p-4">
                  <button onClick={() => toggleChecklist(cl.titulo)} className="w-full flex items-center justify-between text-left">
                    <div>
                      <h4 className="font-bold text-brand-900 text-sm sm:text-base">{cl.titulo}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{doneCount}/{cl.items.length} completado</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-aqua-400 transition-all" style={{ width: `${(doneCount / cl.items.length) * 100}%` }} />
                      </div>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-1.5">
                      {cl.items.map((item) => (
                        <label key={item.id} className="flex items-start gap-2.5 cursor-pointer group py-1">
                          <input type="checkbox" checked={!!checklistCompletado[item.id]}
                            onChange={() => toggleItem(item.id)}
                            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-aqua-500 focus:ring-aqua-400 accent-aqua-500" />
                          <span className={`text-sm leading-relaxed ${checklistCompletado[item.id] ? "line-through text-gray-400" : "text-gray-700"}`}>
                            {item.texto}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips sensoriales */}
          <div>
            <h3 className="text-lg font-bold text-brand-900 flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips de adaptación sensorial
            </h3>
            <div className="space-y-3">
              {tipsSensoriales.map((tip, i) => (
                <div key={i} className={`card p-4 reveal ${i > 1 ? "reveal-delay-1" : ""}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{tip.emoji}</span>
                    <div>
                      <h4 className="font-bold text-brand-900 text-sm">{tip.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{tip.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
