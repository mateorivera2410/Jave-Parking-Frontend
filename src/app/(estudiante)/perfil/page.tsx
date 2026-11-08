"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { carrosService } from "@/modules/carros/services/carrosService";
import { useSession } from "@/modules/session/SessionProvider";
import type { Carro } from "@/types/api";
import { formatHora, formatPesos } from "@/lib/format";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { FormInput, FormPanel } from "@/components/ui/FormControls";
import { CarIcon } from "@/components/ui/Icons";
import { InfoRow, SectionLabel } from "@/components/ui/InfoRow";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";
import { UserAvatar } from "@/components/users/UserAvatar";

// Perfil del estudiante: "10 - Perfil" del Figma. Sus datos, sus carros, su historial y cerrar sesión.
export default function PerfilPage() {
  const { user, carros, pagos, refresh, logout } = useSession();
  const router = useRouter();
  const [placa, setPlaca] = useState("");

  async function agregarCarro() {
    if (!user) return;
    try {
      await carrosService.create({ placa, userId: user.id }); // POST /carros con SU código
      setPlaca("");
      await refresh();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 400 formato de placa, 409 placa repetida
    }
  }

  async function quitarCarro(carro: Carro) {
    if (!confirm(`¿Quitar el carro ${carro.placa} de tu cuenta?`)) return;
    try {
      await carrosService.delete(carro.placa);
      await refresh();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // 409 si ya tiene facturas
    }
  }

  function cerrarSesion() {
    logout();
    router.replace("/");
  }

  if (!user) return null;

  return (
    <EntityDetailLayout header={
      <div className="flex flex-col items-center gap-3 text-center">
        <UserAvatar name={user.name} size="lg" />
        <h1 className="text-[21px] font-bold">{user.name}</h1>
        <p className="text-[13px] text-white/75">{user.email}</p>
        <span className="rounded-full bg-jave-yellow px-3.5 py-1.5 text-[11px] font-semibold text-jave-navy">Estudiante Javeriano</span>
      </div>
    }>
      <div className="space-y-3 rounded-[18px] bg-jave-card p-[18px]">
        <InfoRow label="Código">{user.id}</InfoRow>
        <InfoRow label="Teléfono">{user.phone}</InfoRow>
        <InfoRow label="¿Dentro de la U?">{user.isInside ? <StatusPill tone="amber">Dentro</StatusPill> : <StatusPill tone="gray">Fuera</StatusPill>}</InfoRow>
      </div>

      <SectionLabel>Mis vehículos ({carros.length})</SectionLabel>
      {carros.map(carro => (
        <div key={carro.placa} className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4">
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-[#e5eaf6] text-jave-navy"><CarIcon /></span>
          <span className="flex-1"><Placa placa={carro.placa} /></span>
          <button onClick={() => void quitarCarro(carro)} className="text-sm font-semibold text-jave-red hover:underline">Quitar</button>
        </div>
      ))}
      <FormPanel onSubmit={agregarCarro} className="flex flex-wrap gap-2">
        <FormInput className="min-w-[160px] flex-1 font-bold uppercase tracking-[1px] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal" maxLength={6} placeholder="Placa de otro carro (ABC123)" value={placa} onChange={e => setPlaca(e.target.value.toUpperCase())} required />
        <button className={btn.primary}>+ Agregar carro</button>
      </FormPanel>

      <SectionLabel>Historial de facturas ({pagos.length})</SectionLabel>
      {pagos.map(p => (
        <div key={p.id} className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4 text-sm">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy font-bold text-jave-yellow">{p.parqueaderoId}</span>
          <span className="flex-1">
            <span className="block font-semibold text-jave-navy">Factura #{p.id} · <span className="font-normal">{p.placa}</span></span>
            <span className="block text-xs text-jave-gray">{formatHora(p.horaEntrada)}</span>
          </span>
          {p.horaSalida ? <span className="font-bold text-jave-navy">{formatPesos(p.total)}</span> : <StatusPill tone="amber">Adentro</StatusPill>}
        </div>
      ))}
      {pagos.length === 0 && <p className="text-sm text-jave-gray">Todavía no tienes facturas.</p>}

      <button onClick={cerrarSesion} className={`${btn.danger} w-full`}>Cerrar sesión</button>
      <p className="text-center text-[11px] text-jave-muted">Jave Parking · v2.0</p>
    </EntityDetailLayout>
  );
}
