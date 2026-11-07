"use client";
import { useEffect, useState } from "react";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { carrosService } from "@/modules/carros/services/carrosService";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import type { Carro, Pago, Parqueadero } from "@/types/api";
import { formatPesos } from "@/lib/format";
import { PagoCard } from "@/components/pagos/PagoCard";
import { PagoEntradaForm } from "@/components/pagos/PagoEntradaForm";
import { PagoFilters } from "@/components/pagos/PagoFilters";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyForm = { placa: "", parqueaderoId: "" };

export default function PagosPage() {
  // Para registrar una entrada se necesitan 3 listas: facturas, carros y puestos libres.
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [carros, setCarros] = useState<Carro[]>([]);
  const [puestosLibres, setPuestosLibres] = useState<Parqueadero[]>([]);
  const [placa, setPlaca] = useState(""); // filtro por placa
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load(filtro = placa) {
    try {
      setLoading(true);
      setErr(null);
      const [pagosData, carrosData, libresData] = await Promise.all([
        pagosService.getAll(filtro),
        carrosService.getAll(),
        parqueaderosService.getAll("false"), // solo puestos libres
      ]);
      setPagos(pagosData);
      setCarros(carrosData);
      setPuestosLibres(libresData);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function entrada() {
    try {
      await pagosService.entrada({ placa: form.placa, parqueaderoId: Number(form.parqueaderoId) });
      setForm(emptyForm);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 409 carro ya adentro o dueño desactivado
    }
  }

  async function salida(pago: Pago) {
    try {
      const cerrado = await pagosService.salida(pago.id); // el backend calcula el total
      alert(`Salida registrada. Total a pagar: ${formatPesos(cerrado.total)}`);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  async function remove(pago: Pago) {
    if (!confirm(`¿Eliminar la factura #${pago.id}?`)) return;
    try {
      await pagosService.delete(pago.id);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  const adentro = pagos.filter(p => p.horaSalida === null).length;

  return (
    <div className="space-y-6">
      <EntityPageHeader accent="blue" title="Pagos" description={<>Entradas, salidas y cobros • {pagos.length} facturas • {adentro} carros adentro</>} action={<button onClick={() => void load()} className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-black">Recargar</button>}>
        <PagoFilters value={placa} onChange={setPlaca} onApply={() => void load()} onClear={() => { setPlaca(""); void load(""); }} />
        <PagoEntradaForm carros={carros} puestosLibres={puestosLibres} value={form} onChange={setForm} onSubmit={entrada} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid md:grid-cols-2 gap-4">
        {pagos.map(pago => <PagoCard key={pago.id} pago={pago} onSalida={salida} onDelete={remove} />)}
      </div>
      {pagos.length === 0 && !loading && <EmptyState>No hay facturas — registra una entrada arriba</EmptyState>}
    </div>
  );
}