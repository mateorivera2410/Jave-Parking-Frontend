"use client";
import { useEffect, useState } from "react";
import { carrosService } from "@/modules/carros/services/carrosService";
import { usersService } from "@/modules/users/services/usersService";
import type { Carro, User } from "@/types/api";
import { CarroCard } from "@/components/carros/CarroCard";
import { CarroCreateForm } from "@/components/carros/CarroCreateForm";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyForm = { placa: "", userId: "" };

export default function CarrosPage() {
  // La página guarda los carros y también los usuarios (para elegir el dueño y mostrar su nombre).
  const [carros, setCarros] = useState<Carro[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      // Dos consultas independientes al mismo tiempo
      const [carrosData, usersData] = await Promise.all([carrosService.getAll(), usersService.getAll()]);
      setCarros(carrosData);
      setUsers(usersData);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    try {
      await carrosService.create(form);
      setForm(emptyForm);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 400 placa mal escrita, 409 placa repetida
    }
  }

  async function remove(carro: Carro) {
    if (!confirm(`¿Eliminar el carro ${carro.placa}?`)) return;
    try {
      await carrosService.delete(carro.placa);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // 409 si el carro ya tiene facturas
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  // Busca el nombre del dueño en la lista de usuarios (si está desactivado no aparece)
  const ownerName = (userId: string) => users.find(user => user.id === userId)?.name;

  return (
    <div className="space-y-6">
      <EntityPageHeader eyebrow="Carros" title="Vehículos registrados" description={<>{carros.length} carros • cada uno con su dueño</>} onReload={() => void load()}>
        <CarroCreateForm users={users} value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {carros.map(carro => <CarroCard key={carro.placa} carro={carro} ownerName={ownerName(carro.userId)} onDelete={remove} />)}
      </div>
      {carros.length === 0 && !loading && <EmptyState>No hay carros — registra uno arriba</EmptyState>}
    </div>
  );
}
