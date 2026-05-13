import Link from "next/link";

const rutas = [
  {
    title: "República Dominicana",
    subtitle: "Guía completa de tratamientos",
    image: "/rutas/rd.jpg",
    description:
      "Descubre clínicas, especialistas y centros de terapia en República Dominicana. Una guía paso a paso con costos, tiempos y experiencias de familias que viajaron para recibir atención.",
    tags: ["Terapia ABA", "Neuropediatría", "Integración Sensorial"],
    destacado: true,
  },
  {
    title: "Próximamente: Argentina",
    subtitle: "En investigación",
    image: "/rutas/argentina.jpg",
    description:
      "Estamos documentando centros de excelencia en Buenos Aires y Córdoba. Pronto compartiremos guías detalladas con costos y contactos verificados.",
    tags: ["Próximamente"],
    destacado: false,
  },
  {
    title: "Próximamente: España",
    subtitle: "En investigación",
    image: "/rutas/espana.jpg",
    description:
      "Exploramos opciones en Madrid, Barcelona y Valencia. Si tienes experiencia viajando a España para tratamientos, ¡compártela con la comunidad!",
    tags: ["Próximamente"],
    destacado: false,
  },
];

export default function NuestrasRutas() {
  return (
    <section id="rutas" className="py-20 md:py-28 bg-gradient-to-b from-white to-brand-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Nuestras Rutas
          </div>
          <h2 className="section-title">
            Viajes que transforman vidas
          </h2>
          <p className="section-subtitle">
            Guías detalladas de familias que viajaron por tratamientos.
            Información real, costos actualizados y contactos verificados.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rutas.map((ruta, index) => (
            <article
              key={index}
              className={`card flex flex-col ${ruta.destacado ? "ring-2 ring-aqua-400 shadow-lg shadow-aqua-100" : ""}`}
            >
              {/* Image placeholder */}
              <div className={`relative h-48 rounded-xl mb-5 overflow-hidden ${ruta.destacado ? "bg-gradient-to-br from-brand-400 to-aqua-500" : "bg-gradient-to-br from-gray-200 to-gray-300"}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {ruta.destacado ? (
                    <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {ruta.destacado && (
                  <div className="absolute top-3 left-3 bg-white/90 text-aqua-700 text-xs font-bold px-3 py-1 rounded-full">
                    GUÍA COMPLETA
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-brand-900 mb-1">{ruta.title}</h3>
              <p className="text-sm text-aqua-600 font-medium mb-3">{ruta.subtitle}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                {ruta.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {ruta.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      tag === "Próximamente"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={ruta.destacado ? "#" : "#"}
                className={`text-sm font-semibold flex items-center gap-2 transition-colors ${
                  ruta.destacado
                    ? "text-aqua-600 hover:text-aqua-700"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {ruta.destacado ? "Ver guía completa" : "Próximamente"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
