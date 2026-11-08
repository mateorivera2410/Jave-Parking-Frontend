import type { ReactNode } from "react";

// Fila "etiqueta ........ valor" de las pantallas de detalle del Figma.
export function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-jave-gray">{label}</span>
      <span className="text-right font-semibold text-jave-navy">{children}</span>
    </div>
  );
}

// Título de sección en mayúsculas grises: "DATOS DEL VEHÍCULO"
export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-jave-gray">{children}</p>;
}
