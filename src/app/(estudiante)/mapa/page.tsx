"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useSession } from "@/modules/session/SessionProvider";
import { nombrePuesto } from "@/modules/parqueaderos/zonas";
import type { Parqueadero } from "@/types/api";
import { ListaParqueaderos } from "@/components/parqueaderos/ListaParqueaderos";
import { ErrorState } from "@/components/ui/AsyncState";
import { btn } from "@/components/ui/buttons";

// "03 - Parqueaderos" del Figma: el estudiante escoge a cuál de los 3 parqueaderos va.
export default function ParqueaderosPage() {
  const { pagoActivo } = useSession();
  const [puestos, setPuestos] = useState<Parqueadero[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    parqueaderosService.getAll().then(setPuestos).catch((e: unknown) => setErr(e instanceof Error ? e.message : String(e)));
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-xl font-bold text-jave-navy">Elige tu parqueadero</h1>
        <p className="mt-1 text-sm text-jave-gray">Disponibilidad en tiempo real en la Javeriana</p>
      </div>
      {pagoActivo && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-jave-amber-bg p-4 text-sm text-jave-amber">
          <span>Ya estás parqueado en <b>{nombrePuesto(pagoActivo.parqueaderoId)}</b>.</span>
          <Link href="/pago" className={btn.primary}>Ir a pagar</Link>
        </div>
      )}
      {err && <ErrorState message={err} />}
      <ListaParqueaderos puestos={puestos} hrefBase="/mapa" />
    </div>
  );
}
