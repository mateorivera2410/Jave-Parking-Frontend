"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { LoadingState } from "@/components/ui/AsyncState";
import { useSession } from "@/modules/session/SessionProvider";

// Área del ESTUDIANTE (/inicio, /mapa, /pago, /perfil). Si no ha iniciado sesión, vuelve al login.
// La carpeta (estudiante) va entre paréntesis: agrupa rutas SIN agregar nada a la URL.
export default function EstudianteLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  return (
    <AppShell area="estudiante">
      {user ? children : <LoadingState label="Cargando tu cuenta..." />}
    </AppShell>
  );
}
