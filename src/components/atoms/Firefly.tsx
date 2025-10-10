import { useTheme } from "../../hooks/useTheme";

export interface FireflyProps {
  /** Número de la luciérnaga (1-9) para determinar animación y posición */
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /** Tema de color: 'yellow' | 'green' | 'blue' */
  colorTheme: "yellow" | "green" | "blue";
  /** Si la luciérnaga está detrás del cristal (z-index negativo) */
  isBehind?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

// Configuración de luciérnagas por número
const FIREFLY_CONFIG = {
  1: {
    size: "w-4 h-4",
    animation: "firefly1 25s",
    delay: "0s",
    opacity: "opacity-70 group-hover:opacity-100",
    pulse: true,
    position: "translate(2rem, 2rem) rotate(0deg) scale(1)",
  },
  2: {
    size: "w-6 h-6",
    animation: "firefly2 30s",
    delay: "5s",
    opacity: "opacity-60 group-hover:opacity-90",
    pulse: false,
    position: "translate(3rem, 12rem) rotate(0deg) scale(1)",
  },
  3: {
    size: "w-3 h-3",
    animation: "firefly3 28s",
    delay: "8s",
    opacity: "opacity-60 group-hover:opacity-100",
    pulse: false,
    position: "translate(8rem, 1rem) rotate(0deg) scale(1)",
  },
  4: {
    size: "w-2 h-2",
    animation: "firefly4 22s",
    delay: "3s",
    opacity: "opacity-50 group-hover:opacity-80",
    pulse: true,
    position: "translate(12rem, 8rem) rotate(0deg) scale(1)",
  },
  5: {
    size: "w-5 h-5",
    animation: "firefly5 26s",
    delay: "12s",
    opacity: "opacity-65 group-hover:opacity-95",
    pulse: false,
    position: "translate(15rem, 5rem) rotate(0deg) scale(1)",
  },
  6: {
    size: "w-3 h-3",
    animation: "firefly6 32s",
    delay: "15s",
    opacity: "opacity-55 group-hover:opacity-85",
    pulse: true,
    position: "translate(1rem, 6rem) rotate(0deg) scale(1)",
  },
  7: {
    size: "w-4 h-4",
    animation: "firefly7 29s",
    delay: "18s",
    opacity: "opacity-60 group-hover:opacity-90",
    pulse: false,
    position: "translate(16rem, 2rem) rotate(0deg) scale(1)",
  },
  8: {
    size: "w-2 h-2",
    animation: "firefly8 24s",
    delay: "21s",
    opacity: "opacity-45 group-hover:opacity-75",
    pulse: true,
    position: "translate(9rem, 17rem) rotate(0deg) scale(1)",
  },
  9: {
    size: "w-6 h-6",
    animation: "firefly9 27s",
    delay: "6s",
    opacity: "opacity-70 group-hover:opacity-100",
    pulse: false,
    position: "translate(5rem, 10rem) rotate(0deg) scale(1)",
  },
} as const;

// Configuración de colores por tema
const COLOR_THEMES = {
  yellow: {
    1: {
      dark: "bg-yellow-400 shadow-lg shadow-yellow-400/50",
      light: "bg-amber-500 shadow-lg shadow-amber-500/30",
    },
    2: {
      dark: "bg-amber-400 shadow-lg shadow-amber-400/50",
      light: "bg-yellow-600 shadow-lg shadow-yellow-600/30",
    },
    3: {
      dark: "bg-yellow-300 shadow-lg shadow-yellow-300/50",
      light: "bg-amber-600 shadow-lg shadow-amber-600/30",
    },
    4: {
      dark: "bg-amber-300 shadow-md shadow-amber-300/60",
      light: "bg-yellow-700 shadow-md shadow-yellow-700/40",
    },
    5: {
      dark: "bg-yellow-500 shadow-lg shadow-yellow-500/50",
      light: "bg-amber-700 shadow-lg shadow-amber-700/30",
    },
    6: {
      dark: "bg-amber-400 shadow-lg shadow-amber-400/50",
      light: "bg-yellow-500 shadow-lg shadow-yellow-500/30",
    },
    7: {
      dark: "bg-yellow-600 shadow-md shadow-yellow-600/60",
      light: "bg-amber-600 shadow-md shadow-amber-600/40",
    },
    8: {
      dark: "bg-yellow-200 shadow-sm shadow-yellow-200/70",
      light: "bg-amber-800 shadow-sm shadow-amber-800/50",
    },
    9: {
      dark: "bg-amber-300 shadow-lg shadow-amber-300/50",
      light: "bg-yellow-600 shadow-lg shadow-yellow-600/30",
    },
  },
  green: {
    1: {
      dark: "bg-green-400 shadow-lg shadow-green-400/50",
      light: "bg-green-500 shadow-lg shadow-green-500/30",
    },
    2: {
      dark: "bg-emerald-400 shadow-lg shadow-emerald-400/50",
      light: "bg-emerald-500 shadow-lg shadow-emerald-500/30",
    },
    3: {
      dark: "bg-lime-400 shadow-lg shadow-lime-400/50",
      light: "bg-lime-500 shadow-lg shadow-lime-500/30",
    },
    4: {
      dark: "bg-green-300 shadow-md shadow-green-300/60",
      light: "bg-green-600 shadow-md shadow-green-600/40",
    },
    5: {
      dark: "bg-green-200 shadow-md shadow-green-200/60",
      light: "bg-green-700 shadow-md shadow-green-700/40",
    },
    6: {
      dark: "bg-emerald-300 shadow-lg shadow-emerald-300/50",
      light: "bg-emerald-600 shadow-lg shadow-emerald-600/30",
    },
    7: {
      dark: "bg-lime-300 shadow-md shadow-lime-300/60",
      light: "bg-lime-600 shadow-md shadow-lime-600/40",
    },
    8: {
      dark: "bg-green-100 shadow-sm shadow-green-100/70",
      light: "bg-green-800 shadow-sm shadow-green-800/50",
    },
    9: {
      dark: "bg-emerald-500 shadow-lg shadow-emerald-500/50",
      light: "bg-emerald-400 shadow-lg shadow-emerald-400/30",
    },
  },
  blue: {
    1: {
      dark: "bg-blue-400 shadow-lg shadow-blue-400/50",
      light: "bg-blue-500 shadow-lg shadow-blue-500/30",
    },
    2: {
      dark: "bg-cyan-400 shadow-lg shadow-cyan-400/50",
      light: "bg-cyan-500 shadow-lg shadow-cyan-500/30",
    },
    3: {
      dark: "bg-sky-400 shadow-lg shadow-sky-400/50",
      light: "bg-sky-500 shadow-lg shadow-sky-500/30",
    },
    4: {
      dark: "bg-blue-300 shadow-md shadow-blue-300/60",
      light: "bg-blue-600 shadow-md shadow-blue-600/40",
    },
    5: {
      dark: "bg-blue-200 shadow-md shadow-blue-200/60",
      light: "bg-blue-700 shadow-md shadow-blue-700/40",
    },
    6: {
      dark: "bg-cyan-300 shadow-lg shadow-cyan-300/50",
      light: "bg-cyan-600 shadow-lg shadow-cyan-600/30",
    },
    7: {
      dark: "bg-sky-300 shadow-md shadow-sky-300/60",
      light: "bg-sky-600 shadow-md shadow-sky-600/40",
    },
    8: {
      dark: "bg-blue-100 shadow-sm shadow-blue-100/70",
      light: "bg-blue-800 shadow-sm shadow-blue-800/50",
    },
    9: {
      dark: "bg-cyan-500 shadow-lg shadow-cyan-500/50",
      light: "bg-cyan-400 shadow-lg shadow-cyan-400/30",
    },
  },
} as const;

export default function Firefly({
  number,
  colorTheme,
  isBehind = false,
  className = "",
}: FireflyProps) {
  const { theme } = useTheme();
  const config = FIREFLY_CONFIG[number];
  const colors = COLOR_THEMES[colorTheme][number];

  const colorClass = theme === "dark" ? colors.dark : colors.light;
  const zIndexClass = isBehind ? "-z-10" : "";
  const pulseClass = config.pulse ? "animate-pulse" : "";

  return (
    <div
      className={`absolute ${config.size} rounded-full ${zIndexClass} ${colorClass} ${config.opacity} transition-all duration-700 ${pulseClass} ${className}`}
      style={{
        animation: `${config.animation} ease-in-out infinite`,
        animationDelay: config.delay,
        transform: config.position,
      }}
    />
  );
}
