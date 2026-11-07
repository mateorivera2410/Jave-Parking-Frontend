"use client";

import Link from "next/link";
import { use } from "react";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatHora, formatPesos } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function PagoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { entity: pago, loading, error } = useEntityDetail(id, pagosService.getById);

  if (loading) return <LoadingState label="Cargando factura..." />;
  if (error) return <ErrorState message={error} />;
  if (!pago) return <EmptyState>Factura no encontrada</EmptyState>;

  return (
    <EntityDetailLayout accent="blue" backHref="/pagos" backLabel="pagos" title={`Factura #${pago.id}`} description={pago.horaSalida ? "Pagada — el carro ya tiene permiso de salida." : "Abierta — el carro sigue adentro."}>
      <EntityCard accent={pago.horaSalida ? "emerald" : "slate"}>
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div><dt className="text-sm text-slate-500">Carro</dt><dd className="mt-1"><Link href={`/carros/${pago.placa}`} className="font-mono font-bold hover:text-blue-700">{pago.placa}</Link></dd></div>
          <div><dt className="text-sm text-slate-500">Puesto</dt><dd className="mt-1"><Link href={`/parqueaderos/${pago.parqueaderoId}`} className="font-medium hover:text-blue-700">{pago.parqueaderoId}</Link></dd></div>
          <div><dt className="text-sm text-slate-500">Entrada</dt><dd className="mt-1 font-medium">{formatHora(pago.horaEntrada)}</dd></div>
          <div><dt className="text-sm text-slate-500">Salida</dt><dd className="mt-1 font-medium">{formatHora(pago.horaSalida)}</dd></div>
          <div><dt className="text-sm text-slate-500">Total</dt><dd className="mt-1 text-xl font-bold">{formatPesos(pago.total)}</dd></div>
        </dl>
      </EntityCard>
    </EntityDetailLayout>
  );
}