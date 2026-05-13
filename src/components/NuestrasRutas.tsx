"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type HistoriaRD = {
  id: number;
  nombre: string;
  desde: string;
  historia: string;
  created_at: string;
};

export default function NuestrasRutas() {
  const [historias, setHistorias] = useState<HistoriaRD[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [desde, setDesde] = useState("");
  const [historia, setHistoria] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarHistorias();
  }, []);

  const cargarHistorias = async () => {
    const { data, error } = await getSupabase()
      .from("historias_rd")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setHistorias(data);
  };

  const publicarHistoria = async () => {
    if (!nombre.trim() || !historia.trim()) return;
    setEnviando(true);
    const { error } = await getSupabase().from("historias_rd").insert({
      nombre: nombre.trim(),
      desde: desde.trim() || "No especificado",
      historia: historia.trim(),
    });
    setEnviando(false);
    if (error) { alert("Error al publicar."); return; }
    setNombre(""); setDesde(""); setHistoria(""); setShowForm(false);
    cargarHistorias();
  };

  return (
    <section id="rutas" className="py-20 md:py-28 bg-gradient-to-b from-white to-brand-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nuestras Rutas
          </div>
          <h2 className="section-title">
            Viajes por tratamientos: experiencias reales
          </h2>
          <p className="section-subtitle">
            Cada historia es única. Acá las familias cuentan cómo viajaron con sus hijos con TEA
            buscando tratamientos: qué funcionó, qué harían distinto, qué aprendieron en el camino.
          </p>
        </div>

        {/* Destacado: llamada a compartir */}
        <div className="max-w-3xl mx-auto mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-500 to-aqua-600 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Viajaste con tu hijo buscando tratamientos?
          </h3>
          <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
            Tu experiencia puede ayudar a otra familia que hoy está buscando respuestas.
            Contá cómo lo hiciste.
          </p>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-brand-700 font-bold px-8 py-3 rounded-full hover:bg-brand-50 transition-all shadow-lg"
            >
              Compartir mi historia
            </button>
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-left space-y-4">
              <input
                type="text"
                placeholder="Tu nombre *"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <input
                type="text"
                placeholder="¿De qué país viajaste? (ej: Venezuela)"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <textarea
                placeholder="Contá tu experiencia: cómo fue el viaje, dónde fuiste, qué tratamiento buscaste, qué recomiendas..."
                rows={5}
                value={historia}
                onChange={(e) => setHistoria(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={publicarHistoria}
                  className="bg-white text-brand-700 font-bold px-6 py-2.5 rounded-full hover:bg-brand-50 transition-all flex-1 disabled:opacity-50"
                  disabled={!nombre.trim() || !historia.trim() || enviando}
                >
                  {enviando ? "Publicando..." : "Publicar historia"}
                </button>
                <button
                  onClick={() => { setShowForm(false); setNombre(""); setDesde(""); setHistoria(""); }}
                  className="bg-white/20 text-white px-6 py-2.5 rounded-full hover:bg-white/30 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lista de historias */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-brand-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Historias compartidas ({historias.length})
          </h3>

          {historias.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 font-medium">Aún no hay historias compartidas</p>
              <p className="text-gray-400 text-sm mt-1">¡Sé el primero en contar tu experiencia!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {historias.map((h) => (
                <div key={h.id} className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-300 to-aqua-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                      {h.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-brand-900">{h.nombre}</h4>
                        {h.desde && (
                          <span className="text-xs bg-brand-50 text-brand-600 px-2.5 py-0.5 rounded-full font-medium">
                            Desde {h.desde}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{h.historia}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(h.created_at).toLocaleDateString("es-ES", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
