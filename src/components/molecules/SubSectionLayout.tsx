import { type ReactNode } from "react";
import GradientBackground from "../atoms/GradientBackground";
import SectionTitle from "../atoms/SectionTitle";
import CTAButton from "../atoms/CTAButton";
import CrystalDisplay from "./CrystalDisplay";
import { useSubSectionInteraction } from "../../logic/hooks/useSubSectionInteraction";

export interface SubSectionLayoutProps {
  /** Configuración del contenido */
  content: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    navigationRoute: string;
  };
  /** Tipo de cristal y tema visual */
  crystalType: "golden" | "green" | "blue";
  /** Si el layout debe ser invertido (imagen a la izquierda) */
  reversed?: boolean;
  /** Clases CSS adicionales */
  className?: string;
  /** Contenido adicional personalizado */
  children?: ReactNode;
}

export default function SubSectionLayout({
  content,
  crystalType,
  reversed = false,
  className = "",
  children,
}: SubSectionLayoutProps) {
  const {
    isPressed,
    crystalKey,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = useSubSectionInteraction({ navigationRoute: content.navigationRoute });

  const layoutClass = reversed
    ? "flex flex-col lg:flex-row-reverse items-center gap-16"
    : "flex flex-col lg:flex-row items-center gap-16";

  return (
    <div
      className={`group relative transition-all duration-500 ${layoutClass} ${className}`}
    >
      {/* Fondo con gradiente */}
      <GradientBackground
        colorTheme={crystalType === "golden" ? "yellow" : crystalType}
      />

      {/* Lado del contenido */}
      <div className="flex-1">
        <SectionTitle
          title={content.title}
          subtitle={content.subtitle}
          description={content.description}
        />

        {/* Botón CTA */}
        <CTAButton text={content.buttonText} onClick={handleClick} />
      </div>

      {/* Contenido personalizado adicional */}
      {children}

      {/* Lado visual - Cristal */}
      <CrystalDisplay
        type={crystalType}
        isPressed={isPressed}
        crystalKey={crystalKey}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
}
