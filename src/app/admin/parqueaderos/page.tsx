"use client";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { ZONAS, puestosDeZona, zonaDePuesto, zonaPorSlug, type Zona } from "@/modules/parqueaderos/zonas";
import type { Parqueadero } from "@/types/api";
import { TARIFA_HORA } from "@/lib/config";
import { formatPesos } from "@/lib/format";
import { DisponibilidadCard } from "@/components/parqueaderos/DisponibilidadCard";
import { ParqueaderoCard } from "@/components/parqueaderos/ParqueaderoCard";
import { ParqueaderoCreateForm } from "@/components/parqueaderos/ParqueaderoCreateForm";
import { ParqueaderoFilters } from "@/components/parqueaderos/ParqueaderoFilters";
import { ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";
import { btn } from "@/components/ui/buttons";

export default function ParqueaderosPage() {
  const [parqueaderos, setParqueaderos] = useState<Parqueadero[]>([]); // lo que se ve (con filtro)
  const [todos, setTodos] = useState<Parqueadero[]>([]); // todos, para contar cupos y números
  const [ocupado, setOcupado] = useState(""); // filtro actual: "", "false" o "true"
  const [zona, setZona] = useState(ZONAS[0].slug); // parqueadero escogido en el formulario
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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

  // Números del rango del parqueadero que todavía no existen en el backend
  function numerosFaltantes(z: Zona) {
    const existentes = new Set(todos.map(p => p.id));
    const faltan: number[] = [];
    for (let n = z.desde; n <= z.hasta; n++) if (!existentes.has(n)) faltan.push(n);
    return faltan;
  }

  // Agrega UN puesto: el siguiente número libre del parqueadero escogido
  async function create() {
    const z = zonaPorSlug(zona);
    const siguiente = z ? numerosFaltantes(z)[0] : undefined;
    if (!z || siguiente === undefined) return alert("Ese parqueadero ya tiene todos sus puestos");
    try {
      await parqueaderosService.create({ id: siguiente, tarifa: TARIFA_HORA });
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  // Crea de una vez todos los puestos que le faltan a un parqueadero
  async function completar(z: Zona) {
    try {
      await Promise.all(numerosFaltantes(z).map(id => parqueaderosService.create({ id, tarifa: TARIFA_HORA })));
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
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

  const conOtraTarifa = todos.filter(p => p.tarifa !== TARIFA_HORA).length;
  const sinZona = parqueaderos.filter(p => !zonaDePuesto(p.id)); // puestos fuera de los 3 rangos

  return (
    <div className="space-y-6">
      <EntityPageHeader eyebrow="Puestos" title="Parqueaderos de la Javeriana" description={<>3 parqueaderos · tarifa fija de {formatPesos(TARIFA_HORA)}/hora</>} onReload={() => void load()}>
        <ParqueaderoCreateForm zona={zona} onChange={setZona} onSubmit={create} />
        {conOtraTarifa > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-jave-amber-bg p-4 text-sm text-jave-amber">
            <span><b>{conOtraTarifa}</b> puesto(s) tienen una tarifa distinta a la fija.</span>
            <button onClick={() => void aplicarTarifaFija()} className={btn.primary}>Aplicar {formatPesos(TARIFA_HORA)}/h a todos</button>
          </div>
        )}
      </EntityPageHeader>

      <ParqueaderoFilters value={ocupado} onChange={changeFilter} />
      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      {/* Un bloque por parqueadero: resumen de cupos + su mapa de puestos */}
      {ZONAS.map(z => {
        const deZona = puestosDeZona(todos, z);
        const visibles = puestosDeZona(parqueaderos, z);
        const faltan = numerosFaltantes(z).length;
        return (
          <section key={z.slug} className="space-y-4 rounded-[28px] bg-jave-pavement p-4 sm:p-6">
            <DisponibilidadCard letra={z.letra} nombre={z.nombre} libres={deZona.filter(p => !p.isActive).length} total={deZona.length} />
            {faltan > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-jave-gray">
                <span>Puestos creados: <b className="text-jave-navy">{deZona.length} de {z.hasta - z.desde + 1}</b> (números {z.desde} a {z.hasta})</span>
                <button onClick={() => void completar(z)} className={btn.dark}>Crear los {faltan} que faltan</button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-x-6 gap-y-[3px] sm:grid-cols-5 lg:grid-cols-10">
              {visibles.map(p => <ParqueaderoCard key={p.id} parqueadero={p} href={`/admin/parqueaderos/${p.id}`} />)}
            </div>
          </section>
        );
      })}

      {sinZona.length > 0 && (
        <section className="space-y-4 rounded-[28px] bg-jave-pavement p-4 sm:p-6">
          <p className="text-sm font-semibold text-jave-gray">Puestos sin parqueadero (fuera de los rangos)</p>
          <div className="grid grid-cols-3 gap-x-6 gap-y-[3px] sm:grid-cols-5 lg:grid-cols-10">
            {sinZona.map(p => <ParqueaderoCard key={p.id} parqueadero={p} href={`/admin/parqueaderos/${p.id}`} />)}
          </div>
        </section>
      )}
    </div>
  );
}
