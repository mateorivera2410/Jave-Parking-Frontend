/**
 * Estilos de botón del diseño de Figma.
 * Se usan en <button> y en <Link>: className={btn.primary} o className={btnLg.primary}
 * Cambiar un estilo aquí lo cambia en TODOS los módulos.
 */
const base = "inline-flex items-center justify-center gap-2 rounded-[14px] font-bold transition disabled:opacity-50";

const colors = {
  primary: "bg-jave-yellow text-jave-navy hover:brightness-95", // acción principal (amarillo)
  dark: "bg-jave-navy text-white hover:bg-jave-navy-2", // ver detalle / volver
  danger: "border-[1.5px] border-jave-red bg-white text-jave-red hover:bg-jave-red-bg", // eliminar / desactivar
  outline: "border-2 border-jave-yellow bg-white text-jave-navy hover:bg-jave-amber-bg", // acción secundaria
  light: "bg-jave-card text-jave-navy hover:bg-jave-line", // limpiar / cancelar
  onDark: "bg-white/15 text-white hover:bg-white/25", // botón encima del header azul
};

type Variant = keyof typeof colors;
const withSize = (size: string) =>
  Object.fromEntries(Object.entries(colors).map(([name, color]) => [name, `${base} ${size} ${color}`])) as Record<Variant, string>;

export const btn = withSize("px-5 py-3 text-sm"); // tamaño normal
export const btnLg = withSize("px-6 py-4 text-base"); // botones grandes de pantalla completa (pagar, entrar…)
