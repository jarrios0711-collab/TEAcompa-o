import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Retorna la instancia de Supabase.
 * Se inicializa bajo-demanda (lazy) para evitar errores durante
 * el build de Next.js cuando no hay variables de entorno presentes.
 *
 * En Vercel: las variables NEXT_PUBLIC_* se inyectan automáticamente.
 * En local: créate un archivo .env.local con los valores.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copia .env.example como .env.local y completa los datos de tu proyecto Supabase."
    );
  }

  client = createClient(url, key);
  return client;
}
