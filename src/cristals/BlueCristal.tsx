import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface BlueCristalProps {
  /** Ancho del SVG (px, rem, etc.). Ej: 136, "150px", "8rem" */
  size?: number | string;
  /** Duración de la animación de trazos en segundos. Ej: 2.5 */
  duration?: number;
  /** Color del trazo (SVG stroke) - ahora en tonos azules */
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
  const centerX = 68;
  const centerY = 99.5;
  const height = 199;

  // Generar puntos aleatorios para la parte superior
  const upperPaths: { path: string; strokeWidth: number }[] = [];
  const lowerPaths: { path: string; strokeWidth: number }[] = [];

  // Crear estructura cristalina aleatoria pero coherente
  for (let i = 0; i < 8; i++) {
    // Parte superior - líneas que convergen hacia arriba
    const startX = centerX + (Math.random() - 0.5) * 80;
    const startY = centerY + (Math.random() - 0.5) * 50;
    const endX = centerX + (Math.random() - 0.5) * 30;
    const endY = Math.random() * 40;

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
    const x1 = centerX + (Math.random() - 0.5) * 70;
    const y1 = centerY + (Math.random() - 0.5) * 40;
    const x2 = centerX + (Math.random() - 0.5) * 70;
    const y2 = centerY + (Math.random() - 0.5) * 40;

    upperPaths.push({
      path: `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(
        2
      )}`,
      strokeWidth: 2, // Conexiones internas más delgadas
    });
  }

  // Parte inferior - líneas que se expanden hacia abajo
  for (let i = 0; i < 10; i++) {
    const startX = centerX + (Math.random() - 0.5) * 50;
    const startY = centerY + (Math.random() - 0.5) * 30;
    const endX = centerX + (Math.random() - 0.5) * 90;
    const endY = height - Math.random() * 50;

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

export const BlueCristal: React.FC<BlueCristalProps> = ({
  size = 136,
  duration = 2.5,
  color = "#00C1F1", // Color azul por defecto
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

  // Paths originales del cristal azul con información de grosor
  // SVG stroke-width="2" → código strokeWidth: 3
  // SVG sin stroke-width (default 1) → código strokeWidth: 2
  const originalUpperPaths = [
    { path: "M5.25317 110.489L35.6073 50.9871", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M35.4086 51.2654L59.3002 25.6298", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M58.7188 26.0377L111.424 1.54134", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M110.199 1.06502L134.05 51.5175", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M134.083 50.9432L127.131 94.1069", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M59.1446 25.9425L24.0545 107.357", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M95.501 48.4254L110.335 2.0177", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M96.4976 47.8781L41.767 66.4694", strokeWidth: 3 }, // SVG: stroke-width="2"
  ];

  const originalLowerPaths = [
    { path: "M127.211 93.7445L90.6611 164.967", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M90.8517 164.65L72.9595 182.207", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M26.5605 198.48L1.11186 134.253", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M1.15817 134.778L5.32555 110.238", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M20.465 138.131L9.43748 129.65", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M10.2477 130.412L24.1939 106.957", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M10.7446 129.742L0.999997 134.812", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M34.6445 174.442L26.0635 197.336", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M33.8922 174.975L81.6882 162.948", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M73.1446 181.942L133.335 50.5349", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M108.645 104.442L104.148 70.0278", strokeWidth: 3 }, // SVG: stroke-width="2"
    { path: "M104.211 70.3365L122.477 74.9993", strokeWidth: 3 }, // SVG: stroke-width="2"
  ];

  // Seleccionar paths según el estado
  const upperPaths =
    currentForm === "random" ? randomPaths.upperPaths : originalUpperPaths;
  const lowerPaths =
    currentForm === "random" ? randomPaths.lowerPaths : originalLowerPaths;

  // Lines separated by sections con información de grosor
  const upperLines = [
    {
      x1: "24.1363",
      y1: "107.07",
      x2: "20.1363",
      y2: "138.07",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
    {
      x1: "104.213",
      y1: "70.3069",
      x2: "95.2133",
      y2: "47.3069",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
  ];

  const lowerLines = [
    {
      x1: "73.4608",
      y1: "181.891",
      x2: "25.4608",
      y2: "197.891",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
    {
      x1: "20.0747",
      y1: "137.575",
      x2: "35.0747",
      y2: "175.575",
      strokeWidth: 3,
    }, // SVG: stroke-width="2"
    {
      x1: "21.7743",
      y1: "139.554",
      x2: "106.774",
      y2: "96.5538",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
    {
      x1: "106.203",
      y1: "90.4569",
      x2: "79.2031",
      y2: "102.457",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
    {
      x1: "106.203",
      y1: "84.4569",
      x2: "88.2031",
      y2: "92.4569",
      strokeWidth: 2,
    }, // SVG: sin stroke-width (default 1)
    {
      x1: "23.8077",
      y1: "147.538",
      x2: "47.8077",
      y2: "137.538",
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
          "--blue-cristal-color": color,
          "--blue-cristal-size": widthValue,
          "--blue-cristal-glow": `${glow}px`,
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
      aria-label="Blue crystal with animated strokes"
      role="img"
    >
      <motion.svg
        className={`w-full h-auto transition-all duration-300 ${
          pauseOnHover ? "hover:animation-pause" : ""
        } ${enableRandomGeneration ? "cursor-pointer" : ""}`}
        width="136"
        height="199"
        viewBox="0 0 136 199"
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

export default BlueCristal;
