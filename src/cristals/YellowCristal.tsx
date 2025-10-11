import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export type CristalColorVariant = "yellow" | "violet" | "blue";

export interface CristalProps {
  /** Ancho del SVG (px, rem, etc.). Ej: 144, "200px", "10rem" */
  size?: number | string;
  /** Duración de la animación de trazos en segundos. Ej: 2.5 */
  duration?: number;
  /** Variante de color predefinida */
  variant?: CristalColorVariant;
  /** Color personalizado del trazo (SVG stroke) - sobrescribe variant */
  color?: string;
  /** Clase extra opcional */
  className?: string;
  /** Pausar animación al pasar el mouse */
  pauseOnHover?: boolean;
  /** Intensidad del glow (0 = sin glow) */
  glow?: number; // en px
  /** Función que se ejecuta al hacer click (opcional) */
  onClick?: () => void;
}

// Colores predefinidos para cada variante
const COLOR_VARIANTS: Record<CristalColorVariant, string> = {
  yellow: "#FFF8A9",
  violet: "#C084FC",
  blue: "#6366F1",
};

type AnimationPhase = "visible" | "disappearing" | "reappearing";

export const Cristal: React.FC<CristalProps> = ({
  size = 144,
  duration = 1,
  variant = "blue", // Azul por defecto
  color,
  className,
  pauseOnHover = false,
  glow = 8,
  onClick,
}) => {
  const widthValue = typeof size === "number" ? `${size}px` : size;

  // Estado para controlar la fase de animación
  const [animationPhase, setAnimationPhase] =
    useState<AnimationPhase>("visible");
  const [animationKey, setAnimationKey] = useState(0);

  // Usar color personalizado si se proporciona, sino usar variante
  const finalColor = color || COLOR_VARIANTS[variant];

  // Cleanup de timeouts al desmontar
  useEffect(() => {
    return () => {
      // Limpiar cualquier timeout pendiente al desmontar el componente
    };
  }, []);

  // Función para resetear la animación con efecto de desaparición/reaparición
  const handleClick = () => {
    // Iniciar fase de desaparición
    setAnimationPhase("disappearing");

    // Después de que termine la animación de desaparición, reiniciar
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1); // Cambiar key para forzar remount
      setAnimationPhase("reappearing");

      // Volver al estado visible después de la reaparición
      setTimeout(() => {
        setAnimationPhase("visible");
      }, duration * 2000 + 300); // Duración de reaparición + delay
    }, duration * 2000 + 300); // Duración de desaparición + delay

    onClick?.(); // Ejecutar callback opcional
  };

  // Define crystal paths separated by halves
  // Upper half (y < 59): animate from top to bottom
  const upperPaths = [
    "M14.2778 67.2558L38.2916 4.1962",
    "M2.35947 59.9451L38.6563 3.09787",
    "M56.6739 56.7253L38.1335 4.40685",
    "M71.0139 56.7256L38.6262 4.14408",
    "M35.1096 51.8723L50.7533 41.9803",
    "M19.1976 56.1001L49.2532 37.4803",
    "M9.1757 63.4774L29.2194 26.9289",
    "M55.7344 52.7148L59.2475 41.3843",
    "M59.1094 50.8724L60.9998 43.7701",
    "M29.9658 44.2643L38.1095 39.3723",
  ];

  // Lower half (y >= 59): animate from bottom to top
  const lowerPaths = [
    "M37.7877 116.138L1.49492 60.6268",
    "M36.712 114.417L14.6931 66.7731",
    "M37.8737 114.159L37.6095 68.3723",
    "M37.1423 115.966L70.9003 66.8941",
    "M1.08675 60.2828L14.7906 66.8896",
    "M56.3644 56.3961L70.3916 66.8094",
    "M70.8672 56.1836L70.7227 67.4531",
    "M20.8762 65.6559L32.8763 70.6559",
    "M46.2923 63.2739L51.9533 93.8559",
  ];

  // Separated lines
  const upperLines = [
    { x1: "17.0034", y1: "59.4532", x2: "38.0034", y2: "68.4532" },
    { x1: "37.0755", y1: "68.5268", x2: "56.0755", y2: "56.5268" },
  ];

  const lowerLines = [
    { x1: "23.7851", y1: "69.9041", x2: "31.7851", y2: "72.9042" },
    { x1: "51.1014", y1: "69.2829", x2: "53.1014", y2: "80.2829" },
  ];

  // Animation variants for Framer Motion con diferentes fases
  const upperPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: duration * 2, // Slower (double duration)
        ease: "easeInOut" as const,
      },
    },
    disappearing: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: duration * 2, // Misma duración pero inversa
        ease: "easeInOut" as const,
      },
    },
    reappearing: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: duration * 2,
        ease: "easeInOut" as const,
      },
    },
  };

  const lowerPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: duration * 2, // Slower (double duration)
        ease: "easeInOut" as const,
        delay: 0.3, // Small delay for visual differentiation
      },
    },
    disappearing: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: duration * 2,
        ease: "easeInOut" as const,
        delay: 0.3, // Mantener el delay para la desaparición
      },
    },
    reappearing: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: duration * 2,
        ease: "easeInOut" as const,
        delay: 0.3,
      },
    },
  };

  return (
    <div
      className={`inline-grid place-items-center cursor-pointer transition-all duration-300 hover:brightness-110 hover:saturate-110 ${
        className ?? ""
      }`}
      style={
        {
          "--cristal-color": finalColor,
          "--cristal-size": widthValue,
          "--cristal-glow": `${glow}px`,
          width: widthValue,
        } as React.CSSProperties
      }
      onClick={handleClick}
      onMouseEnter={(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = `drop-shadow(0 0 ${glow}px ${finalColor}) drop-shadow(0 0 ${
            glow * 1.5
          }px ${finalColor}66) brightness(1.1) saturate(1.1)`;
        }
      }}
      onMouseLeave={(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = `drop-shadow(0 0 ${glow}px ${finalColor})`;
        }
      }}
      aria-label="Crystal with animated strokes"
      role="img"
    >
      <motion.svg
        key={animationKey} // Esta key fuerza el reinicio de la animación
        className={`w-full h-auto transition-all duration-300 ${
          pauseOnHover ? "hover:animation-pause" : ""
        }`}
        width="72"
        height="118"
        viewBox="0 0 72 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        initial="hidden"
        animate={
          animationPhase === "reappearing" ? "reappearing" : animationPhase
        }
        style={{
          filter: `drop-shadow(0 0 ${glow}px ${finalColor})`,
        }}
      >
        {/* Upper half - animation from top to bottom */}
        <g>
          {upperPaths.map((pathData, index) => (
            <motion.path
              key={`upper-path-${index}`}
              d={pathData}
              stroke={finalColor}
              strokeWidth="2"
              fill="none"
              variants={upperPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
          {upperLines.map((line, index) => (
            <motion.line
              key={`upper-line-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={finalColor}
              strokeWidth="2"
              variants={upperPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
        </g>

        {/* Lower half - animation from bottom to top */}
        <g>
          {lowerPaths.map((pathData, index) => (
            <motion.path
              key={`lower-path-${index}`}
              d={pathData}
              stroke={finalColor}
              strokeWidth="2"
              fill="none"
              variants={lowerPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
          {lowerLines.map((line, index) => (
            <motion.line
              key={`lower-line-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={finalColor}
              strokeWidth="2"
              variants={lowerPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
        </g>

        {/* Path especial que no se anima */}
        <path
          d="M38.1095 115.372L37.4446 116.474L36.6818 115.354"
          stroke={finalColor}
          fill="none"
        />
      </motion.svg>
    </div>
  );
};

// Backward compatibility - YellowCristal with yellow variant
export const YellowCristal: React.FC<CristalProps> = (props) => (
  <Cristal {...props} variant="yellow" />
);

export default Cristal;
