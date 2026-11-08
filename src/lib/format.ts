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

// "ABC123" → "ABC 123" (como se ve en una placa de verdad)
export function formatPlaca(placa: string) {
  return placa.length === 6 ? `${placa.slice(0, 3)} ${placa.slice(3)}` : placa;
}

// Minutos entre entrada y salida (o hasta ahora). Igual que el backend: minuto empezado = minuto completo.
export function minutosEntre(entrada: string, salida: string | null) {
  const fin = salida ? new Date(salida) : new Date();
  return Math.max(1, Math.ceil((fin.getTime() - new Date(entrada).getTime()) / 60000));
}

// 95 → "1 h 35 min"   ·   20 → "20 min"
export function formatDuracion(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}
