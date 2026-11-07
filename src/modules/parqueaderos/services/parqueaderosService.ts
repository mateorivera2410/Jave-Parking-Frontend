/**
 * parqueaderosService — capa de servicio para los puestos
 * ocupado: "" = todos, "false" = solo libres, "true" = solo ocupados
 */

import { apiClient } from "@/lib/api";
import type { CreateParqueaderoDto, Parqueadero, UpdateParqueaderoDto } from "@/types/api";

export const parqueaderosService = {
  // GET /parqueaderos  ó  GET /parqueaderos?ocupado=false (puestos libres)
  getAll: (ocupado?: string) => apiClient.get<Parqueadero[]>("/parqueaderos", { ocupado }),
  getById: (id: string) => apiClient.get<Parqueadero>(`/parqueaderos/${id}`),
  create: (data: CreateParqueaderoDto) => apiClient.post<Parqueadero>("/parqueaderos", data),
  update: (id: number, data: UpdateParqueaderoDto) => apiClient.put<Parqueadero>(`/parqueaderos/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`/parqueaderos/${id}`),
};