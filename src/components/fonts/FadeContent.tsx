import { type ReactNode, useEffect, useState } from "react";

interface FadeContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  show?: boolean;
}

export function FadeContent({
  children,
  className = "",
  delay = 0,
  duration = 600,
  show = true,
}: FadeContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (show) {
      // Primero renderizar el elemento
      setShouldRender(true);
      // Luego aplicar la animación después de un pequeño delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay + 50); // Pequeño delay adicional para asegurar el render
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, delay, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(30px)",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}
