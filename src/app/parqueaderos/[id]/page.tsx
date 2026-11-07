"use client";

import { use, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { formatPesos } from "@/lib/format";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { FormInput, FormPanel } from "@/components/ui/FormControls";

export default function ParqueaderoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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

  if (loading) return <LoadingState label="Cargando puesto..." />;
  if (error) return <ErrorState message={error} />;
  if (!parqueadero) return <EmptyState>Puesto no encontrado</EmptyState>;

  return (
    <EntityDetailLayout accent="emerald" backHref="/parqueaderos" backLabel="puestos" title={`Puesto ${parqueadero.id}`} description="Detalle del puesto consultado por su número en la ruta dinámica.">
      <EntityCard accent="emerald">
        <dl className="grid gap-5 sm:grid-cols-3">
          <div><dt className="text-sm text-slate-500">Número</dt><dd className="mt-1 font-medium">{parqueadero.id}</dd></div>
          <div><dt className="text-sm text-slate-500">Tarifa</dt><dd className="mt-1 font-medium">{formatPesos(parqueadero.tarifa)} / hora</dd></div>
          <div><dt className="text-sm text-slate-500">Estado</dt><dd className="mt-1 font-medium">{parqueadero.isActive ? "Ocupado" : "Libre"}</dd></div>
        </dl>
        <FormPanel onSubmit={cambiarTarifa} className="mt-6 flex flex-wrap gap-2">
          <FormInput className="flex-1 min-w-[160px]" type="number" min={0} placeholder="Nueva tarifa por hora" value={tarifa} onChange={event => setTarifa(event.target.value)} required />
          <button className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Cambiar tarifa</button>
        </FormPanel>
      </EntityCard>
    </EntityDetailLayout>
  );
}