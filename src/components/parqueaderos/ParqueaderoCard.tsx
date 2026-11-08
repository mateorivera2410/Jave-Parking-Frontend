import Link from "next/link";
import type { Parqueadero } from "@/types/api";
import { formatPesos } from "@/lib/format";

// Un puesto del mapa ("05 - Selección de Cupo" del Figma): verde = libre, rojo = ocupado.
// isActive del puesto: true = ocupado (lo cambia el backend en la entrada/salida).
export function ParqueaderoCard({ parqueadero }: { parqueadero: Parqueadero }) {
  return (
    <Link href={`/parqueaderos/${parqueadero.id}`}
      className={`flex h-[79px] flex-col items-center justify-center rounded-lg text-white transition hover:-translate-y-0.5 hover:brightness-105 ${parqueadero.isActive ? "bg-jave-red" : "bg-jave-green"}`}>
      <span className="text-lg font-bold leading-none">{parqueadero.id}</span>
      <span className="mt-1 text-[11px] text-white/85">{formatPesos(parqueadero.tarifa)}/h</span>
    </Link>
  );
}
