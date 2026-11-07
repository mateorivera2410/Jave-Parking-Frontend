/**
 * Formatos para MOSTRAR datos en pantalla (no cambian lo que guarda el backend)
 */

// 12000 → "$12.000"   ·   null → "—"
export function formatPesos(valor: number | null) {
  if (valor === null) return "—";
  return "$" + valor.toLocaleString("es-CO");
}

// "2026-11-06T15:20:31-05:00" → "6/11/26, 3:20 p. m."   ·   null → "—"
export function formatHora(fecha: string | null) {
  if (!fecha) return "—";
  return new Date(fecha).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "short",
    timeStyle: "short",
  });
}