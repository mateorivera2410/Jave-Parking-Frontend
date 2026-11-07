import Link from "next/link";
import { HomeShortcutCard } from "@/components/HomeShortcutCard";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#131a2a] via-[#1d2b43] to-[#253a56] text-white p-8 md:p-12 shadow-[0_24px_60px_rgb(20,28,43,0.2)]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-500 rounded-full blur-[80px] opacity-25" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full blur-[80px] opacity-20" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/15 border border-amber-200/30 text-amber-100 text-xs font-semibold tracking-widest uppercase backdrop-blur">Javeriana Cali • Parqueadero</div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4 leading-[0.95]">Jave Parking.<br /><span className="font-light bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">Entra, parquea y paga sin filas.</span></h1>
          <p className="text-white/70 mt-4 max-w-2xl">Registra tu carro, mira qué puestos están libres y paga solo los minutos que estuviste dentro de la U.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/parqueaderos" className="px-6 py-3 rounded-full bg-amber-300 text-slate-950 font-semibold hover:bg-amber-200 transition">Ver puestos libres →</Link>
            <Link href="/pagos" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-medium hover:bg-white/15">Registrar entrada</Link>
          </div>
        </div>
      </div>

      {/* Un acceso directo por cada módulo del backend */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HomeShortcutCard href="/users" accent="blue" icon="👥" title="Usuarios" description="Estudiantes con su código" action="Entrar" />
        <HomeShortcutCard href="/carros" accent="violet" icon="🚗" title="Carros" description="Vehículos y su dueño" action="Ver carros" />
        <HomeShortcutCard href="/parqueaderos" accent="emerald" icon="🅿️" title="Puestos" description="Libres, ocupados y tarifas" action="Ver puestos" />
        <HomeShortcutCard href="/pagos" accent="blue" icon="🧾" title="Pagos" description="Entradas, salidas y cobros" action="Ver pagos" />
      </div>
    </div>
  );
}