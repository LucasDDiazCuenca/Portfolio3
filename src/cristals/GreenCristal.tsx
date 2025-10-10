import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface GreenCristalProps {
  /** Ancho del SVG (px, rem, etc.). Ej: 79, "100px", "5rem" */
  size?: number | string;
  /** Duración de la animación de trazos en segundos. Ej: 2.5 */
  duration?: number;
  /** Color del trazo (SVG stroke) - ahora en tonos verdes */
  color?: string;
  /** Clase extra opcional */
  className?: string;
  /** Pausar animación al pasar el mouse */
  pauseOnHover?: boolean;
  /** Intensidad del glow (0 = sin glow) */
  glow?: number; // en px
  /** Habilitar click para re-generar forma aleatoria */
  enableRandomGeneration?: boolean;
  /** Callback cuando se hace click */
  onCrystalClick?: () => void;
}

// Función para generar paths aleatorios orgánicos
const generateRandomCrystalPaths = (): {
  upperPaths: { path: string; strokeWidth: number }[];
  lowerPaths: { path: string; strokeWidth: number }[];
} => {
  const centerX = 39.5;
  const centerY = 72.5;
  const height = 145;

  // Generar puntos aleatorios para la parte superior
  const upperPaths: { path: string; strokeWidth: number }[] = [];
  const lowerPaths: { path: string; strokeWidth: number }[] = [];

  // Crear estructura cristalina aleatoria pero coherente
  for (let i = 0; i < 8; i++) {
    // Parte superior - líneas que convergen hacia arriba
    const startX = centerX + (Math.random() - 0.5) * 60;
    const startY = centerY + (Math.random() - 0.5) * 40;
    const endX = centerX + (Math.random() - 0.5) * 20;
    const endY = Math.random() * 30;

    // Líneas principales (más gruesas) para estructura
    const strokeWidth = i < 4 ? 3 : 2;

    upperPaths.push({
      path: `M${startX.toFixed(2)} ${startY.toFixed(2)}L${endX.toFixed(
        2
      )} ${endY.toFixed(2)}`,
      strokeWidth,
    });
  }

  // Crear conexiones internas aleatorias (más delgadas)
  for (let i = 0; i < 6; i++) {
    const x1 = centerX + (Math.random() - 0.5) * 50;
    const y1 = centerY + (Math.random() - 0.5) * 30;
    const x2 = centerX + (Math.random() - 0.5) * 50;
    const y2 = centerY + (Math.random() - 0.5) * 30;

    upperPaths.push({
      path: `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(
        2
      )}`,
      strokeWidth: 2, // Conexiones internas más delgadas
    });
  }

  // Parte inferior - líneas que se expanden hacia abajo
  for (let i = 0; i < 10; i++) {
    const startX = centerX + (Math.random() - 0.5) * 40;
    const startY = centerY + (Math.random() - 0.5) * 20;
    const endX = centerX + (Math.random() - 0.5) * 70;
    const endY = height - Math.random() * 40;

    // Alternar entre líneas principales y secundarias
    const strokeWidth = i < 5 ? 3 : 2;

    lowerPaths.push({
      path: `M${startX.toFixed(2)} ${startY.toFixed(2)}L${endX.toFixed(
        2
      )} ${endY.toFixed(2)}`,
      strokeWidth,
    });
  }

  return { upperPaths, lowerPaths };
};

