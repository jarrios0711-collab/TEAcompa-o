"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Testimonio = {
  id: number;
  nombre: string;
  historia: string;
  pais: string;
  rating: number;
  terapia: string;
  created_at: string;
};

type Respuesta = {
  id: number;
  testimonio_id: number;
  nombre: string;
  mensaje: string;
  created_at: string;
};

type Consejo = {
  id: number;
  tipo: string;
  autor: string;
  contenido: string;
  votos: number;
};

const categorias = ["Todas", "Terapia ABA", "Neuropediatría", "Integración Sensorial", "Terapia del Lenguaje", "Viaje"];

export default function Comunidad() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, Respuesta[]>>({});
  const [consejos, setConsejos] = useState<Consejo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [testimonio, setTestimonio] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [respondiendoId, setRespondiendoId] = useState<number | null>(null);
  const [respNombre, setRespNombre] = useState("");
  const [respMensaje, setRespMensaje] = useState("");

  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  useEffect(() => {
    cargarTestimonios();
    cargarConsejos();
  }, []);

  const cargarTestimonios = async () => {
    const { data, error } = await getSupabase()
      .from("testimonios")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setTestimonios(data);
      data.forEach((t: Testimonio) => cargarRespuestas(t.id));
    }
  };

  const cargarRespuestas = async (testimonioId: number) => {
    const { data, error } = await getSupabase()
      .from("respuestas")
      .select("*")
      .eq("testimonio_id", testimonioId)
      .order("created_at", { ascending: true });
    if (!error && data) {
      setRespuestas((prev) => ({ ...prev, [testimonioId]: data }));
    }
  };

  const cargarConsejos = async () => {
    const { data, error } = await getSupabase()
      .from("consejos")
      .select("*")
      .order("votos", { ascending: false })
      .limit(5);
    if (!error && data) setConsejos(data);
  };

  const publicarTestimonio = async () => {
    if (!nombre.trim() || !testimonio.trim()) return;
    setEnviando(true);
    const { error } = await getSupabase().from("testimonios").insert({
      nombre: nombre.trim(),
      historia: testimonio.trim(),
      pais: "", rating: 5, terapia: categoriaActiva === "Todas" ? "" : categoriaActiva,
    });
    setEnviando(false);
    if (error) { alert("Error al publicar."); return; }
    setNombre(""); setTestimonio(""); setShowForm(false);
    cargarTestimonios();
  };

  const publicarRespuesta = async (testimonioId: number) => {
    if (!respNombre.trim() || !respMensaje.trim()) return;
    const { error } = await getSupabase().from("respuestas").insert({
      testimonio_id: testimonioId,
      nombre: respNombre.trim(),
      mensaje: respMensaje.trim(),
    });
    if (error) { alert("Error al responder."); return; }
    await getSupabase().from("notificaciones").insert({
      testimonio_id: testimonioId,
      de_nombre: respNombre.trim(),
      mensaje: respMensaje.trim().substring(0, 100),
    });
    setRespNombre(""); setRespMensaje(""); setRespondiendoId(null);
    cargarRespuestas(testimonioId);
  };

  const filtrados = categoriaActiva === "Todas"
    ? testimonios
    : testimonios.filter((t) => t.terapia === categoriaActiva);

  return (
    <section id="comunidad" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-50 text-aqua-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
            </svg>
            Comunidad
          </div>
          <h2 className="section-title">Voces que inspiran, experiencias que guían</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Cada testimonio es un faro para otra familia. Comparte tu historia y
            construyamos juntos la red de apoyo más grande para el autismo.
          </p>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 reveal reveal-delay-1">
          {categorias.map((cat) => (
            <button key={cat} onClick={() => setCategoriaActiva(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                categoriaActiva === cat ? "bg-brand-700 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:border-brand-300"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Testimonios */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-brand-900">{filtrados.length} testimonios</h3>
              <span className="text-xs text-gray-400">{categoriaActiva !== "Todas" ? `Filtrando: ${categoriaActiva}` : "Mostrando todos"}</span>
            </div>

            {filtrados.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No hay testimonios en esta categoría aún.</p>
            ) : (
              filtrados.slice(0, 6).map((t) => {
                const respCount = respuestas[t.id]?.length || 0;
                return (
                  <div key={t.id} className="card-hover reveal">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-brand-200 to-aqua-200 flex items-center justify-center text-brand-700 font-bold flex-shrink-0 text-base sm:text-lg">
                        {t.nombre.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className="font-bold text-brand-900 text-sm sm:text-base">{t.nombre}</h4>
                          <div className="flex items-center gap-2">
                            {t.pais && <span className="text-[11px] text-gray-400">{t.pais}</span>}
                            {respCount > 0 && (
                              <span className="text-[11px] bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {respCount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 my-1.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <svg key={j} className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{t.historia}&rdquo;</p>
                        {t.terapia && (
                          <span className="inline-block mt-2 text-[11px] text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full font-medium">{t.terapia}</span>
                        )}

                        {/* Responder */}
                        <button onClick={() => setRespondiendoId(respondiendoId === t.id ? null : t.id)}
                          className="mt-2.5 text-xs text-aqua-600 hover:text-aqua-700 font-semibold flex items-center gap-1 transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          {respondiendoId === t.id ? "Cerrar" : respCount > 0 ? `Responder (${respCount})` : "Responder"}
                        </button>

                        {/* Respuestas */}
                        {respuestas[t.id]?.length > 0 && (
                          <div className="mt-2.5 space-y-2 pl-4 border-l-2 border-brand-100">
                            {respuestas[t.id].map((r) => (
                              <div key={r.id} className="text-sm">
                                <span className="font-semibold text-brand-800 text-sm">{r.nombre}</span>
                                <p className="text-gray-600 text-sm">{r.mensaje}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Formulario de respuesta */}
                        {respondiendoId === t.id && (
                          <div className="mt-2.5 space-y-2 pl-4 border-l-2 border-aqua-200">
                            <input type="text" placeholder="Tu nombre" value={respNombre} onChange={(e) => setRespNombre(e.target.value)}
                              className="input-field text-xs !py-1.5" />
                            <textarea placeholder="Escribe tu respuesta..." rows={2} value={respMensaje} onChange={(e) => setRespMensaje(e.target.value)}
                              className="input-field text-xs !py-1.5 resize-none" />
                            <div className="flex gap-2">
                              <button onClick={() => publicarRespuesta(t.id)}
                                className="btn-primary text-xs !py-1.5 !px-4"
                                disabled={!respNombre.trim() || !respMensaje.trim()}>Responder</button>
                              <button onClick={() => { setRespondiendoId(null); setRespNombre(""); setRespMensaje(""); }}
                                className="btn-secondary text-xs !py-1.5 !px-4">Cancelar</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card reveal">
              <h3 className="text-base sm:text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-aqua-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Tips y experiencias
              </h3>
              {consejos.length === 0 ? (
                <p className="text-gray-400 text-sm">Cargando consejos...</p>
              ) : (
                <div className="space-y-4">
                  {consejos.map((item) => (
                    <div key={item.id} className="pb-3.5 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-1">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          item.tipo === "Consejo" ? "bg-aqua-50 text-aqua-700" : item.tipo === "Recomendación" ? "bg-brand-50 text-brand-700" : "bg-warm-50 text-warm-700"
                        }`}>{item.tipo}</span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {item.votos}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{item.autor}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{item.contenido}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card bg-gradient-to-br from-brand-50 to-aqua-50 border-brand-100 reveal">
              <h3 className="text-base sm:text-lg font-bold text-brand-900 mb-2">Comparte tu experiencia</h3>
              <p className="text-sm text-gray-600 mb-4">Tu historia puede ser justo lo que otra familia necesita escuchar hoy.</p>
              {!showForm ? (
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm !py-2.5 w-full">Escribir mi experiencia</button>
              ) : (
                <div className="space-y-3">
                  <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                    className="input-field text-sm !py-2.5" />
                  <textarea placeholder="Comparte tu historia..." rows={4} value={testimonio} onChange={(e) => setTestimonio(e.target.value)}
                    className="input-field text-sm !py-2.5 resize-none" />
                  <div className="flex gap-2">
                    <button onClick={publicarTestimonio}
                      className="btn-primary text-sm !py-2 flex-1"
                      disabled={!testimonio.trim() || !nombre.trim() || enviando}>{enviando ? "Publicando..." : "Publicar"}</button>
                    <button onClick={() => { setShowForm(false); setNombre(""); setTestimonio(""); }}
                      className="btn-secondary text-sm !py-2 !px-4">Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
