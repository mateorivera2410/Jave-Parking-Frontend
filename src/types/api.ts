/**
 * Tipos de Jave Parking — espejo de las entities y DTOs del backend
 * Si el backend cambia un campo, se cambia aquí y TypeScript marca en
 * rojo todos los archivos del front que hay que ajustar.
 */

// ---------- USERS ----------
export interface User {
  id: string; // Código estudiantil (8 dígitos)
  name: string;
  email: string;
  phone: string;
  isActive: boolean; // false = cuenta desactivada (soft delete)
  isInside: boolean; // true = está dentro de la U
}

export interface CreateUserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  isInside?: boolean;
}

// ---------- CARROS ----------
export interface Carro {
  placa: string; // Ej: ABC123
  userId: string; // Código del dueño
}

export interface CreateCarroDto {
  placa: string;
  userId: string;
}

// ---------- PARQUEADEROS ----------
export interface Parqueadero {
  id: number; // Número del puesto
  tarifa: number; // Pesos por hora
  isActive: boolean; // true = ocupado, false = libre
}

export interface CreateParqueaderoDto {
  id: number;
  tarifa: number;
}

export interface UpdateParqueaderoDto {
  tarifa?: number;
  isActive?: boolean;
}

// ---------- PAGOS ----------
export interface Pago {
  id: number; // Número de factura
  placa: string;
  parqueaderoId: number;
  horaEntrada: string; // Viene en hora Colombia: 2026-11-06T15:20:31-05:00
  horaSalida: string | null; // null = el carro sigue adentro
  total: number | null; // null hasta que registra la salida
  isActive: boolean; // true = ya pagó (permiso de salida)
}

export interface CreatePagoDto {
  placa: string;
  parqueaderoId: number;
}