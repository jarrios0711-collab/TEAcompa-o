"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Nuestras Rutas", href: "#rutas" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Recursos", href: "#buscador" },
  { label: "Únete", href: "#formulario" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <Link
              href="#formulario"
              className="ml-3 btn-primary text-sm !py-2 !px-6"
            >
              Unirme
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
