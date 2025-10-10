import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface GoldenCristalProps {
  /** Ancho del SVG (px, rem, etc.). Ej: 69, "100px", "5rem" */
  size?: number | string;
  /** Duración de la animación de trazos en segundos. Ej: 2.5 */
  duration?: number;
  /** Color del trazo (SVG stroke) - ahora en tonos dorados */
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
  const centerX = 34.5;
  const centerY = 62.5;
  const height = 125;

  // Generar puntos aleatorios para la parte superior
  const upperPaths: { path: string; strokeWidth: number }[] = [];
  const lowerPaths: { path: string; strokeWidth: number }[] = [];

  // Crear estructura cristalina aleatoria pero coherente
  for (let i = 0; i < 8; i++) {
    // Parte superior - líneas que convergen hacia arriba
    const startX = centerX + (Math.random() - 0.5) * 70;
    const startY = centerY + (Math.random() - 0.5) * 45;
    const endX = centerX + (Math.random() - 0.5) * 25;
    const endY = Math.random() * 35;

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
    const x1 = centerX + (Math.random() - 0.5) * 60;
    const y1 = centerY + (Math.random() - 0.5) * 35;
    const x2 = centerX + (Math.random() - 0.5) * 60;
    const y2 = centerY + (Math.random() - 0.5) * 35;

    upperPaths.push({
      path: `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(
        2
      )}`,
      strokeWidth: 2, // Conexiones internas más delgadas
    });
  }

  // Parte inferior - líneas que se expanden hacia abajo
  for (let i = 0; i < 10; i++) {
    const startX = centerX + (Math.random() - 0.5) * 45;
    const startY = centerY + (Math.random() - 0.5) * 25;
    const endX = centerX + (Math.random() - 0.5) * 80;
    const endY = height - Math.random() * 45;

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

export const GoldenCristal: React.FC<GoldenCristalProps> = ({
  size = 69,
  duration = 2.5,
  color = "#D4AF37", // Color dorado por defecto
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

  // Paths originales del cristal dorado - NUEVA FORMA más clara
  // SVG stroke-width="2" → código strokeWidth: 3
  // SVG sin stroke-width (default 1) → código strokeWidth: 2
  const originalUpperPaths = [
    { path: "M12.9479 47.7057L45.6361 107.694", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M12.9914 47.7927L6.42242 1.05725", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M6.4224 0.458743L3.35508 40.6077", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M3.35506 40.1078L13.1219 47.8798", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M3.27048 40.2378L37.2996 109.379", strokeWidth: 3 }, // SVG: stroke-width="2"
    {
      path: "M36.9827 108.903L46.2162 106.969L37.3551 109.108",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
    { path: "M45.5233 107.34L52.0657 98.9938", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M51.0344 99.3791L60.6063 101.555", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M60.0673 101.768L67.5015 94.2542", strokeWidth: 3 }, // SVG: stroke-width="2"
  ];

  const originalLowerPaths = [
    { path: "M67.2814 95.3317L40.2359 23.5925", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M40.5691 24.0181L6.8339 1.34607", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M6.4598 1.31909L39.234 36.2814", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M39.2818 36.3921L60.9515 101.693", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M60.8374 101.421L64.4889 121.936", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M64.5952 122.425L67.2174 94.856", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M36.8216 108.903L65.1481 123.361", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M40.1628 23.203L39.3836 37.0327", strokeWidth: 3 }, // SVG: stroke-width="2"
  ];

  // Seleccionar paths según el estado
  const upperPaths =
    currentForm === "random" ? randomPaths.upperPaths : originalUpperPaths;
  const lowerPaths =
    currentForm === "random" ? randomPaths.lowerPaths : originalLowerPaths;

  // Lines separated by sections con información de grosor - NUEVO SVG
  const upperLines = [
    // Línea con stroke-width="2" del nuevo SVG
    {
      x1: "46.4953",
      y1: "106.84",
      x2: "64.4953",
      y2: "121.84",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
  ];

  const lowerLines = [
    // Líneas sin stroke-width (default 1) → strokeWidth: 2
    {
      x1: "15.1491",
      y1: "51.5228",
      x2: "47.1491",
      y2: "61.5228",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
    {
      x1: "13.2777",
      y1: "46.1798",
      x2: "30.147",
      y2: "51.5218",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
    {
      x1: "36.3025",
      y1: "63.8044",
      x2: "49.1124",
      y2: "67.5129",
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
          "--golden-cristal-color": color,
          "--golden-cristal-size": widthValue,
          "--golden-cristal-glow": `${glow}px`,
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
      aria-label="Golden crystal with animated strokes"
      role="img"
    >
      <motion.svg
        className={`w-full h-auto transition-all duration-300 ${
          pauseOnHover ? "hover:animation-pause" : ""
        } ${enableRandomGeneration ? "cursor-pointer" : ""}`}
        width="69"
        height="125"
        viewBox="0 0 69 125"
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

export default GoldenCristal;
