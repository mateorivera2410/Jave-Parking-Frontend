/**
 * Los 3 parqueaderos de la Javeriana Cali.
 * El backend guarda puestos con un número; aquí se define qué rango de números
 * pertenece a cada parqueadero. Para agregar o mover puestos, solo se cambia esta lista.
 */
import type { Parqueadero } from "@/types/api";

export type Zona = {
  slug: string; // va en la URL: /mapa/almendros
  letra: string; // A, B, C (como en el Figma)
  nombre: string;
  ubicacion: string;
  desde: number; // primer número de puesto
  hasta: number; // último número de puesto
};

export const ZONAS: Zona[] = [
  { slug: "principal", letra: "A", nombre: "Parqueadero Principal", ubicacion: "Entrada principal", desde: 1, hasta: 20 },
  { slug: "almendros", letra: "B", nombre: "Parqueadero Almendros", ubicacion: "Edificio Almendros", desde: 21, hasta: 40 },
  { slug: "gualanday", letra: "C", nombre: "Parqueadero Gualanday", ubicacion: "Edificio Gualanday", desde: 41, hasta: 60 },
];

// ¿A qué parqueadero pertenece este número de puesto?
export function zonaDePuesto(puestoId: number): Zona | null {
  return ZONAS.find(z => puestoId >= z.desde && puestoId <= z.hasta) ?? null;
}

export function zonaPorSlug(slug: string): Zona | null {
  return ZONAS.find(z => z.slug === slug) ?? null;
}

// Los puestos (que vienen del backend) que caen en ese parqueadero
export function puestosDeZona(puestos: Parqueadero[], zona: Zona) {
  return puestos.filter(p => p.id >= zona.desde && p.id <= zona.hasta);
}

// Nombre corto para mostrar: "Almendros · Puesto 25"
export function nombrePuesto(puestoId: number) {
  const zona = zonaDePuesto(puestoId);
  return zona ? `${zona.nombre.replace("Parqueadero ", "")} · Puesto ${puestoId}` : `Puesto ${puestoId}`;
}
