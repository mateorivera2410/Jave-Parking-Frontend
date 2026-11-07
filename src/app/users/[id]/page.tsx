"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { usersService } from "@/modules/users/services/usersService";
import { carrosService } from "@/modules/carros/services/carrosService";
import type { Carro } from "@/types/api";
import { useEntityDetail } from "@/hooks/useEntityDetail";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityCard } from "@/components/ui/EntityCard";
import { EntityDetailLayout } from "@/components/ui/EntityDetailLayout";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // El valor de [id] en la carpeta corresponde al código de la URL: /users/12345678
  const { id } = use(params);
  const { entity: user, loading, error } = useEntityDetail(id, usersService.getById);

  // Relación 1—N: los carros de este usuario (GET /carros?userId=...)
  const [carros, setCarros] = useState<Carro[]>([]);
  useEffect(() => {
    carrosService.getAll(id).then(setCarros).catch(() => setCarros([]));
  }, [id]);

  if (loading) return <LoadingState label="Cargando usuario..." />;
  if (error) return <ErrorState message={error} />;
  if (!user) return <EmptyState>Usuario no encontrado</EmptyState>;

  return (
    <EntityDetailLayout accent="blue" backHref="/users" backLabel="usuarios" title={user.name} description="Detalle del usuario consultado por su código en la ruta dinámica.">
      <div className="space-y-4">
        <EntityCard accent="blue">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="text-sm text-slate-500">Código</dt><dd className="mt-1 font-mono text-sm">{user.id}</dd></div>
            <div><dt className="text-sm text-slate-500">Correo</dt><dd className="mt-1 font-medium break-all">{user.email}</dd></div>
            <div><dt className="text-sm text-slate-500">Teléfono</dt><dd className="mt-1 font-medium">{user.phone}</dd></div>
            <div><dt className="text-sm text-slate-500">¿Dentro de la U?</dt><dd className="mt-1 font-medium">{user.isInside ? "Sí, está dentro" : "No, está fuera"}</dd></div>
          </dl>
        </EntityCard>
        <EntityCard accent="blue">
          <h2 className="font-semibold">Carros registrados ({carros.length})</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {carros.map(carro => (
              <Link key={carro.placa} href={`/carros/${carro.placa}`} className="px-3 py-1.5 rounded-lg bg-yellow-300 border-2 border-slate-900 font-mono font-bold text-sm hover:bg-yellow-200">{carro.placa}</Link>
            ))}
            {carros.length === 0 && <p className="text-sm text-slate-500">Este usuario no tiene carros registrados.</p>}
          </div>
        </EntityCard>
      </div>
    </EntityDetailLayout>
  );
}