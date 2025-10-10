import { type ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: "fadeUp" | "fadeIn" | "slideUp" | "slideIn";
}

export function AnimatedContent({
  children,
  className = "",
  delay = 0,
  duration = 600,
  animationType = "fadeUp",
}: AnimatedContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";

    switch (animationType) {
      case "fadeUp":
        return "animate-fade-up";
      case "fadeIn":
        return "animate-fade-in";
      case "slideUp":
        return "animate-slide-up";
      case "slideIn":
        return "animate-slide-in";
      default:
        return "animate-fade-up";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
