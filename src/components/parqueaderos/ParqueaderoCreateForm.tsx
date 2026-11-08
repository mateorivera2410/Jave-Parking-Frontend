import { FormInput, FormPanel } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";

// Se guardan como texto mientras se escriben; la página los convierte a número al enviar.
export type ParqueaderoFormValues = { id: string; tarifa: string };

export function ParqueaderoCreateForm({ value, onChange, onSubmit }: {
  value: ParqueaderoFormValues;
  onChange: (value: ParqueaderoFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
      <FormInput type="number" min={1} placeholder="Número del puesto" value={value.id} onChange={event => onChange({ ...value, id: event.target.value })} required />
      <FormInput type="number" min={0} placeholder="Tarifa por hora (pesos)" value={value.tarifa} onChange={event => onChange({ ...value, tarifa: event.target.value })} required />
      <button className={btn.primary}>+ Crear puesto</button>
    </FormPanel>
  );
}
