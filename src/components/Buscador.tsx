"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Recurso = {
  id: number;
  titulo: string;
  tipo: string;
  terapia: string;
  pais: string;
  descripcion: string;
  enlace: string;
};

const tipos = ["Todos", "Guía", "Directorio", "Recomendación"];
const terapias = [
  "Todas", "Terapia ABA", "Neuropediatría",
  "Integración Sensorial", "Terapia del Lenguaje", "General",
];
const paises = ["Todos", "República Dominicana", "Argentina", "Perú", "General"];

export default function Buscador() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroTerapia, setFiltroTerapia] = useState("Todas");
  const [filtroPais, setFiltroPais] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    const { data, error } = await getSupabase()
      .from("recursos")
      .select("*")
      .order("titulo");
    if (!error && data) setRecursos(data);
  };

  const filtrados = recursos.filter((r) => {
    if (filtroTipo !== "Todos" && r.tipo !== filtroTipo) return false;
    if (filtroTerapia !== "Todas" && r.terapia !== filtroTerapia) return false;
    if (filtroPais !== "Todos" && r.pais !== filtroPais) return false;
    if (
      busqueda &&
      !r.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
      !r.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <section id="buscador" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscador de Recursos
          </div>
          <h2 className="section-title">Encuentra lo que necesitas</h2>
          <p className="section-subtitle">
            Filtra por tipo de terapia, país o palabra clave. Toda la información
            es verificada por nuestra comunidad.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar recursos, terapias, países..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">Tipo</p>
              <div className="flex flex-wrap gap-2">
                {tipos.map((t) => (
                  <button key={t} onClick={() => setFiltroTipo(t)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      filtroTipo === t ? "bg-brand-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-300"
                    }`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">Terapia</p>
              <div className="flex flex-wrap gap-2">
                {terapias.map((t) => (
                  <button key={t} onClick={() => setFiltroTerapia(t)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      filtroTerapia === t ? "bg-aqua-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-aqua-300"
                    }`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-2">País</p>
              <div className="flex flex-wrap gap-2">
                {paises.map((p) => (
                  <button key={p} onClick={() => setFiltroPais(p)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      filtroPais === p ? "bg-warm-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-warm-300"
                    }`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {filtrados.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 font-medium">No encontramos recursos con esos filtros</p>
              <p className="text-gray-400 text-sm mt-1">Prueba con otras combinaciones</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filtrados.map((r, i) => (
                <div key={r.id} className={`card-hover reveal ${i > 1 ? "reveal-delay-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      r.tipo === "Guía" ? "bg-brand-50 text-brand-700" : r.tipo === "Directorio" ? "bg-aqua-50 text-aqua-700" : "bg-warm-50 text-warm-700"
                    }`}>{r.tipo}</span>
                    <span className="text-xs text-gray-400">{r.pais}</span>
                  </div>
                  <h3 className="font-bold text-brand-900 mb-1">{r.titulo}</h3>
                  <p className={`text-sm text-gray-600 leading-relaxed mb-3 ${expanded !== r.id ? "line-clamp-2" : ""}`}>
                    {r.descripcion}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full font-medium">
                      {r.terapia}
                    </span>
                    <button
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="text-xs text-aqua-600 hover:text-aqua-700 font-semibold transition-colors"
                    >
                      {expanded === r.id ? "Ver menos →" : "Ver más →"}
                    </button>
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
