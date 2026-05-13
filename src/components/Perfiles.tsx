"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Perfil = {
  id: number;
  nombre: string;
  email: string;
  bio: string;
  avatar_color: string;
  created_at: string;
};

const colores = ["brand", "aqua", "warm"];

export default function Perfiles() {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [miEmail, setMiEmail] = useState<string>("");
  const [editando, setEditando] = useState(false);
  const [bio, setBio] = useState("");

  useEffect(() => {
    cargarPerfiles();
    const saved = localStorage.getItem("tea_perfil_email");
    if (saved) setMiEmail(saved);
  }, []);

  const cargarPerfiles = async () => {
    const { data } = await getSupabase()
      .from("perfiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPerfiles(data);
  };

  const miPerfil = perfiles.find((p) => p.email === miEmail);

  const guardarBio = async () => {
    if (!miPerfil) return;
    await getSupabase()
      .from("perfiles")
      .update({ bio: bio.trim() })
      .eq("id", miPerfil.id);
    setEditando(false);
    cargarPerfiles();
  };

  const avatarColor = (color: string) => {
    const map: Record<string, string> = {
      brand: "from-brand-400 to-brand-600",
      aqua: "from-aqua-400 to-aqua-600",
      warm: "from-warm-400 to-warm-600",
    };
    return map[color] || "from-brand-400 to-brand-600";
  };

  return (
    <section id="perfiles" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Familias en TEAcompaño
          </div>
          <h2 className="section-title">Conocé las familias</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Cada persona que comparte su historia forma parte de esta red.
          </p>
        </div>

        {miPerfil && (
          <div className="max-w-lg mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-aqua-50 border border-brand-100 reveal">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColor(miPerfil.avatar_color)} flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0`}>
                {miPerfil.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-900 text-lg">{miPerfil.nombre}</h3>
                <p className="text-sm text-gray-500">{miPerfil.email}</p>
                {!editando ? (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-600">{miPerfil.bio || "Sin biografía aún"}</p>
                    <button onClick={() => { setEditando(true); setBio(miPerfil.bio); }}
                      className="text-xs text-aqua-600 hover:text-aqua-700 font-medium flex-shrink-0">Editar</button>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2}
                      placeholder="Contá algo sobre vos y tu familia..."
                      className="input-field text-xs !py-1.5 resize-none" />
                    <div className="flex gap-2">
                      <button onClick={guardarBio} className="btn-primary text-xs !py-1 !px-4" disabled={!bio.trim()}>Guardar</button>
                      <button onClick={() => setEditando(false)} className="btn-secondary text-xs !py-1 !px-4">Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brand-200/50 flex gap-6 text-sm text-gray-600">
              <div><span className="font-bold text-brand-700">Miembro</span><br />{new Date(miPerfil.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</div>
            </div>
          </div>
        )}

        {/* Grid de perfiles */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {perfiles.slice(0, 12).map((p) => {
            const color = colores[p.id % colores.length];
            return (
              <div key={p.id} className="card text-center reveal">
                <div className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${avatarColor(color)} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                  {p.nombre.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-bold text-brand-900 text-sm truncate">{p.nombre}</h4>
                {p.bio && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.bio}</p>}
                <p className="text-[11px] text-gray-400 mt-2">
                  {new Date(p.created_at).toLocaleDateString("es-ES", { month: "short", year: "numeric" })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
