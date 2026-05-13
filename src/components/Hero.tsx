import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-100/60 via-aqua-50/30 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-aqua-100/60 via-brand-50/30 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-50/30 to-aqua-50/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-50 border border-aqua-200 text-aqua-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Comunidad de apoyo y esperanza
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-900 leading-tight">
              Nadie camina solo en{" "}
              <span className="bg-gradient-to-r from-brand-500 to-aqua-500 bg-clip-text text-transparent">
                este viaje
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              <strong className="text-brand-700">TEAcompaño</strong> nace de la
              convicción de que compartir experiencias, tratamientos y recursos
              transforma el camino del autismo. No importa dónde estés o qué
              necesites — aquí encontrarás una mano amiga, información real y
              una comunidad que entiende.
            </p>

            <p className="text-base text-gray-500 leading-relaxed max-w-xl">
              Sabemos que buscar tratamientos en el extranjero puede ser abrumador.
              Por eso creamos este espacio: para que cada familia pueda acceder a
              experiencias verificadas, guías paso a paso y el respaldo de quienes
              ya recorrieron este camino. Porque cuando compartimos lo que sabemos,
              todos avanzamos más fuerte.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="#rutas" className="btn-primary">
                Explorar Rutas
              </Link>
              <Link href="#formulario" className="btn-secondary">
                Unirme a la Comunidad
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-brand-700">
                  +<span className="animate-count-up">150</span>
                </p>
                <p className="text-sm text-gray-500">Familias unidas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-aqua-600">+12</p>
                <p className="text-sm text-gray-500">Rutas documentadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-700">+45</p>
                <p className="text-sm text-gray-500">Recursos disponibles</p>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hidden lg:flex justify-center items-center animate-float">
            <div className="relative w-96 h-96">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-100/50 to-aqua-100/50 animate-pulse" style={{ animationDuration: "4s" }} />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-200/40 to-aqua-200/40" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-brand-400 to-aqua-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      T
                    </div>
                    <p className="text-brand-900 font-bold text-lg">TEAcompaño</p>
                    <p className="text-aqua-600 text-sm font-medium">Juntos en el camino</p>
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 rounded-full bg-brand-400 shadow-lg" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 rounded-full bg-aqua-400 shadow-lg" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 rounded-full bg-brand-300 shadow-lg" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-3 rounded-full bg-aqua-300 shadow-lg" />

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 384">
                <line x1="192" y1="10" x2="192" y2="100" stroke="#93d2fa" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="192" y1="284" x2="192" y2="374" stroke="#5eebcc" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="10" y1="192" x2="100" y2="192" stroke="#93d2fa" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="284" y1="192" x2="374" y2="192" stroke="#5eebcc" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
