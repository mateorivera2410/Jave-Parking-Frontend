"use client";

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatPesos } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { FormInput, FormPanel } from "@/components/ui/FormControls";
import { InfoRow, SectionLabel } from "@/components/ui/InfoRow";
import { btn } from "@/components/ui/buttons";

// Detalle del puesto: basado en "04 - Detalle Parqueadero" del Figma
export default function ParqueaderoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  // reload vuelve a pedir el puesto después de cambiar la tarifa
  const { entity: parqueadero, loading, error, reload } = useEntityDetail(id, parqueaderosService.getById);
  const [tarifa, setTarifa] = useState("");

  async function cambiarTarifa() {
    try {
      await parqueaderosService.update(Number(id), { tarifa: Number(tarifa) }); // PUT /parqueaderos/:id
      setTarifa("");
      await reload();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  async function remove() {
    if (!confirm(`¿Eliminar el puesto ${id}?`)) return;
    try {
      await parqueaderosService.delete(Number(id));
      router.push("/parqueaderos");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // 409 si está ocupado o tiene facturas
    }
  }

  if (loading && !parqueadero) return <LoadingState label="Cargando puesto..." />;
  if (error) return <ErrorState message={error} />;
  if (!parqueadero) return <EmptyState>Puesto no encontrado</EmptyState>;

  const libre = !parqueadero.isActive;

  return (
    <EntityDetailLayout backHref="/parqueaderos" backLabel="puestos" title={`Puesto ${parqueadero.id}`} description="Parqueadero Javeriana · Cobro por minuto">
      <div className={`flex items-center gap-4 rounded-[18px] p-5 ${libre ? "bg-jave-green-bg text-jave-green" : "bg-jave-red-bg text-jave-red"}`}>
        <span className="text-5xl font-bold">{parqueadero.id}</span>
        <span>
          <span className="block text-base font-semibold text-jave-navy">{libre ? "Puesto libre" : "Puesto ocupado"}</span>
          <span className="block text-sm text-jave-gray">{libre ? "Puedes registrar una entrada aquí" : "Hay un carro adentro"}</span>
        </span>
      </div>

      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px]">
        <InfoRow label="Tipo de vehículo">Carro</InfoRow>
        <InfoRow label="Tarifa">{formatPesos(parqueadero.tarifa)} / hora</InfoRow>
        <InfoRow label="Cobro">Por minuto</InfoRow>
      </div>

      <SectionLabel>Cambiar tarifa</SectionLabel>
      <FormPanel onSubmit={cambiarTarifa} className="flex flex-wrap gap-2">
        <FormInput className="min-w-[160px] flex-1" type="number" min={0} placeholder="Nueva tarifa por hora" value={tarifa} onChange={event => setTarifa(event.target.value)} required />
        <button className={btn.primary}>Guardar tarifa</button>
      </FormPanel>

      <button onClick={() => void remove()} className={`${btn.danger} w-full`}>Eliminar puesto</button>
    </EntityDetailLayout>
  );
}
