import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UseSubSectionInteractionProps {
  /** Ruta a la que navegar al hacer click */
  navigationRoute: string;
}

export interface UseSubSectionInteractionReturn {
  /** Estado de si está presionado */
  isPressed: boolean;
  /** Key para regenerar el cristal */
  crystalKey: number;
  /** Handler para click principal */
  handleClick: () => void;
  /** Handler para mouse down */
  handleMouseDown: () => void;
  /** Handler para mouse up */
  handleMouseUp: () => void;
  /** Handler para touch start */
  handleTouchStart: () => void;
  /** Handler para touch end */
  handleTouchEnd: () => void;
}

/**
 * Hook personalizado para manejar las interacciones comunes de las SubSections
 */
export function useSubSectionInteraction({
  navigationRoute,
}: UseSubSectionInteractionProps): UseSubSectionInteractionReturn {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [crystalKey, setCrystalKey] = useState(0);

  const handleClick = () => {
    navigate(navigationRoute);
  };

  const handleMouseDown = () => {
    // Efecto de pulsar inmediato
    setIsPressed(true);

    // Regenerar cristal al presionar
    setCrystalKey((prev) => prev + 1);
  };

  const handleMouseUp = () => {
    // Volver al tamaño original al soltar
    setIsPressed(false);
  };

  const handleTouchStart = () => {
    // Efecto de pulsar inmediato (móvil)
    setIsPressed(true);

    // Regenerar cristal al presionar
    setCrystalKey((prev) => prev + 1);
  };

  const handleTouchEnd = () => {
    // Volver al tamaño original al soltar (móvil)
    setIsPressed(false);
  };

  return {
    isPressed,
    crystalKey,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  };
}
