/**
 * Estilos de botón del diseño de Figma.
 * Se usan en <button> y en <Link>: className={btn.primary}
 * Cambiar un estilo aquí lo cambia en TODOS los módulos.
 */
const base = "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-bold transition disabled:opacity-50";

export const btn = {
  primary: `${base} bg-jave-yellow text-jave-navy hover:brightness-95`, // acción principal (amarillo)
  dark: `${base} bg-jave-navy text-white hover:bg-jave-navy-2`, // ver detalle / volver
  danger: `${base} border-[1.5px] border-jave-red bg-white text-jave-red hover:bg-jave-red-bg`, // eliminar / desactivar
  onDark: `${base} bg-white/15 text-white hover:bg-white/25`, // botón encima del header azul
};
