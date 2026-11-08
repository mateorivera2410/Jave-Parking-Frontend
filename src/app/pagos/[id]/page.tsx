"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatDuracion, formatHora, formatPesos, minutosEntre } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { InfoRow, SectionLabel } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { btn } from "@/components/ui/buttons";

// Factura: "06 - Pago" del Figma mientras el carro está adentro, y "07 - Pago exitoso" cuando ya pagó.
export default function PagoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { entity: pago, loading, error, reload } = useEntityDetail(id, pagosService.getById);
  const [tarifa, setTarifa] = useState<number | null>(null);
  const [pagando, setPagando] = useState(false);

  // La tarifa del puesto, para mostrar cuánto va el cobro mientras el carro está adentro
  useEffect(() => {
    if (pago) parqueaderosService.getById(String(pago.parqueaderoId)).then(p => setTarifa(p.tarifa)).catch(() => setTarifa(null));
  }, [pago]);

  async function pagarSalida() {
    try {
      setPagando(true);
      await pagosService.salida(Number(id)); // PUT /pagos/:id/salida → el backend calcula el total
      await reload(); // vuelve a pedir la factura: ahora ya tiene salida y total
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setPagando(false);
    }
  }

  if (loading && !pago) return <LoadingState label="Cargando factura..." />;
  if (error) return <ErrorState message={error} />;
  if (!pago) return <EmptyState>Factura no encontrada</EmptyState>;

  const minutos = minutosEntre(pago.horaEntrada, pago.horaSalida);

  // ---------- YA PAGÓ: pantalla de pago exitoso ----------
  if (pago.horaSalida) {
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
          <InfoRow label="Tiempo total">{formatDuracion(minutos)}</InfoRow>
        </div>
        <Link href="/pagos" className={`${btn.dark} w-full py-4`}>Volver a pagos</Link>
      </div>
    );
  }

  // ---------- SIGUE ADENTRO: pantalla de pago ----------
  // Misma fórmula del backend, solo para mostrar cuánto va (el total real lo calcula el backend)
  const estimado = tarifa === null ? null : Math.round((minutos * tarifa) / 60);

  return (
    <EntityDetailLayout backHref="/pagos" backLabel="pagos" title="Pago" description={`Factura #${pago.id} · el carro sigue adentro`}>
      <SectionLabel>Datos del vehículo</SectionLabel>
      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px]">
        <InfoRow label="Placa"><Placa placa={pago.placa} /></InfoRow>
        <InfoRow label="Puesto"><Link href={`/parqueaderos/${pago.parqueaderoId}`} className="hover:underline">{pago.parqueaderoId}</Link></InfoRow>
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
          <p className="text-xs text-jave-yellow">Tarifa: {formatPesos(tarifa)}/hora · se cobra por minuto</p>
        </div>
        <p className="text-2xl font-bold text-jave-yellow">{formatPesos(estimado)}</p>
      </div>

      <button onClick={() => void pagarSalida()} disabled={pagando} className={`${btn.primary} w-full py-4 text-base`}>
        {pagando ? "Procesando..." : "Pagar y registrar salida"}
      </button>
    </EntityDetailLayout>
  );
}
