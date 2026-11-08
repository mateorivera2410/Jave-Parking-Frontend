"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usersService } from "@/modules/users/services/usersService";
import { carrosService } from "@/modules/carros/services/carrosService";
import { useSession } from "@/modules/session/SessionProvider";
import { Field, FormInput } from "@/components/ui/FormControls";
import { btnLg } from "@/components/ui/buttons";

const emptyForm = { id: "", name: "", email: "", phone: "", placa: "" };

// Crear cuenta: basado en "01b - Ingreso de invitado" del Figma.
export default function RegistroPage() {
  const { login } = useSession();
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function crearCuenta(event: React.FormEvent) {
    event.preventDefault();
    try {
      setEnviando(true);
      setError(null);
      // 1. Crea el usuario (POST /users)
      await usersService.create({ id: form.id, name: form.name, email: form.email, phone: form.phone });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e)); // Ej: 409 código o correo repetido
      setEnviando(false);
      return;
    }
    // 2. Si escribió placa, registra su carro (POST /carros). Si falla, lo puede agregar luego en Perfil.
    if (form.placa) {
      try {
        await carrosService.create({ placa: form.placa, userId: form.id });
      } catch (e: unknown) {
        alert(`Tu cuenta quedó creada, pero el carro no: ${e instanceof Error ? e.message : String(e)}. Puedes agregarlo en Perfil.`);
      }
    }
    // 3. Inicia sesión de una vez
    await login(form.id);
    router.push("/inicio");
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-white px-6 pb-10 pt-12">
      <Link href="/" aria-label="Volver" className="inline-flex size-10 items-center justify-center rounded-xl bg-jave-card text-2xl font-bold leading-none text-jave-navy">‹</Link>
      <span className="mt-8 inline-flex rounded-[14px] bg-jave-yellow px-3 py-4 text-base font-bold text-jave-navy">NUEVO</span>
      <h1 className="mt-5 text-[26px] font-bold text-jave-navy">Crea tu cuenta</h1>
      <p className="mt-1 text-sm text-jave-gray">Regístrate con tus datos de la Javeriana</p>

      <form onSubmit={crearCuenta} className="mt-8 space-y-[18px]">
        <Field label="Código estudiantil">
          <FormInput inputMode="numeric" maxLength={8} placeholder="8 dígitos" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} required />
        </Field>
        <Field label="Nombre completo">
          <FormInput placeholder="Nombres y apellidos" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </Field>
        <Field label="Correo">
          <FormInput type="email" placeholder="nombre@javerianacali.edu.co" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </Field>
        <Field label="Teléfono">
          <FormInput inputMode="tel" placeholder="300 123 4567" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </Field>
        <Field label="Placa de tu carro (opcional)">
          <FormInput className="font-bold uppercase tracking-[1px] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal" maxLength={6} placeholder="ABC123" value={form.placa} onChange={e => setForm({ ...form, placa: e.target.value.toUpperCase() })} />
        </Field>
        {error && <p className="rounded-[14px] bg-jave-red-bg p-3 text-sm font-medium text-jave-red">{error}</p>}
        <button disabled={enviando} className={`${btnLg.primary} w-full`}>{enviando ? "Creando..." : "Crear cuenta"}</button>
      </form>
    </div>
  );
}
