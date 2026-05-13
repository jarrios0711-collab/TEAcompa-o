import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-aqua-400 flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <div>
                <span className="text-xl font-bold text-white">TEA</span>
                <span className="text-xl font-semibold text-aqua-400">compaño</span>
              </div>
            </Link>
            <p className="text-brand-300 max-w-md leading-relaxed mb-6">
              Una red de apoyo para familias con autismo. Compartimos
              experiencias, rutas de tratamiento y recursos para que nadie
              camine solo en este viaje.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              {["facebook", "instagram", "youtube", "whatsapp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-aqua-500/20 flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social}
                >
                  <svg className="w-5 h-5 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">Navegación</h4>
            <ul className="space-y-3">
              {[
                { label: "Inicio", href: "#hero" },
                { label: "Rutas", href: "#rutas" },
                { label: "Comunidad", href: "#comunidad" },
                { label: "Recursos", href: "#buscador" },
                { label: "Tips de viaje", href: "#recursos-utiles" },
                { label: "Mapa", href: "#mapa" },
                { label: "Únete", href: "#formulario" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-300 hover:text-aqua-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-brand-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-aqua-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hola@teacompano.com
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-aqua-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Comunidad virtual
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 text-center text-sm text-brand-400">
          <p>&copy; {currentYear} TEAcompaño. Todos los derechos reservados.</p>
          <p className="mt-1 text-brand-500">
            Hecho con amor para cada familia que camina esta ruta.
          </p>
        </div>
      </div>
    </footer>
  );
}
