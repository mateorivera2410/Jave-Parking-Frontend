"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pagosService } from "@/modules/pagos/services/pagosService";
import { parqueaderosService } from "@/modules/parqueaderos/services/parqueaderosService";
import { useSession } from "@/modules/session/SessionProvider";
import type { Pago } from "@/types/api";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { PagoAbierto } from "@/components/pagos/PagoAbierto";
import { PagoExitoso } from "@/components/pagos/PagoExitoso";
import { CardIcon } from "@/components/ui/Icons";
import { btn } from "@/components/ui/buttons";

// Pago del estudiante: "06 - Pago" si está parqueado y "07 - Pago exitoso" justo después de pagar.
export default function PagoPage() {
  const { pagoActivo, refresh } = useSession();
  const [tarifa, setTarifa] = useState<number | null>(null);
  const [pagando, setPagando] = useState(false);
  const [pagado, setPagado] = useState<Pago | null>(null); // la factura que acaba de pagar

  // Tarifa del puesto donde está, para mostrar cuánto va
  useEffect(() => {
    if (pagoActivo) parqueaderosService.getById(String(pagoActivo.parqueaderoId)).then(p => setTarifa(p.tarifa)).catch(() => setTarifa(null));
  }, [pagoActivo]);

  async function pagar() {
    if (!pagoActivo) return;
    try {
      setPagando(true);
      // PUT /pagos/:id/salida → el backend calcula el total, libera el puesto y lo marca "fuera"
      setPagado(await pagosService.salida(pagoActivo.id));
      await refresh();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setPagando(false);
    }
  }

  if (pagado) return <PagoExitoso pago={pagado} backHref="/inicio" backLabel="Volver al inicio" />;

  if (!pagoActivo) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-10 text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-jave-card text-jave-muted"><CardIcon /></span>
        <h1 className="text-xl font-bold text-jave-navy">No tienes un parqueo activo</h1>
        <p className="text-sm text-jave-gray">Cuando entres a un puesto, aquí verás cuánto llevas y podrás pagar tu salida.</p>
        <Link href="/mapa" className={`${btn.primary} w-full`}>Buscar puesto</Link>
      </div>
    );
  }

  return (
    <EntityDetailLayout title="Pago" description={`Factura #${pagoActivo.id} · tu carro sigue adentro`}>
      <PagoAbierto pago={pagoActivo} tarifa={tarifa} pagando={pagando} onPagar={() => void pagar()} />
    </EntityDetailLayout>
  );
}
