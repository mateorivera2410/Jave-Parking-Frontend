/**
 * pagosService — capa de servicio para Pagos (facturas)
 * entrada() = el carro entra (POST) · salida() = el carro sale y paga (PUT)
 */

import { apiClient } from "@/lib/api";
import type { CreatePagoDto, Pago } from "@/types/api";

export const pagosService = {
  // GET /pagos  ó  GET /pagos?placa=ABC123 (facturas de un carro)
  getAll: (placa?: string) => apiClient.get<Pago[]>("/pagos", { placa }),
  getById: (id: string) => apiClient.get<Pago>(`/pagos/${id}`),
  entrada: (data: CreatePagoDto) => apiClient.post<Pago>("/pagos", data),
  salida: (id: number) => apiClient.put<Pago>(`/pagos/${id}/salida`, {}),
  delete: (id: number) => apiClient.delete<void>(`/pagos/${id}`),
};