import { FormInput, FormPanel } from "@/components/ui/FormControls";

// Se guardan como texto mientras se escriben; la página los convierte a número al enviar.
export type ParqueaderoFormValues = { id: string; tarifa: string };

export function ParqueaderoCreateForm({ value, onChange, onSubmit }: {
  value: ParqueaderoFormValues;
  onChange: (value: ParqueaderoFormValues) => void;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <FormPanel onSubmit={onSubmit} className="mt-4 grid md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border">
      <FormInput className="focus:ring-2 focus:ring-emerald-500" type="number" min={1} placeholder="Número del puesto" value={value.id} onChange={event => onChange({ ...value, id: event.target.value })} required />
      <FormInput className="focus:ring-2 focus:ring-emerald-500" type="number" min={0} placeholder="Tarifa por hora (pesos)" value={value.tarifa} onChange={event => onChange({ ...value, tarifa: event.target.value })} required />
      <button className="py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow hover:opacity-90 transition">+ Crear puesto</button>
    </FormPanel>
  );
}