export const GreenCristal: React.FC<GreenCristalProps> = ({
  size = 79,
  duration = 2.5,
  color = "#1F9700", // Color verde por defecto
  className,
  pauseOnHover = false,
  glow = 8,
  enableRandomGeneration = false,
  onCrystalClick,
}) => {
  const widthValue = typeof size === "number" ? `${size}px` : size;

  // Estado para controlar qué forma mostrar
  const [currentForm, setCurrentForm] = useState<"original" | "random">(
    "original"
  );
  const [randomPaths, setRandomPaths] = useState(() =>
    generateRandomCrystalPaths()
  );
  const [animationKey, setAnimationKey] = useState(0);

  // Función para manejar el click en el cristal
  const handleCrystalClick = useCallback(() => {
    if (enableRandomGeneration) {
      // Siempre generar nuevos paths aleatorios
      setRandomPaths(generateRandomCrystalPaths());
      setCurrentForm("random");
      setAnimationKey((prev) => prev + 1); // Incrementar para forzar re-animación

      // Llamar callback si existe
      if (onCrystalClick) {
        onCrystalClick();
      }
    }
  }, [enableRandomGeneration, onCrystalClick]);

  // Paths originales del cristal verde con información de grosor
  // SVG stroke-width="2" → código strokeWidth: 3
  // SVG sin stroke-width (default 1) → código strokeWidth: 2
  const originalUpperPaths = [
    { path: "M1.20787 61.4567L11.0703 0.999984", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M11.3544 1.92123L57.98 38.321", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M11.289 2.18273L33.6219 27.766", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M15.5163 35.4171L11.1683 2.28155", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M1.39947 61.5506L15.5601 35.3077", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M15.4645 35.353L31.6866 49.2312", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M31.4955 49.088L33.4535 27.4163", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M33.4406 27.6494L57.8767 38.3269", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M57.6438 37.8843L73.8233 77.1111", strokeWidth: 3 }, // SVG: stroke-width="2"
  ];

  const originalLowerPaths = [
    { path: "M31.4795 48.8489L51.1368 100.607", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M1.18011 60.8865L21.4279 111.884", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M20.854 111.317L45.6733 121.232", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M45.3578 121.089L69.8252 143.274", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M73.7378 76.8329L68.1599 109.874", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M68.1019 109.683L70.1541 143.957", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M70.162 143.615L75.6682 116.782L73.7612 76.6571", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M45.2459 121.486L51.1876 100.644", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M50.9998 100.581L68.1282 109.715", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M33.926 55.9807L25.4519 75.2141", strokeWidth: 2 }, // SVG: sin stroke-width (default 1)
  ];

  // Seleccionar paths según el estado
  const upperPaths =
    currentForm === "random" ? randomPaths.upperPaths : originalUpperPaths;
  const lowerPaths =
    currentForm === "random" ? randomPaths.lowerPaths : originalLowerPaths;

  // Lines separated by sections con información de grosor
  const upperLines = [
    {
      x1: "18.5365",
      y1: "102.812",
      x2: "35.5365",
      y2: "60.8124",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
  ];

  const lowerLines = [
    {
      x1: "21.2151",
      y1: "110.944",
      x2: "70.2151",
      y2: "142.944",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
    {
      x1: "20.5419",
      y1: "107.8",
      x2: "27.5419",
      y2: "91.7996",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
  ];

  // Animation variants for Framer Motion
  const upperPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: currentForm === "random" ? duration * 1.5 : duration * 2, // Faster for random paths
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
        duration: currentForm === "random" ? duration * 1.5 : duration * 2, // Faster for random paths
        ease: "easeInOut" as const,
        delay: currentForm === "random" ? 0.1 : 0.3, // Shorter delay for random paths
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
          "--green-cristal-color": color,
          "--green-cristal-size": widthValue,
          "--green-cristal-glow": `${glow}px`,
          width: widthValue,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = `drop-shadow(0 0 ${glow}px ${color}) drop-shadow(0 0 ${
            glow * 1.5
          }px ${color}66) brightness(1.1) saturate(1.1)`;
        }
      }}
      onMouseLeave={(e) => {
        const svg = e.currentTarget.querySelector("svg");
        if (svg) {
          svg.style.filter = `drop-shadow(0 0 ${glow}px ${color})`;
        }
      }}
      aria-label="Green crystal with animated strokes"
      role="img"
    >
      <motion.svg
        className={`w-full h-auto transition-all duration-300 ${
          pauseOnHover ? "hover:animation-pause" : ""
        } ${enableRandomGeneration ? "cursor-pointer" : ""}`}
        width="79"
        height="145"
        viewBox="0 0 79 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        key={`${currentForm}-${animationKey}`} // Force re-animation on change
        onClick={handleCrystalClick}
        style={{
          filter: `drop-shadow(0 0 ${glow}px ${color})`,
        }}
      >
        {/* Upper section - animation from top to bottom */}
        <g>
          {upperPaths.map((pathItem, index) => (
            <motion.path
              key={`upper-path-${index}`}
              d={typeof pathItem === "string" ? pathItem : pathItem.path}
              stroke={color}
              strokeWidth={
                typeof pathItem === "string" ? "2" : pathItem.strokeWidth
              }
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
              stroke={color}
              strokeWidth={line.strokeWidth}
              variants={upperPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
        </g>

        {/* Lower section - animation from bottom to top */}
        <g>
          {lowerPaths.map((pathItem, index) => (
            <motion.path
              key={`lower-path-${index}`}
              d={typeof pathItem === "string" ? pathItem : pathItem.path}
              stroke={color}
              strokeWidth={
                typeof pathItem === "string" ? "2" : pathItem.strokeWidth
              }
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
              stroke={color}
              strokeWidth={line.strokeWidth}
              variants={lowerPathVariants}
              style={{ pathLength: 0 }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
};

export default GreenCristal;
