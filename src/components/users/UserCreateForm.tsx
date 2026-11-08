import { FormInput, FormPanel } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";

export type UserFormValues = { id: string; name: string; email: string; phone: string };

// Formulario controlado y reutilizable: no importa usersService ni modifica el estado directamente.
export function UserCreateForm({ value, onChange, onSubmit }: {
  value: UserFormValues;
  onChange: (value: UserFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid gap-3 md:grid-cols-4">
      <FormInput placeholder="Código (8 dígitos)" maxLength={8} value={value.id} onChange={event => onChange({ ...value, id: event.target.value })} required />
      <FormInput placeholder="Nombre" value={value.name} onChange={event => onChange({ ...value, name: event.target.value })} required />
      <FormInput type="email" placeholder="Correo" value={value.email} onChange={event => onChange({ ...value, email: event.target.value })} required />
      <FormInput placeholder="Teléfono 300..." value={value.phone} onChange={event => onChange({ ...value, phone: event.target.value })} required />
      <button className={`${btn.primary} md:col-span-4`}>+ Crear usuario</button>
    </FormPanel>
  );
}
