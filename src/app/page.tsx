import Link from "next/link";
import { HomeShortcutCard } from "@/components/HomeShortcutCard";
import { CardIcon, CarIcon, ParkingIcon, UserIcon } from "@/components/ui/Icons";
import { btn } from "@/components/ui/buttons";

const integrantes = ["Mateo Rivera Prados", "Diego Alejandro Calvo", "Jan Pieter Lelie", "Carlos Sánchez"];

// Inicio: basado en la pantalla "00 - Portada" del Figma
export default function Home() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[32px] bg-jave-navy px-6 py-12 text-center text-white sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-jave-yellow/90" />
        <div className="pointer-events-none absolute -bottom-16 -left-14 size-36 rounded-full bg-white/15" />
        <div className="relative">
          <span className="mx-auto flex size-28 items-center justify-center rounded-full bg-white text-7xl font-bold text-jave-navy">P</span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Jave Parking</h1>
          <p className="mt-2 text-jave-yellow">App de parqueadero universitario</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/75">Mira qué puestos están libres, registra tu entrada y paga solo los minutos que estuviste dentro de la U.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/parqueaderos" className={btn.primary}>Ver puestos libres</Link>
            <Link href="/pagos" className={btn.onDark}>Registrar entrada</Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Un acceso directo por cada módulo del backend */}
        <div className="grid gap-3 sm:grid-cols-2">
          <HomeShortcutCard href="/parqueaderos" icon={<ParkingIcon />} title="Puestos" description="Mapa de puestos libres y ocupados" />
          <HomeShortcutCard href="/pagos" icon={<CardIcon />} title="Pagos" description="Entradas, salidas y cobros" />
          <HomeShortcutCard href="/carros" icon={<CarIcon />} title="Carros" description="Vehículos y su dueño" />
          <HomeShortcutCard href="/users" icon={<UserIcon />} title="Usuarios" description="Estudiantes con su código" />
        </div>
        <div className="rounded-[20px] bg-white p-6 shadow-[0_10px_30px_-12px_rgba(20,44,110,0.25)] ring-1 ring-jave-line">
          <p className="text-xs font-semibold uppercase tracking-[0.8px] text-jave-gray">Integrantes del equipo</p>
          <ul className="mt-3 space-y-2">
            {integrantes.map((nombre, i) => <li key={nombre} className={i === 0 ? "font-semibold text-jave-navy" : "text-jave-gray"}>{nombre}</li>)}
          </ul>
          <p className="mt-5 text-xs text-jave-yellow-2">Pontificia Universidad Javeriana Cali</p>
        </div>
      </div>
    </div>
  );
}
