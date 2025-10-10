import { useEffect, useState, useRef, useCallback } from "react";

export interface UseParallaxScrollReturn {
  /** Valor actual del scroll Y */
  scrollY: number;
  /** Valor del parallax con factor aplicado */
  parallaxY: number;
}

/**
 * Hook personalizado para efectos parallax basados en scroll
 * Optimizado con throttling para reducir re-renders
 */
export function useParallaxScroll(
  factor: number = 0.3
): UseParallaxScrollReturn {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    // Cancelar frame anterior si existe
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Usar requestAnimationFrame para throttling
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const parallaxY = scrollY * factor;

  return { scrollY, parallaxY };
}

/**
 * Hook para múltiples elementos parallax con diferentes factores
 * Optimizado con throttling para reducir re-renders
 */
export function useMultiParallax(factors: number[]): number[] {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    // Cancelar frame anterior si existe
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Usar requestAnimationFrame para throttling
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return factors.map((factor) => scrollY * factor);
}
