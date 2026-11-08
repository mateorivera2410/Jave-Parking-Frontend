import Link from "next/link";
import { CarIcon } from "@/components/ui/Icons";
import { btn } from "@/components/ui/buttons";

// Se muestra cuando el estudiante todavía no ha registrado ningún carro.
export function AvisoSinCarro() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[18px] bg-jave-amber-bg p-5">
      <span className="flex size-12 items-center justify-center rounded-[14px] bg-white text-jave-navy"><CarIcon /></span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-jave-navy">Registra tu carro</p>
        <p className="text-sm text-jave-amber">Para entrar al parqueadero necesitas al menos un carro en tu cuenta.</p>
      </div>
      <Link href="/perfil" className={btn.primary}>Agregar carro</Link>
    </div>
  );
}
