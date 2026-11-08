import type { ComponentPropsWithoutRef, FormEvent, ReactNode } from "react";

// Apariencia común de los campos (Figma: blancos, redondeados, foco amarillo).
const field = "w-full rounded-[14px] border border-jave-line bg-white px-4 py-3 text-sm text-jave-navy placeholder:text-jave-muted focus:outline-none focus:ring-2 focus:ring-jave-yellow";

// Reutiliza la apariencia base de todos los <input> sin ocultar sus props nativas.
export function FormInput({ className = "", ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={`${field} ${className}`} {...props} />;
}

// Igual que FormInput, pero para los campos <select>.
export function FormSelect({ className = "", children, ...props }: ComponentPropsWithoutRef<"select">) {
  return <select className={`${field} ${className}`} {...props}>{children}</select>;
}

// El formulario recibe la acción desde su página. Así el componente visual no conoce ningún servicio HTTP.
export function FormPanel({ children, onSubmit, className = "" }: {
  children: ReactNode;
  onSubmit: () => void | Promise<void>;
  className?: string;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    // Evita que el navegador recargue la página al enviar el formulario.
    event.preventDefault();
    void onSubmit();
  }

  return <form onSubmit={submit} className={`rounded-[18px] bg-jave-card p-4 ${className}`}>{children}</form>;
}

// Campo con su título arriba, como en las pantallas de login del Figma.
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-jave-navy">{label}</span>
      {children}
    </label>
  );
}

// Código estudiantil: solo deja escribir números (máximo 10).
export function CodigoInput({ value, onChange, placeholder = "Código estudiantil (solo números)" }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <FormInput inputMode="numeric" maxLength={10} placeholder={placeholder} value={value}
      onChange={event => onChange(event.target.value.replace(/\D/g, ""))} required />
  );
}

// Placa: se escribe con o sin espacio ("GCU 541" o "gcu541"). Se muestra "GCU 541"
// pero se guarda sin espacio ("GCU541"), que es como la espera el backend.
export function PlacaInput({ value, onChange, placeholder = "Placa (ABC 123)", required = true }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const visible = value.length > 3 ? `${value.slice(0, 3)} ${value.slice(3)}` : value;
  return (
    <FormInput className="font-bold uppercase tracking-[1px] placeholder:font-normal placeholder:normal-case placeholder:tracking-normal"
      maxLength={7} placeholder={placeholder} value={visible} required={required}
      onChange={event => onChange(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))} />
  );
}
