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

const paisesOrigen = ["Todos", "Argentina", "Venezuela", "Colombia", "Perú", "Chile", "Ecuador", "México", "Otro"];

export default function NuestrasRutas() {
  const [historias, setHistorias] = useState<HistoriaRD[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [desde, setDesde] = useState("");
  const [historia, setHistoria] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [filtroPais, setFiltroPais] = useState("Todos");
  const [favoritos, setFavoritos] = useState<Set<number>>(new Set());
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarHistorias();
    const saved = localStorage.getItem("fav_historias");
    if (saved) setFavoritos(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    localStorage.setItem("fav_historias", JSON.stringify(Array.from(favoritos)));
  }, [favoritos]);

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

  const toggleFav = (id: number) => {
    setFavoritos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtradas = historias.filter((h) => {
    if (filtroPais !== "Todos" && h.desde !== filtroPais) return false;
    if (busqueda && !h.historia.toLowerCase().includes(busqueda.toLowerCase()) && !h.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="rutas" className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nuestras Rutas
          </div>
          <h2 className="section-title reveal">Viajes por tratamientos: experiencias reales</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Cada historia es única. Familias que viajaron con sus hijos con TEA cuentan qué funcionó,
            qué harían distinto y qué aprendieron.
          </p>
        </div>

        {/* CTA + Form */}
        <div className="max-w-3xl mx-auto mb-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-500 to-aqua-600 text-white text-center reveal">
          <h3 className="text-xl md:text-2xl font-bold mb-2">¿Viajaste con tu hijo buscando tratamientos?</h3>
          <p className="text-white/80 text-base mb-5 max-w-lg mx-auto">
            Tu experiencia puede ayudar a otra familia que hoy está buscando respuestas.
          </p>
          {!showForm ? (
            <button onClick={() => setShowForm(true)}
              className="bg-white text-brand-700 font-bold px-8 py-3 rounded-full hover:bg-brand-50 transition-all shadow-lg text-sm sm:text-base"
            >
              Compartir mi historia
            </button>
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-left space-y-3">
              <input type="text" placeholder="Tu nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none text-sm" />
              <input type="text" placeholder="De qué país viajaste? (ej: Venezuela)" value={desde} onChange={(e) => setDesde(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none text-sm" />
              <textarea placeholder="Contá tu experiencia..." rows={4} value={historia} onChange={(e) => setHistoria(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none resize-none text-sm" />
              <div className="flex gap-2">
                <button onClick={publicarHistoria}
                  className="bg-white text-brand-700 font-bold px-6 py-2.5 rounded-full hover:bg-brand-50 transition-all flex-1 text-sm disabled:opacity-50"
                  disabled={!nombre.trim() || !historia.trim() || enviando}
                >{enviando ? "Publicando..." : "Publicar historia"}</button>
                <button onClick={() => { setShowForm(false); setNombre(""); setDesde(""); setHistoria(""); }}
                  className="bg-white/20 text-white px-6 py-2.5 rounded-full hover:bg-white/30 transition-all text-sm">Cancelar</button>
              </div>
            </div>
          )}
        </div>

        {/* Filtros y búsqueda */}
        <div className="max-w-3xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Buscar en historias..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                className="input-field pl-10 text-sm" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {paisesOrigen.map((p) => (
                <button key={p} onClick={() => setFiltroPais(p)}
                  className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    filtroPais === p ? "bg-brand-700 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-300"
                  }`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de historias */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base sm:text-lg font-bold text-brand-900">
              {filtradas.length === 0 ? "Sin resultados" : `${filtradas.length} historias compartidas`}
            </h3>
            {favoritos.size > 0 && (
              <span className="text-xs text-brand-500 font-medium">{favoritos.size} favoritas</span>
            )}
          </div>

          {filtradas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <svg className="w-14 h-14 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 font-medium">No hay historias con esos filtros</p>
              <button onClick={() => { setFiltroPais("Todos"); setBusqueda(""); }} className="text-aqua-600 text-sm mt-1 hover:underline">Limpiar filtros</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {filtradas.map((h) => {
                const esFav = favoritos.has(h.id);
                return (
                  <div key={h.id} className="card-hover relative">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-brand-300 to-aqua-400 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-base sm:text-lg">
                        {h.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-brand-900 text-sm sm:text-base truncate">{h.nombre}</h4>
                          <button onClick={() => toggleFav(h.id)} className="flex-shrink-0 p-1 -mr-1" aria-label={esFav ? "Quitar favorito" : "Favorito"}>
                            <svg className={`w-4 h-4 transition-colors ${esFav ? "text-red-400 fill-red-400" : "text-gray-300 hover:text-gray-400"}`} viewBox="0 0 24 24" stroke="currentColor" fill={esFav ? "currentColor" : "none"}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                        {h.desde && (
                          <span className="inline-block mt-0.5 text-[11px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">
                            Desde {h.desde}
                          </span>
                        )}
                        <p className="text-gray-600 text-sm leading-relaxed mt-2 line-clamp-4 whitespace-pre-line">{h.historia}</p>
                        <p className="text-[11px] text-gray-400 mt-2">
                          {new Date(h.created_at).toLocaleDateString("es-ES", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
