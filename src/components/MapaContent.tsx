"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getSupabase } from "@/lib/supabase";
import "leaflet/dist/leaflet.css";

type Recurso = {
  id: number;
  titulo: string;
  tipo: string;
  pais: string;
};

const coords: Record<string, [number, number]> = {
  "República Dominicana": [18.7357, -70.1627],
  "Argentina": [-34.6037, -58.3816],
  "Perú": [-12.0464, -77.0428],
};

export default function MapaContent() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      // Fix Leaflet icon paths
      const L = await import("leaflet");
      // @ts-expect-error - fix default icon
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
      <div className="h-[400px] md:h-[500px] rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-100">
        <p className="text-gray-400 text-sm">Cargando mapa...</p>
      </div>
    );
  }

  const paisesMap = new Map<string, Recurso[]>();
  recursos.forEach((r) => {
    if (!paisesMap.has(r.pais)) paisesMap.set(r.pais, []);
    paisesMap.get(r.pais)!.push(r);
  });

  return (
    <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
      <MapContainer center={[10, -60]} zoom={3} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.from(paisesMap.entries()).map(([pais, data]) => {
          const pos = coords[pais];
          if (!pos) return null;
          const tipos = Array.from(new Set(data.map((r) => r.tipo)));
          return (
            <Marker key={pais} position={pos}>
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-brand-900 text-sm mb-1">{pais}</h3>
                  <p className="text-xs text-gray-500 mb-2">{data.length} recursos</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tipos.map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{t}</span>
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {data.slice(0, 3).map((r) => (
                      <li key={r.id} className="text-[11px] text-gray-600">{r.titulo}</li>
                    ))}
                    {data.length > 3 && (
                      <li className="text-[11px] text-aqua-600 font-medium">+{data.length - 3} más</li>
                    )}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
