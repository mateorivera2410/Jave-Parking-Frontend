import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";

// Tarjeta de un parqueadero con su barra de cupos ("03 - Parqueaderos" del Figma).
// Con href se vuelve un enlace (el estudiante la toca para ver el mapa de ese parqueadero).
export function DisponibilidadCard({ letra, nombre, libres, total, href }: {
  letra: string;
  nombre: string;
  libres: number;
  total: number;
  href?: string;
}) {
  const porcentaje = total === 0 ? 0 : Math.round((libres / total) * 100);
  // Lleno = 0 libres · Pocos cupos = menos del 30% · Disponible = el resto
  const estado = libres === 0
    ? { tone: "red" as const, label: "Lleno", bar: "bg-jave-red" }
    : porcentaje < 30
      ? { tone: "amber" as const, label: "Pocos cupos", bar: "bg-[#e8a53c]" }
      : { tone: "green" as const, label: "Disponible", bar: "bg-jave-green" };

  const contenido = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy text-xl font-bold text-jave-yellow">{letra}</span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="font-semibold text-jave-navy">{nombre}</p>
        <p className="text-xs text-jave-gray">{libres} de {total} cupos libres</p>
        <div className="h-1.5 overflow-hidden rounded-[3px] bg-[#e5e7eb]">
          <div className={`h-full rounded-[3px] ${estado.bar}`} style={{ width: `${Math.max(porcentaje, 3)}%` }} />
        </div>
      </div>
      <StatusPill tone={estado.tone}>{estado.label}</StatusPill>
    </>
  );

  const className = "flex items-center gap-4 rounded-[18px] bg-jave-card p-4 shadow-[0_4px_14px_0_rgba(20,44,110,0.07)]";
  if (href) return <Link href={href} className={`${className} transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(20,44,110,0.18)]`}>{contenido}</Link>;
  return <div className={className}>{contenido}</div>;
}
