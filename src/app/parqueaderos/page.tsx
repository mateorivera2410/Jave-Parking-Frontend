"use client";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import type { Parqueadero } from "@/types/api";
import { ParqueaderoCard } from "@/components/parqueaderos/ParqueaderoCard";
import { ParqueaderoCreateForm } from "@/components/parqueaderos/ParqueaderoCreateForm";
import { ParqueaderoFilters } from "@/components/parqueaderos/ParqueaderoFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyForm = { id: "", tarifa: "" };

export default function ParqueaderosPage() {
  const [parqueaderos, setParqueaderos] = useState<Parqueadero[]>([]);
  const [ocupado, setOcupado] = useState(""); // filtro actual: "", "false" o "true"
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function load(filtro = ocupado) {
    try {
      setLoading(true);
      setErr(null);
      setParqueaderos(await parqueaderosService.getAll(filtro));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  function changeFilter(filtro: string) {
    setOcupado(filtro);
    void load(filtro); // se pasa el filtro nuevo porque el estado se actualiza después
  }

  async function create() {
    try {
      // El formulario guarda texto; el backend espera números enteros
      await parqueaderosService.create({ id: Number(form.id), tarifa: Number(form.tarifa) });
      setForm(emptyForm);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 409 puesto repetido
    }
  }

  async function remove(parqueadero: Parqueadero) {
    if (!confirm(`¿Eliminar el puesto ${parqueadero.id}?`)) return;
    try {
      await parqueaderosService.delete(parqueadero.id);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // 409 si está ocupado o tiene facturas
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  const libres = parqueaderos.filter(p => !p.isActive).length;

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="emerald" title="Puestos" description={<>Parqueaderos de la U • {parqueaderos.length} puestos • {libres} libres</>} action={<button onClick={() => void load()} className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-black">Recargar</button>}>
        <ParqueaderoFilters value={ocupado} onChange={changeFilter} />
        <ParqueaderoCreateForm value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {parqueaderos.map(p => <ParqueaderoCard key={p.id} parqueadero={p} onDelete={remove} />)}
      </div>
      {parqueaderos.length === 0 && !loading && <EmptyState>No hay puestos con ese filtro</EmptyState>}
    </div>
  );
}