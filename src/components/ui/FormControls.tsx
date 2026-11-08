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
