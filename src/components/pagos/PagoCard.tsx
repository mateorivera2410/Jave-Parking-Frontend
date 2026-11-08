import Link from "next/link";
import type { Pago } from "@/types/api";
import { formatHora, formatPesos } from "@/lib/format";
import { EntityCard } from "@/components/ui/EntityCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";

// Una factura. Si el carro sigue adentro lleva a pagar la salida; si ya pagó, deja verla o eliminarla.
export function PagoCard({ pago, onDelete }: { pago: Pago; onDelete: (pago: Pago) => void }) {
  const adentro = pago.horaSalida === null;
  return (
    <EntityCard>
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-jave-navy">Factura #{pago.id}</span>
        {adentro ? <StatusPill tone="amber">Adentro</StatusPill> : <StatusPill tone="green">Pagado</StatusPill>}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Placa placa={pago.placa} />
        <span className="text-sm text-jave-gray">Puesto {pago.parqueaderoId}</span>
      </div>
      <div className="mt-4 space-y-2">
        <InfoRow label="Entrada">{formatHora(pago.horaEntrada)}</InfoRow>
        <InfoRow label="Salida">{formatHora(pago.horaSalida)}</InfoRow>
      </div>
      {!adentro && (
        <div className="mt-3 flex items-center justify-between rounded-[14px] bg-jave-navy px-4 py-3">
          <span className="text-sm font-medium text-white">Total pagado</span>
          <span className="text-lg font-bold text-jave-yellow">{formatPesos(pago.total)}</span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {adentro ? (
          <Link href={`/pagos/${pago.id}`} className={`${btn.primary} col-span-2`}>Pagar y registrar salida</Link>
        ) : (
          <>
            <Link href={`/pagos/${pago.id}`} className={btn.dark}>Ver factura</Link>
            <button onClick={() => onDelete(pago)} className={btn.danger}>Eliminar</button>
          </>
        )}
      </div>
    </EntityCard>
  );
}
