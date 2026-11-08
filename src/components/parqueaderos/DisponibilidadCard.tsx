import { StatusPill } from "@/components/ui/StatusPill";

// Resumen de cupos con barra de progreso ("03 - Parqueaderos" del Figma).
export function DisponibilidadCard({ libres, total }: { libres: number; total: number }) {
  const porcentaje = total === 0 ? 0 : Math.round((libres / total) * 100);
  // Lleno = 0 libres · Pocos cupos = menos del 30% · Disponible = el resto
  const estado = libres === 0
    ? { tone: "red" as const, label: "Lleno", bar: "bg-jave-red" }
    : porcentaje < 30
      ? { tone: "amber" as const, label: "Pocos cupos", bar: "bg-[#e8a53c]" }
      : { tone: "green" as const, label: "Disponible", bar: "bg-jave-green" };

  return (
    <div className="flex items-center gap-4 rounded-[18px] bg-jave-card p-4 shadow-[0_4px_14px_0_rgba(20,44,110,0.07)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy text-xl font-bold text-jave-yellow">P</span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="font-semibold text-jave-navy">Parqueadero Javeriana</p>
        <p className="text-xs text-jave-gray">{libres} de {total} cupos libres</p>
        <div className="h-1.5 overflow-hidden rounded-[3px] bg-[#e5e7eb]">
          <div className={`h-full rounded-[3px] ${estado.bar}`} style={{ width: `${Math.max(porcentaje, 3)}%` }} />
        </div>
      </div>
      <StatusPill tone={estado.tone}>{estado.label}</StatusPill>
    </div>
  );
}
