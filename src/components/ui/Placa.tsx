import { formatPlaca } from "@/lib/format";

// Placa amarilla del Figma: "ABC 123". size="lg" para títulos.
export function Placa({ placa, size = "md" }: { placa: string; size?: "md" | "lg" }) {
  const sizes = { md: "px-3 py-1.5 text-[15px]", lg: "px-5 py-2.5 text-2xl" };
  return (
    <span className={`inline-flex rounded-lg bg-jave-yellow font-bold tracking-[1px] text-jave-navy whitespace-nowrap ${sizes[size]}`}>
      {formatPlaca(placa)}
    </span>
  );
}
