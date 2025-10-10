import { type ReactNode, memo } from "react";
import { useTheme } from "../../hooks/useTheme";
import TopMenu from "../../pages/components/TopMenu";
import Footer from "../../pages/components/Footer";
import { usePageAnimation } from "../../logic/hooks/usePageAnimation";

export interface PageLayoutProps {
  /** Contenido principal de la página */
  children: ReactNode;
  /** Función de animación GSAP opcional */
  animationFn?: (container: HTMLElement) => void;
  /** Clases CSS adicionales para el contenedor principal */
  className?: string;
  /** Si debe mostrar el TopMenu */
  showTopMenu?: boolean;
  /** Si debe mostrar el Footer */
  showFooter?: boolean;
  /** Gradiente de fondo personalizado */
  backgroundGradient?: {
    dark: string;
    light: string;
  };
  /** Elementos de fondo decorativos */
  backgroundElements?: ReactNode;
}

// Gradientes predefinidos
const DEFAULT_GRADIENTS = {
  primary: {
    dark: "bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950",
    light: "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200",
  },
  blue: {
    dark: "bg-gradient-to-br from-blue-950 via-indigo-950 to-gray-950",
    light: "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100",
  },
  green: {
    dark: "bg-gradient-to-br from-green-950 via-emerald-950 to-gray-950",
    light: "bg-gradient-to-br from-green-50 via-emerald-50 to-slate-100",
  },
} as const;

export default function PageLayout({
  children,
  animationFn,
  className = "",
  showTopMenu = true,
  showFooter = true,
  backgroundGradient = DEFAULT_GRADIENTS.primary,
  backgroundElements,
}: PageLayoutProps) {
  const { theme } = useTheme();

  // Usar el hook de animación si se proporciona una función
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const containerRef = animationFn ? usePageAnimation({ animationFn }) : null;

  const backgroundClass =
    theme === "dark" ? backgroundGradient.dark : backgroundGradient.light;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${backgroundClass}`}
    >
      {/* TopMenu */}
      {showTopMenu && (
        <div className="relative z-50">
          <TopMenu />
        </div>
      )}

      {/* Fondo con patrón sutil */}
      <div
        className={`fixed inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"
        }`}
      />

      {/* Elementos de fondo decorativos */}
      {backgroundElements && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {backgroundElements}
        </div>
      )}

      {/* Contenido principal */}
      <div ref={containerRef} className={`relative z-20 ${className}`}>
        {children}
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="relative z-30">
          <Footer />
        </div>
      )}
    </div>
  );
}

// Componente para elementos parallax de fondo
export interface ParallaxBackgroundProps {
  /** Elementos parallax con sus factores de movimiento */
  elements: Array<{
    component: ReactNode;
    factor: number;
    className?: string;
  }>;
  /** Valor del scroll para el parallax */
  scrollY: number;
}

export const ParallaxBackground = memo(function ParallaxBackground({
  elements,
  scrollY,
}: ParallaxBackgroundProps) {
  return (
    <>
      {elements.map((element, index) => (
        <div
          key={index}
          className={element.className}
          style={{
            transform: `translateY(${scrollY * element.factor}px)`,
            willChange: "transform", // Optimización para animaciones
          }}
        >
          {element.component}
        </div>
      ))}
    </>
  );
});
