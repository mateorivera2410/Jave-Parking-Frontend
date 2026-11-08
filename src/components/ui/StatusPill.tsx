import type { ReactNode } from "react";

// Pastilla de estado del Figma: un punto de color + texto (Libre, Ocupado, Adentro, Pagado…)
const tones = {
  green: "bg-jave-green-bg text-jave-green",
  red: "bg-jave-red-bg text-jave-red",
  amber: "bg-jave-amber-bg text-jave-amber",
  gray: "bg-white text-jave-gray",
};

export function StatusPill({ tone, children }: { tone: keyof typeof tones; children: ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${tones[tone]}`}>
      <span className="size-[7px] rounded-full bg-current" />
      {children}
    </span>
  );
}
