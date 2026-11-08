import type { ReactNode } from "react";

// Tarjeta común del Figma (fondo gris claro, esquinas redondeadas, sombra azul suave).
// La usan las tarjetas de usuarios, carros y pagos.
export function EntityCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-[18px] bg-jave-card p-4 shadow-[0_4px_14px_0_rgba(20,44,110,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(20,44,110,0.18)] ${className}`}>
      {children}
    </article>
  );
}
