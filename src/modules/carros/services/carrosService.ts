/**
 * carrosService — capa de servicio para Carros
 * Mismo patrón que usersService: es el ÚNICO archivo que sabe las rutas
 * del backend para carros. Si una ruta cambia, solo se cambia aquí.
 */

import { apiClient } from "@/lib/api";
import type { Carro, CreateCarroDto } from "@/types/api";

export const carrosService = {
  // GET /carros  ó  GET /carros?userId=12345678 (carros de un usuario)
  getAll: (userId?: string) => apiClient.get<Carro[]>("/carros", { userId }),
  getById: (placa: string) => apiClient.get<Carro>(`/carros/${placa}`),
  create: (data: CreateCarroDto) => apiClient.post<Carro>("/carros", data),
  delete: (placa: string) => apiClient.delete<void>(`/carros/${placa}`),
};