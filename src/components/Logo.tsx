interface LogoProps {
  size?: number;
  className?: string;
}

/** K7-Bildmarke: vier Pixel-Blöcke im Minecraft-Style */
export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="K7 Mods Logo"
    >
      <rect width="32" height="32" rx="7" fill="#0F1310" />
      <rect x="6" y="6" width="9" height="9" fill="#66C93F" />
      <rect x="17" y="6" width="9" height="9" fill="#3E7D2A" />
      <rect x="6" y="17" width="9" height="9" fill="#3E7D2A" />
      <rect x="17" y="17" width="9" height="9" fill="#66C93F" />
    </svg>
  );
}
