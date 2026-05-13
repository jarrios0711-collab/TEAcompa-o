import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xhnlqfmogflnrbjluujc.supabase.co";
const supabaseKey = "sb_publishable_x3v1lgeIPFt9CNmu3TWILQ_OOTP_6PK";

const supabase = createClient(supabaseUrl, supabaseKey);

const recursos = [
  // ============ REPUBLICA DOMINICANA ============
  // --- Terapia ABA ---
  {
    titulo: "Centros de Terapia ABA en Santo Domingo",
    tipo: "Directorio",
    terapia: "Terapia ABA",
    pais: "República Dominicana",
    descripcion: "Listado de centros certificados en terapia ABA en Santo Domingo. Incluye costos aproximados, horarios y requisitos de inscripción. Verificado por familias de la comunidad.",
  },
  {
    titulo: "Guía para iniciar Terapia ABA en RD",
    tipo: "Guía",
    terapia: "Terapia ABA",
    pais: "República Dominicana",
    descripcion: "Todo lo que necesitas saber para comenzar terapia ABA en República Dominicana: documentación, costos mensuales, frecuencia de sesiones y cómo elegir el terapeuta adecuado.",
  },
  {
    titulo: "Recomendaciones de terapeutas ABA en Santiago",
    tipo: "Recomendación",
    terapia: "Terapia ABA",
    pais: "República Dominicana",
    descripcion: "Experiencias de familias con terapeutas ABA en Santiago de los Caballeros. Recomendaciones basadas en resultados y trato con los niños.",
  },
  // --- Neuropediatría ---
  {
    titulo: "Neuropediatras en Santo Domingo",
    tipo: "Directorio",
    terapia: "Neuropediatría",
    pais: "República Dominicana",
    descripcion: "Directorio de neuropediatras con experiencia en TEA en Santo Domingo. Incluye tiempos de espera, costos de consulta y referencias de otras familias.",
  },
  {
    titulo: "Guía de primera consulta neuropediátrica",
    tipo: "Guía",
    terapia: "Neuropediatría",
    pais: "República Dominicana",
    descripcion: "Preparación para la primera consulta con un neuropediatra: qué documentos llevar, preguntas clave, estudios previos recomendados y qué esperar del diagnóstico.",
  },
  // --- Integración Sensorial ---
  {
    titulo: "Centros de Integración Sensorial en RD",
    tipo: "Directorio",
    terapia: "Integración Sensorial",
    pais: "República Dominicana",
    descripcion: "Centros especializados en terapia de integración sensorial en República Dominicana. Información sobre equipos, sesiones y costos.",
  },

  // ============ ARGENTINA ============
  // --- Terapia ABA ---
  {
    titulo: "Centros ABA en Buenos Aires",
    tipo: "Directorio",
    terapia: "Terapia ABA",
    pais: "Argentina",
    descripcion: "Centros de terapia ABA en CABA y Gran Buenos Aires. Incluye valores de referencia, cantidad de horas semanales y programas de obra social.",
  },
  {
    titulo: "Cómo acceder a terapia ABA por obra social en Argentina",
    tipo: "Guía",
    terapia: "Terapia ABA",
    pais: "Argentina",
    descripcion: "Guía paso a paso para gestionar terapia ABA a través de obras sociales y prepagas en Argentina. Leyes que amparan a las familias con TEA.",
  },
  // --- Neuropediatría ---
  {
    titulo: "Neuropediatras en Córdoba",
    tipo: "Directorio",
    terapia: "Neuropediatría",
    pais: "Argentina",
    descripcion: "Directorio de especialistas en neurología infantil en Córdoba, Argentina. Incluye consultorios, hospitales públicos y privados.",
  },
  {
    titulo: "Hospitales públicos con atención neuropediátrica en Argentina",
    tipo: "Guía",
    terapia: "Neuropediatría",
    pais: "Argentina",
    descripcion: "Lista de hospitales públicos argentinos con servicios de neurología infantil. Incluye tiempos de espera y cómo solicitar turnos.",
  },
  // --- Integración Sensorial ---
  {
    titulo: "Centros de Integración Sensorial en Buenos Aires",
    tipo: "Directorio",
    terapia: "Integración Sensorial",
    pais: "Argentina",
    descripcion: "Centros especializados en integración sensorial en CABA. Incluye experiencias de familias y costos aproximados por sesión.",
  },
  {
    titulo: "Terapia del Lenguaje en Argentina",
    tipo: "Directorio",
    terapia: "Terapia del Lenguaje",
    pais: "Argentina",
    descripcion: "Fonoaudiólogos especializados en TEA en Argentina. Directorio por provincia con datos de contacto y modalidades de atención.",
  },

  // ============ PERU ============
  {
    titulo: "Centros de Terapia ABA en Lima",
    tipo: "Directorio",
    terapia: "Terapia ABA",
    pais: "Perú",
    descripcion: "Centros de terapia ABA en Lima Metropolitana. Incluye costos, horarios y requisitos de admisión.",
  },
  {
    titulo: "Neuropediatras en Lima para TEA",
    tipo: "Directorio",
    terapia: "Neuropediatría",
    pais: "Perú",
    descripcion: "Neuropediatras con experiencia en autismo en Lima. Consultorios y clínicas con atención especializada.",
  },
  {
    titulo: "Guía de tratamientos para TEA en Perú",
    tipo: "Guía",
    terapia: "General",
    pais: "Perú",
    descripcion: "Resumen de opciones de tratamiento para TEA disponibles en Perú: terapias, consultas y programas de apoyo estatal.",
  },

  // ============ GENERAL ============
  {
    titulo: "Requisitos de viaje para tratamientos médicos",
    tipo: "Guía",
    terapia: "General",
    pais: "General",
    descripcion: "Documentación necesaria, seguros de viaje y preparativos para viajar al exterior con un niño con autismo. Checklist para no olvidar nada.",
  },
  {
    titulo: "Alojamiento para familias en tratamiento",
    tipo: "Guía",
    terapia: "General",
    pais: "General",
    descripcion: "Tips para encontrar alojamiento adecuado cerca de centros de tratamiento: zonas tranquilas, accesibilidad, cocina propia y reseñas de otras familias.",
  },
  {
    titulo: "Preparación emocional para viajar con un hijo con TEA",
    tipo: "Recomendación",
    terapia: "General",
    pais: "General",
    descripcion: "Consejos de familias que ya viajaron: cómo preparar al niño para el viaje, maleta sensorial, rutinas en el destino y manejo de la ansiedad.",
  },
  {
    titulo: "Documentación y visados para tratamientos médicos",
    tipo: "Guía",
    terapia: "General",
    pais: "General",
    descripcion: "Información sobre requisitos migratorios para viajar por tratamientos médicos en Latinoamérica. Tipos de visa, cartas de invitación y seguros.",
  },
];

async function main() {
  // Primero limpiar recursos existentes
  const { error: delError } = await supabase.from("recursos").delete().neq("id", 0);
  if (delError) console.error("Error limpiando:", delError.message);
  else console.log("Recursos anteriores eliminados");

  // Insertar nuevos
  const { data, error } = await supabase.from("recursos").insert(recursos).select();
  if (error) {
    console.error("Error insertando:", error.message);
    return;
  }
  console.log(`${data.length} recursos insertados correctamente`);
  for (const r of data) {
    console.log(`  - [${r.tipo}] ${r.titulo} (${r.pais})`);
  }
}

main();
