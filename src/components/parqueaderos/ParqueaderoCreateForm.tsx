import { FormPanel, FormSelect } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";
import { formatPesos } from "@/lib/format";
import { TARIFA_HORA } from "@/lib/config";
import { ZONAS } from "@/modules/parqueaderos/zonas";

// Agregar un puesto: se escoge el parqueadero y la página le pone el siguiente número libre de ese parqueadero.
// La tarifa es FIJA (TARIFA_HORA en lib/config.ts).
export function ParqueaderoCreateForm({ zona, onChange, onSubmit }: {
  zona: string; // slug del parqueadero escogido
  onChange: (zona: string) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid items-center gap-3 md:grid-cols-3">
      <FormSelect value={zona} onChange={event => onChange(event.target.value)}>
        {ZONAS.map(z => <option key={z.slug} value={z.slug}>{z.letra} · {z.nombre} (puestos {z.desde}–{z.hasta})</option>)}
      </FormSelect>
      <p className="text-sm text-jave-gray">Tarifa fija: <b className="text-jave-navy">{formatPesos(TARIFA_HORA)}/hora</b></p>
      <button className={btn.primary}>+ Agregar puesto</button>
    </FormPanel>
  );
}
