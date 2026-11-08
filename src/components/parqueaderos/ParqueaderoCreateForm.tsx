import { FormInput, FormPanel } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";
import { formatPesos } from "@/lib/format";
import { TARIFA_HORA } from "@/lib/config";

// Crear un puesto: solo se escribe el número. La tarifa es FIJA (TARIFA_HORA en lib/config.ts).
export function ParqueaderoCreateForm({ value, onChange, onSubmit }: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid items-center gap-3 md:grid-cols-3">
      <FormInput type="number" min={1} placeholder="Número del puesto" value={value} onChange={event => onChange(event.target.value)} required />
      <p className="text-sm text-jave-gray">Tarifa fija: <b className="text-jave-navy">{formatPesos(TARIFA_HORA)}/hora</b></p>
      <button className={btn.primary}>+ Crear puesto</button>
    </FormPanel>
  );
}
