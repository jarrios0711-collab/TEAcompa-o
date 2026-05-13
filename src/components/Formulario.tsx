"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function Formulario() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    pais: "",
    hijo: "",
    interes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError("");

    const { error: err } = await getSupabase().from("registros").insert({
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      pais: formData.pais,
      hijo: formData.hijo,
      interes: formData.interes,
    });

    setEnviando(false);

    if (err) {
      if (err.code === "23505") {
        setError("Este correo ya está registrado en la comunidad.");
      } else {
        setError("Ocurrió un error. Intenta de nuevo más tarde.");
      }
      return;
    }

    setEnviado(true);
  };

  return (
    <section id="formulario" className="py-16 md:py-24 bg-gradient-to-br from-brand-900 via-brand-950 to-[#0c2a4a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-aqua-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-aqua-300 text-sm font-medium mb-5 border border-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Únete a la comunidad
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            No esperes más para encontrar tu red
          </h2>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto">
            Déjanos tus datos y sé parte de una comunidad que camina contigo.
            Recibirás información sobre rutas, tratamientos y experiencias de
            otras familias.
          </p>
        </div>

        {enviado ? (
          <div className="text-center py-16 px-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-aqua-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-aqua-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">¡Bienvenido a TEAcompaño!</h3>
            <p className="text-brand-200 text-lg max-w-md mx-auto">
              Te hemos enviado un correo con los primeros pasos. En los próximos
              días recibirás nuestra guía de República Dominicana y podrás
              acceder a la comunidad privada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-3xl p-8 md:p-10 border border-white/10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  placeholder="+52 555 123 4567"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  País de residencia *
                </label>
                <select
                  required
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                >
                  <option value="" className="text-gray-800">Selecciona tu país</option>
                  <option value="venezuela" className="text-gray-800">Venezuela</option>
                  <option value="colombia" className="text-gray-800">Colombia</option>
                  <option value="peru" className="text-gray-800">Perú</option>
                  <option value="argentina" className="text-gray-800">Argentina</option>
                  <option value="chile" className="text-gray-800">Chile</option>
                  <option value="ecuador" className="text-gray-800">Ecuador</option>
                  <option value="mexico" className="text-gray-800">México</option>
                  <option value="rd" className="text-gray-800">República Dominicana</option>
                  <option value="espana" className="text-gray-800">España</option>
                  <option value="otros" className="text-gray-800">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  ¿Tienes diagnóstico de TEA? *
                </label>
                <select
                  required
                  value={formData.hijo}
                  onChange={(e) => setFormData({ ...formData, hijo: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                >
                  <option value="" className="text-gray-800">Selecciona una opción</option>
                  <option value="hijo" className="text-gray-800">Sí, mi hijo/a tiene diagnóstico</option>
                  <option value="familiar" className="text-gray-800">Sí, un familiar tiene diagnóstico</option>
                  <option value="evaluacion" className="text-gray-800">Estamos en proceso de evaluación</option>
                  <option value="profesional" className="text-gray-800">Soy profesional del área</option>
                  <option value="otro" className="text-gray-800">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-200 mb-2">
                  Principal interés *
                </label>
                <select
                  required
                  value={formData.interes}
                  onChange={(e) => setFormData({ ...formData, interes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-aqua-400 focus:ring-2 focus:ring-aqua-500/30 outline-none transition-all"
                >
                  <option value="" className="text-gray-800">Selecciona tu interés</option>
                  <option value="rd" className="text-gray-800">Guía de República Dominicana</option>
                  <option value="aba" className="text-gray-800">Terapia ABA</option>
                  <option value="neuro" className="text-gray-800">Neuropediatría</option>
                  <option value="sensorial" className="text-gray-800">Integración Sensorial</option>
                  <option value="general" className="text-gray-800">Información general</option>
                  <option value="compartir" className="text-gray-800">Compartir mi experiencia</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={enviando}
                className="bg-aqua-500 hover:bg-aqua-600 disabled:bg-aqua-500/50 disabled:cursor-not-allowed text-white font-bold rounded-full px-12 py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-aqua-500/30 active:scale-[0.98] text-lg"
              >
                {enviando ? "Enviando..." : "Unirme a TEAcompaño"}
              </button>
              <p className="text-brand-300 text-xs mt-4">
                Tus datos están seguros. No compartiremos tu información sin tu consentimiento.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
