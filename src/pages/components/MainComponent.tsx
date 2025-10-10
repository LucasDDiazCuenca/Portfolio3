import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../../hooks/useTheme";

export default function MainComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Crear rayos de luz adaptados al tema
    const createLightRays = () => {
      // Más rayos en modo claro para mejor visibilidad
      const numRays = theme === "dark" ? 15 : 25;
      const rays: HTMLDivElement[] = [];

      // Colores según el tema - rayos blancos en dark mode
      const lightColors =
        theme === "dark"
          ? {
              color1: "rgba(255, 255, 255, 0.3)", // blanco suave
              color2: "rgba(255, 255, 255, 0.7)", // blanco medio
              color3: "rgba(255, 255, 255, 0.9)", // blanco intenso
            }
          : {
              color1: "rgba(0, 0, 0, 0.4)", // negro suave
              color2: "rgba(0, 0, 0, 1)", // negro medio
              color3: "rgba(0, 0, 0, 1)", // negro intenso
            };

      for (let i = 0; i < numRays; i++) {
        const ray = document.createElement("div");
        ray.className = "light-ray";

        // Estilo adaptado al tema - rayos 3x más gruesos
        const rayWidth = theme === "dark" ? "3px" : "6px"; // 3x más grueso
        const blurAmount = theme === "dark" ? "1.5px" : "3px"; // 3x más blur

        ray.style.cssText = `
          position: absolute;
          top: 0;
          width: ${rayWidth};
          height: 100vh;
          background: linear-gradient(
            180deg,
            transparent 0%,
            ${lightColors.color1} 10%,
            ${lightColors.color2} 30%,
            ${lightColors.color3} 50%,
            ${lightColors.color2} 70%,
            ${lightColors.color1} 90%,
            transparent 100%
          );
          filter: blur(${blurAmount});
          transform-origin: top center;
          opacity: 0;
        `;

        container.appendChild(ray);
        rays.push(ray);
      }

      return rays;
    };

    const rays = createLightRays();

    // Timeline principal para coordinar las animaciones
    const tl = gsap.timeline({ repeat: -1 });

    rays.forEach((ray, index) => {
      // Posición horizontal distribuida
      const xPosition = (index / (rays.length - 1)) * 100;

      gsap.set(ray, {
        left: `${xPosition}%`,
        rotation: gsap.utils.random(-15, 15),
        scaleY: gsap.utils.random(0.3, 1),
      });

      // Animación de aparición y desaparición
      tl.to(
        ray,
        {
          opacity: gsap.utils.random(0.3, 0.8),
          duration: gsap.utils.random(2, 4),
          ease: "power2.inOut",
        },
        index * 0.2
      ).to(
        ray,
        {
          opacity: 0,
          duration: gsap.utils.random(1, 3),
          ease: "power2.inOut",
        },
        `+=${gsap.utils.random(0.5, 2)}`
      );

      // Movimiento sutil independiente
      gsap.to(ray, {
        x: gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5),
      });
    });

    // Cleanup function
    return () => {
      tl.kill();
      rays.forEach((ray) => {
        if (ray.parentNode) {
          ray.parentNode.removeChild(ray);
        }
      });
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-violet-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200"
      }`}
      style={{
        backgroundColor: theme === "dark" ? "#0f0520" : undefined,
      }}
    >
      {/* Fondo base con patrón sutil violeta */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"
        }`}
      />

      {/* Overlay para el efecto de profundidad con tinte violeta más intenso */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-t from-violet-950/60 via-purple-950/20 to-slate-950/30"
            : "bg-gradient-to-t from-white/20 via-transparent to-white/10"
        }`}
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 opacity-90 drop-shadow-2xl transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Studio Cristal
          </h1>
          <p
            className={`text-xl md:text-2xl opacity-80 drop-shadow-lg transition-colors duration-500 ${"text-[var(--accent-color)]"}`}
          >
            We make the best of the best Web Sites
          </p>
        </div>
      </div>
    </div>
  );
}
