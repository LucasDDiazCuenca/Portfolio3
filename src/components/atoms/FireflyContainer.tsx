import Firefly from "./Firefly";

export interface FireflyContainerProps {
  /** Tema de color para todas las luciérnagas */
  colorTheme: "yellow" | "green" | "blue";
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

export default function FireflyContainer({
  colorTheme,
  className = "",
}: FireflyContainerProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Luciérnagas frontales (1-5) */}
      <Firefly number={1} colorTheme={colorTheme} />
      <Firefly number={2} colorTheme={colorTheme} />
      <Firefly number={3} colorTheme={colorTheme} />
      <Firefly number={4} colorTheme={colorTheme} />
      <Firefly number={5} colorTheme={colorTheme} />

      {/* Luciérnagas traseras (6-9) - detrás del cristal */}
      <Firefly number={6} colorTheme={colorTheme} isBehind />
      <Firefly number={7} colorTheme={colorTheme} isBehind />
      <Firefly number={8} colorTheme={colorTheme} isBehind />
      <Firefly number={9} colorTheme={colorTheme} isBehind />
    </div>
  );
}
