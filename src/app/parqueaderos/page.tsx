"use client";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import type { Parqueadero } from "@/types/api";
import { DisponibilidadCard } from "@/components/parqueaderos/DisponibilidadCard";
import { ParqueaderoCard } from "@/components/parqueaderos/ParqueaderoCard";
import { ParqueaderoCreateForm } from "@/components/parqueaderos/ParqueaderoCreateForm";
import { ParqueaderoFilters } from "@/components/parqueaderos/ParqueaderoFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyForm = { id: "", tarifa: "" };

export default function ParqueaderosPage() {
  const [parqueaderos, setParqueaderos] = useState<Parqueadero[]>([]); // lo que se ve (con filtro)
  const [todos, setTodos] = useState<Parqueadero[]>([]); // todos, para el resumen de cupos
  const [ocupado, setOcupado] = useState(""); // filtro actual: "", "false" o "true"
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function load(filtro = ocupado) {
    try {
      setLoading(true);
      setErr(null);
      // El filtro lo hace el backend (?ocupado=); la segunda consulta trae todos para contar cupos
      const [filtrados, todosData] = await Promise.all([parqueaderosService.getAll(filtro), parqueaderosService.getAll()]);
      setParqueaderos(filtrados);
      setTodos(todosData);
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

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  const libres = todos.filter(p => !p.isActive).length;

  return (
    <div className="space-y-6">
      <EntityPageHeader eyebrow="Puestos" title="Elige tu puesto" description="Disponibilidad en tiempo real del parqueadero" onReload={() => void load()}>
        <ParqueaderoCreateForm value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      <DisponibilidadCard libres={libres} total={todos.length} />

      {/* "Pavimento" del mapa: los puestos en verde (libre) o rojo (ocupado) */}
      <section className="space-y-4 rounded-[28px] bg-jave-pavement p-4 sm:p-6">
        <ParqueaderoFilters value={ocupado} onChange={changeFilter} />
        {loading && <LoadingState />}
        {err && <ErrorState message={err} />}
        <div className="grid grid-cols-3 gap-x-6 gap-y-[3px] sm:grid-cols-4 lg:grid-cols-6">
          {parqueaderos.map(p => <ParqueaderoCard key={p.id} parqueadero={p} />)}
        </div>
        {parqueaderos.length === 0 && !loading && <EmptyState>No hay puestos con ese filtro</EmptyState>}
      </section>
    </div>
  );
}
