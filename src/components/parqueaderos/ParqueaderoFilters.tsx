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
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-[14px] bg-white p-1 shadow-sm">
        {opciones.map(opcion => (
          <button key={opcion.value} type="button" onClick={() => onChange(opcion.value)}
            className={`rounded-[10px] px-4 py-2 text-sm font-semibold transition ${value === opcion.value ? "bg-jave-navy text-white" : "text-jave-gray hover:text-jave-navy"}`}>
            {opcion.label}
          </button>
        ))}
      </div>
      {/* Leyenda de colores, igual que en el mapa del Figma */}
      <div className="flex items-center gap-[18px] text-xs font-semibold text-jave-gray">
        <span className="flex items-center gap-1.5"><span className="size-[9px] rounded-[3px] bg-jave-green" />Libre</span>
        <span className="flex items-center gap-1.5"><span className="size-[9px] rounded-[3px] bg-jave-red" />Ocupado</span>
      </div>
    </div>
  );
}
