"use client";

import { use, useEffect, useState } from "react";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { PagoAbierto } from "@/components/pagos/PagoAbierto";
import { PagoExitoso } from "@/components/pagos/PagoExitoso";

// Factura (admin): "06 - Pago" mientras el carro está adentro y "07 - Pago exitoso" cuando ya pagó.
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

  if (pago.horaSalida) return <PagoExitoso pago={pago} backHref="/admin/pagos" backLabel="Volver a pagos" />;

  return (
    <EntityDetailLayout backHref="/admin/pagos" backLabel="pagos" title="Pago" description={`Factura #${pago.id} · el carro sigue adentro`}>
      <PagoAbierto pago={pago} tarifa={tarifa} puestoHref={`/admin/parqueaderos/${pago.parqueaderoId}`} pagando={pagando} onPagar={() => void pagarSalida()} />
    </EntityDetailLayout>
  );
}
