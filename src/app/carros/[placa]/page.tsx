"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { carrosService } from "@/modules/carros/services/carrosService";
import { pagosService } from "@/modules/pagos/services/pagosService";
import type { Pago } from "@/types/api";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatHora, formatPesos } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

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
    <EntityDetailLayout accent="violet" backHref="/carros" backLabel="carros" title={`Carro ${carro.placa}`} description={<>Dueño: <Link href={`/users/${carro.userId}`} className="font-semibold hover:text-violet-700">{carro.userId}</Link></>}>
      <EntityCard accent="violet">
        <h2 className="font-semibold">Historial de facturas ({pagos.length})</h2>
        <div className="mt-3 divide-y border-t">
          {pagos.map(pago => (
            <Link key={pago.id} href={`/pagos/${pago.id}`} className="flex items-center justify-between gap-4 py-3 text-sm hover:bg-slate-50">
              <span className="font-medium">Factura #{pago.id} • Puesto {pago.parqueaderoId}</span>
              <span className="text-slate-500">{formatHora(pago.horaEntrada)}</span>
              <span className="font-semibold">{pago.horaSalida ? formatPesos(pago.total) : "Adentro"}</span>
            </Link>
          ))}
          {pagos.length === 0 && <p className="py-3 text-sm text-slate-500">Este carro todavía no ha entrado al parqueadero.</p>}
        </div>
      </EntityCard>
    </EntityDetailLayout>
  );
}