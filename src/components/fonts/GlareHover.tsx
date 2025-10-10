import { type ReactNode, useRef, type MouseEvent } from "react";

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export function GlareHover({
  children,
  className = "",
  intensity = 0.3,
  speed = 300,
}: GlareHoverProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((centerX - x) / centerX) * 8;

    elementRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;

    // Crear efecto de brillo más visible
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    elementRef.current.style.setProperty("--glare-x", `${glareX}%`);
    elementRef.current.style.setProperty("--glare-y", `${glareY}%`);
    elementRef.current.style.setProperty(
      "--glare-opacity",
      intensity.toString()
    );
  };

  const handleMouseLeave = () => {
    if (!elementRef.current) return;

    elementRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    elementRef.current.style.setProperty("--glare-opacity", "0");
  };

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden transition-all ease-out ${className}`}
      style={
        {
          transitionDuration: `${speed}ms`,
          transformStyle: "preserve-3d",
          "--glare-x": "50%",
          "--glare-y": "50%",
          "--glare-opacity": "0",
        } as React.CSSProperties & {
          "--glare-x": string;
          "--glare-y": string;
          "--glare-opacity": string;
        }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative z-10"
        style={{
          background: `radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255, 255, 255, var(--glare-opacity)) 0%, transparent 70%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
