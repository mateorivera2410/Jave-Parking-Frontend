import Link from "next/link";
import type { Pago } from "@/types/api";
import { formatDuracion, formatHora, formatPesos, minutosEntre } from "@/lib/format";
import { InfoRow, SectionLabel } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { btnLg } from "@/components/ui/buttons";

// Contenido de "06 - Pago" del Figma: factura abierta (el carro sigue adentro).
// Lo usan la pantalla Pago del estudiante y el detalle de factura del admin.
export function PagoAbierto({ pago, tarifa, puestoHref, pagando, onPagar }: {
  pago: Pago;
  tarifa: number | null; // tarifa por hora del puesto
  puestoHref?: string;
  pagando: boolean;
  onPagar: () => void;
}) {
  const minutos = minutosEntre(pago.horaEntrada, null);
  // Misma fórmula del backend, solo para mostrar cuánto va (el total real lo calcula el backend)
  const estimado = tarifa === null ? null : Math.round((minutos * tarifa) / 60);

  return (
    <>
      <SectionLabel>Datos del vehículo</SectionLabel>
      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px]">
        <InfoRow label="Placa"><Placa placa={pago.placa} /></InfoRow>
        <InfoRow label="Puesto">{puestoHref ? <Link href={puestoHref} className="hover:underline">{pago.parqueaderoId}</Link> : pago.parqueaderoId}</InfoRow>
      </div>

      <SectionLabel>Tiempo estacionado</SectionLabel>
      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px]">
        <InfoRow label="Entrada">{formatHora(pago.horaEntrada)}</InfoRow>
        <InfoRow label="Salida">—</InfoRow>
        <InfoRow label="Tiempo hasta ahora"><span className="text-base font-bold">{formatDuracion(minutos)}</span></InfoRow>
      </div>

      <div className="flex items-center gap-4 rounded-[18px] bg-jave-navy p-[18px]">
        <div className="flex-1">
          <p className="font-medium text-white">Total hasta ahora</p>
          <p className="text-xs text-jave-yellow">Tarifa fija: {formatPesos(tarifa)}/hora · se cobra por minuto</p>
        </div>
        <p className="text-2xl font-bold text-jave-yellow">{formatPesos(estimado)}</p>
      </div>

      <button onClick={onPagar} disabled={pagando} className={`${btnLg.primary} w-full`}>
        {pagando ? "Procesando..." : `Pagar ${formatPesos(estimado)} y salir`}
      </button>
    </>
  );
}
