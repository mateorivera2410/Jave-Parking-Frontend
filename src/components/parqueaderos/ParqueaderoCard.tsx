import Link from "next/link";
import type { Parqueadero } from "@/types/api";
import { formatPesos } from "@/lib/format";

// Un puesto del mapa ("05 - Selección de Cupo" del Figma): verde = libre, rojo = ocupado.
// isActive del puesto: true = ocupado (lo cambia el backend en la entrada/salida).
// - Con href (admin): es un enlace al detalle del puesto.
// - Con onSelect (estudiante): es un botón para escoger el puesto; los ocupados no se pueden escoger.
export function ParqueaderoCard({ parqueadero, href, onSelect, selected = false, mio = false }: {
  parqueadero: Parqueadero;
  href?: string;
  onSelect?: (parqueadero: Parqueadero) => void;
  selected?: boolean; // el estudiante lo escogió
  mio?: boolean; // ahí está parqueado el estudiante
}) {
  const ocupado = parqueadero.isActive;
  const className = `relative flex h-[79px] w-full flex-col items-center justify-center rounded-lg text-white transition ${ocupado ? "bg-jave-red" : "bg-jave-green"} ${selected || mio ? "ring-4 ring-jave-yellow ring-offset-2 ring-offset-jave-pavement" : ""}`;
  const contenido = (
    <>
      {mio && <span className="absolute -top-2 rounded-full bg-jave-yellow px-2 py-0.5 text-[10px] font-bold text-jave-navy">TÚ</span>}
      <span className="text-lg font-bold leading-none">{parqueadero.id}</span>
      <span className="mt-1 text-[11px] text-white/85">{formatPesos(parqueadero.tarifa)}/h</span>
    </>
  );

  if (href) return <Link href={href} className={`${className} hover:-translate-y-0.5 hover:brightness-105`}>{contenido}</Link>;
  return (
    <button type="button" disabled={ocupado || !onSelect} onClick={() => onSelect?.(parqueadero)}
      className={`${className} enabled:hover:-translate-y-0.5 enabled:hover:brightness-105 disabled:cursor-not-allowed`}>
      {contenido}
    </button>
  );
}
