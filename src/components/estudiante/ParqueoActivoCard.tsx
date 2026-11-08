import Link from "next/link";
import type { Pago } from "@/types/api";
import { formatDuracion, formatHora, minutosEntre } from "@/lib/format";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";
import { nombrePuesto } from "@/modules/parqueaderos/zonas";

// Tarjeta "estás parqueado": aparece cuando el estudiante tiene una factura abierta.
export function ParqueoActivoCard({ pago }: { pago: Pago }) {
  return (
    <div className="space-y-4 rounded-[18px] bg-jave-card p-5 shadow-[0_4px_14px_0_rgba(20,44,110,0.07)]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-jave-navy">Estás parqueado</p>
        <StatusPill tone="amber">Adentro</StatusPill>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-jave-red text-2xl font-bold text-white">{pago.parqueaderoId}</span>
        <div className="space-y-1">
          <Placa placa={pago.placa} />
          <p className="text-sm font-semibold text-jave-navy">{nombrePuesto(pago.parqueaderoId)}</p>
          <p className="text-xs text-jave-gray">Desde {formatHora(pago.horaEntrada)} · {formatDuracion(minutosEntre(pago.horaEntrada, null))}</p>
        </div>
      </div>
      <Link href="/pago" className={`${btn.primary} w-full`}>Ver cuánto llevo y pagar</Link>
    </div>
  );
}
