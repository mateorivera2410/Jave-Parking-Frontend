"use client";
import { useEffect, useState } from "react";
import { usersService } from "@/modules/users/services/usersService";
import type { User } from "@/types/api";
import { UserCard } from "@/components/users/UserCard";
import { UserCreateForm } from "@/components/users/UserCreateForm";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/AsyncState";
import { EntityPageHeader } from "@/components/ui/EntityPageHeader";

const emptyForm = { id: "", name: "", email: "", phone: "" };

export default function UsersPage() {
  // Componente contenedor: aquí viven el estado y las llamadas a usersService.
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      setUsers(await usersService.getAll());
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    try {
      await usersService.create(form);
      setForm(emptyForm);
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e)); // Ej: 409 código o correo repetido
    }
  }

  async function deactivate(user: User) {
    if (!confirm(`¿Desactivar a ${user.name}?`)) return;
    try {
      await usersService.delete(user.id); // Soft delete: isActive = false
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  const dentro = users.filter(u => u.isInside).length;

  return (
    <div className="space-y-6">
      <EntityPageHeader eyebrow="Usuarios" title="Estudiantes" description={<>{users.length} con cuenta activa • {dentro} dentro de la U</>} onReload={() => void load()}>
        {/* UserCreateForm recibe el estado controlado y reporta cambios con onChange. */}
        <UserCreateForm value={form} onChange={setForm} onSubmit={create} />
      </EntityPageHeader>

      {loading && <LoadingState />}
      {err && <ErrorState message={err} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => <UserCard key={user.id} user={user} onDeactivate={deactivate} />)}
      </div>
      {users.length === 0 && !loading && <EmptyState>No hay usuarios — crea uno arriba</EmptyState>}
    </div>
  );
}
