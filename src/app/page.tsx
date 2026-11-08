"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/modules/session/SessionProvider";
import { FormInput } from "@/components/ui/FormControls";
import { btnLg } from "@/components/ui/buttons";

// Inicio de sesión: basado en "01 - Iniciar Sesión" del Figma.
// El estudiante entra con su código estudiantil.
export default function LoginPage() {
  const { user, loading, login } = useSession();
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [entrando, setEntrando] = useState(false);

  // Si ya inició sesión antes, pasa directo a la app
  useEffect(() => {
    if (!loading && user) router.replace("/inicio");
  }, [loading, user, router]);

  async function entrar(event: React.FormEvent) {
    event.preventDefault();
    try {
      setEntrando(true);
      setError(null);
      await login(codigo.trim());
      router.push("/inicio");
    } catch {
      setError("No encontramos una cuenta activa con ese código. ¿Ya creaste tu cuenta?");
    } finally {
      setEntrando(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white">
      <header className="relative overflow-hidden rounded-b-[40px] bg-jave-navy md:mt-8 md:rounded-t-[40px] px-6 pb-14 pt-24 text-center text-white">
        <div className="pointer-events-none absolute -right-8 -top-8 size-[120px] rounded-full bg-jave-yellow/90" />
        <span className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-white text-[64px] font-bold text-jave-navy">P</span>
        <h1 className="mt-6 text-[32px] font-bold">Jave Parking</h1>
        <p className="mt-1 text-[15px] text-jave-yellow">Parqueadero Universitario</p>
      </header>

      <form onSubmit={entrar} className="flex flex-1 flex-col gap-4 px-6 pt-10">
        <div className="text-center">
          <h2 className="text-[22px] font-semibold text-jave-navy">Bienvenido</h2>
          <p className="mt-2 text-sm text-jave-gray">Inicia sesión con tu código para buscar tu puesto</p>
        </div>
        <FormInput inputMode="numeric" maxLength={8} placeholder="Código estudiantil (8 dígitos)" value={codigo} onChange={e => setCodigo(e.target.value)} required />
        {error && <p className="rounded-[14px] bg-jave-red-bg p-3 text-sm font-medium text-jave-red">{error}</p>}
        <button disabled={entrando} className={`${btnLg.dark}`}>{entrando ? "Entrando..." : "Iniciar sesión"}</button>
        <Link href="/registro" className={`${btnLg.outline}`}>Crear mi cuenta</Link>
        <div className="flex-1" />
        <p className="pb-6 text-center text-xs text-jave-gray">
          Pontificia Universidad Javeriana Cali ·{" "}
          <Link href="/admin" className="font-semibold text-jave-navy hover:underline">Administración</Link>
        </p>
      </form>
    </div>
  );
}
