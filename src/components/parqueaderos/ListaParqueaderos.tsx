import type { Parqueadero } from "@/types/api";
import { ZONAS, puestosDeZona } from "@/modules/parqueaderos/zonas";
import { DisponibilidadCard } from "./DisponibilidadCard";

// Las 3 tarjetas de parqueaderos con sus cupos libres. hrefBase: a dónde lleva cada tarjeta.
export function ListaParqueaderos({ puestos, hrefBase }: { puestos: Parqueadero[]; hrefBase?: string }) {
  return (
    <div className="space-y-3">
      {ZONAS.map(zona => {
        const deZona = puestosDeZona(puestos, zona);
        return (
          <DisponibilidadCard key={zona.slug} letra={zona.letra} nombre={zona.nombre}
            libres={deZona.filter(p => !p.isActive).length} total={deZona.length}
            href={hrefBase ? `${hrefBase}/${zona.slug}` : undefined} />
        );
      })}
    </div>
  );
}
