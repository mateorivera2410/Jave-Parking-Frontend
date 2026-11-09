import type { NextConfig } from "next";

// Puente (proxy) hacia el backend: el navegador pide /api/... a Vercel (https)
// y Vercel se lo pide al backend en AWS (http). Así el navegador no bloquea
// la petición por mezclar https con http.
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  // No crear los archivos AGENTS.md / CLAUDE.md (instrucciones para asistentes de IA que Next genera solo)
  agentRules: false,
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/:path*` }];
  },
};

export default nextConfig;