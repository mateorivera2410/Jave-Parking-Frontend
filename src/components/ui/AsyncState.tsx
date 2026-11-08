export function LoadingState({ label = "Cargando..." }: { label?: string }) {
  return (
    <div className="py-8 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-jave-card px-4 py-2 text-sm font-medium text-jave-gray">
        <span className="size-2 animate-pulse rounded-full bg-jave-yellow" />
        {label}
      </span>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-[18px] bg-jave-red-bg p-4 text-sm font-medium text-jave-red">
      {message} — ¿Backend en {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}?
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[20px] border-[1.5px] border-dashed border-[#c7cede] py-10 text-center">
      <span className="flex size-10 items-center justify-center rounded-[20px] bg-[#eef1fb] text-xl font-bold text-jave-navy">+</span>
      <p className="text-sm font-semibold text-jave-navy">{children}</p>
    </div>
  );
}
