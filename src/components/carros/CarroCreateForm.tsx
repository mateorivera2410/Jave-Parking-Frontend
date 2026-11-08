import type { User } from "@/types/api";
import { FormPanel, FormSelect, PlacaInput } from "@/components/ui/FormControls";
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
      <PlacaInput value={value.placa} onChange={placa => onChange({ ...value, placa })} />
      <FormSelect value={value.userId} onChange={event => onChange({ ...value, userId: event.target.value })} required>
        <option value="">Selecciona el dueño…</option>
        {users.map(user => <option key={user.id} value={user.id}>{user.id} — {user.name}</option>)}
      </FormSelect>
      <button className={btn.primary}>+ Registrar carro</button>
    </FormPanel>
  );
}
