import Link from "next/link";
import type { Carro } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

// Muestra un carro como una placa colombiana. El nombre del dueño llega por props desde la página.
export function CarroCard({ carro, ownerName, onDelete }: {
  carro: Carro;
  ownerName?: string;
  onDelete: (carro: Carro) => void;
}) {
  return (
    <EntityCard accent="violet">
      <div className="flex justify-center">
        <span className="px-5 py-2 rounded-lg bg-yellow-300 border-2 border-slate-900 font-mono font-bold text-2xl tracking-widest">{carro.placa}</span>
      </div>
      <div className="mt-4 text-sm text-slate-600">
        Dueño:{" "}
        <Link href={`/users/${carro.userId}`} className="font-semibold text-slate-900 hover:text-violet-700">{ownerName ?? carro.userId}</Link>
        <span className="block text-xs font-mono text-slate-500">{carro.userId}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/carros/${carro.placa}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black transition">Ver detalle</Link>
        <button onClick={() => onDelete(carro)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-100 transition">Eliminar</button>
      </div>
    </EntityCard>
  );
}