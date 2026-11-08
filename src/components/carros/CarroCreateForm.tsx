import type { User } from "@/types/api";
import { FormInput, FormPanel, FormSelect } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";

export type CarroFormValues = { placa: string; userId: string };

// La lista de usuarios llega por props: el formulario no sabe de dónde salen (no conoce ningún service).
export function CarroCreateForm({ users, value, onChange, onSubmit }: {
  users: User[];
  value: CarroFormValues;
  onChange: (value: CarroFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
      <FormInput className="font-bold uppercase tracking-[1px] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal" placeholder="Placa ABC123" maxLength={6} value={value.placa} onChange={event => onChange({ ...value, placa: event.target.value.toUpperCase() })} required />
      <FormSelect value={value.userId} onChange={event => onChange({ ...value, userId: event.target.value })} required>
        <option value="">Selecciona el dueño…</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <button className={btn.primary}>+ Registrar carro</button>
    </FormPanel>
  );
}
