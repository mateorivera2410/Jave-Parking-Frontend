// Filtro de puestos: "" = todos, "false" = libres, "true" = ocupados (igual que ?ocupado= del backend)
const opciones = [
  { value: "", label: "Todos" },
  { value: "false", label: "Libres" },
  { value: "true", label: "Ocupados" },
];

export function ParqueaderoFilters({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {opciones.map(opcion => (
        <button key={opcion.value} type="button" onClick={() => onChange(opcion.value)}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${value === opcion.value ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:bg-slate-100"}`}>
          {opcion.label}
        </button>
      ))}
    </div>
  );
}