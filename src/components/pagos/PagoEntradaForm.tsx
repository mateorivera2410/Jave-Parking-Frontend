import type { Carro, Parqueadero } from "@/types/api";
import { FormPanel, FormSelect } from "@/components/ui/FormControls";
import { formatPesos } from "@/lib/format";

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
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border">
      <FormSelect className="focus:ring-2 focus:ring-blue-500" value={value.placa} onChange={event => onChange({ ...value, placa: event.target.value })} required>
        <option value="">Selecciona el carro…</option>
        {carros.map(carro => <option key={carro.placa} value={carro.placa}>{carro.placa}</option>)}
      </FormSelect>
      <FormSelect className="focus:ring-2 focus:ring-blue-500" value={value.parqueaderoId} onChange={event => onChange({ ...value, parqueaderoId: event.target.value })} required>
        <option value="">Selecciona un puesto libre…</option>
        {puestosLibres.map(p => <option key={p.id} value={p.id}>Puesto {p.id} — {formatPesos(p.tarifa)}/h</option>)}
      </FormSelect>
      <button className="py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition">→ Registrar entrada</button>
    </FormPanel>
  );
}