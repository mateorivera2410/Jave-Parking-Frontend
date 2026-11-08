import Link from "next/link";
import type { User } from "@/types/api";
import { EntityCard } from "@/components/ui/EntityCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { btn } from "@/components/ui/buttons";
import { UserAvatar } from "./UserAvatar";

// La tarjeta no desactiva usuarios por sí misma; delega esa decisión a la página contenedora.
export function UserCard({ user, onDeactivate }: { user: User; onDeactivate: (user: User) => void }) {
  return (
    <EntityCard>
      <div className="flex items-center gap-3">
        <UserAvatar name={user.name} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-jave-navy">{user.name}</p>
          <p className="font-mono text-xs text-jave-gray">{user.id}</p>
        </div>
        {/* isInside: true = está dentro de la U (lo cambia el backend al entrar/salir) */}
        {user.isInside ? <StatusPill tone="amber">Dentro</StatusPill> : <StatusPill tone="gray">Fuera</StatusPill>}
      </div>
      <div className="mt-4 space-y-1 text-sm text-jave-gray">
        <p className="truncate">{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/admin/users/${user.id}`} className={btn.dark}>Ver perfil</Link>
        <button onClick={() => onDeactivate(user)} className={btn.danger}>Desactivar</button>
      </div>
    </EntityCard>
  );
}
