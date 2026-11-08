"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useSession } from "@/modules/session/SessionProvider";
import type { Parqueadero } from "@/types/api";
import { TARIFA_HORA } from "@/lib/config";
import { formatHora, formatPesos } from "@/lib/format";
import { ListaParqueaderos } from "@/components/parqueaderos/ListaParqueaderos";
import { AvisoSinCarro } from "@/components/estudiante/AvisoSinCarro";
import { ParqueoActivoCard } from "@/components/estudiante/ParqueoActivoCard";
import { SectionLabel } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";
import { nombrePuesto } from "@/modules/parqueaderos/zonas";

// Inicio del estudiante: su estado (adentro o no), los cupos libres y sus últimas facturas.
export default function InicioPage() {
  const { user, carros, pagos, pagoActivo } = useSession();
  const [puestos, setPuestos] = useState<Parqueadero[]>([]);

  useEffect(() => {
    parqueaderosService.getAll().then(setPuestos).catch(() => setPuestos([]));
  }, []);

  const nombre = user?.name.split(" ")[0] ?? "";

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-jave-navy-2 to-jave-navy px-6 py-7 text-white">
        <div className="pointer-events-none absolute -right-10 -top-14 size-28 rounded-full bg-jave-yellow/90" />
        <p className="relative text-xs font-bold uppercase tracking-[1.2px] text-jave-yellow">Jave Parking</p>
        <h1 className="relative mt-1 text-3xl font-bold">Hola, {nombre}</h1>
        <p className="relative mt-1 text-sm text-white/75">Tarifa fija de {formatPesos(TARIFA_HORA)}/hora · pagas solo los minutos que estés</p>
      </section>

      {/* Lo más importante primero: si está adentro, si le falta el carro o si puede buscar puesto */}
      {pagoActivo ? (
        <ParqueoActivoCard pago={pagoActivo} />
      ) : carros.length === 0 ? (
        <AvisoSinCarro />
      ) : (
        <div className="space-y-3">
          <ListaParqueaderos puestos={puestos} hrefBase="/mapa" />
          <Link href="/mapa" className={`${btn.primary} w-full`}>Buscar puesto</Link>
        </div>
      )}

      {carros.length > 0 && (
        <>
          <SectionLabel>Mis vehículos</SectionLabel>
          <div className="flex flex-wrap gap-2">{carros.map(c => <Placa key={c.placa} placa={c.placa} />)}</div>
        </>
      )}

      <div className="flex items-center justify-between">
        <SectionLabel>Últimas facturas</SectionLabel>
        <Link href="/perfil" className="text-sm font-semibold text-jave-green hover:underline">Ver todas</Link>
      </div>
      {pagos.slice(0, 3).map(p => (
        <div key={p.id} className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4 text-sm">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy font-bold text-jave-yellow">{p.parqueaderoId}</span>
          <span className="flex-1">
            <span className="block font-semibold text-jave-navy">Factura #{p.id}</span>
            <span className="block text-xs text-jave-gray">{nombrePuesto(p.parqueaderoId)} · {formatHora(p.horaEntrada)}</span>
          </span>
          {p.horaSalida ? <span className="font-bold text-jave-navy">{formatPesos(p.total)}</span> : <StatusPill tone="amber">Adentro</StatusPill>}
        </div>
      ))}
      {pagos.length === 0 && <p className="text-sm text-jave-gray">Todavía no has usado el parqueadero.</p>}
    </div>
  );
}
