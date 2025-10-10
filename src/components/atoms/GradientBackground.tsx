import { useTheme } from "../../hooks/useTheme";

export interface GradientBackgroundProps {
  /** Tema de color del gradiente */
  colorTheme: "yellow" | "green" | "blue";
  /** Clases CSS adicionales */
  className?: string;
}

// Configuración de gradientes por tema
const GRADIENT_THEMES = {
  yellow: {
    dark: "from-yellow-500/25 via-amber-500/15 to-purple-600/20",
    light: "from-yellow-200/30 via-amber-200/20 to-purple-200/25",
  },
  green: {
    dark: "from-green-500/25 via-emerald-500/15 to-purple-600/20",
    light: "from-green-200/30 via-emerald-200/20 to-purple-200/25",
  },
  blue: {
    dark: "from-cyan-500/25 via-blue-500/15 to-purple-600/20",
    light: "from-cyan-200/30 via-blue-200/20 to-purple-200/25",
  },
} as const;

export default function GradientBackground({
  colorTheme,
  className = "",
}: GradientBackgroundProps) {
  const { theme } = useTheme();
  const gradientClass =
    theme === "dark"
      ? GRADIENT_THEMES[colorTheme].dark
      : GRADIENT_THEMES[colorTheme].light;

  return (
    <div
      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 ${className}`}
    />
  );
}
