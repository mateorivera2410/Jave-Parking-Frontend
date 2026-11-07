import { FormInput } from "@/components/ui/FormControls";

// Filtro por placa (?placa= en el backend). La página decide qué hacer al filtrar o limpiar.
export function PagoFilters({ value, onChange, onApply, onClear }: {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
      <FormInput className="flex-1 min-w-[160px] rounded-full px-4 font-mono uppercase placeholder:normal-case" placeholder="Buscar por placa ABC123" maxLength={6} value={value} onChange={event => onChange(event.target.value.toUpperCase())} />
      <button type="button" onClick={onApply} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
      <button type="button" onClick={onClear} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
    </div>
  );
}