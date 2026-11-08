import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";

// Marco de las pantallas: header azul arriba, barra de menú abajo (celular) y footer.
// Lo usan el área del estudiante y el área de administración, cada una con su menú.
export function AppShell({ area, extra, children }: { area: "estudiante" | "admin"; extra?: ReactNode; children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-20 bg-jave-navy text-white shadow-lg shadow-jave-navy/20">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
          <Link href={area === "admin" ? "/admin" : "/inicio"} className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-white text-xl font-bold text-jave-navy">P</span>
            <span className="leading-tight">
              <span className="block text-lg font-bold">Jave Parking</span>
              <span className="block text-[11px] text-jave-yellow">{area === "admin" ? "Administración" : "Parqueadero Universitario"}</span>
            </span>
          </Link>
          <div className="flex-1" />
          <Nav area={area} variant="top" />
          {extra}
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pb-32 pt-6 md:px-6 md:pb-12 md:pt-10">{children}</main>
      <footer className="mx-auto hidden w-full max-w-6xl px-6 pb-8 text-xs text-jave-gray md:block">
        <div className="flex items-center justify-between gap-2 border-t border-jave-line pt-6">
          <span>Pontificia Universidad Javeriana Cali · Backend en <span className="rounded bg-jave-card px-2 py-1 font-mono">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span></span>
          <span className="text-jave-yellow-2">Plataformas Computacionales 2026-2</span>
        </div>
      </footer>
      <Nav area={area} variant="bottom" />
    </>
  );
}
