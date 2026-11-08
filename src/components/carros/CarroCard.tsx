import Link from "next/link";
import type { Carro } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";
import { CarIcon } from "@/components/ui/Icons";
import { Placa } from "@/components/ui/Placa";
import { btn } from "@/components/ui/buttons";

// Tarjeta de vehículo, como "Card Vehiculo" del Figma. El nombre del dueño llega por props desde la página.
export function CarroCard({ carro, ownerName, onDelete }: {
  carro: Carro;
  ownerName?: string;
  onDelete: (carro: Carro) => void;
}) {
  return (
    <EntityCard>
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#e5eaf6] text-jave-navy"><CarIcon /></span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Placa placa={carro.placa} />
          <p className="truncate text-xs text-jave-gray">
            Dueño:{" "}
            <Link href={`/admin/users/${carro.userId}`} className="font-semibold text-jave-navy hover:underline">{ownerName ?? carro.userId}</Link>
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/admin/carros/${carro.placa}`} className={btn.dark}>Historial</Link>
        <button onClick={() => onDelete(carro)} className={btn.danger}>Eliminar</button>
      </div>
    </EntityCard>
  );
}
