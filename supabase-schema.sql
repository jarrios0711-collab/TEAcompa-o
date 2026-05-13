-- ============================================================
-- TEAcompaño - Esquema de Base de Datos (Supabase)
-- Pega esto en el SQL Editor de tu panel de Supabase
-- ============================================================

-- 1. TABLA: testimonios
-- Guarda las experiencias compartidas por la comunidad
CREATE TABLE IF NOT EXISTS testimonios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre TEXT NOT NULL,
  historia TEXT NOT NULL,
  pais TEXT DEFAULT '',
  rating SMALLINT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  terapia TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: consejos
-- Tips y recomendaciones rápidas de la comunidad
CREATE TABLE IF NOT EXISTS consejos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tipo TEXT NOT NULL DEFAULT 'Consejo',
  autor TEXT NOT NULL,
  contenido TEXT NOT NULL,
  votos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: registros
-- Personas que se unen a la comunidad desde el formulario principal
CREATE TABLE IF NOT EXISTS registros (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT DEFAULT '',
  pais TEXT NOT NULL,
  hijo TEXT NOT NULL,
  interes TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: recursos
-- Recursos del buscador (guías, directorios, recomendaciones)
CREATE TABLE IF NOT EXISTS recursos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  terapia TEXT NOT NULL,
  pais TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  enlace TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: historias_rd
-- Historias de familias que viajaron a Argentina con sus hijos con TEA
CREATE TABLE IF NOT EXISTS historias_rd (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre TEXT NOT NULL,
  desde TEXT DEFAULT '',
  historia TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security)
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;
ALTER TABLE consejos ENABLE ROW LEVEL SECURITY;
ALTER TABLE historias_rd ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE recursos ENABLE ROW LEVEL SECURITY;

-- Permitir lectura anónima de testimonios, consejos y recursos
CREATE POLICY "Lectura pública de testimonios"
  ON testimonios FOR SELECT
  USING (true);

CREATE POLICY "Lectura pública de consejos"
  ON consejos FOR SELECT
  USING (true);

CREATE POLICY "Lectura pública de recursos"
  ON recursos FOR SELECT
  USING (true);

-- Permitir inserción anónima en testimonios, consejos y registros
CREATE POLICY "Inserción anónima en testimonios"
  ON testimonios FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Inserción anónima en consejos"
  ON consejos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Inserción anónima en registros"
  ON registros FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Lectura pública de historias_rd"
  ON historias_rd FOR SELECT
  USING (true);

CREATE POLICY "Inserción anónima en historias_rd"
  ON historias_rd FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- DATOS INICIALES (seed)
-- ============================================================

INSERT INTO testimonios (nombre, historia, pais, rating, terapia) VALUES
  ('María G.', 'Gracias a TEAcompaño encontramos una clínica en Santo Domingo que cambió la vida de mi hijo. Todo el proceso, desde los vuelos hasta las consultas, lo hicimos siguiendo la guía paso a paso. Nunca me sentí sola.', 'Venezuela', 5, 'Terapia ABA'),
  ('Carlos y Ana R.', 'Viajar para un tratamiento siempre asusta, pero leer las experiencias de otras familias nos dio la confianza que necesitábamos. Hoy nuestro hijo tiene avances que nunca imaginamos.', 'Perú', 5, 'Neuropediatría'),
  ('Valentina S.', 'Compartir aquí nuestro proceso no solo ayudó a otras familias, sino que nos dio una red de apoyo inesperada. Todos los consejos que recibimos fueron de oro.', 'Colombia', 5, 'Integración Sensorial');

INSERT INTO consejos (tipo, autor, contenido, votos) VALUES
  ('Consejo', 'Familia López', 'Tips para el primer viaje: llevar una maleta sensorial con los objetos favoritos de tu hijo hace toda la diferencia en el aeropuerto.', 24),
  ('Recomendación', 'Dra. Patricia M.', 'Si buscas terapista en República Dominicana, la Asociación de Terapia Conductual en Santo Domingo tiene excelentes referencias.', 18),
  ('Experiencia', 'Mamá de Emilio', 'Hicimos el tratamiento en Buenos Aires y la atención fue increíble. Si alguien necesita datos de alojamiento cerca de la clínica, escríbanme!', 31);

INSERT INTO recursos (titulo, tipo, terapia, pais, descripcion) VALUES
  ('Guía de Terapia ABA en República Dominicana', 'Guía', 'Terapia ABA', 'República Dominicana', 'Lista completa de centros certificados, costos aproximados y requisitos para iniciar terapia ABA en RD.'),
  ('Neuropediatras en Santo Domingo', 'Directorio', 'Neuropediatría', 'República Dominicana', 'Directorio de especialistas en neurología infantil con experiencia en autismo.'),
  ('Centros de Integración Sensorial - Buenos Aires', 'Directorio', 'Integración Sensorial', 'Argentina', 'Centros especializados en integración sensorial en CABA y Gran Buenos Aires.'),
  ('Requisitos de viaje para tratamientos médicos', 'Guía', 'General', 'General', 'Documentación necesaria, seguros de viaje y preparativos para viajar al exterior con un niño con autismo.');
