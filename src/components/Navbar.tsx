"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

type Notificacion = {
  id: number;
  de_nombre: string;
  mensaje: string;
  created_at: string;
};

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Nuestras Rutas", href: "#rutas" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Recursos", href: "#buscador" },
  { label: "Únete", href: "#formulario" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notis, setNotis] = useState<Notificacion[]>([]);
  const [notiOpen, setNotiOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cargarNotificaciones();
    const interval = setInterval(cargarNotificaciones, 15000); // cada 15s
    return () => clearInterval(interval);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setNotiOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cargarNotificaciones = async () => {
    const { data, error } = await getSupabase()
      .from("notificaciones")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (!error && data) setNotis(data);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-aqua-400 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all">
              T
            </div>
            <div>
              <span className="text-xl font-bold text-brand-900">TEA</span>
              <span className="text-xl font-semibold text-aqua-600">compaño</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-600 hover:text-brand-700 rounded-full hover:bg-brand-50 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Notificaciones */}
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                onClick={() => setNotiOpen(!notiOpen)}
                className="relative p-2 rounded-full hover:bg-brand-50 transition-colors"
                aria-label="Notificaciones"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notis.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {notis.length > 9 ? "9+" : notis.length}
                  </span>
                )}
              </button>

              {notiOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-brand-900">Notificaciones</p>
                  </div>
                  {notis.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">
                      No hay notificaciones aún
                    </div>
                  ) : (
                    <div className="max-h-72 overflow-y-auto">
                      {notis.map((n) => (
                        <div key={n.id} className="p-3 border-b border-gray-50 hover:bg-brand-50 transition-colors">
                          <p className="text-xs font-semibold text-brand-800">{n.de_nombre}</p>
                          <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.mensaje}</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {new Date(n.created_at).toLocaleDateString("es-ES", {
                              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="#formulario" className="ml-2 btn-primary text-sm !py-2 !px-6">
              Unirme
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-gray-600 hover:text-brand-700 rounded-xl hover:bg-brand-50 transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#formulario"
              onClick={() => setMobileOpen(false)}
              className="block text-center btn-primary text-sm !py-2.5 mt-2"
            >
              Unirme a la comunidad
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
