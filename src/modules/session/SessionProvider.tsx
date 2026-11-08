"use client";

/**
 * Sesión del ESTUDIANTE.
 * - Inicia sesión con su código estudiantil (no hay contraseña: el backend no la maneja).
 * - Carga sus datos: usuario, sus carros y sus facturas.
 * - Cualquier página del estudiante los lee con useSession().
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usersService } from "@/modules/users/services/usersService";
import { carrosService } from "@/modules/carros/services/carrosService";
import { pagosService } from "@/modules/pagos/services/pagosService";
import type { Carro, Pago, User } from "@/types/api";
import { borrarCodigo, guardarCodigo, leerCodigo } from "./sessionStorage";

type Session = {
  user: User | null;
  carros: Carro[]; // los carros del estudiante
  pagos: Pago[]; // todas sus facturas (más recientes primero)
  pagoActivo: Pago | null; // la factura abierta (carro adentro), si hay
  loading: boolean;
  login: (codigo: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [carros, setCarros] = useState<Carro[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  // Trae del backend todo lo del estudiante con ese código
  const cargar = useCallback(async (codigo: string) => {
    const usuario = await usersService.getById(codigo); // 404 si no existe o está desactivado
    const misCarros = await carrosService.getAll(codigo); // GET /carros?userId=...
    // El backend filtra facturas por UNA placa, así que se pide una lista por carro y se juntan
    const listas = await Promise.all(misCarros.map(c => pagosService.getAll(c.placa)));
    setUser(usuario);
    setCarros(misCarros);
    setPagos(listas.flat().sort((a, b) => b.id - a.id));
  }, []);

  // Al abrir la app: si ya había iniciado sesión antes, se recuperan sus datos
  useEffect(() => {
    // La promesa programa la carga después del render inicial (igual que useEntityDetail)
    void Promise.resolve().then(async () => {
      const codigo = leerCodigo();
      if (codigo) {
        try {
          await cargar(codigo);
        } catch {
          borrarCodigo(); // el código ya no existe o la cuenta se desactivó
        }
      }
      setLoading(false);
    });
  }, [cargar]);

  const login = useCallback(async (codigo: string) => {
    await cargar(codigo); // si el código no existe, lanza el error y no se guarda nada
    guardarCodigo(codigo);
  }, [cargar]);

  const logout = useCallback(() => {
    borrarCodigo();
    setUser(null);
    setCarros([]);
    setPagos([]);
  }, []);

  const refresh = useCallback(async () => {
    if (user) await cargar(user.id);
  }, [cargar, user]);

  const pagoActivo = pagos.find(p => p.horaSalida === null) ?? null;

  return (
    <SessionContext.Provider value={{ user, carros, pagos, pagoActivo, loading, login, logout, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error("useSession debe usarse dentro de <SessionProvider>");
  return session;
}
