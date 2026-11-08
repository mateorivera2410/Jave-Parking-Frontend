/**
 * Guarda el código del estudiante que inició sesión en el navegador (localStorage).
 * Va dentro de try/catch porque en algunos navegadores (modo privado) localStorage falla.
 */
const KEY = "jave-parking:codigo";

export function leerCodigo(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function guardarCodigo(codigo: string) {
  try {
    localStorage.setItem(KEY, codigo);
  } catch {
    // si no se puede guardar, la sesión dura solo mientras la pestaña esté abierta
  }
}

export function borrarCodigo() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nada que borrar
  }
}
