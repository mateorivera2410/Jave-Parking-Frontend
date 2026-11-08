import Link from "next/link";
import type { ReactNode } from "react";

// Tarjeta de acceso a un módulo, con el estilo de "Elige tu parqueadero" del Figma.
export function HomeShortcutCard({ href, icon, title, description }: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-[18px] bg-jave-card p-4 shadow-[0_4px_14px_0_rgba(20,44,110,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(20,44,110,0.18)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-jave-navy-2 to-jave-navy text-jave-yellow">{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold text-jave-navy">{title}</span>
        <span className="block text-xs text-jave-gray">{description}</span>
      </span>
      <span className="text-jave-muted transition group-hover:translate-x-1">›</span>
    </Link>
  );
}
