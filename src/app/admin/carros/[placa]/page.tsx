"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { carrosService } from "@/modules/carros/services/carrosService";
import { pagosService } from "@/modules/pagos/services/pagosService";
import type { Pago } from "@/types/api";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatHora, formatPesos } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { SectionLabel } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { nombrePuesto } from "@/modules/parqueaderos/zonas";

export default function CarroDetailPage({ params }: { params: Promise<{ placa: string }> }) {
  // La carpeta se llama [placa], por eso el parámetro es "placa": /carros/ABC123
  const { placa } = use(params);
  const { entity: carro, loading, error } = useEntityDetail(placa, carrosService.getById);

  // Historial: las facturas de este carro (GET /pagos?placa=...)
  const [pagos, setPagos] = useState<Pago[]>([]);
  useEffect(() => {
    pagosService.getAll(placa).then(setPagos).catch(() => setPagos([]));
  }, [placa]);

  if (loading) return <LoadingState label="Cargando carro..." />;
  if (error) return <ErrorState message={error} />;
  if (!carro) return <EmptyState>Carro no encontrado</EmptyState>;

  return (
    <EntityDetailLayout backHref="/admin/carros" backLabel="carros" header={
      <div className="space-y-3">
        <Placa placa={carro.placa} size="lg" />
        <p className="text-sm text-jave-yellow">
          Dueño: <Link href={`/admin/users/${carro.userId}`} className="font-semibold underline-offset-2 hover:underline">{carro.userId}</Link>
        </p>
      </div>
    }>
      <SectionLabel>Historial de facturas ({pagos.length})</SectionLabel>
      {pagos.map(pago => (
        <Link key={pago.id} href={`/admin/pagos/${pago.id}`} className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4 text-sm transition hover:bg-[#e9edf3]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy font-bold text-jave-yellow">{pago.parqueaderoId}</span>
          <span className="flex-1">
            <span className="block font-semibold text-jave-navy">Factura #{pago.id}</span>
            <span className="block text-xs text-jave-gray">{nombrePuesto(pago.parqueaderoId)} • {formatHora(pago.horaEntrada)}</span>
          </span>
          {pago.horaSalida ? <span className="font-bold text-jave-navy">{formatPesos(pago.total)}</span> : <StatusPill tone="amber">Adentro</StatusPill>}
        </Link>
      ))}
      {pagos.length === 0 && <EmptyState>Este carro todavía no ha entrado al parqueadero</EmptyState>}
    </EntityDetailLayout>
  );
}
