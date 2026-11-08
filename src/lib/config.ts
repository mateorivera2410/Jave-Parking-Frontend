/**
 * Configuración de Jave Parking que se usa en varios módulos.
 */

// Tarifa FIJA: todos los puestos cobran lo mismo por hora (se cobra por minuto).
// El administrador crea los puestos con esta tarifa y el estudiante no la puede cambiar.
// Para cambiar la tarifa de toda la U, se cambia SOLO este número.
export const TARIFA_HORA = 3000;

// Código estudiantil: solo números, de 6 a 10 dígitos (igual que valida el backend).
export const CODIGO_REGEX = /^\d{6,10}$/;
export const CODIGO_AYUDA = "Solo números, de 6 a 10 dígitos";
