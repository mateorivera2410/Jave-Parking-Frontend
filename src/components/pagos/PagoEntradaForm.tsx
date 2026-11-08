import type { Carro, Parqueadero } from "@/types/api";
import { FormPanel, FormSelect } from "@/components/ui/FormControls";
import { formatPesos, formatPlaca } from "@/lib/format";
import { btn } from "@/components/ui/buttons";

export type PagoFormValues = { placa: string; parqueaderoId: string };

// Registrar ENTRADA: se elige el carro y uno de los puestos LIBRES (las listas llegan por props).
export function PagoEntradaForm({ carros, puestosLibres, value, onChange, onSubmit }: {
  carros: Carro[];
  puestosLibres: Parqueadero[];
  value: PagoFormValues;
  onChange: (value: PagoFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
      <FormSelect value={value.placa} onChange={event => onChange({ ...value, placa: event.target.value })} required>
        <option value="">Selecciona el carro…</option>
        {carros.map(carro => <option key={carro.placa} value={carro.placa}>{formatPlaca(carro.placa)}</option>)}
      </FormSelect>
      <FormSelect value={value.parqueaderoId} onChange={event => onChange({ ...value, parqueaderoId: event.target.value })} required>
        <option value="">Selecciona un puesto libre…</option>
        {puestosLibres.map(p => <option key={p.id} value={p.id}>Puesto {p.id} — {formatPesos(p.tarifa)}/h</option>)}
      </FormSelect>
      <button className={btn.primary}>Registrar entrada →</button>
    </FormPanel>
  );
}
