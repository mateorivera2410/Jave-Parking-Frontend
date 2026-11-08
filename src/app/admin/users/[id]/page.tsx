"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { usersService } from "@/modules/users/services/usersService";
import { carrosService } from "@/modules/carros/services/carrosService";
import type { Carro } from "@/types/api";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";
import { InfoRow, SectionLabel } from "@/components/ui/InfoRow";
import { CarIcon } from "@/components/ui/Icons";
import { Placa } from "@/components/ui/Placa";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";
import { UserAvatar } from "@/components/users/UserAvatar";

// Perfil del usuario: basado en la pantalla "10 - Perfil" del Figma
export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // El valor de [id] en la carpeta corresponde al código de la URL: /users/12345678
  const { id } = use(params);
  const router = useRouter();
  const { entity: user, loading, error } = useEntityDetail(id, usersService.getById);

  // Relación 1—N: los carros de este usuario (GET /carros?userId=...)
  const [carros, setCarros] = useState<Carro[]>([]);
  useEffect(() => {
    carrosService.getAll(id).then(setCarros).catch(() => setCarros([]));
  }, [id]);

  async function deactivate() {
    if (!user || !confirm(`¿Desactivar a ${user.name}?`)) return;
    try {
      await usersService.delete(user.id); // Soft delete: isActive = false
      router.push("/admin/users");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  if (loading) return <LoadingState label="Cargando usuario..." />;
  if (error) return <ErrorState message={error} />;
  if (!user) return <EmptyState>Usuario no encontrado</EmptyState>;

  return (
    <EntityDetailLayout backHref="/admin/users" backLabel="usuarios" header={
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
        <Link key={carro.placa} href={`/admin/carros/${carro.placa}`} className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4 transition hover:bg-[#e9edf3]">
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-[#e5eaf6] text-jave-navy"><CarIcon /></span>
          <span className="flex-1"><Placa placa={carro.placa} /></span>
          <span className="text-jave-muted">›</span>
        </Link>
      ))}
      {carros.length === 0 && <EmptyState>Este usuario no tiene carros registrados</EmptyState>}

      <button onClick={() => void deactivate()} className={`${btn.danger} w-full`}>Desactivar cuenta</button>
    </EntityDetailLayout>
  );
}
