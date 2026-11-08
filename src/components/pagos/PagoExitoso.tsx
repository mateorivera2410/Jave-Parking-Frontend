import Link from "next/link";
import type { Pago } from "@/types/api";
import { formatDuracion, formatHora, formatPesos, minutosEntre } from "@/lib/format";
import { InfoRow } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { btnLg } from "@/components/ui/buttons";

// "07 - Pago exitoso" del Figma: factura ya pagada.
export function PagoExitoso({ pago, backHref, backLabel }: { pago: Pago; backHref: string; backLabel: string }) {
  return (
    <div className="mx-auto max-w-md space-y-5 py-4 text-center">
      <span className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-jave-green text-6xl font-bold text-white">✓</span>
      <h1 className="text-2xl font-bold text-jave-navy">¡Pago exitoso!</h1>
      <p className="text-jave-gray">El pago de la factura #{pago.id} quedó registrado. Ya puedes salir del parqueadero.</p>
      <div className="rounded-[18px] bg-jave-card p-5">
        <p className="text-sm text-jave-gray">Total pagado</p>
        <p className="text-3xl font-bold tracking-[1px] text-jave-navy">{formatPesos(pago.total)}</p>
      </div>
      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px] text-left">
        <InfoRow label="Placa"><Placa placa={pago.placa} /></InfoRow>
        <InfoRow label="Puesto">{pago.parqueaderoId}</InfoRow>
        <InfoRow label="Entrada">{formatHora(pago.horaEntrada)}</InfoRow>
        <InfoRow label="Salida">{formatHora(pago.horaSalida)}</InfoRow>
        <InfoRow label="Tiempo total">{formatDuracion(minutosEntre(pago.horaEntrada, pago.horaSalida))}</InfoRow>
      </div>
      <Link href={backHref} className={`${btnLg.dark} w-full`}>{backLabel}</Link>
    </div>
  );
}
