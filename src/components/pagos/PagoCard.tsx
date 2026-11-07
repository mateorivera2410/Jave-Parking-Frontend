import Link from "next/link";
import type { Pago } from "@/types/api";
import { formatHora, formatPesos } from "@/lib/format";
import { EntityCard } from "@/components/ui/EntityCard";

// Una factura. Si el carro sigue adentro muestra "Registrar salida"; si ya pagó, deja eliminarla.
export function PagoCard({ pago, onSalida, onDelete }: {
  pago: Pago;
  onSalida: (pago: Pago) => void;
  onDelete: (pago: Pago) => void;
}) {
  const adentro = pago.horaSalida === null;
  return (
    <EntityCard accent={adentro ? "slate" : "emerald"}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold">Factura #{pago.id}</span>
        {adentro
          ? <span className="text-xs px-3 py-1 rounded-full font-bold border bg-amber-50 text-amber-700 border-amber-200">ADENTRO</span>
          : <span className="text-xs px-3 py-1 rounded-full font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">PAGADO</span>}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Link href={`/carros/${pago.placa}`} className="px-3 py-1 rounded-lg bg-yellow-300 border-2 border-slate-900 font-mono font-bold hover:bg-yellow-200">{pago.placa}</Link>
        <Link href={`/parqueaderos/${pago.parqueaderoId}`} className="text-sm text-slate-600 hover:text-slate-900">Puesto {pago.parqueaderoId}</Link>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div><dt className="text-xs text-slate-500">Entrada</dt><dd>{formatHora(pago.horaEntrada)}</dd></div>
        <div><dt className="text-xs text-slate-500">Salida</dt><dd>{formatHora(pago.horaSalida)}</dd></div>
        <div><dt className="text-xs text-slate-500">Total</dt><dd className="font-bold">{formatPesos(pago.total)}</dd></div>
      </dl>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/pagos/${pago.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black">Ver detalle</Link>
        {adentro
          ? <button onClick={() => onSalida(pago)} className="py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">Registrar salida</button>
          : <button onClick={() => onDelete(pago)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-50">Eliminar</button>}
      </div>
    </EntityCard>
  );
}