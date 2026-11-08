import Link from "next/link";
import { AppShell } from "@/components/AppShell";

// Área de ADMINISTRACIÓN: aquí están los CRUD completos de los 4 módulos del backend.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell area="admin" extra={<Link href="/" className="ml-2 hidden rounded-[14px] border border-white/25 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 md:block">Ir a la app</Link>}>
      {children}
    </AppShell>
  );
}
