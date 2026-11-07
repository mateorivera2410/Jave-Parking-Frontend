import Link from "next/link";
import type { Parqueadero } from "@/types/api";
import { formatPesos } from "@/lib/format";
import { EntityCard } from "@/components/ui/EntityCard";

// isActive del puesto: true = ocupado, false = libre (lo cambia el backend en la entrada/salida)
export function ParqueaderoCard({ parqueadero, onDelete }: {
  parqueadero: Parqueadero;
  onDelete: (parqueadero: Parqueadero) => void;
}) {
  return (
    <EntityCard accent={parqueadero.isActive ? "slate" : "emerald"}>
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-lg">{parqueadero.id}</div>
        {parqueadero.isActive
          ? <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Ocupado</span>
          : <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Libre</span>}
      </div>
      <div className="mt-3">
        <div className="font-semibold leading-tight">Puesto {parqueadero.id}</div>
        <div className="text-sm text-slate-500">{formatPesos(parqueadero.tarifa)} / hora</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/parqueaderos/${parqueadero.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black transition">Ver detalle</Link>
        <button onClick={() => onDelete(parqueadero)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-100 transition">Eliminar</button>
      </div>
    </EntityCard>
  );
}