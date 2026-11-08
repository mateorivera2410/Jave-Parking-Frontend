/**
 * Configuración de Jave Parking que se usa en varios módulos.
 */

// Tarifa FIJA: todos los puestos cobran lo mismo por hora.
// Cobro: mínimo 1 hora (esta tarifa) y después por minuto. El total real lo calcula el backend.
// El administrador crea los puestos con esta tarifa y el estudiante no la puede cambiar.
// Para cambiar la tarifa de toda la U, se cambia SOLO este número.
export const TARIFA_HORA = 3000;

// Código estudiantil: solo números, de 6 a 10 dígitos (igual que valida el backend).
export const CODIGO_REGEX = /^\d{6,10}$/;
export const CODIGO_AYUDA = "Solo números, de 6 a 10 dígitos";

// Texto corto para explicar el cobro en pantalla
export const TEXTO_COBRO = "mínimo 1 hora, después por minuto";

// Mismo cálculo del backend (pagos.service.ts), solo para MOSTRAR cuánto va mientras el carro está adentro:
// el mayor entre la tarifa (1 hora) y lo que suman los minutos.
export function calcularCobro(minutos: number, tarifaHora: number) {
  return Math.max(tarifaHora, Math.round((minutos * tarifaHora) / 60));
}
