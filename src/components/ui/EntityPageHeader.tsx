import type { ReactNode } from "react";
import { btn } from "./buttons";

// Encabezado de cada módulo: franja azul del Figma con título, y debajo los formularios/filtros (children).
export function EntityPageHeader({ eyebrow, title, description, onReload, children }: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  onReload?: () => void;
  children?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_-12px_rgba(20,44,110,0.25)] ring-1 ring-jave-line">
      <div className="relative overflow-hidden bg-gradient-to-br from-jave-navy-2 to-jave-navy px-6 py-7 text-white">
        <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-jave-yellow/90" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-jave-yellow">{eyebrow}</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-1 text-sm text-white/75">{description}</p>
          </div>
          {onReload && <button onClick={onReload} className={`${btn.dark} relative ring-1 ring-white/25`}>Recargar</button>}
        </div>
      </div>
      {children && <div className="space-y-4 p-4 sm:p-6">{children}</div>}
    </section>
  );
}
