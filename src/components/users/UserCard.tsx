import Link from "next/link";
import type { User } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";

// La tarjeta no desactiva usuarios por sí misma; delega esa decisión a la página contenedora.
export function UserCard({ user, onDeactivate }: { user: User; onDeactivate: (user: User) => void }) {
  return (
    <EntityCard accent="blue">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
          {user.name.charAt(0).toUpperCase()}
        </div>
        {/* isInside: true = está dentro de la U (lo cambia el backend al entrar/salir) */}
        {user.isInside
          ? <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Dentro</span>
          : <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200">Fuera</span>}
      </div>
      <div className="mt-3">
        <div className="font-semibold leading-tight">{user.name}</div>
        <div className="text-xs font-mono text-slate-500">{user.id}</div>
      </div>
      <div className="mt-3 space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-slate-600"><span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">✉️</span>{user.email}</div>
        <div className="flex items-center gap-2 text-slate-600"><span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">📞</span>{user.phone}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/users/${user.id}`} className="py-2 rounded-full bg-slate-900 text-white text-center text-xs font-semibold hover:bg-black transition">Ver detalle</Link>
        <button onClick={() => onDeactivate(user)} className="py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-100 transition">Desactivar</button>
      </div>
    </EntityCard>
  );
}