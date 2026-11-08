import { FormInput } from "@/components/ui/FormControls";
import { btn } from "@/components/ui/buttons";

// Filtro por placa (?placa= en el backend). La página decide qué hacer al filtrar o limpiar.
export function PagoFilters({ value, onChange, onApply, onClear }: {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <FormInput className="min-w-[160px] flex-1 font-bold uppercase tracking-[1px] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal" placeholder="Buscar facturas por placa (ABC123)" maxLength={6} value={value} onChange={event => onChange(event.target.value.toUpperCase())} />
      <button type="button" onClick={onApply} className={btn.dark}>Filtrar</button>
      <button type="button" onClick={onClear} className={`${btn.dark} bg-jave-card text-jave-navy hover:bg-jave-line`}>Limpiar</button>
    </div>
  );
}
