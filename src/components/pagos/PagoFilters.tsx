import { PlacaInput } from "@/components/ui/FormControls";
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
      <div className="min-w-[160px] flex-1"><PlacaInput required={false} placeholder="Buscar facturas por placa (ABC 123)" value={value} onChange={onChange} /></div>
      <button type="button" onClick={onApply} className={btn.dark}>Filtrar</button>
      <button type="button" onClick={onClear} className={btn.light}>Limpiar</button>
    </div>
  );
}
