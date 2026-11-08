// Avatar amarillo con la inicial, como en la pantalla "10 - Perfil" del Figma.
export function UserAvatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const sizes = { md: "size-12 text-lg", lg: "size-[88px] text-[34px] border-[3px] border-white" };
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-jave-yellow to-jave-yellow-2 font-bold text-jave-navy ${sizes[size]}`}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
