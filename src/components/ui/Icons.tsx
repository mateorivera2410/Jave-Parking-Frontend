/**
 * Íconos del menú, hechos con las mismas formas del Figma (cuadros y círculos).
 * Usan "currentColor": toman el color del texto del contenedor (text-jave-yellow, etc.).
 */

// P dentro de un cuadro → Puestos / Inicio
export function ParkingIcon() {
  return <span className="flex size-[22px] items-center justify-center rounded-[6px] border-2 border-current text-[13px] font-bold leading-none">P</span>;
}

// Cuadro con un punto en el centro → Mapa
export function MapIcon() {
  return (
    <span className="flex size-[22px] items-center justify-center rounded-[6px] border-2 border-current">
      <span className="size-1.5 rounded-full bg-current" />
    </span>
  );
}

// Tarjeta de pago → Pagos
export function CardIcon() {
  return (
    <span className="relative block h-[17px] w-6 rounded-[4px] border-2 border-current">
      <span className="absolute inset-x-0 top-[2px] h-1 bg-current" />
    </span>
  );
}

// Persona (cabeza + cuerpo) → Usuarios / Perfil
export function UserIcon() {
  return (
    <span className="relative block h-7 w-[22px]">
      <span className="absolute left-[5px] top-0 size-3 rounded-full bg-current" />
      <span className="absolute bottom-0 left-0 h-[14px] w-[22px] rounded-[50%] bg-current" />
    </span>
  );
}

// Carro (carrocería + 2 llantas) → Carros
export function CarIcon() {
  return (
    <span className="relative block h-[18px] w-6">
      <span className="absolute inset-x-0 top-0 h-[11px] rounded-[5px] border-2 border-current" />
      <span className="absolute bottom-0 left-[2px] size-1.5 rounded-full bg-current" />
      <span className="absolute bottom-0 right-[2px] size-1.5 rounded-full bg-current" />
    </span>
  );
}
