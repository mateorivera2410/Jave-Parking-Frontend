import type { Metadata } from "next";
import "@fontsource-variable/inter"; // Fuente Inter del Figma (se instala con npm, no depende de Google)
import { SessionProvider } from "@/modules/session/SessionProvider";
import "./globals.css";

// Título que sale en la pestaña del navegador
export const metadata: Metadata = {
  title: "Jave Parking",
  description: "Parqueadero de la Javeriana Cali — Next.js + Tailwind — Backend NestJS",
};

// Layout raíz: solo la fuente, los estilos y la sesión del estudiante.
// Cada área (estudiante / admin) pone su propio header y menú en su layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
