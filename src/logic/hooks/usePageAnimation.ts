import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface UsePageAnimationProps {
  /** Función de animación a ejecutar */
  animationFn: (container: HTMLElement) => void;
  /** Delay antes de ejecutar la animación (ms) */
  delay?: number;
  /** Dependencias adicionales para re-ejecutar la animación */
  dependencies?: unknown[];
}

/**
 * Hook personalizado para manejar animaciones de página con GSAP
 * Proporciona un patrón consistente para todas las páginas
 */
export function usePageAnimation({
  animationFn,
  delay = 50,
  dependencies = [],
}: UsePageAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pequeño delay para asegurar que el DOM esté completamente renderizado
    const timer = setTimeout(() => {
      if (containerRef.current) {
        animationFn(containerRef.current);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [animationFn, delay, ...dependencies]);

  return containerRef;
}

/**
 * Hook específico para animaciones de entrada de elementos
 */
export function useElementsAnimation(selector: string, delay = 100) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const timer = setTimeout(() => {
      // Establecer estado inicial
      gsap.set(elements, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      // Animar entrada
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [selector, delay]);

  return containerRef;
}
