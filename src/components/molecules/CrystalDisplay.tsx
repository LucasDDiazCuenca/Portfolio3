import { useTheme } from "../../hooks/useTheme";
import { GoldenCristal } from "../../cristals/GoldenCristal";
import { GreenCristal } from "../../cristals/GreenCristal";
import { BlueCristal } from "../../cristals/BlueCristal";
import FireflyContainer from "../atoms/FireflyContainer";

export interface CrystalDisplayProps {
  /** Tipo de cristal y tema de color */
  type: "golden" | "green" | "blue";
  /** Estado de presionado para efectos visuales */
  isPressed: boolean;
  /** Key para regenerar el cristal */
  crystalKey: number;
  /** Handlers de interacción */
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  /** Clases CSS adicionales */
  className?: string;
}

// Mapeo de tipos a componentes de cristal
const CRYSTAL_COMPONENTS = {
  golden: GoldenCristal,
  green: GreenCristal,
  blue: BlueCristal,
} as const;

// Mapeo de tipos a colores de cristal
const CRYSTAL_COLORS = {
  golden: {
    dark: "#FFD700",
    light: "#B8860B",
  },
  green: {
    dark: "#22C55E",
    light: "#1F9700",
  },
  blue: {
    dark: "#00D4FF",
    light: "#00C1F1",
  },
} as const;

// Mapeo de tipos a temas de luciérnagas
const FIREFLY_THEMES = {
  golden: "yellow" as const,
  green: "green" as const,
  blue: "blue" as const,
};

// Mapeo de tipos a colores de sombra
const SHADOW_COLORS = {
  golden: {
    hover: "group-hover:shadow-yellow-400/30",
    pressed: "shadow-purple-500/50",
  },
  green: {
    hover: "group-hover:shadow-green-400/30",
    pressed: "shadow-purple-500/50",
  },
  blue: {
    hover: "group-hover:shadow-cyan-400/30",
    pressed: "shadow-purple-500/50",
  },
} as const;

export default function CrystalDisplay({
  type,
  isPressed,
  crystalKey,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  className = "",
}: CrystalDisplayProps) {
  const { theme } = useTheme();

  const CrystalComponent = CRYSTAL_COMPONENTS[type];
  const crystalColor =
    theme === "dark" ? CRYSTAL_COLORS[type].dark : CRYSTAL_COLORS[type].light;
  const fireflyTheme = FIREFLY_THEMES[type];
  const shadowConfig = SHADOW_COLORS[type];

  return (
    <div className={`flex-1 flex items-center justify-center ${className}`}>
      <div
        className={`relative w-80 h-80 rounded-full transition-all duration-200 cursor-pointer select-none ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-white to-gray-50"
        } ${
          isPressed
            ? `scale-95 shadow-lg ${shadowConfig.pressed}`
            : `scale-100 shadow-2xl ${shadowConfig.hover} group-hover:shadow-3xl hover:shadow-purple-500/40`
        }`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        {/* Luciérnagas */}
        <FireflyContainer colorTheme={fireflyTheme} />

        {/* Cristal Central */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-110 transform">
            <CrystalComponent
              key={crystalKey}
              size={120}
              duration={1}
              glow={12}
              color={crystalColor}
              enableRandomGeneration={false}
            />
          </div>
        </div>

        {/* Ripple Effect */}
        <div
          className={`absolute inset-0 rounded-full border-2 ${
            theme === "dark"
              ? "border-purple-400/40 shadow-lg shadow-purple-400/20"
              : "border-purple-500/50 shadow-lg shadow-purple-500/15"
          } opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700`}
        />
      </div>
    </div>
  );
}
