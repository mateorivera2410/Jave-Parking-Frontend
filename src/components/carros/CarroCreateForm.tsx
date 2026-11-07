import type { User } from "@/types/api";
import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";

export type CarroFormValues = { placa: string; userId: string };

// La lista de usuarios llega por props: el formulario no sabe de dónde salen (no conoce ningún service).
export function CarroCreateForm({ users, value, onChange, onSubmit }: {
  users: User[];
  value: CarroFormValues;
  onChange: (value: CarroFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-6 grid md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border">
      <FormInput className="font-mono uppercase placeholder:normal-case focus:ring-2 focus:ring-violet-500" placeholder="Placa ABC123" maxLength={6} value={value.placa} onChange={event => onChange({ ...value, placa: event.target.value.toUpperCase() })} required />
      <FormSelect className="focus:ring-2 focus:ring-violet-500" value={value.userId} onChange={event => onChange({ ...value, userId: event.target.value })} required>
        <option value="">Selecciona el dueño…</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <button className="py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition">+ Registrar carro</button>
    </FormPanel>
  );
}