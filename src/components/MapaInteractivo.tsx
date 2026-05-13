"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSupabase } from "@/lib/supabase";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

type Recurso = {
  id: number;
  titulo: string;
  tipo: string;
  terapia: string;
  pais: string;
  descripcion: string;
};

const coords: Record<string, [number, number]> = {
  "República Dominicana": [18.7357, -70.1627],
  "Argentina": [-34.6037, -58.3816],
  "Perú": [-12.0464, -77.0428],
  "General": [0, 0],
};

export default function MapaInteractivo() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      // Fix Leaflet default icon
      const L = await import("leaflet");
      // @ts-expect-error - needed for Leaflet default icon fix
      delete (L.Icon.Default.prototype)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const { data } = await getSupabase()
        .from("recursos")
        .select("*")
        .neq("pais", "General");
      if (data) setRecursos(data);
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Cargando mapa...</p>
        </div>
      </section>
    );
  }

  const paisesMap = new Map<string, { recursos: Recurso[]; total: number }>();
  recursos.forEach((r) => {
    if (!paisesMap.has(r.pais)) paisesMap.set(r.pais, { recursos: [], total: 0 });
    paisesMap.get(r.pais)!.recursos.push(r);
    paisesMap.get(r.pais)!.total++;
  });

  return (
    <section id="mapa" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mapa de experiencias
          </div>
          <h2 className="section-title">Explorá países con recursos</h2>
          <p className="section-subtitle reveal reveal-delay-1">
            Hacé clic en cada marcador para ver qué recursos y experiencias hay disponibles en cada país.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 reveal">
            <MapContainer center={[10, -60]} zoom={3} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {Array.from(paisesMap.entries()).map(([pais, data]) => {
                const pos = coords[pais];
                if (!pos) return null;
                const tipos = Array.from(new Set(data.recursos.map((r) => r.tipo)));
                return (
                  <Marker key={pais} position={pos}>
                    <Popup>
                      <div className="min-w-[200px]">
                        <h3 className="font-bold text-brand-900 text-sm mb-1">{pais}</h3>
                        <p className="text-xs text-gray-500 mb-2">{data.total} recursos disponibles</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {tipos.map((t) => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{t}</span>
                          ))}
                        </div>
                        <ul className="space-y-1">
                          {data.recursos.slice(0, 3).map((r) => (
                            <li key={r.id} className="text-[11px] text-gray-600">{r.titulo}</li>
                          ))}
                          {data.recursos.length > 3 && (
                            <li className="text-[11px] text-aqua-600 font-medium">+{data.recursos.length - 3} más</li>
                          )}
                        </ul>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Mapa interactivo con OpenStreetMap. Las ubicaciones son referenciales.
          </p>
        </div>
      </div>
    </section>
  );
}
