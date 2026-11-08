"use client";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import type { Parqueadero } from "@/types/api";
import { TARIFA_HORA } from "@/lib/config";
import { formatPesos } from "@/lib/format";
import { DisponibilidadCard } from "@/components/parqueaderos/DisponibilidadCard";
import { ParqueaderoCard } from "@/components/parqueaderos/ParqueaderoCard";
import { ParqueaderoCreateForm } from "@/components/parqueaderos/ParqueaderoCreateForm";
import { ParqueaderoFilters } from "@/components/parqueaderos/ParqueaderoFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";
import { btn } from "@/components/ui/buttons";

export default function ParqueaderosPage() {
  const [parqueaderos, setParqueaderos] = useState<Parqueadero[]>([]); // lo que se ve (con filtro)
  const [todos, setTodos] = useState<Parqueadero[]>([]); // todos, para el resumen de cupos
  const [ocupado, setOcupado] = useState(""); // filtro actual: "", "false" o "true"
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [numero, setNumero] = useState("");

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
      // Todos los puestos se crean con la tarifa fija
      await parqueaderosService.create({ id: Number(numero), tarifa: TARIFA_HORA });
      setNumero("");
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 409 puesto repetido
    }
  }

  // Pone la tarifa fija en los puestos que tengan otra (ej: puestos creados antes del cambio)
  async function aplicarTarifaFija() {
    const distintos = todos.filter(p => p.tarifa !== TARIFA_HORA);
    try {
      await Promise.all(distintos.map(p => parqueaderosService.update(p.id, { tarifa: TARIFA_HORA })));
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  const libres = todos.filter(p => !p.isActive).length;
  const conOtraTarifa = todos.filter(p => p.tarifa !== TARIFA_HORA).length;

  return (
    <div className="space-y-6">
      <EntityPageHeader eyebrow="Puestos" title="Mapa de puestos" description={<>Tarifa fija de {formatPesos(TARIFA_HORA)}/hora para todos</>} onReload={() => void load()}>
        <ParqueaderoCreateForm value={numero} onChange={setNumero} onSubmit={create} />
        {conOtraTarifa > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-jave-amber-bg p-4 text-sm text-jave-amber">
            <span><b>{conOtraTarifa}</b> puesto(s) tienen una tarifa distinta a la fija.</span>
            <button onClick={() => void aplicarTarifaFija()} className={btn.primary}>Aplicar {formatPesos(TARIFA_HORA)}/h a todos</button>
          </div>
        )}
      </EntityPageHeader>

      <DisponibilidadCard libres={libres} total={todos.length} />

      {/* "Pavimento" del mapa: los puestos en verde (libre) o rojo (ocupado) */}
      <section className="space-y-4 rounded-[28px] bg-jave-pavement p-4 sm:p-6">
        <ParqueaderoFilters value={ocupado} onChange={changeFilter} />
        {loading && <LoadingState />}
        {err && <ErrorState message={err} />}
        <div className="grid grid-cols-3 gap-x-6 gap-y-[3px] sm:grid-cols-4 lg:grid-cols-6">
          {parqueaderos.map(p => <ParqueaderoCard key={p.id} parqueadero={p} href={`/admin/parqueaderos/${p.id}`} />)}
        </div>
        {parqueaderos.length === 0 && !loading && <EmptyState>No hay puestos con ese filtro</EmptyState>}
      </section>
    </div>
  );
}
