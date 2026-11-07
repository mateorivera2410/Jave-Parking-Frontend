import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import "./globals.css";

// Título que sale en la pestaña del navegador
export const metadata: Metadata = {
  title: "Jave Parking",
  description: "Parqueadero de la Javeriana Cali — Next.js + Tailwind — Backend NestJS",
};

// Layout = marco común: header + menú arriba, footer abajo. Cada página se dibuja en {children}.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full text-slate-900 antialiased">
        <header className="sticky top-0 z-20 border-b border-slate-950/20 bg-[#131a2a]/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">P</span>
              <span className="font-semibold tracking-tight text-lg">Jave<span className="font-light text-slate-300">Parking</span></span>
              <span className="hidden md:inline-flex ml-2 px-2 py-0.5 rounded-full bg-white/10 text-amber-200 text-[10px] font-bold tracking-widest border border-white/10">JAVERIANA CALI</span>
            </Link>
            <div className="flex-1" />
            <Nav />
          </div>
        </header>
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-10">{children}</main>
        <footer className="max-w-7xl mx-auto w-full px-4 md:px-6 pb-8 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-t border-stone-300/80 pt-6">
            <span>© Jave Parking — Next.js + Tailwind • Backend NestJS en <span className="font-mono bg-white/80 border border-stone-200 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span></span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Plataformas Computacionales 2026-2</span>
          </div>
        </footer>
      </body>
    </html>
  );
}