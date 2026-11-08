// Leyenda de colores del mapa, igual que en el Figma
export function MapaLegend() {
  return (
    <div className="flex items-center gap-[18px] text-xs font-semibold text-jave-gray">
      <span className="flex items-center gap-1.5"><span className="size-[9px] rounded-[3px] bg-jave-green" />Libre</span>
      <span className="flex items-center gap-1.5"><span className="size-[9px] rounded-[3px] bg-jave-red" />Ocupado</span>
    </div>
  );
}
