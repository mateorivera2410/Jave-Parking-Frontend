"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { useSession } from "@/modules/session/SessionProvider";
import { nombrePuesto, puestosDeZona, zonaPorSlug } from "@/modules/parqueaderos/zonas";
import type { Parqueadero } from "@/types/api";
import { formatPesos, formatPlaca } from "@/lib/format";
import { MapaLegend } from "@/components/parqueaderos/MapaLegend";
import { ParqueaderoCard } from "@/components/parqueaderos/ParqueaderoCard";
import { AvisoSinCarro } from "@/components/estudiante/AvisoSinCarro";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { FormSelect } from "@/components/ui/FormControls";
import { btn, btnLg } from "@/components/ui/buttons";
import { TEXTO_COBRO } from "@/lib/config";

// Mapa de UN parqueadero: "05 - Selección de Cupo" del Figma.
// La carpeta [zona] es la ruta dinámica: /mapa/almendros. El estudiante toca un puesto libre y registra su entrada.
export default function MapaZonaPage({ params }: { params: Promise<{ zona: string }> }) {
  const { zona: slug } = use(params);
  const zona = zonaPorSlug(slug);
  const { carros, pagoActivo, refresh } = useSession();
  const router = useRouter();
  const [puestos, setPuestos] = useState<Parqueadero[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [elegido, setElegido] = useState<Parqueadero | null>(null); // puesto que tocó
  const [placa, setPlaca] = useState(""); // con qué carro entra
  const [enviando, setEnviando] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const todos = await parqueaderosService.getAll();
      setPuestos(zona ? puestosDeZona(todos, zona) : []); // solo los puestos de este parqueadero
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  // Solo puede escoger puesto si tiene carro y no está parqueado ya
  const puedeEscoger = carros.length > 0 && !pagoActivo;
  const placaElegida = placa || carros[0]?.placa || "";

  async function registrarEntrada() {
    if (!elegido) return;
    try {
      setEnviando(true);
      // POST /pagos → el backend crea la factura, ocupa el puesto y marca al estudiante "dentro"
      await pagosService.entrada({ placa: placaElegida, parqueaderoId: elegido.id });
      await refresh();
      router.push("/pago");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 409 alguien ocupó el puesto primero
      setElegido(null);
      await load();
    } finally {
      setEnviando(false);
    }
  }

  const libres = puestos.filter(p => !p.isActive).length;

  if (!zona) return <EmptyState>Ese parqueadero no existe</EmptyState>;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Barra superior del Figma: ubicación */}
      <div className="flex items-center gap-3">
        <Link href="/mapa" aria-label="Volver a parqueaderos" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-bold leading-none text-jave-navy shadow-[0_4px_14px_0_rgba(20,44,110,0.1)]">‹</Link>
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[14px] bg-white px-4 py-2.5 shadow-[0_4px_14px_0_rgba(20,44,110,0.1)]">
          <span className="size-3.5 shrink-0 rounded-full bg-jave-yellow" />
          <span className="min-w-0">
            <span className="block text-[11px] text-jave-gray">Ubicación</span>
            <span className="block truncate text-sm font-bold text-jave-navy">{zona.nombre}</span>
          </span>
        </div>
        <button onClick={() => void load()} aria-label="Actualizar" title="Actualizar" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-bold text-jave-navy shadow-[0_4px_14px_0_rgba(20,44,110,0.1)]">↻</button>
      </div>

      {pagoActivo && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-jave-amber-bg p-4 text-sm text-jave-amber">
          <span>Ya estás parqueado en <b>{nombrePuesto(pagoActivo.parqueaderoId)}</b>.</span>
          <Link href="/pago" className={btn.primary}>Ir a pagar</Link>
        </div>
      )}
      {carros.length === 0 && <AvisoSinCarro />}

      <section className="space-y-4 rounded-[28px] bg-jave-pavement p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <MapaLegend />
          <span className="text-xs font-semibold text-jave-gray">{libres} libres de {puestos.length}</span>
        </div>
        {loading && <LoadingState />}
        {err && <ErrorState message={err} />}
        {!loading && puestos.length === 0 && <EmptyState>Este parqueadero todavía no tiene puestos</EmptyState>}
        <div className="grid grid-cols-3 gap-x-6 gap-y-[3px] sm:grid-cols-4">
          {puestos.map(p => (
            <ParqueaderoCard key={p.id} parqueadero={p}
              onSelect={puedeEscoger ? setElegido : undefined}
              selected={elegido?.id === p.id}
              mio={pagoActivo?.parqueaderoId === p.id} />
          ))}
        </div>
        {puedeEscoger && !elegido && <p className="text-center text-sm text-jave-gray">Toca un puesto verde para escogerlo</p>}
      </section>

      {/* Panel de confirmación: aparece al tocar un puesto libre */}
      {elegido && (
        <div className="sticky bottom-28 z-10 space-y-3 rounded-[24px] bg-white p-5 shadow-[0_-10px_30px_-10px_rgba(20,44,110,0.35)] ring-1 ring-jave-line md:bottom-6">
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-jave-green text-2xl font-bold text-white">{elegido.id}</span>
            <div className="flex-1">
              <p className="font-semibold text-jave-navy">{nombrePuesto(elegido.id)}</p>
              <p className="text-sm text-jave-gray">{formatPesos(elegido.tarifa)}/hora · {TEXTO_COBRO}</p>
            </div>
            <button onClick={() => setElegido(null)} aria-label="Cancelar" className="flex size-9 items-center justify-center rounded-full bg-jave-card text-jave-gray hover:text-jave-navy">✕</button>
          </div>
          {carros.length > 1 && (
            <FormSelect value={placaElegida} onChange={e => setPlaca(e.target.value)}>
              {carros.map(c => <option key={c.placa} value={c.placa}>{formatPlaca(c.placa)}</option>)}
            </FormSelect>
          )}
          <button onClick={() => void registrarEntrada()} disabled={enviando} className={`${btnLg.primary} w-full`}>
            {enviando ? "Registrando..." : `Entrar con ${formatPlaca(placaElegida)}`}
          </button>
        </div>
      )}
    </div>
  );
}
