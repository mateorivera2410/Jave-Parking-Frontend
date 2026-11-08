"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CardIcon, CarIcon, ParkingIcon, UserIcon } from "@/components/ui/Icons";

// Un enlace por cada módulo del backend. Para agregar un módulo nuevo, solo se agrega aquí.
const links: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/parqueaderos", label: "Puestos", icon: <ParkingIcon /> },
  { href: "/pagos", label: "Pagos", icon: <CardIcon /> },
  { href: "/carros", label: "Carros", icon: <CarIcon /> },
  { href: "/users", label: "Usuarios", icon: <UserIcon /> },
];

// variant="top": botones del header (computador) · variant="bottom": barra inferior (celular), como en el Figma
export default function Nav({ variant }: { variant: "top" | "bottom" }) {
  const pathname = usePathname(); // ruta actual, para iluminar el botón de la página donde estás
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  if (variant === "top") {
    return (
      <nav className="hidden items-center gap-1.5 md:flex">
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className={`flex items-center gap-2 rounded-[14px] px-4 py-2.5 text-sm font-semibold transition ${isActive(l.href) ? "bg-jave-yellow text-jave-navy" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
            <span className="flex size-6 items-center justify-center">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-jave-line bg-white px-2 pb-5 pt-3 md:hidden">
      {links.map(l => {
        const active = isActive(l.href);
        return (
          <Link key={l.href} href={l.href} className="flex flex-col items-center gap-1.5">
            <span className={`flex size-11 items-center justify-center rounded-2xl ${active ? "bg-jave-navy text-jave-yellow" : "text-jave-muted"}`}>{l.icon}</span>
            <span className={`text-[11px] ${active ? "font-semibold text-jave-navy" : "text-jave-gray"}`}>{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
