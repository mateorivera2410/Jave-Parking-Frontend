import Link from "next/link";
import type { ReactNode } from "react";

// Pantalla de detalle del Figma: header azul con botón "‹" para volver.
// "header" permite cambiar el contenido del header (ej: el avatar del perfil).
export function EntityDetailLayout({ backHref, backLabel, title, description, header, children }: {
  backHref: string;
  backLabel: string;
  title?: string;
  description?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-jave-navy-2 to-jave-navy px-6 pb-8 pt-6 text-white shadow-[0_10px_30px_-12px_rgba(20,44,110,0.35)]">
        <div className="pointer-events-none absolute -bottom-16 -left-12 size-40 rounded-full bg-white/10" />
        <Link href={backHref} aria-label={`Volver a ${backLabel}`} className="relative inline-flex size-10 items-center justify-center rounded-xl bg-white/15 text-2xl font-bold leading-none hover:bg-white/25">‹</Link>
        <div className="relative mt-4">
          {header ?? (
            <>
              <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
              {description && <p className="mt-1 text-sm text-jave-yellow">{description}</p>}
            </>
          )}
        </div>
      </section>
      {children}
    </div>
  );
}
